import { Fragment } from "react"
import { motion, type HTMLMotionProps, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"
import { EASE_EDITORIAL } from "@/lib/motion"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

/**
 * Surge de baixo para cima quando entra na tela (uma única vez).
 * Substitui a antiga classe `.reveal` nas seções animadas com Framer Motion.
 */
export function FadeUp({
  delay = 0,
  duration = 1,
  className,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; duration?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE_EDITORIAL }}
      className={className}
      {...props}
    />
  )
}

type Segment = { text: string; className?: string }

/**
 * Revela um título palavra por palavra no carregamento da página.
 * Cada trecho pode ter sua própria classe (ex.: a parte em itálico dourado).
 * As palavras são texto real separado por espaços, então o título existe uma vez só no DOM.
 */
export function WordReveal({
  segments,
  delay = 0,
  stagger = 0.075,
  className,
}: {
  segments: Segment[]
  delay?: number
  stagger?: number
  className?: string
}) {
  const words = segments.flatMap((seg) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, className: seg.className }))
  )

  return (
    <span className={className}>
      {words.map(({ w, className: wordClass }, i) => (
        <Fragment key={`${w}-${i}`}>
          <motion.span
            className={cn("inline-block will-change-transform", wordClass)}
            initial={{ opacity: 0, y: "0.45em", filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE_EDITORIAL }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  )
}
