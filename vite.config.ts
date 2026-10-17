import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

import { conteudo, type Conteudo } from './src/conteudo.ts'

const escaparHtml = (texto: string) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Preenche o título, a descrição e a cor do tema do index.html com os dados de
 * src/conteudo.ts, para que o Google e as prévias de link já recebam o texto certo.
 */
function conteudoNoHtml(): Plugin {
  return {
    name: 'conteudo-no-html',
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        // No npm run dev, relê o conteudo.ts a cada carregamento para pegar as edições
        const { seo } = ctx.server
          ? ((await ctx.server.ssrLoadModule('/src/conteudo.ts')).conteudo as Conteudo)
          : conteudo
        return html
          .replaceAll('%CONTEUDO_TITULO%', escaparHtml(seo.titulo))
          .replaceAll('%CONTEUDO_DESCRICAO%', escaparHtml(seo.descricao))
          .replaceAll('%CONTEUDO_COR_TEMA%', escaparHtml(seo.corTema))
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [conteudoNoHtml(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
