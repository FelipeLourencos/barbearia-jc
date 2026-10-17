import sharp from "sharp"
const { data, info } = await sharp("scripts/logo-original.jpeg").resize(200, 200).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const buckets = new Map()
for (let i = 0; i < data.length; i += 3) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
  const k = [r, g, b].map((v) => Math.round(v / 32)).join(",")
  const e = buckets.get(k) ?? { n: 0, r: 0, g: 0, b: 0 }
  e.n++; e.r += r; e.g += g; e.b += b
  buckets.set(k, e)
}
const hex = (e) => "#" + [e.r, e.g, e.b].map((v) => Math.round(v / e.n).toString(16).padStart(2, "0")).join("")
const total = data.length / 3
console.log([...buckets.values()].sort((a, b) => b.n - a.n).slice(0, 8).map((e) => `${hex(e)} ${(100 * e.n / total).toFixed(1)}%`).join("\n"))
