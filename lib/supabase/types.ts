/**
 * Hand-maintained mirror of supabase/migrations.
 *
 * Regenerate with `supabase gen types typescript --project-id <ref>` once the
 * project exists; until then this is the contract, and it must be updated in
 * the same commit as any migration that changes a column.
 */

export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost" | "archived";

export type PublishStatus = "draft" | "published";

/** Which country site a lead came from (supabase/migrations/0004_regions.sql). */
export type LeadRegion = "us" | "uk";

/** Which country site a post shows on. "all" = both. */
export type PostRegion = "all" | "us" | "uk";

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  /** United States / United Kingdom / India / Other — routes the enquiry to an office. */
  country: string | null;
  /** CPA / accounting firm, business owner, other. */
  enquirer_type: string | null;
  services: string[];
  message: string | null;
  source_page: string | null;
  status: LeadStatus;
  notes: string | null;
  /** Optional until 0004_regions.sql has been run. */
  region?: LeadRegion | null;
};

export type Post = {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  cover_url: string | null;
  cover_alt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  status: PublishStatus;
  published_at: string | null;
  /** Optional until 0004_regions.sql has been run; absent means "all". */
  region?: PostRegion | null;
};

export type SiteSetting = {
  key: string;
  value: string | null;
  label: string;
  group_name: string;
  sort_order: number;
  updated_at: string;
};

export type TeamTier = "leadership" | "management";

export type TeamMember = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  credentials: string[];
  tier: TeamTier;
  sort_order: number;
  published: boolean;
  linkedin_url: string | null;
};

export type Testimonial = {
  id: string;
  created_at: string;
  updated_at: string;
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  rating: number;
  sort_order: number;
  published: boolean;
};

/*
  supabase-js resolves a table's insert/update generics through this shape and
  expects a Relationships tuple on every entry. Without it the client falls back
  to `never`, and every .insert() call fails to typecheck against its own row.
*/
export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: Omit<Lead, "id" | "created_at" | "status" | "notes"> & Partial<Pick<Lead, "status" | "notes">>;
        Update: Partial<Lead>;
        Relationships: [];
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, "id" | "created_at" | "updated_at"> & Partial<Pick<Post, "created_at" | "updated_at">>;
        Update: Partial<Post>;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSetting;
        Insert: SiteSetting;
        Update: Partial<SiteSetting>;
        Relationships: [];
      };
      team_members: {
        Row: TeamMember;
        Insert: Omit<TeamMember, "id" | "created_at" | "updated_at">;
        Update: Partial<TeamMember>;
        Relationships: [];
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, "id" | "created_at" | "updated_at">;
        Update: Partial<Testimonial>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
