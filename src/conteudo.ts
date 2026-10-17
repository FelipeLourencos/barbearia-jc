/**
 * CONTEÚDO DO SITE
 * ================
 * Tudo o que é específico da barbearia fica neste arquivo: nome, contatos, textos,
 * serviços, preços, fotos e cores. Os componentes só leem daqui, então para montar o
 * site de um cliente novo basta editar este arquivo (veja o COMO-USAR.md).
 *
 * Dicas rápidas
 * - Campos marcados como "opcional" podem ficar vazios ("", [] ou null): a seção ou o
 *   elemento correspondente some do site sem quebrar o layout.
 * - Fotos podem ser um endereço da internet (https://...) ou um arquivo dentro de
 *   public/, escrito a partir da barra. Ex.: public/images/salao.webp vira "/images/salao.webp".
 * - "alt" é a descrição da foto para leitores de tela e para o Google.
 * - Grades de fotos e de avaliações ficam melhores com número par de itens.
 * - Se faltar algum campo obrigatório, o editor sublinha em vermelho e o
 *   `npm run build` acusa o erro.
 */

// ---------------------------------------------------------------------------
// Tipos (o "formulário" que o conteúdo precisa preencher). Não é preciso mexer aqui.
// ---------------------------------------------------------------------------

/** Uma foto com a sua descrição. */
export type Foto = {
  /** Endereço da imagem: "https://..." ou "/images/arquivo.webp" (dentro de public/). */
  src: string
  /** Descrição curta do que aparece na foto. */
  alt: string
}

/** Foto do topo, com um recorte vertical opcional para celular. */
export type FotoTopo = Foto & {
  /** Opcional: versão vertical (900x1350) usada em telas de até 767px. */
  srcCelular?: string
}

export type Link = {
  rotulo: string
  /** Endereço completo (https://...) ou id de seção (#servicos). */
  link: string
}

export type Horario = {
  /** Como aparece na seção de agendamento. Ex.: "Terça a quinta". */
  dias: string
  /** Versão curta, usada no rodapé. Ex.: "Ter a qui". */
  diasAbreviados: string
  /** Ex.: "10h às 19h". */
  horas: string
}

/** Ícones disponíveis para selos e pontos de destaque. */
export type Icone = "estrela" | "agenda" | "pagamento" | "conversa" | "limpeza" | "tesoura"

export type Selo = {
  texto: string
  icone: Icone
}

export type Servico = {
  nome: string
  /** Preço em reais (número) ou um texto, como "Consulte". */
  preco: number | string
  /** Ex.: "45 min". Deixe "" para não mostrar. */
  duracao: string
}

export type CategoriaServicos = {
  /** Ex.: "Cortes" */
  nome: string
  itens: Servico[]
}

export type BlocoGaleria = {
  /** Ex.: "O espaço" */
  titulo: string
  /** Opcional: uma frase curta abaixo do título. "" esconde. */
  texto: string
  /** Use número par de fotos. Todas são recortadas na mesma proporção. */
  fotos: Foto[]
}

export type Avaliacao = {
  /** Nome de quem avaliou, ou um rótulo como "Cliente no Google". */
  autor: string
  /** Onde a avaliação foi feita. Ex.: "Booksy". */
  fonte: string
  texto: string
}

export type PerguntaFrequente = {
  pergunta: string
  resposta: string
  /** Opcional: link mostrado depois da resposta. Ex.: { rotulo: "Abrir no Maps", link: "https://..." } */
  link?: Link
}

