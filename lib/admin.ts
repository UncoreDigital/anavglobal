"use client";

import { createClient } from "@/lib/supabase/client";

/**
 * Shared helpers for the admin island.
 */

/** Public bucket for everything the admin uploads — post covers, inline images, team photos. */
export const MEDIA_BUCKET = "site-media";

/**
 * Upload one image and return its public URL, or throw with a readable message.
 * Files are renamed to a timestamp + random suffix: an admin uploading
 * "photo.jpg" twice must not overwrite the first one.
 */
export async function uploadImage(file: File, folder: "posts" | "team"): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("That file is not an image.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Images must be under 10 MB.");

  const supabase = createClient();
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "31536000", upsert: false });
  if (error) throw new Error(`Upload failed: ${error.message}`);

  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Opens a file picker and uploads the chosen image. Resolves null if cancelled. */
export function pickAndUploadImage(folder: "posts" | "team"): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      try {
        resolve(await uploadImage(file, folder));
      } catch (e) {
        reject(e);
      }
    };
    input.click();
  });
}

/**
 * Tell the public site to re-render.
 *
 * Failure is deliberately non-fatal: the data is already saved and the
 * five-minute ISR window still catches up. Reporting "save failed" over a
 * cache miss would be a lie about what happened to the content.
 */
export async function revalidatePublic(scope: "site" | "post", slug?: string) {
  try {
    const res = await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scope, slug }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
