import { useEffect, useState } from "react"
import {
  ArrowUpRight,
  AtSign,
  CalendarClock,
  Clock,
  CreditCard,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Phone,
  Scissors,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react"
import { MotionConfig, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { EASE_EDITORIAL } from "@/lib/motion"
import { conteudo, type BlocoGaleria, type Icone } from "@/conteudo"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Todo o texto, preço, contato e foto vem de src/conteudo.ts
const {
  negocio,
  horarios,
  diasFechados,
  botoes,
  cabecalho,
  topo,
  sobre,
  servicos,
  galeria,
  avaliacoes,
  perguntas,
  agenda,
  rodape,
} = conteudo

/** Seções e botões só existem quando o conteudo.ts traz dados para eles. */
const blocosGaleria = galeria.blocos.filter((b) => b.fotos.length > 0)
const temSobre = sobre.pontos.length > 0
const temServicos = servicos.categorias.length > 0
const temGaleria = blocosGaleria.length > 0
const temAvaliacoes = avaliacoes.itens.length > 0
const temPerguntas = perguntas.itens.length > 0
const temWhatsapp = negocio.whatsapp !== ""
const temAgendamento = negocio.agendamento !== ""

const WHATSAPP_URL = `https://wa.me/${negocio.whatsapp}${
  negocio.mensagemWhatsapp ? `?text=${encodeURIComponent(negocio.mensagemWhatsapp)}` : ""
}`
const TELEFONE_URL = `tel:+55${negocio.telefone.replace(/\D/g, "")}`

/** Links do menu que dependem de seções opcionais. */
const secaoVisivel: Record<string, boolean> = {
  "#sobre": temSobre,
  "#servicos": temServicos,
  "#galeria": temGaleria,
  "#avaliacoes": temAvaliacoes,
  "#duvidas": temPerguntas,
}

const ICONES: Record<Icone, LucideIcon> = {
  estrela: Star,
  agenda: CalendarClock,
  pagamento: CreditCard,
  conversa: HeartHandshake,
  limpeza: Sparkles,
  tesoura: Scissors,
}

const formatarPreco = (preco: number | string) =>
  typeof preco === "number" ? `${negocio.moeda} ${preco.toLocaleString("pt-BR")}` : preco

/** Medidas comuns: mesma largura e mesmo respiro em todas as seções. */
const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8"
const SECAO = "py-20 sm:py-28"

const externo = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}

/** Botão cheio (principal) ou de contorno. Segue as cores da seção em que está. */
function Botao({
  href,
  children,
  variante = "cheio",
  className,
}: {
  href: string
  children: React.ReactNode
  variante?: "cheio" | "contorno"
  className?: string
}) {
  return (
    <a
      href={href}
      {...externo(href)}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2.5 rounded-md px-6 text-[0.95rem] font-semibold whitespace-nowrap transition-[background-color,color,border-color,opacity] duration-200",
        variante === "cheio"
          ? "bg-primary text-primary-foreground hover:opacity-90"
          : "border border-foreground/45 text-foreground hover:border-foreground hover:bg-foreground/8",
        className
      )}
    >
      {children}
    </a>
  )
}

function BotoesAgendar({ className }: { className?: string }) {
  if (!temAgendamento && !temWhatsapp) return null
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      {temAgendamento && (
        <Botao href={negocio.agendamento}>
          <CalendarClock className="size-[1.1rem]" aria-hidden /> {botoes.principal}
        </Botao>
      )}
      {temWhatsapp && (
        <Botao href={WHATSAPP_URL} variante="contorno">
          <MessageCircle className="size-[1.1rem]" aria-hidden /> {botoes.secundario}
        </Botao>
      )}
    </div>
  )
}

function Estrelas({ className }: { className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} role="img" aria-label={avaliacoes.rotuloEstrelas}>
      {Array.from({ length: 5 }).map((_, k) => (
        <Star key={k} className="size-4 fill-current" aria-hidden />
      ))}
    </span>
  )
}

