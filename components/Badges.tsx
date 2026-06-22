import { Crown, Sparkles } from "lucide-react";

export function FounderBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black uppercase tracking-wide text-ink shadow-glow transition duration-200 hover:scale-[1.02]">
      <Sparkles className="h-4 w-4" aria-hidden />
      {label}
    </span>
  );
}

export function VIPBadge({ label = "VIP" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-champagne shadow-glow transition duration-200 hover:scale-[1.02]">
      <Crown className="h-3.5 w-3.5" aria-hidden />
      {label}
    </span>
  );
}
