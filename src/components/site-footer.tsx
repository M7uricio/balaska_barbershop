import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/instagram-icon";

const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "O Barbeiro", href: "#barbeiro" },
  { label: "Trabalhos", href: "#galeria" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Onde Fica", href: "#local" },
  { label: "Dúvidas", href: "#duvidas" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-sunken pb-28 pt-16 sm:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo.png"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <span className="font-display text-2xl leading-none">
                Barbearia Balaska
                <span className="block font-sans text-[0.6rem] font-medium uppercase tracking-[0.28em] text-ash-dim">
                  By {site.owner}
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ash">
              Corte, barba e acabamento com hora marcada em {site.address.city}.
              Nota {site.rating.value.toFixed(1).replace(".", ",")} em{" "}
              {site.rating.count} avaliações no Google.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="font-display text-lg uppercase tracking-wide text-bone">
              Navegar
            </h2>
            <ul className="mt-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex min-h-11 items-center text-sm text-ash transition-colors duration-[180ms] hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg uppercase tracking-wide text-bone">
              Contato
            </h2>
            <ul className="mt-2 text-sm">
              <li>
                <a
                  href={site.links.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 gap-2.5 py-2 text-ash transition-colors duration-[180ms] hover:text-gold"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.district}, {site.address.city} -{" "}
                    {site.address.state}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="flex min-h-11 items-center gap-2.5 text-ash transition-colors duration-[180ms] hover:text-gold"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 text-ash transition-colors duration-[180ms] hover:text-gold"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0" />
                  @balaskabarbearia
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ash-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Todos os direitos
            reservados.
          </p>
          <a
            href={site.links.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center transition-colors duration-[180ms] hover:text-gold"
          >
            Agendamento online
          </a>
        </div>
      </div>
    </footer>
  );
}
