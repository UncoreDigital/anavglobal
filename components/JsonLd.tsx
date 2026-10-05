/**
 * Structured-data emitter.
 *
 * Serialised with the `<` escaped: a stray "</script>" inside any string field
 * (a post excerpt, a FAQ answer) would otherwise close the tag early and inject
 * the rest of the JSON into the document as markup.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
