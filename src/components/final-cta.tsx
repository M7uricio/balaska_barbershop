import Image from "next/image";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { Cta } from "@/components/ui/cta";
import { Reveal } from "@/components/motion-primitives";

export function FinalCta() {
  return (
    <section className="grain relative isolate overflow-hidden py-28 sm:py-36">
      <Image
        src="/img/navalhas.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-ink/88"
        aria-hidden="true"
      />

      <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
          Última chamada
          <span className="h-px w-8 bg-gold-deep" aria-hidden="true" />
        </p>

        <h2 className="mt-5 font-display text-5xl uppercase leading-[0.92] text-bone sm:text-6xl lg:text-7xl">
          Escolha o horário.
          <br />
          <span className="text-gold">O resto é com a gente.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ash sm:text-lg">
          Agendamento online, hora marcada de verdade e o acabamento que rendeu{" "}
          {site.rating.count} avaliações nota máxima.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Cta href={site.links.booking} size="lg" className="w-full sm:w-auto">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Agendar meu horário
          </Cta>
          <Cta
            href={site.links.whatsapp}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Falar no WhatsApp
          </Cta>
        </div>
      </Reveal>
    </section>
  );
}
