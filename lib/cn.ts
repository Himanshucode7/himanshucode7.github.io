/** Joins truthy class names. We own every component, so no merge logic is needed. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
