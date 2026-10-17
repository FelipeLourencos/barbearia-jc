import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { conteudo } from './conteudo.ts'

// Paleta do tema, definida em conteudo.ts
const { cores } = conteudo
const raiz = document.documentElement.style
raiz.setProperty('--navy', cores.fundo)
raiz.setProperty('--navy-deep', cores.fundoEscuro)
raiz.setProperty('--navy-raised', cores.fundoClaro)
raiz.setProperty('--white', cores.claro)
raiz.setProperty('--mist', cores.textoSuave)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
