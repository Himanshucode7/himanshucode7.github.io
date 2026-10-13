/**
 * Inline script that runs during HTML parsing. `type` flips to text/plain on the
 * client so React does not warn about rendering <script>; see the Next.js guide
 * "Preventing flash before hydration".
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
