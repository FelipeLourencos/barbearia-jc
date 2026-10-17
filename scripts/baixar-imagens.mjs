// Baixa as fotos do Booksy, corta faixas pretas (prints de celular) e salva em WebP até 1600px.
// Uso: node scripts/baixar-imagens.mjs
import sharp from "sharp"
import { writeFile } from "node:fs/promises"

const B = "https://d2zdpiztbgorvt.cloudfront.net/region1/br/368373/"
const fotos = {
  logo: "logo/a80a47240bf44fbdb895482043eceb-barbearia-jc-logo-61d179ff291b44d5a816eed987a4e3-booksy.jpeg",
  "salao-cadeiras": "inspiration/1f814a6d1fb74e2396dd8b42dd2e26-barbearia-jc-inspiration-604451c2dd664e3abe1c49d69d24c5-booksy.jpeg",
  "salao-cafe": "inspiration/7d8eb51d606941a5a8e3b67109352f-barbearia-jc-inspiration-4266ae8423cc46da901186216e72bb-booksy.jpeg",
  fachada: "inspiration/ee7be73de8884aeba14263afa24daa-barbearia-jc-inspiration-8a2ac905298f47d5b9fb3c67351cf8-booksy.jpeg",
  "salao-espera": "inspiration/cf157358294c4cc4a5c018a6f9aa32-barbearia-jc-inspiration-0f5ee248a8f247aebc93648069dfbf-booksy.jpeg",
  "salao-parede-azul": "inspiration/d8c428e49baa4b70829e6279382174-barbearia-jc-inspiration-82c2718af3e642ceaad3e373262a44-booksy.jpeg",
  // Os outros dois platinados do Booksy são cópias destes (mesmo hash de imagem)
  "platinado-frente": "service_photos/774b7b0a43f94a798709919d8b6cb944.jpeg",
  "platinado-lado": "service_photos/da63be753ea042f8b0c265e185ea7fde.jpeg",
}

/** Corta linhas/colunas das bordas que são quase todas pretas (faixas de print). */
async function cortarFaixasPretas(buf) {
  const { data, info } = await sharp(buf).greyscale().raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h } = info
  const escura = (vals) => vals.filter((v) => v > 40).length / vals.length < 0.04
  const linha = (y) => Array.from({ length: w }, (_, x) => data[y * w + x])
  const coluna = (x) => Array.from({ length: h }, (_, y) => data[y * w + x])
  let top = 0, bottom = h - 1, left = 0, right = w - 1
  while (top < h / 3 && escura(linha(top))) top++
  while (bottom > (2 * h) / 3 && escura(linha(bottom))) bottom--
  while (left < w / 3 && escura(coluna(left))) left++
  while (right > (2 * w) / 3 && escura(coluna(right))) right--
  return sharp(buf).extract({ left, top, width: right - left + 1, height: bottom - top + 1 }).toBuffer()
}

for (const [nome, caminho] of Object.entries(fotos)) {
  const r = await fetch(B + caminho)
  if (!r.ok) { console.log("FALHOU", nome, r.status); continue }
  let buf = Buffer.from(await r.arrayBuffer())
  if (nome === "logo") await writeFile("scripts/logo-original.jpeg", buf)
  buf = await sharp(buf).rotate().toBuffer()
  if (nome !== "logo") buf = await cortarFaixasPretas(buf)
  const out = await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public/images/${nome}.webp`)
  console.log("ok", nome, `${out.width}x${out.height}`)
}
