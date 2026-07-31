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
      gsap.to(ref, {
        visibility: "invisible",
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          // markers: true,

          onLeave: () => ref.current?.classList.add("invisible"),
          onEnterBack: () => ref.current?.classList.remove("invisible"),
        }
      })
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

      <motion.div
        className="fixed top-25 -z-1000 min-w-full"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 w-full mx-auto max-w-7xl px-5 sm:px-8">


          <div className="max-w-2xl">
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

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
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

          <div className="hidden items-center justify-center lg:flex">
            <div className="video-vignette relative aspect-square h-125 overflow-hidden rotate-45">
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
        </div>
      </motion.div>

    </section>
  );
}
