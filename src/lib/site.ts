/**
 * Fonte única de verdade do conteúdo da Barbearia Balaska.
 *
 * Dados marcados com `// TODO(cliente)` são estimativas e precisam ser
 * confirmados com o Robson antes de publicar.
 */

export const site = {
  name: "Barbearia Balaska",
  owner: "Robson Luiz",
  legalName: "Barbearia Balaska — By Robson Luiz",
  tagline: "Barbearia em Diadema",
  description:
    "Barbearia em Diadema comandada por Robson Luiz. Corte, barba e acabamento com precisão de navalha. 5,0 estrelas em 114 avaliações no Google.",
  url: "https://balaskabarbearia.com.br", // TODO(cliente): domínio final
  phone: "(11) 96970-7521",
  phoneRaw: "+5511969707521",
  address: {
    street: "R. Dr. Manoel de Abreu, 260",
    district: "Vila Nogueira",
    city: "Diadema",
    state: "SP",
    zip: "09960-080",
  },
  get fullAddress() {
    const a = this.address;
    return `${a.street} - ${a.district}, ${a.city} - ${a.state}, ${a.zip}`;
  },
  rating: { value: 5.0, count: 114 },
  links: {
    booking: "https://cashbarber.com.br",
    instagram: "https://www.instagram.com/balaskabarbearia/",
    maps: "https://share.google/hMmBAv3rrYG2h7Pjp",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(
        "Barbearia Balaska, R. Dr. Manoel de Abreu, 260, Vila Nogueira, Diadema - SP, 09960-080",
      ),
    whatsapp:
      "https://wa.me/5511969707521?text=" +
      encodeURIComponent("Olá! Vim pelo site e quero agendar um horário."),
  },
} as const;

export type Service = {
  name: string;
  description: string;
  price: string;
  duration: string;
  featured?: boolean;
};

// TODO(cliente): confirmar serviços, preços e durações reais.
export const services: Service[] = [
  {
    name: "Corte Masculino",
    description:
      "Máquina, tesoura e navalha. Acabamento no pente e desenho de contorno feito à mão.",
    price: "R$ 45",
    duration: "40 min",
  },
  {
    name: "Corte + Barba",
    description:
      "O combo da casa. Corte completo, barba modelada na navalha e toalha quente.",
    price: "R$ 75",
    duration: "1h10",
    featured: true,
  },
  {
    name: "Barba na Navalha",
    description:
      "Toalha quente, óleo, modelagem na navalha e finalização com bálsamo.",
    price: "R$ 40",
    duration: "30 min",
  },
  {
    name: "Acabamento / Pézinho",
    description: "Retoque de contorno para manter o corte alinhado entre visitas.",
    price: "R$ 25",
    duration: "20 min",
  },
  {
    name: "Corte Infantil",
    description: "Atendimento com paciência para os pequenos, do primeiro corte em diante.",
    price: "R$ 40",
    duration: "40 min",
  },
  {
    name: "Sobrancelha",
    description: "Limpeza e alinhamento na navalha, respeitando o traço natural.",
    price: "R$ 20",
    duration: "15 min",
  },
];

// TODO(cliente): confirmar horários. O Google informa apenas "abre qui. às 09:30".
export const hours = [
  { day: "Segunda", value: "Fechado", closed: true },
  { day: "Terça", value: "09:30 – 20:00" },
  { day: "Quarta", value: "09:30 – 20:00" },
  { day: "Quinta", value: "09:30 – 20:00" },
  { day: "Sexta", value: "09:30 – 20:00" },
  { day: "Sábado", value: "08:00 – 18:00" },
  { day: "Domingo", value: "Fechado", closed: true },
];

// TODO(cliente): substituir pelos depoimentos reais do Google.
// A nota agregada (5,0 / 114) é real; os textos abaixo são exemplos.
export const testimonials = [
  {
    name: "Diego M.",
    meta: "Cliente há 3 anos",
    text: "Melhor barbearia de Diadema, sem discussão. O Robson entende o que você quer antes mesmo de você explicar direito.",
  },
  {
    name: "Rafael S.",
    meta: "Avaliação no Google",
    text: "Ambiente top, atendimento de primeira e o acabamento na navalha é outro nível. Saio de lá sempre satisfeito.",
  },
  {
    name: "Marcos A.",
    meta: "Cliente fiel",
    text: "Nunca mais cortei em outro lugar. Pontualidade, capricho e um papo bom. Vale cada real.",
  },
  {
    name: "Wesley P.",
    meta: "Avaliação no Google",
    text: "Levei meu filho pro primeiro corte e foi impecável. Paciência e cuidado do início ao fim.",
  },
  {
    name: "Anderson L.",
    meta: "Cliente há 2 anos",
    text: "Barba na navalha com toalha quente é um ritual. Chego cansado da semana e saio novo.",
  },
  {
    name: "Tiago R.",
    meta: "Avaliação no Google",
    text: "Agendamento fácil, hora marcada é hora marcada. Respeito com o tempo do cliente faz toda a diferença.",
  },
];

export const faqs = [
  {
    q: "Preciso agendar ou posso chegar direto?",
    a: "O agendamento online garante seu horário e evita fila. Dá para chegar sem agendar, mas o atendimento fica sujeito à disponibilidade do dia.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Dinheiro, PIX e cartões de débito e crédito.", // TODO(cliente): confirmar
  },
  {
    q: "Onde fica a barbearia?",
    a: `Na ${site.address.street}, ${site.address.district}, em ${site.address.city} - ${site.address.state}. Fica a poucos minutos a pé do centro do bairro e tem rua tranquila para estacionar.`,
  },
  {
    q: "Atendem crianças?",
    a: "Sim. Temos corte infantil e o Robson tem traquejo com os pequenos — do primeiro corte em diante.",
  },
  {
    q: "Posso remarcar ou cancelar meu horário?",
    a: "Pode. Remarque pelo próprio sistema de agendamento ou chame no WhatsApp com antecedência para liberar o horário para outro cliente.",
  },
];

export const gallery = [
  { src: "/img/corte-em-acao.png", alt: "Robson finalizando a barba de um cliente na cadeira" },
  { src: "/img/navalhas.png", alt: "Kit de navalhas e tesouras no avental de couro" },
  { src: "/img/robson-sorriso.png", alt: "Robson Luiz sorrindo segurando a máquina de corte" },
  { src: "/img/robson-sentado.png", alt: "Robson Luiz sentado na cadeira da barbearia" },
];
