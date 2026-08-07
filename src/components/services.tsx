import { CalendarCheck, Check, Clock, Crown, Sparkles } from "lucide-react";
import { clubDescription, clubPlans, services, site } from "@/lib/site";
import { Cta } from "@/components/ui/cta";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

export function Services() {
  return (
    <section id="servicos" className="relative py-24 sm:py-32 bg-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Serviços"
          title={
            <>
              Cada serviço tem <span className="text-gold">hora e preço</span>{" "}
              definidos.
            </>
          }
          description="Nada de surpresa no final. Você escolhe, agenda e sabe exatamente quanto tempo vai levar e quanto vai custar."
        />

        <Stagger
          as="ul"
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <StaggerItem
              as="li"
              key={service.name}
              className={`group relative flex flex-col rounded-2xl border p-6 transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] sm:p-7 ${service.featured
                ? "border-gold/50 bg-gradient-to-b from-gold/[0.07] to-transparent"
                : "border-line bg-ink-raised hover:border-line-strong"
                }`}
            >
              {service.featured && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Mais pedido
                </span>
              )}

              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl uppercase text-bone sm:text-3xl">
                  {service.name}
                </h3>
                <p className="shrink-0 font-display text-2xl text-gold sm:text-3xl">
                  {service.price}
                </p>
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">
                {service.description}
              </p>

              <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs font-medium uppercase tracking-wider text-ash-dim">
                <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {service.duration}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Clube Balaska: assinatura mensal, dados reais do material de
            divulgação do cliente. Dentro de Serviços a pedido dele — é
            outra forma de fechar (assinar em vez de pagar por visita). */}
        <Reveal className="mt-20 rounded-3xl border border-gold/25 bg-gradient-to-b from-gold/[0.06] to-transparent p-6 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              <Crown className="h-4 w-4" aria-hidden="true" />
              Clube Balaska
            </span>
            <h3 className="mt-4 max-w-xl font-display text-3xl uppercase leading-[0.95] text-bone sm:text-4xl">
              Corte ilimitado, todo mês, por um preço fixo.
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash sm:text-base">
              {clubDescription}
            </p>
          </div>

          <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-3">
            {clubPlans.map((plan, i) => (
              <StaggerItem
                as="li"
                key={i}
                className={`relative flex flex-col items-center rounded-2xl border p-6 text-center transition-colors duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  plan.featured
                    ? "border-gold bg-ink-raised sm:-my-2 sm:py-8"
                    : "border-line bg-ink-raised hover:border-line-strong"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {plan.badge}
                  </span>
                )}

                <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {plan.name}
                </p>
                <p className="mt-1 text-sm text-ash">{plan.frequency}</p>

                <p className="mt-4 font-display text-4xl text-bone sm:text-5xl">
                  R$ {plan.price}
                  <span className="font-sans text-sm font-medium normal-case text-ash-dim">
                    /mês
                  </span>
                </p>

                <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-sm text-ash">
                  <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {plan.includes}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-8 flex justify-center">
            <Cta href={site.links.clubWhatsapp} size="lg">
              <Crown className="h-5 w-5" aria-hidden="true" />
              Quero fazer parte do clube
            </Cta>
          </div>
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-line bg-ink-raised p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-2xl uppercase text-bone sm:text-3xl">
              Sua cadeira está livre agora?
            </p>
            <p className="mt-2 text-sm text-ash">
              Veja os horários disponíveis e garanta o seu em menos de um minuto.
            </p>
          </div>
          <Cta
            href={site.links.booking}
            size="lg"
            className="w-full shrink-0 sm:w-auto"
          >
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Ver horários
          </Cta>
        </Reveal>
      </div>
    </section>
  );
}
