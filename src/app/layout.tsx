import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/smooth-scroll";
import "lenis/dist/lenis.css";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Barbearia em Diadema | By ${site.owner}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "barbearia Diadema",
    "barbeiro Diadema",
    "corte masculino Diadema",
    "barba na navalha",
    "Vila Nogueira",
    "Balaska",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Barbearia em Diadema`,
    description: site.description,
    images: [{ url: "/img/corte-em-acao.png", width: 1035, height: 1553, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Barbearia em Diadema`,
    description: site.description,
    images: ["/img/corte-em-acao.png"],
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

/** Rich snippet do Google: nota, endereço e horário aparecem na busca. */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: site.legalName,
    description: site.description,
    image: `${site.url}/img/logo.png`,
    url: site.url,
    telephone: site.phoneRaw,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "BR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    sameAs: [site.links.instagram],
  };

  return (
    <script
      type="application/ld+json"
      // Conteúdo estático e controlado por nós — sem input de usuário.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebas.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone">
        {/* O Motion serializa o estado `initial` (opacity:0) no HTML do servidor.
            Sem JS, o conteúdo ficaria invisível — isto o traz de volta. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <StructuredData />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
