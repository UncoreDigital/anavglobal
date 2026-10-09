import { createStaticClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/supabase/types";

/**
 * The team, read from Supabase `team_members` so the client can add, edit,
 * reorder and hide people from Admin → Team without a deploy.
 *
 * FALLBACK is the seven people the Emergent build published — names, roles,
 * bios and credential tags verbatim, headshots optimised locally. It is what
 * renders before Supabase is configured, and it is also what
 * supabase/migrations/0001_init.sql seeds, so the two start identical.
 */

type Seed = Omit<TeamMember, "id" | "created_at" | "updated_at">;

const seed = (m: Omit<Seed, "published" | "linkedin_url">): Seed => ({ ...m, published: true, linkedin_url: null });

export const TEAM_FALLBACK: Seed[] = [
  seed({
    name: "Virang P Patel",
    role: "Founder & Managing Director",
    bio: "Leading a dedicated team committed to delivering exceptional financial and accounting solutions with highest standards of service, integrity, and professionalism.",
    photo_url: "/assets/team/virang-patel.webp",
    credentials: ["QuickBooks ProAdvisor"],
    tier: "leadership",
    sort_order: 1,
  }),
  {
    ...seed({
      name: "Niket Bhatt",
      role: "Founder & Managing Director",
      bio: "Building strong, lasting relationships with clients through trust, open communication, and bespoke advice that aligns with your vision.",
      photo_url: "/assets/team/niket-bhatt.webp",
      credentials: ["Client Relations", "Advisory"],
      tier: "leadership",
      sort_order: 2,
    }),
    /* Public profile, matched by name and company. The others are to come from the client — see 0005. */
    linkedin_url: "https://www.linkedin.com/in/niket-bhatt-82621612a/",
  },
  seed({
    name: "Vandana Patel",
    role: "Chief Executive Officer (CEO)",
    bio: "A seasoned Chartered Accountant with extensive industry experience, delivering reliable, transparent, and client-focused solutions.",
    photo_url: "/assets/team/vandana-patel.webp",
    credentials: ["CA", "Tax Expert"],
    tier: "leadership",
    sort_order: 3,
  }),
  seed({
    name: "Darshan Thakkar",
    role: "Senior Manager – Direct Client",
    bio: "Managing direct client relationships with expertise and dedication.",
    photo_url: "/assets/team/darshan-thakkar.webp",
    credentials: ["Client Management"],
    tier: "management",
    sort_order: 4,
  }),
  seed({
    name: "Raj Barot",
    role: "Senior Manager – Onboarding & Transition",
    bio: "Ensuring smooth onboarding and seamless transitions for all clients.",
    photo_url: "/assets/team/raj-barot.webp",
    credentials: ["Onboarding Expert"],
    tier: "management",
    sort_order: 5,
  }),
  seed({
    name: "Meet Barot",
    role: "Senior Manager – Taxation",
    bio: "Expert in taxation with comprehensive knowledge of tax compliance and planning.",
    photo_url: "/assets/team/meet-barot.webp",
    credentials: ["EA", "Tax Specialist"],
    tier: "management",
    sort_order: 6,
  }),
  seed({
    name: "Kishan Thakor",
    role: "Manager – Operations",
    bio: "Managing day-to-day operations with efficiency and precision.",
    photo_url: "/assets/team/kishan-thakor.webp",
    credentials: ["Operations"],
    tier: "management",
    sort_order: 7,
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
