# Barbearia Balaska — Landing Page

Landing page de alta conversão para a **Barbearia Balaska — By Robson Luiz**
(Diadema/SP), construída em Next.js 16 (App Router), Tailwind CSS v4,
TypeScript e [Motion](https://motion.dev).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

---

## ⚠️ Antes de publicar

Estes dados são **estimativas** e precisam ser confirmados com o Robson. Estão
todos concentrados em [`src/lib/site.ts`](src/lib/site.ts), marcados com
`// TODO(cliente)`:

| O quê | Onde | Situação |
|---|---|---|
| Preços e durações dos serviços | `services` | **Inventado** — trocar pelos valores reais |
| Horários de funcionamento | `hours` | Só sabemos "abre qui. às 09:30" (Google); o resto é chute |
| Textos dos depoimentos | `testimonials` | **Exemplos** — substituir pelos reviews reais do Google |
| Formas de pagamento | `faqs` | Confirmar |
| Domínio final | `site.url` | Placeholder `balaskabarbearia.com.br` |

A nota **5,0 com 114 avaliações**, o endereço, o telefone, o Instagram e o link
de agendamento são dados reais fornecidos pelo cliente.

---

## Decisões de design

- **Paleta**: preto premium (`#0A0A0A`) + dourado (`#D4A24C`), derivada da logo
  P&B e das fotos de estúdio. Todos os pares de texto/fundo passam WCAG AA
  (mínimo 4,5:1).
- **Tipografia**: Bebas Neue (display, caixa alta, condensada — cara de placa de
  barbearia) + Inter (corpo).
- **CTA principal**: agendamento em `cashbarber.com.br`, repetido no header, no
  hero, após os serviços, na seção de localização, no CTA final e numa barra
  fixa que aparece no mobile depois do hero. WhatsApp fica como CTA secundário.
- **Movimento**: arquétipo "Premium" — curva assinatura `cubic-bezier(0.4,0,0.2,1)`,
  três durações (180/400/700ms), sem overshoot. Parallax no hero, reveals com
  stagger de 70ms, marquees em CSS. `prefers-reduced-motion` desliga tudo.

## Estrutura

```
src/
├── app/
│   ├── layout.tsx      # fontes, metadata, JSON-LD (schema.org/HairSalon)
│   ├── page.tsx        # composição das seções
│   └── globals.css     # design tokens + keyframes + reduced motion
├── components/
│   ├── motion-primitives.tsx   # Reveal, Stagger — linguagem de movimento
│   ├── site-header.tsx         # header fixo + menu mobile
│   ├── hero.tsx                # hero com parallax e prova social
│   ├── marquee-strip.tsx
│   ├── services.tsx
│   ├── about.tsx               # sobre o Robson + números
│   ├── gallery.tsx
│   ├── testimonials.tsx        # marquee duplo de avaliações
│   ├── location.tsx            # mapa, endereço, horários
│   ├── faq.tsx                 # acordeão
│   ├── final-cta.tsx
│   ├── site-footer.tsx
│   ├── mobile-cta-bar.tsx      # barra fixa de conversão no mobile
│   └── ui/                     # Cta, InstagramIcon
└── lib/site.ts                 # conteúdo e dados do negócio
```

## Skills instaladas

Em `.claude/skills/` — usadas como referência durante a construção:

| Skill | Origem |
|---|---|
| `ui-ux-pro-max`, `design`, `design-system`, `ui-styling`, `brand`, `banner-design`, `slides` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| `motion-design` | [lottiefiles/motion-design-skill](https://github.com/lottiefiles/motion-design-skill) |
| `genjutsu` (cast, paint, `_jutsu/*`) | [AThevon/genjutsu](https://github.com/AThevon/genjutsu) |
| `gsap-*` (core, react, scrolltrigger, timeline, plugins, performance, utils, frameworks) | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) |
| `threejs-*` (fundamentals, shaders, materials, lighting, …) | [cloudai-x/threejs-skills](https://github.com/cloudai-x/threejs-skills) |
| `motion-lib` (fix, improve) | [motiondivision/motion](https://github.com/motiondivision/motion) |

> A skill `ui-ux-pro-max` traz um `scripts/search.py` que consulta a base de
> dados de estilos/paletas/tipografia. Ele precisa de Python 3, que **não está
> instalado nesta máquina** — os dados foram lidos direto dos CSVs em
> `.claude/skills/ui-ux-pro-max/data/`.

## Acessibilidade

Verificado no navegador: contraste AA em todos os pares de texto, alvos de toque
≥ 44×44px, hierarquia de headings sem saltos, `alt` em todas as imagens, `title`
no iframe do mapa, foco visível, skip link, `lang="pt-BR"` e sem scroll
horizontal em 375 / 768 / 1440px.
