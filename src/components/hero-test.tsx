"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useReducedMotion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Vídeo controlado pelo scroll, não pelo relógio: o `currentTime` do
 * elemento vira uma propriedade do GSAP, e o ScrollTrigger mapeia o
 * progresso da rolagem (0 a 1) direto pra ele. Descer avança o vídeo, subir
 * retrocede, parar o mouse/scroll congela o quadro exato — é tudo a mesma
 * tween, sem nenhum play()/pause() manual.
 *
 * O trilho de rolagem é o wrapper de 250vh: o vídeo fica `sticky` (preso na
 * tela) enquanto esse trilho passa por baixo dele. Sem essa altura extra
 * não existe distância de scroll pra mapear — um vídeo `fixed` sozinho,
 * como estava antes, não tem "progresso" nenhum pra seguir.
 */
export function HeroTest() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const reduced = useReducedMotion();

  // Só carrega o vídeo (4,7MB) quando a seção está perto da viewport.
  useEffect(() => {
    if (reduced || !wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [reduced]);

  useLayoutEffect(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const video = videoRef.current;
    if (!video) return;

    // currentTime:8 fixo funcionava por coincidência (o vídeo tem ~8,01s) —
    // se o arquivo mudar de duração isso quebra em silêncio. video.duration
    // só existe depois que o navegador lê os metadados, daí a guarda.
    // scrub:true crava o currentTime igual ao scroll a cada evento, sem
    // folga — cada busca de quadro pode exigir decodificar a partir do
    // keyframe anterior, e uma fila delas sem espaçamento trava o vídeo.
    // Um número dá ~0,5s de atraso pro GSAP "alcançar" o scroll, o que
    // espaça essas buscas o bastante pra ficar fluido. O div usa o mesmo
    // valor só pra continuar se movendo junto com o vídeo, sem desencontrar.
    const SCRUB = 0.5;

    const bindVideoScrub = () => {
      gsap.to(video, {
        currentTime: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 200px",
          end: "bottom 600px",
          scrub: SCRUB,
          markers: true,
        },
      });
    };

    if (video.readyState >= 1) bindVideoScrub();
    else video.addEventListener("loadedmetadata", bindVideoScrub, { once: true });


    return () => {
      video.removeEventListener("loadedmetadata", bindVideoScrub);
      gsap.killTweensOf(video);
    }
  }, [])

  // useGSAP(
  //   () => {
  //     const video = videoRef.current;
  //     if (!video || reduced || !shouldLoad) return;

  //     // Safari/iOS só libera currentTime programático depois de um play()
  //     // real — disparamos e pausamos no mesmo instante, sem o usuário ver.
  //     video.play().then(() => video.pause()).catch(() => { });

  //     const bindScroll = () => {
  //       gsap.to(video, {
  //         currentTime: 8,
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: wrapperRef.current,
  //           start: "top top",
  //           end: "bottom bottom",
  //           scrub: 1,
  //           markers: true,
  //         },
  //       });
  //     };

  //     if (video.readyState >= 1) bindScroll();
  //     else video.addEventListener("loadedmetadata", bindScroll, { once: true });
  //   },
  //   { scope: wrapperRef, dependencies: [shouldLoad, reduced] },
  // );

  return (
    <div>

      <div ref={wrapperRef} className="h-500 flex items-center justify-center relative">
        <div className="sticky top-0">
          <video
            ref={videoRef}
            className="h-200 object-cover"
            // style={{ mixBlendMode: "screen" }}
            muted
            playsInline
            preload="auto"
            poster="/video/scissors-corner-poster.jpg"
          >
            {/* -scrub.mp4: reencodado com keyframe em todo frame (-g 1) —
                o original tinha só 2 keyframes em 240 frames, então buscar
                o meio do vídeo exigia decodificar ~120 frames pra trás. */}
            <source src="/video/scissors-corner-scrub.mp4" type="video/mp4" />
          </video>

        </div>
      </div>
    </div>
  );
}
