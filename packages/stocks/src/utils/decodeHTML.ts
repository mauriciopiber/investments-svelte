export function decodeHTML(rawHTML: string): string {
  return rawHTML
    .replace(/(&nbsp;)/g, " ")
    .replace(/(&#xF3;)/g, "ó")
    .replace(/(&lt;)/g, "<")
    .replace(/(&gt;)/g, ">")
    .replace(/(&amp;)/g, "&")
    .replace(/(&quot;)/g, '"')
    .replace(/(&#96;)/g, "`")
    .replace(/(&#x27;)/g, "'")
    .replace(/(<br>)/g, "\n");
}
