type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  text?: string;
};

export function SectionHeader({ eyebrow, title, text }: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-7 text-mist">{text}</p> : null}
    </div>
  );
}
