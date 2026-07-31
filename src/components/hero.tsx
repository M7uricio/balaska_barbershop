"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CalendarCheck, MapPin, Star } from "lucide-react";
import { site } from "@/lib/site";
import { Cta } from "@/components/ui/cta";
import { EASE_SIGNATURE, DURATION } from "@/components/motion-primitives";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const headline = ["Corte", "que", "impõe", "respeito."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();


  useLayoutEffect(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const video = videoRef.current;
    if (!video) return;
    const SCRUB = 0.5;

    // iOS Safari ignora currentTime programático em silêncio até o vídeo
    // ser "desbloqueado" por um play() real pelo menos uma vez — sem isso,
    // o scrub simplesmente não faz nada no iPhone, mesmo funcionando no
    // desktop (onde essa restrição não existe).
    video.play().then(() => video.pause()).catch(() => { });

    const bindVideoScrub = () => {
      gsap.to(video, {
        currentTime: 4,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom 600px",
          scrub: SCRUB,
        },
      });

      // Só callbacks, sem tween de propriedade nenhuma — ScrollTrigger.create
      // é a API certa aqui (gsap.to(ref, {...}) não funciona: ref é o objeto
      // do React, não o elemento; virava um tween que não anima nada).
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "bottom top",
        onLeave: () => ref.current?.classList.add("invisible"),
        onEnterBack: () => ref.current?.classList.remove("invisible"),
      });

      // O site é exportado como estático e hospedado no Render — sem isso,
      // se o usuário rolar antes do vídeo/fontes terminarem de carregar
      // (rede mais lenta, comum em 4G), o ScrollTrigger mede a página com
      // o layout ainda incompleto e o scrub trava em 0 até a próxima
      // recarga. Um refresh() depois que tudo assentar corrige a medição.
      requestAnimationFrame(() => ScrollTrigger.refresh());
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    };

    if (video.readyState >= 1) bindVideoScrub();
    else video.addEventListener("loadedmetadata", bindVideoScrub, { once: true });


    return () => {
      video.removeEventListener("loadedmetadata", bindVideoScrub);
      gsap.killTweensOf(video);
    }
  }, [])

  return (
    <section
      id="topo"
      ref={ref}
      className="relative isolate flex min-h-400 items-end overflow-hidden bg-[#010101] pb-16 pt-28 sm:items-center sm:pb-24"
    >
      {/* top-28 (112px) até lg: reserva os 80px do header fixo + respiro —
          sem isso o conteúdo centraliza pela altura TOTAL da viewport e,
          com menos espaço sobrando numa tela pequena, fica colado embaixo
          do header. No lg: volta pro viewport inteiro (já validado ali). */}
      {/* items-start até lg: o conteúdo empilhado (gancho+vídeo+ação) pode
          ficar mais alto que a caixa disponível em telas baixas — como é
          fixed, centralizar nesse caso estoura os dois lados por igual,
          empurrando o selo/título (topo, o mais importante) pra cima, perto
          do header. Alinhado no topo, o início fica sempre previsível logo
          abaixo do header, e se algo estourar é o endereço (fim do bloco de
          ação), não o começo. No lg: volta a centralizar (já validado). */}
      <motion.div
        className="fixed inset-x-0 top-28 bottom-0 -z-1000 flex min-w-full items-start lg:items-center lg:top-0"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 w-full mx-auto max-w-7xl px-5 sm:px-8">

          {/* Gancho: selo + título + descrição. Sempre primeiro — em
              telas médias/pequenas o vídeo entra logo depois deste bloco;
              no desktop (lg:) volta pra coluna 1, linha 1. */}
          <div className="max-w-2xl lg:col-start-1 lg:row-start-1">
            <motion.a
              href={site.links.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2.5 backdrop-blur-sm transition-colors duration-180 hover:border-gold"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard, ease: EASE_SIGNATURE }}
            >
              <span className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </span>
              <span className="text-xs font-medium text-bone sm:text-sm">
                {site.rating.value.toFixed(1).replace(".", ",")} · {site.rating.count} avaliações no
                Google
              </span>
            </motion.a>

            <h1 className="mt-6 font-display text-[3.25rem] uppercase leading-[0.9] text-bone sm:text-7xl lg:text-8xl">
              {headline.map((word, i) => (
                <span key={word}>
                  <motion.span
                    className="inline-block"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: "0.35em" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: DURATION.slow,
                      ease: EASE_SIGNATURE,
                      delay: reduced ? 0 : 0.12 + i * 0.08,
                    }}
                  >
                    {word === "impõe" ? (
                      <span className="text-gold">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                  {i < headline.length - 1 && " "}
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-6 max-w-lg text-base leading-relaxed text-ash sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.standard,
                ease: EASE_SIGNATURE,
                delay: reduced ? 0 : 0.45,
              }}
            >
              Máquina, tesoura e navalha na mão de quem faz isso todos os dias em{" "}
              {site.address.city}. Você marca a hora, senta na cadeira e sai pronto
              para a semana.
            </motion.p>
          </div>

          {/* Vídeo: em telas médias/pequenas fica entre o gancho e o bloco
              de ação (ordem natural do grid de 1 coluna). No desktop (lg:)
              volta pra coluna 2, ocupando as duas linhas — ao lado dos dois
              blocos de texto, como já estava antes. */}
          <div className="flex items-center justify-center lg:col-start-2 lg:row-start-1 lg:row-span-2">
            {/* Passos de tamanho por breakpoint — o quadrado rotacionado
                45° tem bounding box ~1,41x o lado, então precisa encolher
                bastante no mobile pra não flertar com a borda da tela. */}
            <div className="video-vignette relative aspect-square h-48 overflow-hidden rotate-45 sm:h-64 md:h-80 lg:h-125">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full scale-100 object-cover"
                style={{ mixBlendMode: "screen" }}
                muted
                playsInline
                preload="auto"
                poster="/video/scissors-corner-poster.jpg"
              >
                <source src="/video/scissors-corner-scrub.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Ação: CTAs + endereço. Sempre por último. mt-9 saiu daqui —
              agora é o gap-12 do grid que separa este bloco do gancho,
              tanto empilhado (mobile/tablet) quanto na linha 2 (lg:). */}
          <div className="max-w-2xl lg:col-start-1 lg:row-start-2">
            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION.standard,
                ease: EASE_SIGNATURE,
                delay: reduced ? 0 : 0.55,
              }}
            >
              <Cta href={site.links.booking} size="lg" className="w-full sm:w-auto">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Agendar meu horário
              </Cta>
              <Cta
                href="#servicos"
                external={false}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Ver serviços e preços
              </Cta>
            </motion.div>

            <motion.p
              className="mt-7 flex items-center gap-2 text-sm text-ash-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: DURATION.standard,
                ease: EASE_SIGNATURE,
                delay: reduced ? 0 : 0.65,
              }}
            >
              <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {site.address.street} · {site.address.district}, {site.address.city}
            </motion.p>
          </div>
        </div>

      </motion.div>

    </section>
  );
}
