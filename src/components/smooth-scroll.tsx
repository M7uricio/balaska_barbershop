"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Faz o ScrollTrigger (usado no vídeo do About) confiar na posição de
 * scroll do Lenis em vez da nativa. Sem isso, o Lenis anima o scroll pra
 * uma posição enquanto o ScrollTrigger ainda lê a posição antiga — o vídeo
 * fica sempre um passo atrás do que a tela mostra.
 *
 * Padrão oficial recomendado tanto pelo Lenis quanto pelo GSAP:
 * https://gsap.com/resources/Lenis
 */
function GsapLenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    // O Lenis também tem seu próprio relógio interno (autoRaf) — desligamos
    // ele em ReactLenis abaixo e deixamos o gsap.ticker tocar os dois.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return null;
}

/**
 * Scroll suave de página inteira. `anchors: true` faz os links do header,
 * do menu mobile e do rodapé (`href="#servicos"` etc.) usarem a mesma
 * animação em vez do salto instantâneo do navegador — e ele já lê o
 * `scroll-padding-top` do `html` em globals.css para não esconder a seção
 * atrás do header fixo, então não precisa de config de offset aqui.
 *
 * Duration/easing ficam no padrão do Lenis: foram calibrados pelos autores
 * da lib para a sensação de inércia do scroll contínuo, que é um problema
 * diferente da nossa curva de UI (EASE_SIGNATURE), pensada para transições
 * discretas de 150–700ms.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  // Some vestibular do usuário pode reagir mal à inércia do scroll suave —
  // nesse caso o site cai para o scroll nativo do navegador, sem Lenis.
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ anchors: true, autoRaf: false }}>
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
