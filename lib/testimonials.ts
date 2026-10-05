import { createStaticClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/supabase/types";

/**
 * Published testimonials, from Supabase `testimonials`.
 *
 * There is deliberately NO fallback list. The five quotes on the Emergent build
 * ("Michael Chen, CEO, TechStart Inc." and so on) carried stock headshots from
 * Unsplash, which is the signature of generated placeholder content rather
 * than real clients. Publishing an invented review under a real firm's name is
 * a consumer-protection problem, not a copy decision.
 *
 * So they are seeded into the table UNPUBLISHED (see 0001_init.sql). The client
 * either confirms each one is a real client who agreed to be quoted and
 * publishes it from Admin → Testimonials, or replaces them with real ones.
 * Until then the section simply does not render.
 */

export type PublicTestimonial = Pick<Testimonial, "id" | "quote" | "name" | "role" | "company" | "rating">;

export async function getTestimonials(): Promise<PublicTestimonial[]> {
  const supabase = createStaticClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("testimonials")
    .select("id, quote, name, role, company, rating")
    .eq("published", true)
    .order("sort_order")
    .order("created_at");

  if (error || !data) return [];
  return data as PublicTestimonial[];
}
