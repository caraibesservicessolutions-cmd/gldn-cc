import type { Locale } from "@/lib/i18n";

const socialProofCopy = {
  fr: {
    title: "Preuve sociale",
    description:
      "Golden Circle Caraïbes s’appuie déjà sur une première base communautaire et événementielle : plus de 100 inscriptions GC List, 29 événements partenaires relayés ou promus, et environ 9 partenaires / organisateurs identifiés dans l’écosystème.",
    note:
      "Ces indicateurs illustrent une dynamique de lancement. Les activations partenaires sont sélectionnées et confirmées progressivement afin de garantir une communication fiable et qualitative.",
    stats: [
      ["+100", "Inscrits GC List"],
      ["29", "Événements relayés ou promus"],
      ["≈9", "Partenaires & organisateurs"],
      ["2022", "Présence digitale initiée en 2022"]
    ]
  },
  en: {
    title: "Social proof",
    description:
      "Golden Circle Caraïbes is already supported by an initial community and event base: over 100 GC List sign-ups, 29 partner events promoted or relayed, and around 9 partners / organizers identified in the ecosystem.",
    note:
      "These indicators illustrate launch momentum. Partner activations are selected and confirmed progressively to keep communication reliable and qualitative.",
    stats: [
      ["+100", "GC List sign-ups"],
      ["29", "Events promoted or relayed"],
      ["≈9", "Partners & organizers"],
      ["2022", "Digital presence started in 2022"]
    ]
  },
  es: {
    title: "Prueba social",
    description:
      "Golden Circle Caraïbes ya cuenta con una primera base comunitaria y de eventos: más de 100 inscritos GC List, 29 eventos de socios promovidos o difundidos, y alrededor de 9 socios / organizadores identificados en el ecosistema.",
    note:
      "Estos indicadores muestran una dinámica de lanzamiento. Las activaciones con socios se seleccionan y confirman progresivamente para garantizar una comunicación fiable y cualitativa.",
    stats: [
      ["+100", "Inscritos GC List"],
      ["29", "Eventos promovidos o difundidos"],
      ["≈9", "Socios y organizadores"],
      ["2022", "Presencia digital iniciada en 2022"]
    ]
  },
  pt: {
    title: "Prova social",
    description:
      "Golden Circle Caraïbes já se apoia numa primeira base comunitária e de eventos: mais de 100 inscrições GC List, 29 eventos de parceiros promovidos ou divulgados, e cerca de 9 parceiros / organizadores identificados no ecossistema.",
    note:
      "Estes indicadores mostram uma dinâmica de lançamento. As ativações com parceiros são selecionadas e confirmadas progressivamente para manter uma comunicação fiável e qualitativa.",
    stats: [
      ["+100", "Inscritos GC List"],
      ["29", "Eventos promovidos ou divulgados"],
      ["≈9", "Parceiros e organizadores"],
      ["2022", "Presença digital iniciada em 2022"]
    ]
  },
  ht: {
    title: "Prèv sosyal",
    description:
      "Golden Circle Caraïbes deja gen yon premye baz kominotè ak evènmantal: plis pase 100 enskripsyon GC List, 29 events patnè relaye oswa pwomouvwa, ak anviwon 9 patnè / òganizatè idantifye nan ekosistèm nan.",
    note:
      "Endikatè sa yo montre dinamik lansman an. Aktivasyon patnè yo chwazi epi konfime piti piti pou kominikasyon an rete fyab ak kalite.",
    stats: [
      ["+100", "Enskri GC List"],
      ["29", "Events relaye oswa pwomouvwa"],
      ["≈9", "Patnè ak òganizatè"],
      ["2022", "Prezans dijital kòmanse an 2022"]
    ]
  }
} satisfies Record<
  Locale,
  {
    title: string;
    description: string;
    note: string;
    stats: [string, string][];
  }
>;

export function SocialProof({
  locale,
  className = "",
  compact = false
}: {
  locale: Locale;
  className?: string;
  compact?: boolean;
}) {
  const copy = socialProofCopy[locale];

  return (
    <section
      className={[
        "premium-border rounded-lg bg-gradient-to-br from-coal via-ruby/18 to-black p-5 shadow-card",
        compact ? "sm:p-6" : "sm:p-7 lg:p-8",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="max-w-4xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">
          {copy.title}
        </p>
        <p className="mt-4 text-sm leading-7 text-mist sm:text-base sm:leading-8">
          {copy.description}
        </p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {copy.stats.map(([value, label]) => (
          <article
            key={label}
            className="rounded-lg border border-gold/15 bg-black/28 p-4"
          >
            <p className="font-display text-4xl font-bold leading-none text-gold sm:text-5xl">
              {value}
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-white">
              {label}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs leading-6 text-mist/88 sm:text-sm sm:leading-7">
        {copy.note}
      </p>
    </section>
  );
}
