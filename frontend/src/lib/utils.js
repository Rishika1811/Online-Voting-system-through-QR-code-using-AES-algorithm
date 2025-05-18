import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines clsx + tailwind-merge to avoid class duplication (optional but smart)
export function cn(...inputs) {
  return twMerge(clsx(...inputs))
}
