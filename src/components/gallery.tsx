import Image from "next/image";
import { gallery, site } from "@/lib/site";
import { Cta } from "@/components/ui/cta";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

// A primeira imagem ocupa 2 colunas em telas grandes — quebra o ritmo do grid.
const spans = [
  "sm:col-span-2 sm:row-span-2 aspect-[4/5] sm:aspect-square",
  "aspect-square",
  "aspect-square",
  "aspect-square sm:col-span-2 sm:aspect-[2/1]",
];

export function Gallery() {
  return (
    <section id="galeria" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Trabalhos"
          title={
            <>
              O resultado <span className="text-gold">fala</span> mais alto.
            </>
          }
          description="Um pedaço do que sai da cadeira todo dia. O feed completo está no Instagram."
        />

        <Stagger
          as="ul"
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {gallery.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.src}
              className={`group relative overflow-hidden rounded-2xl border border-line bg-ink-raised ${spans[i] ?? "aspect-square"}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
                aria-hidden="true"
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex justify-center">
          <Cta href={site.links.instagram} variant="outline" size="lg">
            <InstagramIcon className="h-5 w-5" />
            @balaskabarbearia
          </Cta>
        </Reveal>
      </div>
    </section>
  );
}
