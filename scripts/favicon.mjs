import sharp from "sharp"
await sharp("scripts/logo-original.jpeg").resize(64, 64).png().toFile("public/favicon.png")
await sharp("scripts/logo-original.jpeg").resize(180, 180).png().toFile("public/apple-touch-icon.png")
