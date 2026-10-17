import sharp from "sharp"
import { readdirSync } from "node:fs"
const dir = "public/images/"
const arqs = readdirSync(dir).filter((f) => f.endsWith(".webp")).sort()
// dHash 9x8 para achar duplicatas
const hashes = {}
for (const f of arqs) {
  const { data } = await sharp(dir + f).trim({ threshold: 30 }).greyscale().resize(9, 8, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true })
  let h = ""
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) h += data[y * 9 + x] > data[y * 9 + x + 1] ? "1" : "0"
  hashes[f] = h
  const m = await sharp(dir + f).metadata()
  const t = await sharp(dir + f).trim({ threshold: 30 }).toBuffer({ resolveWithObject: true })
  console.log(f, `${m.width}x${m.height}`, "trim→", `${t.info.width}x${t.info.height}`)
}
for (let i = 0; i < arqs.length; i++) for (let j = i + 1; j < arqs.length; j++) {
  let d = 0; for (let k = 0; k < 64; k++) if (hashes[arqs[i]][k] !== hashes[arqs[j]][k]) d++
  if (d < 14) console.log("PARECIDAS", arqs[i], arqs[j], d)
}
// folha de contato
const tiles = await Promise.all(arqs.map(async (f) => sharp(dir + f).resize(240, 300, { fit: "contain", background: "#888" }).toBuffer()))
const cols = 6, rows = Math.ceil(tiles.length / cols)
await sharp({ create: { width: cols * 250, height: rows * 330, channels: 3, background: "#fff" } })
  .composite([
    ...tiles.map((t, i) => ({ input: t, left: (i % cols) * 250, top: Math.floor(i / cols) * 330 })),
    ...arqs.map((f, i) => ({ input: { text: { text: f, dpi: 90 } }, left: (i % cols) * 250, top: Math.floor(i / cols) * 330 + 305 })),
  ])
  .png().toFile(process.argv[2])
