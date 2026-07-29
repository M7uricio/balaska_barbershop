import Image from "next/image";
import { Quote } from "lucide-react";
import { site } from "@/lib/site";
import { Cta } from "@/components/ui/cta";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

const stats = [
  { value: "5,0", label: "Nota no Google" },
  { value: "114", label: "Avaliações" },
  { value: "100%", label: "Hora marcada" },
];

export function About() {
  return (
    <section
      id="barbeiro"
      className="relative border-y border-line bg-ink-sunken py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal from="left" className="order-2 lg:order-1">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
              O Barbeiro
            </p>

            <h2 className="mt-4 font-display text-4xl uppercase text-bone sm:text-5xl lg:text-6xl">
              {site.owner}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-ash sm:text-lg">
              <p>
                A Balaska nasceu de uma ideia simples: tratar corte de cabelo
                como ofício, não como fila. Aqui cada cliente tem horário, tempo
                e atenção — do primeiro corte da criança ao acabamento na
                navalha de quem já vem há anos.
              </p>
              <p>
                É esse cuidado que sustenta{" "}
                <span className="text-bone">
                  {site.rating.count} avaliações e nota{" "}
                  {site.rating.value.toFixed(1).replace(".", ",")}
                </span>{" "}
                no Google. Não é sorte: é a mesma mão, na mesma cadeira, todo
                dia.
              </p>
            </div>

            <figure className="mt-8 border-l-2 border-gold pl-5">
              <Quote className="h-5 w-5 text-gold" aria-hidden="true" />
              <blockquote className="mt-2 font-display text-2xl uppercase leading-tight text-bone sm:text-3xl">
                Ninguém sai daqui com dúvida se ficou bom.
              </blockquote>
              <figcaption className="mt-2 text-sm text-ash-dim">
                {site.owner}, {site.name}
              </figcaption>
            </figure>

            <Stagger as="ul" className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <StaggerItem
                  as="li"
                  key={stat.label}
                  className="rounded-xl border border-line bg-ink-raised p-4 text-center"
                >
                  <p className="font-display text-3xl text-gold sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-wider text-ash-dim">
                    {stat.label}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>

            <Cta
              href={site.links.instagram}
              variant="outline"
              size="lg"
              className="mt-8 w-full sm:w-auto"
            >
              <InstagramIcon className="h-5 w-5" />
              Ver o trabalho no Instagram
            </Cta>
          </Reveal>

          <Reveal from="right" className="order-1 lg:order-2">
            <div className="relative">
              {/* Moldura deslocada — dá profundidade sem sombra pesada */}
              <div
                className="absolute -inset-3 -z-10 rounded-3xl border border-gold/25 sm:-inset-5"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-raised">
                <Image
                  src="/img/robson-perfil.png"
                  alt={`${site.owner}, barbeiro e dono da ${site.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-sunken/90 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
