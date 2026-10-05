"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ImagePlus,
  Loader2,
  Save,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/Button";
import { revalidatePublic, uploadImage as upload } from "@/lib/admin";
import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/lib/supabase/types";
import { slugify } from "@/lib/utils";
import { cn } from "@/lib/utils";

/* The old site's three categories first, then the service lines. */
const CATEGORIES = [
  "Business Tips",
  "Technology",
  "Tax Planning",
  "Bookkeeping",
  "Payroll",
  "For CPA Firms",
  "Insights",
];

const DEFAULT_AUTHOR = "ANAV Global";

/**
 * Post create/edit screen.
 *
 * The slug auto-follows the title only until the post has been published once.
 * After that it is left alone unless the admin edits it deliberately — silently
 * re-slugging a live URL breaks every inbound link to it.
 */
export default function PostEditor({ post }: { post: Post | null }) {
  const router = useRouter();
  const isNew = post === null;
  const fileInput = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    category: post?.category ?? CATEGORIES[0],
    author: post?.author ?? DEFAULT_AUTHOR,
    cover_url: post?.cover_url ?? "",
    cover_alt: post?.cover_alt ?? "",
    meta_title: post?.meta_title ?? "",
    meta_description: post?.meta_description ?? "",
    is_featured: post?.is_featured ?? false,
    status: post?.status ?? ("draft" as "draft" | "published"),
    region: (post?.region ?? "all") as "all" | "us" | "uk",
  });

  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  /** Saved to the database, but the public page could not be re-rendered. */
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  function onTitleChange(title: string) {
    setForm((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : slugify(title),
    }));
  }

  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    try {
      return await upload(file, "posts");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
      return null;
    }
  }, []);

  async function onCoverSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const url = await uploadImage(file);
    setUploading(false);
    if (url) set("cover_url", url);
    event.target.value = "";
  }

  /** Passed to the editor so its image button uses the same bucket as covers. */
  const pickInlineImage = useCallback(async (): Promise<string | null> => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return resolve(null);
        setUploading(true);
        const url = await uploadImage(file);
        setUploading(false);
        resolve(url);
      };
      input.click();
    });
  }, [uploadImage]);

  async function save(status?: "draft" | "published") {
    const nextStatus = status ?? form.status;

    if (!form.title.trim()) {
      setError("A title is required.");
      return;
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) {
      setError("The slug must be lowercase letters, numbers and hyphens only.");
      return;
    }

    setState("saving");
    setError(null);

    const supabase = createClient();
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,
      category: form.category,
      author: form.author.trim() || DEFAULT_AUTHOR,
      cover_url: form.cover_url.trim() || null,
      cover_alt: form.cover_alt.trim() || null,
      meta_title: form.meta_title.trim() || null,
      meta_description: form.meta_description.trim() || null,
      is_featured: form.is_featured,
      region: form.region,
      status: nextStatus,
      /*
        published_at is stamped on first publish and never moved afterwards — a
        later edit is an update, not a republication, and resetting the date
        would reorder the blog every time a typo is fixed.
      */
      published_at:
        nextStatus === "published"
          ? (post?.published_at ?? new Date().toISOString())
          : null,
    };

    const write = (body: Omit<typeof payload, "region"> & { region?: typeof payload.region }) =>
      isNew
        ? supabase.from("posts").insert(body).select("id").single()
        : supabase.from("posts").update(body).eq("id", post.id).select("id").single();

    let result = await write(payload);
    /* Database without supabase/migrations/0004_regions.sql: save without "Show on" rather than failing. */
    if (result.error && /region/i.test(result.error.message)) {
      const { region: _omit, ...rest } = payload;
      void _omit;
      result = await write(rest);
    }

    if (result.error) {
      setState("error");
      setError(
        result.error.code === "23505"
          ? "That slug is already in use by another post."
          : result.error.message
      );
      return;
    }

    /*
      Await this rather than firing and forgetting: the author's next move is to
      open the live page and check, and losing that race is the whole complaint
      this was written to fix.
    */
    const fresh = await revalidatePublic("post", payload.slug);
    setState("saved");
    setStale(!fresh);
    set("status", nextStatus);
    router.refresh();

    if (isNew) {
      router.replace(`/admin/posts/${result.data.id}`);
      return;
    }
    setTimeout(() => setState("idle"), 2500);
  }

  async function remove() {
    if (!post) return;
    if (!confirm(`Delete "${post.title}" permanently? This cannot be undone.`)) return;

    const { error: deleteError } = await createClient().from("posts").delete().eq("id", post.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await revalidatePublic("post", post.slug);
    router.replace("/admin/posts");
    router.refresh();
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-ink-muted transition-colors hover:text-navy-deep"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All posts
        </Link>

        <div className="flex items-center gap-3">
          {!isNew && form.status === "published" && (
            <a
              href={`${form.region === "uk" ? "/uk" : ""}/blog/${form.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand hover:text-brand-dark"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              View live
            </a>
          )}
          {!isNew && (
            <button
              type="button"
              onClick={remove}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13.5px] font-semibold text-destructive transition-colors hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-[13px] font-semibold text-navy-deep">
              Title
            </label>
            <input
              id="title"
              value={form.title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="What is this piece called?"
              className="h-14 w-full rounded-xl border border-input bg-white px-5 font-display text-lg font-bold text-navy-deep transition-colors placeholder:font-normal placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="mb-2 block text-[13px] font-semibold text-navy-deep">
              Excerpt
              <span className="ml-2 font-normal text-slate-400">
                Shown on the blog index and in search results
              </span>
            </label>
            <textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              maxLength={400}
              className="w-full rounded-xl border border-input bg-white px-4 py-3 text-[14px] transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <p className="mt-1.5 text-right text-[12px] text-slate-400">
              {form.excerpt.length}/400
            </p>
          </div>

          <div>
            <span className="mb-2 block text-[13px] font-semibold text-navy-deep">Body</span>
            <RichTextEditor
              value={form.content}
              onChange={(html) => set("content", html)}
              onRequestImage={pickInlineImage}
            />
          </div>
        </div>

        <aside className="space-y-5">
          {/* Publish box */}
          <section className="rounded-xl border border-border bg-white p-5">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
              Publish
            </h2>

            <div className="mt-4 flex items-center gap-2 text-[13.5px]">
              <span className="text-ink-muted">Status</span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11.5px] font-semibold capitalize",
                  form.status === "published"
                    ? "bg-emerald/10 text-emerald"
                    : "bg-accent/15 text-accent-dark"
                )}
              >
                {form.status}
              </span>
            </div>

            <label className="mt-4 flex items-center gap-2.5 text-[13.5px] text-ink-muted">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => set("is_featured", e.target.checked)}
                className="h-4 w-4 rounded border-input text-brand focus:ring-brand"
              />
              Feature this post
            </label>

            <div className="mt-5 space-y-2.5">
              <Button
                onClick={() => save("published")}
                variant="accent"
                className="w-full"
                disabled={state === "saving"}
              >
                {state === "saving" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="h-4 w-4" aria-hidden="true" />
                )}
                {form.status === "published" ? "Update" : "Publish"}
              </Button>
              <Button
                onClick={() => save("draft")}
                variant="outline"
                className="w-full"
                disabled={state === "saving"}
              >
                Save as draft
              </Button>
            </div>

            {/*
              "Saved" used to mean "written to the database", which is not what
              an author is asking. They want to know the live page has changed —
              so the message says which of the two happened.
            */}
            {state === "saved" && !stale && (
              <p className="mt-4 flex items-center gap-2 text-[13px] font-semibold text-emerald">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Saved and live
              </p>
            )}
            {state === "saved" && stale && (
              <p className="mt-4 flex items-start gap-2 text-[12.5px] font-medium text-amber-700">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Saved. The live page could not be refreshed just now — it will
                update itself within five minutes.
              </p>
            )}
            {error && (
              <p
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive/5 p-3 text-[12.5px] text-destructive"
              >
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {error}
              </p>
            )}
          </section>

          {/* Cover */}
          <section className="rounded-xl border border-border bg-white p-5">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
              Cover image
            </h2>

            {form.cover_url ? (
              <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={form.cover_url}
                  alt=""
                  fill
                  sizes="20rem"
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => set("cover_url", "")}
                  aria-label="Remove cover image"
                  className="absolute right-2 top-2 rounded-md bg-navy-deep/80 p-1.5 text-white transition-colors hover:bg-destructive"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                disabled={uploading}
                className="mt-4 flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-ink-muted transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                ) : (
                  <ImagePlus className="h-5 w-5" aria-hidden="true" />
                )}
                <span className="text-[13px] font-semibold">
                  {uploading ? "Uploading…" : "Upload cover"}
                </span>
              </button>
            )}

            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={onCoverSelected}
              className="hidden"
            />

            <label htmlFor="cover_alt" className="mb-2 mt-4 block text-[13px] font-semibold text-navy-deep">
              Alt text
            </label>
            <input
              id="cover_alt"
              value={form.cover_alt}
              onChange={(e) => set("cover_alt", e.target.value)}
              placeholder="Describe the image"
              className="h-10 w-full rounded-lg border border-input bg-white px-3 text-[13.5px] transition-colors focus:border-brand focus:outline-none"
            />
          </section>

          {/* Meta */}
          <section className="rounded-xl border border-border bg-white p-5">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
              Details
            </h2>

            <div className="mt-4 space-y-4">
              <Field label="Slug" htmlFor="slug">
                <input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value);
                  }}
                  className="h-10 w-full rounded-lg border border-input bg-white px-3 font-mono text-[13px] transition-colors focus:border-brand focus:outline-none"
                />
                <p className="mt-1.5 truncate text-[12px] text-slate-400">
                  {form.region === "uk" ? "/uk" : ""}/blog/{form.slug}
                </p>
              </Field>

              <Field label="Show on" htmlFor="region">
                <select
                  id="region"
                  value={form.region}
                  onChange={(e) => set("region", e.target.value as "all" | "us" | "uk")}
                  className="h-10 w-full rounded-lg border border-input bg-white px-3 text-[13.5px] transition-colors focus:border-brand focus:outline-none"
                >
                  <option value="all">Both sites (US &amp; UK)</option>
                  <option value="us">US site only</option>
                  <option value="uk">UK site only</option>
                </select>
              </Field>

              <Field label="Category" htmlFor="category">
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-white px-3 text-[13.5px] transition-colors focus:border-brand focus:outline-none"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </Field>

              <Field label="Author" htmlFor="author">
                <input
                  id="author"
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-white px-3 text-[13.5px] transition-colors focus:border-brand focus:outline-none"
                />
              </Field>
            </div>
          </section>

          {/* SEO */}
          <section className="rounded-xl border border-border bg-white p-5">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">SEO</h2>
            <p className="mt-2 text-[12.5px] leading-relaxed text-slate-400">
              Leave empty to fall back to the title and excerpt.
            </p>

            <div className="mt-4 space-y-4">
              <Field label="Meta title" htmlFor="meta_title">
                <input
                  id="meta_title"
                  value={form.meta_title}
                  onChange={(e) => set("meta_title", e.target.value)}
                  maxLength={200}
                  className="h-10 w-full rounded-lg border border-input bg-white px-3 text-[13.5px] transition-colors focus:border-brand focus:outline-none"
                />
              </Field>

              <Field label="Meta description" htmlFor="meta_description">
                <textarea
                  id="meta_description"
                  value={form.meta_description}
                  onChange={(e) => set("meta_description", e.target.value)}
                  rows={3}
                  maxLength={320}
                  className="w-full rounded-lg border border-input bg-white px-3 py-2 text-[13.5px] transition-colors focus:border-brand focus:outline-none"
                />
              </Field>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-semibold text-navy-deep">
        {label}
      </label>
      {children}
    </div>
  );
}
