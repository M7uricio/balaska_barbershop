import { CalendarCheck, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { hours, site } from "@/lib/site";
import { Cta } from "@/components/ui/cta";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion-primitives";

const mapEmbed =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(
    "Barbearia Balaska, R. Dr. Manoel de Abreu, 260, Vila Nogueira, Diadema - SP, 09960-080",
  ) +
  "&output=embed";

export function Location() {
  return (
    <section id="local" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Onde fica"
          title={
            <>
              Em <span className="text-gold">Diadema</span>, na Vila Nogueira.
            </>
          }
          description="Rua tranquila, fácil de estacionar e a poucos minutos do centro do bairro."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal from="left" className="lg:col-span-3">
            <div className="h-full overflow-hidden rounded-2xl border border-line bg-ink-raised">
              <iframe
                src={mapEmbed}
                title={`Mapa com a localização da ${site.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 grayscale-[0.85] contrast-[1.1] sm:h-[460px] lg:h-full lg:min-h-[520px]"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal from="right" className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-line bg-ink-raised p-6 sm:p-8">
              <div>
                <h3 className="flex items-center gap-2 font-display text-2xl uppercase text-bone">
                  <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
                  Endereço
                </h3>
                <address className="mt-3 not-italic leading-relaxed text-ash">
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city} - {site.address.state}
                  <br />
                  CEP {site.address.zip}
                </address>
              </div>

              <div className="border-t border-line pt-6">
                <h3 className="font-display text-2xl uppercase text-bone">
                  Horários
                </h3>
                <dl className="mt-3 space-y-2">
                  {hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <dt className="text-ash">{h.day}</dt>
                      <dd
                        className={`font-medium tabular-nums ${
                          h.closed ? "text-ash-dim" : "text-bone"
                        }`}
                      >
                        {h.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-line pt-6">
                <Cta href={site.links.booking} size="lg" className="w-full">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Agendar horário
                </Cta>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Cta
                    href={site.links.directions}
                    variant="outline"
                    className="w-full"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    Como chegar
                  </Cta>
                  <Cta
                    href={site.links.whatsapp}
                    variant="outline"
                    className="w-full"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </Cta>
                </div>

                <a
                  href={`tel:${site.phoneRaw}`}
                  className="mt-1 flex min-h-11 items-center justify-center gap-2 text-sm text-ash transition-colors duration-[180ms] hover:text-gold"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
