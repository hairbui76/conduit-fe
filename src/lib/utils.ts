import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sliceString(str: string, maxLength: number): string {
  return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
}

export function suffixS(str: string, quantity: number): string {
  return quantity < 2 ? str : str + 's';
}