export type Conteudo = {
  /** Dados do negócio */
  negocio: {
    nome: string
    /** Opcional: logo em imagem, mostrado no cabeçalho. Use null para só texto. */
    logoImagem: Foto | null
    cidade: string
    bairro: string
    /** Endereço em duas linhas, como aparece no rodapé. */
    endereco: { linha1: string; linha2: string }
    /** Link do Google Maps (ou outro mapa). Deixe "" para o endereço não ser clicável. */
    linkMapa: string
    /** Opcional: endereço do mapa incorporado (Google Maps com output=embed). "" esconde o mapa. */
    mapaIncorporado: string
    /** Opcional: telefone como aparece no site. Ex.: "(11) 90000-0000". "" esconde. */
    telefone: string
    /** WhatsApp só com números: 55 + DDD + número. "" esconde os botões de WhatsApp. */
    whatsapp: string
    /** Mensagem que já vem escrita quando a pessoa abre o WhatsApp. */
    mensagemWhatsapp: string
    /** Link de agendamento online (Booksy ou outro). "" esconde os botões de agendar. */
    agendamento: string
    instagram: {
      /** Nome de usuário, sem @. */
      usuario: string
      /** Endereço do perfil. "" esconde. */
      link: string
    }
    /** Símbolo da moeda que aparece antes dos preços. */
    moeda: string
  }

  /** Dias e horários de funcionamento, na ordem em que devem aparecer. */
  horarios: Horario[]
  /** Opcional: linha extra com os dias fechados. "" esconde. */
  diasFechados: string

  /** Descrição para o Google e cor da barra do navegador (o título da aba fica no index.html). */
  seo: {
    titulo: string
    descricao: string
    /** Cor da barra do navegador no celular (hex). */
    corTema: string
  }

  /** Botões usados em várias seções */
  botoes: {
    /** Agendamento online (topo, serviços e final). */
    principal: string
    /** WhatsApp (topo e final). */
    secundario: string
    /** Texto lido por leitores de tela no botão flutuante do WhatsApp. "" esconde o botão. */
    flutuante: string
  }

  /** Cabeçalho (menu do topo) */
  cabecalho: {
    /** Links do menu ("#id" da seção). Links de seções vazias somem sozinhos. */
    links: Link[]
    botaoAgendar: string
  }

  /** Topo (primeira tela) */
  topo: {
    /** Primeira linha do título, grande. */
    titulo: string
    /** Segunda linha do título, menor. "" esconde. */
    subtitulo: string
    /** Opcional: uma linha de apoio abaixo do título. "" esconde. */
    texto: string
    /** Fotos de fundo do carrossel (ficam com um tom azul por cima). Use fotos horizontais. */
    fotos: FotoTopo[]
    /** Opcional: selos abaixo dos botões. Deixe [] para esconder. */
    selos: Selo[]
  }

  /** Opcional: seção "Sobre" com foto e pontos de destaque. Sem pontos, a seção some. */
  sobre: {
    titulo: string
    /** Opcional: parágrafo abaixo do título. "" esconde. */
    texto: string
    /** Opcional: use null para esconder. */
    foto: Foto | null
    /** Cada ponto pode citar uma avaliação real que o comprova. */
    pontos: { icone: Icone; titulo: string; citacao: string; fonte: string }[]
  }

  /** Lista de serviços e preços, por categoria. Sem categorias, a seção some. */
  servicos: {
    titulo: string
    /** Opcional: observação abaixo do título. "" esconde. */
    texto: string
    /** Use número par de categorias. */
    categorias: CategoriaServicos[]
    /** Opcional: link discreto no fim da seção para a lista completa no Booksy. "" esconde. */
    linkTodos: string
  }

  /** Opcional: galeria em blocos ("O espaço", "Trabalhos"...). Blocos sem fotos somem. */
  galeria: {
    titulo: string
    blocos: BlocoGaleria[]
  }

  /** Opcional: avaliações de clientes. Sem itens, a seção some. */
  avaliacoes: {
    titulo: string
    /** Opcional: links para ver todas as avaliações. [] esconde. */
    links: Link[]
    /** Texto lido por leitores de tela no lugar das 5 estrelas. */
    rotuloEstrelas: string
    /** Use número par de avaliações. */
    itens: Avaliacao[]
  }

  /** Perguntas frequentes. Sem itens, a seção some. */
  perguntas: {
    titulo: string
    itens: PerguntaFrequente[]
  }

  /** Chamada final para agendar */
  agenda: {
    titulo: string
    texto: string
    /** Texto do link abaixo do mapa (abre o negocio.linkMapa). */
    abrirMapa: string
  }

  /** Rodapé */
  rodape: {
    /** Frase abaixo do nome. */
    descricao: string
    /** Linha final, depois do "© ano". */
    direitos: string
    /** Opcional: aviso de site de demonstração. "" esconde. */
    avisoDemonstracao: string
  }

  /**
   * Cores do tema, em hex. Todo o site deriva delas. Confira o contraste WCAG AA (4,5:1).
   */
  cores: {
    /** Fundo principal (escuro). */
    fundo: string
    /** Fundo mais escuro: cabeçalho, galeria e rodapé. */
    fundoEscuro: string
    /** Fundo mais claro: caixas sobre o fundo escuro. */
    fundoClaro: string
    /** Texto e destaque sobre o fundo escuro; fundo das seções claras e do botão principal. */
    claro: string
    /** Texto secundário sobre o fundo escuro. */
    textoSuave: string
  }
}

