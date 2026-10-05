import {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarCheck,
  ClipboardList,
  Cloud,
  Database,
  FileText,
  GraduationCap,
  Handshake,
  Headphones,
  Home,
  KeyRound,
  Layers,
  Lightbulb,
  Lock,
  PiggyBank,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Utensils,
  Wallet,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry.
 *
 * Data files name their icon as a string so they stay serialisable and
 * importable from server components. This is the one place strings become
 * components. A typo resolves to the fallback rather than crashing the page —
 * it will look wrong, which is the intended signal.
 */
const registry: Record<string, LucideIcon> = {
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarCheck,
  ClipboardList,
  Cloud,
  Database,
  FileText,
  GraduationCap,
  Handshake,
  Headphones,
  Home,
  KeyRound,
  Layers,
  Lightbulb,
  Lock,
  PiggyBank,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Utensils,
  Wallet,
  Workflow,
  Zap,
};

export function getIcon(name: string): LucideIcon {
  return registry[name] ?? Sparkles;
}