function Header() {
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = cabecalho.links.filter(({ link }) => secaoVisivel[link] ?? true)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        rolou ? "border-border bg-navy-deep/95 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <div className={cn(CONTAINER, "flex h-[4.5rem] items-center justify-between gap-6 lg:h-24")}>
        <a href="#topo" className="flex items-center gap-3 lg:gap-4">
          {negocio.logoImagem && (
            <img
              src={negocio.logoImagem.src}
              alt=""
              className="size-14 rounded-full ring-1 ring-white/25 lg:size-[72px]"
            />
          )}
          <span className="titulo-item text-[1.05rem] tracking-[0.01em] sm:text-lg">{negocio.nome}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {links.map(({ rotulo, link }) => (
            <a
              key={link}
              href={link}
              className="text-[0.95rem] text-mist transition-colors hover:text-foreground"
            >
              {rotulo}
            </a>
          ))}
        </nav>

        {temAgendamento && (
          <Botao href={negocio.agendamento} className="h-10 px-4 text-sm sm:px-5">
            {cabecalho.botaoAgendar}
          </Botao>
        )}
      </div>
    </header>
  )
}

/** Única animação automática da página: a entrada do topo, em sequência. */
const entrada = (ordem: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.15 + ordem * 0.12, ease: EASE_EDITORIAL },
})

/** Une a última palavra à anterior, para nenhuma linha terminar com uma palavra sozinha. */
const semPalavraSolta = (texto: string) => texto.replace(/ (\S+)$/, " $1")

const TROCA_FOTO_MS = 6000

/** Carrossel de fundo do topo: troca a cada 6s, pausa com o mouse em cima e fica parado com menos movimento. */
function useCarrossel(total: number) {
  const [atual, setAtualSemTransicao] = useState(0)
  // A primeira foto aparece na hora; a transição só vale a partir da primeira troca
  const [animar, setAnimar] = useState(false)
  const [pausado, setPausado] = useState(false)

  const setAtual = (proxima: number | ((i: number) => number)) => {
    setAnimar(true)
    setAtualSemTransicao(proxima)
  }
  const [menosMovimento, setMenosMovimento] = useState(false)

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)")
    const atualizar = () => setMenosMovimento(consulta.matches)
    atualizar()
    consulta.addEventListener("change", atualizar)
    return () => consulta.removeEventListener("change", atualizar)
  }, [])

  // Depende de "atual": escolher uma foto pelos pontos reinicia a contagem
  useEffect(() => {
    if (total < 2 || pausado || menosMovimento) return
    const id = window.setTimeout(() => setAtual((i) => (i + 1) % total), TROCA_FOTO_MS)
    return () => window.clearTimeout(id)
  }, [atual, total, pausado, menosMovimento])

  return { atual, setAtual, animar, setPausado }
}

