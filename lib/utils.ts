import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Handles: "Café Münchën" → "cafe-munchen"
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')                   // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, '')    // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}



// Check string is valid UUID
export function isValidUUID(uuid: string): boolean {
  const zodUUID = z.uuid();
  return zodUUID.safeParse(uuid).success;
}
