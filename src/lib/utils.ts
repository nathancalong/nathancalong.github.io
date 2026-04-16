// Simple class name joiner — replaces clsx + tailwind-merge
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