function Topo() {
  const { fotos } = topo
  const { atual, setAtual, animar, setPausado } = useCarrossel(fotos.length)

  return (
    <section
      id="topo"
      className="relative isolate flex min-h-svh items-end overflow-hidden"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {fotos.map((foto, i) => (
        <picture key={foto.src}>
          {foto.srcCelular && <source media="(max-width: 767px)" srcSet={foto.srcCelular} />}
          <img
            src={foto.src}
            alt={i === atual ? foto.alt : ""}
            aria-hidden={i !== atual}
            className={cn(
              "absolute inset-0 -z-20 size-full object-cover",
              animar && "topo-foto",
              i === atual ? "opacity-100" : "opacity-0"
            )}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding={i === 0 ? "sync" : "async"}
          />
        </picture>
      ))}
      <div aria-hidden className="topo-camada absolute inset-0 -z-10" />

      <div className={cn(CONTAINER, "pt-32 pb-14 sm:pb-20")}>
        <motion.h1 {...entrada(0)} className="titulo-display topo-texto">
          <span className="block text-[3.1rem] sm:text-8xl lg:text-[8.5rem] lg:whitespace-nowrap">
            {semPalavraSolta(topo.titulo)}
          </span>
          {topo.subtitulo && (
            <span className="mt-2 block text-[1.85rem] leading-[1.05] font-semibold sm:mt-3 sm:text-5xl lg:text-[3.5rem] lg:whitespace-nowrap">
              {semPalavraSolta(topo.subtitulo)}
            </span>
          )}
        </motion.h1>
        {topo.texto && (
          <motion.p {...entrada(1)} className="topo-texto mt-5 text-[1.05rem] text-pretty text-mist sm:mt-6 sm:text-xl">
            {topo.texto}
          </motion.p>
        )}
        <motion.div
          {...entrada(2)}
          className="mt-9 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <BotoesAgendar />
          {fotos.length > 1 && (
            <div className="flex gap-1" role="group" aria-label="Fotos do topo">
              {fotos.map((foto, i) => (
                <button
                  key={foto.src}
                  type="button"
                  onClick={() => setAtual(i)}
                  aria-label={`Mostrar foto ${i + 1} de ${fotos.length}`}
                  aria-current={i === atual}
                  className="group flex h-8 items-center px-1"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full bg-foreground transition-[width,opacity] duration-300 motion-reduce:transition-none",
                      i === atual ? "w-7" : "w-1.5 opacity-50 group-hover:opacity-90"
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {topo.selos.length > 0 && (
          <motion.ul
            {...entrada(3)}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:mt-16 md:grid-cols-4"
          >
            {topo.selos.map(({ texto, icone }) => {
              const Icon = ICONES[icone]
              return (
                <li key={texto} className="flex items-center gap-2.5 text-sm leading-snug sm:text-[0.95rem]">
                  <Icon
                    className={cn("size-4 shrink-0", icone === "estrela" && "fill-current")}
                    aria-hidden
                  />
                  {texto}
                </li>
              )
            })}
          </motion.ul>
        )}
      </div>
    </section>
  )
}

function Sobre() {
  if (!temSobre) return null

  return (
    <section id="sobre" className={SECAO}>
      <div className={cn(CONTAINER, "grid items-center gap-12 lg:grid-cols-2 lg:gap-20")}>
        {sobre.foto && (
          <img
            src={sobre.foto.src}
            alt={sobre.foto.alt}
            className="aspect-[4/5] w-full rounded-lg object-cover lg:order-last"
            loading="lazy"
          />
        )}
        <div>
          <h2 className="titulo-secao text-[2rem] sm:text-5xl">{sobre.titulo}</h2>
          {sobre.texto && <p className="mt-5 max-w-[50ch] leading-relaxed text-mist">{sobre.texto}</p>}
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {sobre.pontos.map(({ icone, titulo, citacao, fonte }) => {
              const Icon = ICONES[icone]
              return (
                <li key={titulo} className="flex gap-5 py-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-raised">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="titulo-item text-lg">{titulo}</h3>
                    {fonte ? (
                      <blockquote className="mt-1.5 text-mist">
                        <p>“{citacao}”</p>
                        <footer className="mt-1 text-sm">{fonte}</footer>
                      </blockquote>
                    ) : (
                      <p className="mt-1.5 text-mist">{citacao}</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Servicos() {
  if (!temServicos) return null

  return (
    <section id="servicos" className={cn("secao-clara", SECAO)}>
      <div className={CONTAINER}>
        <h2 className="titulo-secao text-[2rem] sm:text-5xl">{servicos.titulo}</h2>
        {servicos.texto && <p className="mt-5 max-w-[50ch] text-muted-foreground">{servicos.texto}</p>}

        <div className="mt-12 grid items-start gap-x-16 gap-y-12 sm:mt-16 md:grid-cols-2">
          {servicos.categorias.map((cat) => (
            <div key={cat.nome}>
              <h3 className="titulo-item border-b-2 border-foreground pb-3 text-[1.4rem]">{cat.nome}</h3>
              <ul>
                {cat.itens.map((item) => (
                  <li
                    key={item.nome}
                    className="flex items-baseline justify-between gap-4 border-b border-border py-3.5"
                  >
                    <span className="min-w-0">
                      <span className="block text-[1.02rem]">{item.nome}</span>
                      {item.duracao && (
                        <span className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="size-3.5" aria-hidden /> {item.duracao}
                        </span>
                      )}
                    </span>
                    <span className="titulo-item shrink-0 text-lg tabular-nums">{formatarPreco(item.preco)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {temAgendamento && (
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Botao href={negocio.agendamento}>
              <CalendarClock className="size-[1.1rem]" aria-hidden /> {botoes.principal}
            </Botao>
            <p className="text-sm text-muted-foreground">Veja os horários livres e agende em poucos toques.</p>
          </div>
        )}
        {temAgendamento && servicos.linkTodos && (
          <a
            href={negocio.agendamento}
            {...externo(negocio.agendamento)}
            className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground underline decoration-current/40 underline-offset-4 transition-colors hover:text-foreground"
          >
            {servicos.linkTodos} <ArrowUpRight className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </section>
  )
}

/**
 * Bloco da galeria. Todas as fotos ocupam a mesma célula (1/4 da largura no computador),
 * em 4:5. Blocos com até 2 fotos dividem a linha com o título.
 */
function Bloco({ bloco }: { bloco: BlocoGaleria }) {
  const curto = bloco.fotos.length <= 2

  return (
    <div className={cn("grid gap-3 sm:gap-4 lg:grid-cols-4", curto && "lg:items-end")}>
      <div className={cn("mb-4 lg:mb-6", curto ? "lg:col-span-2 lg:mb-0 lg:pr-12" : "lg:col-span-4")}>
        <h2 className="titulo-secao text-[2rem] sm:text-5xl">{bloco.titulo}</h2>
        {bloco.texto && <p className="mt-3 text-mist">{bloco.texto}</p>}
      </div>
      <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4", curto ? "lg:col-span-2" : "lg:col-span-4 lg:grid-cols-4")}>
        {bloco.fotos.map((foto) => (
          <li key={foto.src}>
            <img
              src={foto.src}
              alt={foto.alt}
              className="aspect-[4/5] w-full rounded-lg object-cover"
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Galeria() {
  if (!temGaleria) return null

  return (
    <section id="galeria" className={cn("bg-navy-deep", SECAO)}>
      <div className={cn(CONTAINER, "space-y-20 sm:space-y-28")}>
        {galeria.titulo && <h2 className="titulo-secao text-[2rem] sm:text-5xl">{galeria.titulo}</h2>}
        {blocosGaleria.map((bloco) => (
          <Bloco key={bloco.titulo} bloco={bloco} />
        ))}
      </div>
    </section>
  )
}

function Avaliacoes() {
  if (!temAvaliacoes) return null

  return (
    <section id="avaliacoes" className={SECAO}>
      <div className={CONTAINER}>
        <h2 className="titulo-secao text-[2rem] sm:text-5xl">{avaliacoes.titulo}</h2>

        <ul className="mt-12 grid gap-4 sm:mt-16 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {avaliacoes.itens.map((a, i) => (
            <li key={`${a.autor}-${i}`}>
              <figure className="flex h-full flex-col rounded-lg bg-navy-raised p-6 sm:p-7">
                <Estrelas />
                <blockquote className="mt-5 flex-1 text-[1.1rem] leading-relaxed text-pretty">
                  <p>“{a.texto}”</p>
                </blockquote>
                <figcaption className="mt-6 text-sm text-mist">
                  <span className="font-semibold text-foreground">{a.autor}</span>, no {a.fonte}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {avaliacoes.links.length > 0 && (
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
            {avaliacoes.links.map(({ rotulo, link }) => (
              <a
                key={rotulo}
                href={link}
                {...externo(link)}
                className="inline-flex items-center gap-1.5 underline decoration-current/40 underline-offset-4 transition-colors hover:text-foreground"
              >
                {rotulo} <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ))}
          </p>
        )}
      </div>
    </section>
  )
}

function Duvidas() {
  if (!temPerguntas) return null

  return (
    <section id="duvidas" className={cn("secao-clara", SECAO)}>
      <div className={cn(CONTAINER, "grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16")}>
        <h2 className="titulo-secao text-[2rem] sm:text-5xl">{perguntas.titulo}</h2>
        <Accordion defaultValue={["faq-0"]} className="border-t border-border">
          {perguntas.itens.map((item, i) => (
            <AccordionItem key={item.pergunta} value={`faq-${i}`} className="border-b border-border">
              <AccordionTrigger className="py-5 text-left text-[1.1rem] font-semibold hover:no-underline sm:text-xl">
                {item.pergunta}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                <p className="max-w-[60ch]">{item.resposta}</p>
                {item.link && (
                  <a
                    href={item.link.link}
                    {...externo(item.link.link)}
                    className="mt-3 inline-flex items-center gap-1.5 font-semibold text-foreground underline underline-offset-4"
                  >
                    <MapPin className="size-4" aria-hidden /> {item.link.rotulo}
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function Agendar() {
  if (!temAgendamento && !temWhatsapp) return null

  return (
    <section id="agendar" className={SECAO}>
      <div className={cn(CONTAINER, "grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16")}>
        <div>
          <h2 className="titulo-display text-[2.6rem] sm:text-6xl">{agenda.titulo}</h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-mist">{agenda.texto}</p>
          <BotoesAgendar className="mt-9" />
        </div>
        <div className="rounded-lg bg-navy-raised p-6 sm:p-7">
          <p className="flex items-center gap-2 font-semibold">
            <Clock className="size-4" aria-hidden /> Horários
          </p>
          <dl className="mt-4 space-y-2.5">
            {horarios.map((h) => (
              <div key={h.dias} className="flex justify-between gap-4 border-b border-border pb-2.5">
                <dt className="text-mist">{h.dias}</dt>
                <dd className="tabular-nums">{h.horas}</dd>
              </div>
            ))}
          </dl>
          {diasFechados && <p className="mt-4 text-sm text-mist">{diasFechados}</p>}
        </div>

        {negocio.mapaIncorporado && (
          <div className="lg:col-span-2">
            <iframe
              src={negocio.mapaIncorporado}
              title={`Mapa da ${negocio.nome}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[360px] w-full rounded-lg border-0 bg-navy-raised"
            />
            {negocio.linkMapa && (
              <a
                href={negocio.linkMapa}
                {...externo(negocio.linkMapa)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-mist underline decoration-current/40 underline-offset-4 transition-colors hover:text-foreground"
              >
                <MapPin className="size-4" aria-hidden /> {agenda.abrirMapa}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

/** Botão flutuante do WhatsApp, no canto da tela. */
function WhatsappFlutuante() {
  // Aparece depois do topo, onde os botões de agendar já estão à vista
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!temWhatsapp || !botoes.flutuante) return null

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={botoes.flutuante}
      className={cn(
        "fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-white text-navy shadow-[0_8px_24px_-6px_rgb(0_0_0/0.5)] transition-[opacity,scale] duration-300 hover:scale-105 sm:right-6 sm:bottom-6",
        !visivel && "pointer-events-none scale-90 opacity-0"
      )}
      tabIndex={visivel ? undefined : -1}
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  )
}

function Rodape() {
  const endereco = (
    <>
      {negocio.endereco.linha1}
      <br />
      {negocio.endereco.linha2}
    </>
  )
  const titulo = "mb-3 font-semibold text-foreground"

  return (
    <footer className="bg-navy-deep">
      <div className={cn(CONTAINER, "grid gap-10 py-16 text-sm text-mist sm:grid-cols-2 lg:grid-cols-4")}>
        <div>
          <p className="titulo-item text-xl text-foreground">{negocio.nome}</p>
          {rodape.descricao && <p className="mt-2 max-w-[28ch]">{rodape.descricao}</p>}
        </div>
        <div>
          <p className={titulo}>Endereço</p>
          {negocio.linkMapa ? (
            <a href={negocio.linkMapa} {...externo(negocio.linkMapa)} className="flex gap-2 hover:text-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{endereco}</span>
            </a>
          ) : (
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{endereco}</span>
            </p>
          )}
        </div>
        <div>
          <p className={titulo}>Horários</p>
          {horarios.map((h) => (
            <p key={h.dias}>{`${h.diasAbreviados} · ${h.horas}`}</p>
          ))}
        </div>
        <div className="space-y-2">
          <p className={titulo}>Contato</p>
          {negocio.telefone && (
            <a href={TELEFONE_URL} className="flex items-center gap-2 hover:text-foreground">
              <Phone className="size-4" aria-hidden /> {negocio.telefone}
            </a>
          )}
          {temWhatsapp && (
            <a href={WHATSAPP_URL} {...externo(WHATSAPP_URL)} className="flex items-center gap-2 hover:text-foreground">
              <MessageCircle className="size-4" aria-hidden /> WhatsApp
            </a>
          )}
          {negocio.instagram.link && (
            <a
              href={negocio.instagram.link}
              {...externo(negocio.instagram.link)}
              className="flex items-center gap-2 hover:text-foreground"
            >
              <AtSign className="size-4" aria-hidden /> {negocio.instagram.usuario}
            </a>
          )}
          {temAgendamento && (
            <a
              href={negocio.agendamento}
              {...externo(negocio.agendamento)}
              className="flex items-center gap-2 hover:text-foreground"
            >
              <CalendarClock className="size-4" aria-hidden /> Booksy
            </a>
          )}
        </div>
      </div>
      <div className={CONTAINER}>
        <p className="border-t border-border py-6 pr-20 text-xs text-mist">
          © {new Date().getFullYear()} {rodape.direitos}
          {rodape.avisoDemonstracao && <> {rodape.avisoDemonstracao}</>}
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    // reducedMotion="user": quem pediu menos movimento no sistema não vê a entrada animada
    <MotionConfig reducedMotion="user">
      <div className="min-h-svh overflow-x-clip">
        <Header />
        <main>
          <Topo />
          <Sobre />
          <Servicos />
          <Galeria />
          <Avaliacoes />
          <Duvidas />
          <Agendar />
        </main>
        <Rodape />
        <WhatsappFlutuante />
      </div>
    </MotionConfig>
  )
}
