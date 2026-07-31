import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { MarqueeStrip } from "@/components/marquee-strip";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { Location } from "@/components/location";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/site-footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { HeroTest } from "@/components/hero-test";

export default function Home() {
  return (
    <>
      <a
        href="#servicos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <SiteHeader />

      <main className="flex-1">
        <Hero />
        {/* <HeroTest /> */}
        <MarqueeStrip />
        <Services />
        <About />
        <Gallery />
        <Testimonials />
        <Location />
        <Faq />
        <FinalCta />
      </main>

      <SiteFooter />
      <MobileCtaBar />
    </>
  );
}