// ---------------------------------------------------------------------------
// Conteúdo da Barbearia JC. Edite daqui para baixo.
// ---------------------------------------------------------------------------

const linkGoogle = "https://www.google.com/maps/place/?q=place_id:ChIJGXsno0P5zpQRVLd-Wbn_u4c"

// ===== Dados do negócio =====
const negocio: Conteudo["negocio"] = {
  nome: "Barbearia JC",
  logoImagem: { src: "/images/logo.webp", alt: "Barbearia JC" },
  cidade: "São Paulo",
  bairro: "Limão",
  endereco: { linha1: "Av. Dep. Emílio Carlos, 2060", linha2: "Limão, São Paulo - SP, 02720-200" },
  linkMapa: linkGoogle,
  mapaIncorporado:
    "https://www.google.com/maps?q=Av.+Dep.+Em%C3%ADlio+Carlos,+2060+-+Lim%C3%A3o,+S%C3%A3o+Paulo+-+SP,+02720-200&output=embed",
  telefone: "",
  whatsapp: "5511940005502",
  mensagemWhatsapp: "Olá, Jefferson! Vim pelo site e quero agendar um horário.",
  agendamento: "https://booksy.com/pt-br/368373_barbearia-jc_barbearias_1047773_sao-paulo",
  instagram: {
    usuario: "abarbeariajc",
    link: "https://www.instagram.com/abarbeariajc/",
  },
  moeda: "R$",
}

