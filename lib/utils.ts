import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalStore(key: string) {
  const data = localStorage.getItem(key); 
  try {
    if(data) {
      return JSON.parse(data);
    } 
  } catch (error) {
    return null;
  }
}

export function setLocalStore(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}