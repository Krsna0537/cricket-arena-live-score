
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function calculateRunRate(runs: number, overs: number): string {
  if (overs === 0) return '0.00';
  
  const runRate = runs / overs;
  return runRate.toFixed(2);
}

export function calculateRequiredRunRate(
  targetRuns: number,
  currentRuns: number,
  totalOvers: number,
  oversPlayed: number
): string {
  const runsRequired = targetRuns - currentRuns;
  const oversRemaining = totalOvers - oversPlayed;
  
  if (oversRemaining <= 0 || runsRequired <= 0) return '0.00';
  
  const requiredRate = runsRequired / oversRemaining;
  return requiredRate.toFixed(2);
}
