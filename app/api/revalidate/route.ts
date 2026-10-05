import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * On-demand revalidation for everything the admin can edit.
 *
 * The admin forms write straight to Supabase from the browser, so Next.js has
 * no idea anything changed. Without this, the only refresh path is the
 * five-minute ISR window — and because ISR serves stale-while-revalidate, the
 * first reload after that window still shows the old page. Someone who saves,
 * refreshes once and sees no change concludes the CMS is broken.
 *
 * Authorisation is the caller's Supabase session, checked here: middleware
 * guards /admin, not /api.
 */

type Scope = "post" | "site";

export async function POST(request: Request) {
  const supabase = createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let scope: Scope = "site";
  let slug: string | undefined;
  try {
    const body = await request.json();
    if (body?.scope === "post" || body?.scope === "site") scope = body.scope;
    if (typeof body?.slug === "string" && body.slug.length <= 200) slug = body.slug;
  } catch {
    /* No body is fine — the default scope flushes everything. */
  }

  const revalidated: string[] = [];
  const flush = (path: string, type?: "page" | "layout") => {
    revalidatePath(path, type);
    revalidated.push(type ? `${path} (${type})` : path);
  };

  if (scope === "site") {
    /*
      Settings, team and testimonials surface across the whole site — the phone
      number is in the footer of every page, the team on three — so the root
      layout is the only correct flush.
    */
    flush("/", "layout");
  } else {
    /*
      A post appears on its own page, the index and the homepage teaser — on
      the US site, the UK site or both — and in the sitemap.
    */
    for (const prefix of ["", "/uk"]) {
      flush(prefix || "/");
      flush(`${prefix}/blog`);
      if (slug) flush(`${prefix}/blog/${slug}`);
    }
    flush("/sitemap.xml");
    /* A slug rename (or a "Show on" change) leaves old paths prerendered; flush both segments. */
    flush("/(marketing)/(us)/blog/[slug]", "page");
    flush("/(marketing)/uk/blog/[slug]", "page");
  }

  return NextResponse.json({ scope, revalidated, at: Date.now() });
}
