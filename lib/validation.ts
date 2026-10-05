import { z } from "zod";

/**
 * Form schemas, shared between the client component and the API route.
 *
 * The same object validates on both sides on purpose: client-side validation
 * is a convenience for the visitor, and re-validating on the server with a
 * *different* schema is how the two quietly diverge.
 */

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  enquirerType: z.string().trim().max(80).optional().or(z.literal("")),
  services: z.array(z.string().max(120)).max(10).default([]),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about what you need (a sentence is plenty)")
    .max(4000),
  sourcePage: z.string().max(200).optional().or(z.literal("")),
  /** Which country site the enquiry came from. */
  region: z.enum(["us", "uk"]).default("us"),
  /*
    Honeypot. A real visitor never sees this field, so anything in it is a bot.
    Named `website` because that is what crawlers autofill most readily.
  */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
