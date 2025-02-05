import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import rfdc from "rfdc"

export const clone = rfdc()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
