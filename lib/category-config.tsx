import {
  TreePine,
  Hash,
  FileText,
  Lock,
  Cpu,
  PenTool,
  LucideIcon,
} from 'lucide-react';

export interface CategoryTheme {
  id: string;
  icon: LucideIcon;
  color: string; // Tailwind class for text
  bgColor: string; // Tailwind class for background
  borderColor: string; // Tailwind class for border
  accentColor: string; // OKLCH color for gradients
  lightBg: string; // Light mode background
  darkBg: string; // Dark mode background
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  arvores: {
    id: 'arvores',
    icon: TreePine,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    accentColor: 'oklch(0.65 0.18 145)', // Green
    lightBg: 'from-emerald-50 to-white',
    darkBg: 'from-emerald-950/30 to-transparent',
  },
  hash: {
    id: 'hash',
    icon: Hash,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    accentColor: 'oklch(0.65 0.18 240)', // Blue
    lightBg: 'from-blue-50 to-white',
    darkBg: 'from-blue-950/30 to-transparent',
  },
  arquivos: {
    id: 'arquivos',
    icon: FileText,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    borderColor: 'border-purple-200 dark:border-purple-800',
    accentColor: 'oklch(0.65 0.18 300)', // Purple
    lightBg: 'from-purple-50 to-white',
    darkBg: 'from-purple-950/30 to-transparent',
  },
  compressao: {
    id: 'compressao',
    icon: Lock,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    borderColor: 'border-orange-200 dark:border-orange-800',
    accentColor: 'oklch(0.65 0.18 45)', // Orange
    lightBg: 'from-orange-50 to-white',
    darkBg: 'from-orange-950/30 to-transparent',
  },
  algoritmos: {
    id: 'algoritmos',
    icon: Cpu,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
    borderColor: 'border-cyan-200 dark:border-cyan-800',
    accentColor: 'oklch(0.65 0.18 195)', // Cyan
    lightBg: 'from-cyan-50 to-white',
    darkBg: 'from-cyan-950/30 to-transparent',
  },
  exercicios: {
    id: 'exercicios',
    icon: PenTool,
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    borderColor: 'border-rose-200 dark:border-rose-800',
    accentColor: 'oklch(0.65 0.18 15)', // Rose
    lightBg: 'from-rose-50 to-white',
    darkBg: 'from-rose-950/30 to-transparent',
  },
};

export function getCategoryTheme(categoryId: string): CategoryTheme {
  return CATEGORY_THEMES[categoryId] || CATEGORY_THEMES.arvores;
}

export function getCategoryIcon(categoryId: string): LucideIcon {
  return getCategoryTheme(categoryId).icon;
}

export function getCategoryColor(categoryId: string): string {
  return getCategoryTheme(categoryId).color;
}
