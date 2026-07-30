"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Linguagem de movimento da Balaska — arquétipo "Premium" da skill motion-design:
 * curva assinatura única, sem overshoot, entrada mais longa que a saída.
 */
export const EASE_SIGNATURE = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  quick: 0.18,
  standard: 0.4,
  slow: 0.7,
} as const;

/** Distância curta: nunca mais de 1/3 da tela (regra do 1/3). */
const TRAVEL = 24;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Direção de entrada do elemento. */
  from?: "bottom" | "left" | "right" | "none";
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Revela o conteúdo quando entra na viewport, e desfaz a animação quando
 * sai — por isso `once: false`. Repete tanto descendo quanto subindo, a
 * pedido do cliente, em vez de disparar só na primeira renderização.
 */
export function Reveal({
  children,
  className,
  from = "bottom",
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  const offset =
    from === "bottom"
      ? { y: TRAVEL }
      : from === "left"
        ? { x: -TRAVEL }
        : from === "right"
          ? { x: TRAVEL }
          : {};

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: reduced ? DURATION.quick : DURATION.standard,
        ease: EASE_SIGNATURE,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </Tag>
  );
}

/** Container que escalona a entrada dos filhos. Orçamento total < 500ms.
 *  Repete também ao sair/reentrar na viewport — mesma regra do Reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: TRAVEL },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.standard, ease: EASE_SIGNATURE },
  },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
};

export function Stagger({ children, className, as = "div" }: StaggerProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={staggerItem}>
      {children}
    </Tag>
  );
}
