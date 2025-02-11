import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import rfdc from "rfdc"

export const clone = rfdc()

// To be used with search and everything else with flexsearch
export const encode = (str: string) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
