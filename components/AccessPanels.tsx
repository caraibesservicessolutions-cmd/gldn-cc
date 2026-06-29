import type { ReactNode } from "react";
import { Check, LockKeyhole, ShieldCheck } from "lucide-react";

type PanelProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: ReactNode;
  muted?: boolean;
};

export function AccessPanel({
  eyebrow,
  title,
  text,
  children,
  muted
}: PanelProps) {
  return (
    <article
      className={[
        "rounded-lg border p-5 shadow-card",
        muted
          ? "border-white/10 bg-black/18"
          : "border-gold/20 bg-coal/82"
      ].join(" ")}
    >
      {eyebrow ? (
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-pearl">
        {title}
      </h3>
      {text ? <p className="mt-3 text-sm leading-6 text-mist">{text}</p> : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </article>
  );
}

export function AccessList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-mist">
          <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NoticeBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-gold/20 bg-wine/32 px-4 py-3 text-sm font-semibold leading-6 text-champagne">
      {children}
    </div>
  );
}

export function PrivateAccessNotice({
  title = "Acces reserve Golden Circle",
  text = "Authentification en deploiement progressif. Cette interface prepare la separation membre, partenaire et administration."
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="rounded-lg border border-gold/20 bg-black/24 p-6 shadow-card">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 text-gold">
          <LockKeyhole className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
            Espace prive
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-pearl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-mist">{text}</p>
        </div>
      </div>
    </section>
  );
}

export function InternalNav({ items }: { items: string[] }) {
  return (
    <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <span
          key={item}
          className="flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-black/18 px-4 py-2 text-sm font-semibold text-mist"
        >
          <ShieldCheck className="h-4 w-4 shrink-0 text-gold" aria-hidden />
          {item}
        </span>
      ))}
    </nav>
  );
}