export const conteudo: Conteudo = {
  negocio,

  // ===== Horários de funcionamento =====
  horarios: [
    { dias: "Terça a quinta", diasAbreviados: "Ter a qui", horas: "10h às 19h" },
    { dias: "Sexta", diasAbreviados: "Sex", horas: "9h às 19h" },
    { dias: "Sábado", diasAbreviados: "Sáb", horas: "9h às 18h" },
  ],
  diasFechados: "Domingo e segunda, fechado",

  // ===== Google =====
  seo: {
    titulo: "Barbearia JC | Sempre na régua",
    descricao:
      "Barbearia no Limão, zona norte de São Paulo, com atendimento do Jefferson. Corte, barba e platinado. Agende online pelo Booksy a qualquer hora.",
    corTema: "#21314a",
  },

  // ===== Botões =====
  botoes: {
    principal: "Agendar pelo Booksy",
    secundario: "Chamar no WhatsApp",
    flutuante: "Chamar no WhatsApp",
  },

  // ===== Cabeçalho =====
  cabecalho: {
    links: [
      { rotulo: "Serviços", link: "#servicos" },
      { rotulo: "Fotos", link: "#galeria" },
      { rotulo: "Avaliações", link: "#avaliacoes" },
      { rotulo: "Dúvidas", link: "#duvidas" },
    ],
    botaoAgendar: "Agendar",
  },

  // ===== Topo =====
  topo: {
    titulo: "Barbearia JC",
    subtitulo: "Sempre na régua, como tem que ser.",
    texto: "Agende online pelo Booksy, a qualquer hora.",
    // TROCAR por fotos reais da JC após aprovação (hoje são fotos do Pexels)
    fotos: [
      {
        src: "/images/hero-1.webp",
        srcCelular: "/images/hero-1-mobile.webp",
        alt: "Mãos de barbeiro segurando uma máquina de corte",
      },
      {
        src: "/images/hero-2.webp",
        srcCelular: "/images/hero-2-mobile.webp",
        alt: "Barbeiro cortando cabelo com tesoura e pente",
      },
      {
        src: "/images/hero-3.webp",
        srcCelular: "/images/hero-3-mobile.webp",
        alt: "Barbeiro fazendo a barba de um cliente com navalha",
      },
    ],
    selos: [
      { texto: "5 estrelas no Booksy", icone: "estrela" },
      { texto: "5 estrelas no Google", icone: "estrela" },
      { texto: "Agendamento online 24h", icone: "agenda" },
      { texto: "Pix e cartão · Wi-Fi", icone: "pagamento" },
    ],
  },

  // ===== Sobre =====
  sobre: {
    titulo: "O que os clientes encontram aqui",
    texto: "",
    foto: {
      src: "/images/salao-cadeiras.webp",
      alt: "Cadeira de barbeiro, sofá de couro preto e parede azul no salão",
    },
    pontos: [
      {
        icone: "conversa",
        titulo: "Atendimento atencioso",
        citacao: "Focado, atencioso, ótimo profissional.",
        fonte: "Gabriel, no Booksy",
      },
      {
        icone: "limpeza",
        titulo: "Ambiente limpo e organizado",
        citacao: "Parabéns pela limpeza, educação e talento no corte.",
        fonte: "Cliente no Google",
      },
      {
        icone: "agenda",
        titulo: "Agenda online 24h pelo Booksy",
        citacao: "Escolha o serviço e o horário quando quiser e receba a confirmação na hora.",
        fonte: "",
      },
    ],
  },

  // ===== Serviços =====
  servicos: {
    titulo: "Serviços e preços",
    texto: "",
    categorias: [
      {
        nome: "Cortes",
        itens: [
          { nome: "Corte", preco: 55, duracao: "45 min" },
          { nome: "Corte infantil", preco: 45, duracao: "30 min" },
          { nome: "Penteado e pezinho", preco: 25, duracao: "20 min" },
        ],
      },
      {
        nome: "Barba",
        itens: [
          { nome: "Barba", preco: 45, duracao: "30 min" },
          { nome: "Barba express", preco: 20, duracao: "15 min" },
          { nome: "Sobrancelha", preco: 15, duracao: "15 min" },
        ],
      },
      {
        nome: "Combos",
        itens: [
          { nome: "Corte + barba", preco: 90, duracao: "50 min" },
          { nome: "Corte e barba express", preco: 75, duracao: "55 min" },
          { nome: "Corte + hidratação", preco: 70, duracao: "45 min" },
          { nome: "Corte + limpeza de pele", preco: 75, duracao: "45 min" },
          { nome: "Barba + limpeza de pele", preco: 65, duracao: "30 min" },
        ],
      },
      {
        nome: "Química e cuidados",
        itens: [
          { nome: "Platinado", preco: 100, duracao: "1h" },
          { nome: "Corte + platinado", preco: 130, duracao: "1h30" },
          { nome: "Corte + progressiva", preco: 100, duracao: "1h15" },
          { nome: "Corte + tintura", preco: 75, duracao: "1h" },
          { nome: "Limpeza de pele", preco: 30, duracao: "30 min" },
        ],
      },
    ],
    linkTodos: "Ver todos os serviços no Booksy",
  },

  // ===== Galeria =====
  galeria: {
    titulo: "",
    blocos: [
      {
        titulo: "O espaço",
        texto: "Av. Dep. Emílio Carlos, 2060, no Limão.",
        fotos: [
          { src: "/images/fachada.webp", alt: "Vitrine da Barbearia JC com o adesivo azul e o QR code do Booksy" },
          { src: "/images/salao-parede-azul.webp", alt: "Salão com parede azul, cadeiras de barbeiro e lavatório" },
          { src: "/images/salao-espera.webp", alt: "Poltronas de espera e cadeira de barbeiro no salão" },
          { src: "/images/salao-cafe.webp", alt: "Cantinho do café com cafeteira e copos" },
        ],
      },
    ],
  },

  // ===== Avaliações =====
  avaliacoes: {
    titulo: "O que os clientes comentam",
    links: [
      { rotulo: "Ver no Booksy", link: negocio.agendamento },
      { rotulo: "Ver no Google", link: linkGoogle },
    ],
    rotuloEstrelas: "5 de 5 estrelas",
    itens: [
      { autor: "Igor", fonte: "Booksy", texto: "A melhor barbearia da zona norte." },
      { autor: "Gabriel", fonte: "Booksy", texto: "Atendimento muito bom, o corte ficou ótimo, vou virar cliente." },
      { autor: "Rogério", fonte: "Booksy", texto: "Barbeiro de confiança, corta muito bem." },
      { autor: "Wellington", fonte: "Booksy", texto: "Jefferson é excelente profissional, corta muito bem." },
      {
        autor: "Cliente",
        fonte: "Google",
        texto: "Serviço de qualidade e profissionalismo impecável! Parabéns pela limpeza, educação e talento no corte.",
      },
      { autor: "Cliente", fonte: "Google", texto: "Ótimo profissional, talentoso. Eu super recomendo." },
    ],
  },

  // ===== Perguntas frequentes =====
  perguntas: {
    titulo: "Dúvidas",
    itens: [
      {
        pergunta: "Como eu agendo?",
        resposta:
          "Pelo Booksy, a qualquer hora: você escolhe o serviço e o horário e recebe a confirmação na hora. Se preferir, chame o Jefferson no WhatsApp.",
      },
      {
        pergunta: "Quais são os horários?",
        resposta:
          "Terça a quinta das 10h às 19h, sexta das 9h às 19h e sábado das 9h às 18h. Fechamos domingo e segunda.",
      },
      { pergunta: "Vocês fazem corte infantil?", resposta: "Sim. O corte infantil custa R$ 45 e leva cerca de 30 minutos." },
      { pergunta: "Quais formas de pagamento vocês aceitam?", resposta: "Pix e cartão." },
      {
        pergunta: "Onde fica a barbearia?",
        resposta: "Na Av. Dep. Emílio Carlos, 2060, no Limão, zona norte de São Paulo.",
        link: { rotulo: "Abrir no Maps", link: linkGoogle },
      },
      {
        pergunta: "Como remarco ou cancelo?",
        resposta: "Pelo próprio app do Booksy, no seu agendamento, ou pelo WhatsApp com o Jefferson.",
      },
    ],
  },

  // ===== Chamada final =====
  agenda: {
    titulo: "Marque seu horário",
    texto: "Pelo Booksy você vê os horários livres e agenda em poucos toques. Prefere conversar? Chame no WhatsApp.",
    abrirMapa: "Abrir no Google Maps",
  },

  // ===== Rodapé =====
  rodape: {
    descricao: "Sempre na régua, como tem que ser.",
    direitos: `${negocio.nome}.`,
    avisoDemonstracao: "",
  },

  // ===== Cores (extraídas do logo) =====
  cores: {
    fundo: "#21314a",
    fundoEscuro: "#172338",
    fundoClaro: "#2a3d5a",
    claro: "#fdfdfd",
    textoSuave: "#c5cedb",
  },
}
