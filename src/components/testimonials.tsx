import { Star } from "lucide-react";
import { testimonials, site } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion-primitives";

function ReviewCard({
  name,
  meta,
  text,
}: {
  name: string;
  meta: string;
  text: string;
}) {
  return (
    <figure className="flex w-[280px] shrink-0 flex-col rounded-2xl border border-line bg-ink-raised p-6 sm:w-[340px]">
      <div className="flex gap-0.5" aria-label="5 de 5 estrelas">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-gold text-gold"
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ash">
        {text}
      </blockquote>
      <figcaption className="mt-5 border-t border-line pt-4">
        <p className="text-sm font-semibold text-bone">{name}</p>
        <p className="text-xs text-ash-dim">{meta}</p>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section
      id="avaliacoes"
      className="border-y border-line bg-ink-sunken py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Avaliações"
          title={
            <>
              <span className="text-gold">
                {site.rating.value.toFixed(1).replace(".", ",")}
              </span>{" "}
              de 5 em {site.rating.count} avaliações
            </>
          }
          description="Nota máxima no Google, construída um cliente de cada vez."
        />
      </div>

      {/* Duas faixas em direções opostas — movimento contínuo sem exigir interação */}
      <Reveal className="mt-14 space-y-4">
        <div className="marquee-mask flex overflow-hidden">
          <div
            className="marquee-track flex shrink-0 gap-4 pr-4"
            style={{ "--marquee-duration": "60s" } as React.CSSProperties}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <ReviewCard key={`a-${i}`} {...t} />
            ))}
          </div>
        </div>

        <div className="marquee-mask flex overflow-hidden">
          <div
            className="marquee-track-reverse flex shrink-0 gap-4 pr-4"
            style={{ "--marquee-duration": "72s" } as React.CSSProperties}
          >
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map(
              (t, i) => (
                <ReviewCard key={`b-${i}`} {...t} />
              ),
            )}
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-7xl px-5 text-center sm:px-8">
        <a
          href={site.links.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-ash underline decoration-line-strong underline-offset-4 transition-colors duration-[180ms] hover:text-gold hover:decoration-gold"
        >
          Ler todas as avaliações no Google
        </a>
      </Reveal>
    </section>
  );
}
