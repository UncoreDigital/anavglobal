import { createStaticClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/supabase/types";

/**
 * The team, read from Supabase `team_members` so the client can add, edit,
 * reorder and hide people from Admin → Team without a deploy.
 *
 * FALLBACK is the people the Emergent build published (less Darshan Thakkar,
 * removed at the client's request in October 2026) — names, roles,
 * bios and credential tags verbatim, headshots optimised locally. It is what
 * renders before Supabase is configured, and it is also what
 * supabase/migrations/0001_init.sql seeds, so the two start identical.
 */

type Seed = Omit<TeamMember, "id" | "created_at" | "updated_at">;

/* LinkedIn links as supplied by the client (October 2026); see supabase/migrations/0009_team_linkedin.sql. */
const seed = (m: Omit<Seed, "published" | "linkedin_url"> & { linkedin_url?: string }): Seed => ({
  ...m,
  published: true,
  linkedin_url: m.linkedin_url ?? null,
});

export const TEAM_FALLBACK: Seed[] = [
  seed({
    name: "Virang P Patel",
    role: "Founder & Managing Director",
    bio: "Leading a dedicated team committed to delivering exceptional financial and accounting solutions with highest standards of service, integrity, and professionalism.",
    photo_url: "/assets/team/virang-patel.webp",
    credentials: ["QuickBooks ProAdvisor"],
    tier: "leadership",
    sort_order: 1,
    linkedin_url: "https://www.linkedin.com/in/virang-p-patel-15508a66",
  }),
  seed({
    name: "Niket Bhatt",
    role: "Founder & Managing Director",
    bio: "Building strong, lasting relationships with clients through trust, open communication, and bespoke advice that aligns with your vision.",
    photo_url: "/assets/team/niket-bhatt.webp",
    credentials: ["Client Relations", "Advisory"],
    tier: "leadership",
    sort_order: 2,
    linkedin_url: "https://www.linkedin.com/in/niket-bhatt-82621612a",
  }),
  seed({
    name: "Vandana Patel",
    role: "Chief Executive Officer (CEO)",
    bio: "A seasoned Chartered Accountant with extensive industry experience, delivering reliable, transparent, and client-focused solutions.",
    photo_url: "/assets/team/vandana-patel.webp",
    credentials: ["CA", "Tax Expert"],
    tier: "leadership",
    sort_order: 3,
    linkedin_url: "https://www.linkedin.com/in/ca-vandana-patel-5b102636",
  }),
  seed({
    name: "Raj Barot",
    role: "Senior Manager – Onboarding & Transition",
    bio: "Ensuring smooth onboarding and seamless transitions for all clients.",
    photo_url: "/assets/team/raj-barot.webp",
    credentials: ["Onboarding Expert"],
    tier: "management",
    sort_order: 5,
    linkedin_url: "https://www.linkedin.com/in/raj-barot-13986b176",
  }),
  seed({
    name: "Meet Barot",
    role: "Senior Manager – Taxation",
    bio: "Expert in taxation with comprehensive knowledge of tax compliance and planning.",
    photo_url: "/assets/team/meet-barot.webp",
    credentials: ["EA", "Tax Specialist"],
    tier: "management",
    sort_order: 6,
    linkedin_url: "https://www.linkedin.com/in/meet-barot-ea-license-awaiting-0ab0462bb",
  }),
  seed({
    name: "Kishan Thakor",
    role: "Manager – Operations",
    bio: "Managing day-to-day operations with efficiency and precision.",
    photo_url: "/assets/team/kishan-thakor.webp",
    credentials: ["Operations"],
    tier: "management",
    sort_order: 7,
    linkedin_url: "https://www.linkedin.com/in/kishankumar-thakor-6a5105242",
  }),
];

export type PublicTeamMember = Pick<
  TeamMember,
  "name" | "role" | "bio" | "photo_url" | "credentials" | "tier" | "linkedin_url"
>;

export async function getTeam(): Promise<PublicTeamMember[]> {
  const supabase = createStaticClient();
  if (!supabase) return TEAM_FALLBACK;

  const { data, error } = await supabase
    .from("team_members")
    .select("name, role, bio, photo_url, credentials, tier, linkedin_url")
    .eq("published", true)
    .order("sort_order")
    .order("name");

  /*
    An error falls back to the published team; an empty table does not. If the
    admin has deliberately unpublished everyone, the page should show nobody
    rather than resurrecting the seed list.
  */
  if (error || !data) return TEAM_FALLBACK;
  return data as PublicTeamMember[];
}
