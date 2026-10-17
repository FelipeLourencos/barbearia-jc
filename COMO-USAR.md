# Como criar o site de uma barbearia nova

Este projeto é um modelo. Todo o conteúdo do negócio (nome, contatos, textos, serviços,
preços, fotos e cores) fica em um único arquivo: **`src/conteudo.ts`**. O resto do código
não precisa ser tocado.

## O que você precisa ter instalado

- [Node.js](https://nodejs.org) (versão 20 ou mais nova)
- Um editor de código, como o VS Code (ele avisa na hora se faltar algum campo)

## Passo a passo

### 1. Copie a pasta

Copie a pasta de um site pronto (por exemplo `barbearia-jc`) inteira e dê um nome novo, por exemplo `barbearia-do-ze`.
Na cópia, apague as pastas `node_modules`, `dist` e `.git`, se existirem, para começar limpo.

Depois, dentro da pasta nova, instale as dependências:

```bash
npm install
```

### 2. Edite o `src/conteudo.ts`

Abra `src/conteudo.ts` e troque as informações, seção por seção. O arquivo está todo
comentado. Os blocos principais são:

| Bloco | O que tem |
| --- | --- |
| `negocio` | nome, logo em imagem, endereço, mapa, telefone, WhatsApp e mensagem, link de agendamento, Instagram |
| `horarios` / `diasFechados` | dias e horários de funcionamento |
| `seo` | descrição para o Google e cor da barra do navegador (o título da aba fica no `index.html`) |
| `botoes` | textos dos botões de agendar, WhatsApp e do botão flutuante |
| `cabecalho` | links do menu e texto do botão de agendar |
| `topo` | título em duas linhas, linha de apoio, fotos do carrossel e selos |
| `sobre` | título, foto e pontos de destaque com citações de clientes |
| `servicos` | lista de preços por categoria (nome, duração e preço) |
| `galeria` | blocos de fotos, como "O espaço" e "Trabalhos" |
| `avaliacoes` | título, links e avaliações de clientes |
| `perguntas` | perguntas frequentes (com link opcional) |
| `agenda` | chamada final para agendar |
| `rodape` | descrição e linha de direitos |
| `cores` | paleta do tema |

### Como cada campo funciona

- **`negocio.logoImagem`**: `{ src, alt }`, mostrado no cabeçalho ao lado do nome. `null` mostra só o nome.
- **`negocio.agendamento`**: link do Booksy (ou outro). Vira o botão principal no topo, nos serviços e no final. `""` esconde esses botões.
- **`negocio.whatsapp`** e **`mensagemWhatsapp`**: número (só dígitos) e mensagem pronta. Número vazio esconde os botões de WhatsApp e o botão flutuante.
- **`negocio.telefone`**: opcional, `""` esconde.
- **`botoes`**: `principal` (agendar), `secundario` (WhatsApp) e `flutuante` (texto de acessibilidade do botão flutuante, que aparece depois do topo; `""` esconde).
- **`topo`**: `titulo` (primeira linha, grande), `subtitulo` (segunda linha, menor; `""` esconde), `texto` (uma linha de apoio; `""` esconde), `fotos` do carrossel de fundo (horizontais, com 1920px ou mais de largura; recebem um tom azul por cima e trocam a cada 6s; cada uma aceita `srcCelular`, um recorte vertical de 900x1350 usado em telas de até 767px, com a ferramenta na parte de cima, porque o texto ocupa a parte de baixo) e `selos`: lista de `{ texto, icone }`. Ícones disponíveis: `"estrela"`, `"agenda"`, `"pagamento"`, `"conversa"`, `"limpeza"`, `"tesoura"`. Use número par de selos.
- **`sobre`**: `titulo`, `texto` (`""` esconde), `foto` (`null` esconde) e `pontos`: lista de `{ icone, titulo, citacao, fonte }`. Com `fonte` preenchida, a citação aparece entre aspas com a fonte embaixo; com `fonte: ""`, vira um texto simples. Sem pontos, a seção some. Use citações reais.
- **`servicos.categorias`**: lista de `{ nome, itens: [{ nome, preco, duracao }] }`. `preco` pode ser número (vira "R$ 55") ou texto ("Consulte"). Use número par de categorias. `servicos.linkTodos` é o texto do link discreto para o Booksy no fim da seção (`""` esconde).
- **`galeria`**: `titulo` (`""` esconde) e `blocos`: lista de `{ titulo, texto, fotos }`. Todas as fotos são recortadas em 4:5. Use número par de fotos por bloco. Blocos com até 2 fotos ficam lado a lado com o título no computador. Bloco sem fotos some.
- **`avaliacoes`**: `titulo`, `links` (aparecem discretos no fim da seção; `[]` esconde), `rotuloEstrelas` e `itens`: lista de `{ autor, fonte, texto }`, mostrada como "Autor, no Fonte". Use número par.
- **`perguntas.itens`**: `{ pergunta, resposta, link? }`. O `link` opcional (`{ rotulo, link }`) aparece depois da resposta, como "Abrir no Maps".
- **Links do menu**: apontam para `#sobre`, `#servicos`, `#galeria`, `#avaliacoes` ou `#duvidas`. Se a seção estiver vazia, o link some sozinho.
- **`cores`**: `fundo`, `fundoEscuro`, `fundoClaro`, `claro` e `textoSuave`. As seções de serviços e dúvidas usam `claro` como fundo e `fundo` como texto. Confira o contraste mínimo WCAG AA (4,5:1) ao trocar as cores.

Alguns cuidados:

- **WhatsApp**: só números, com 55 + DDD + número. Exemplo: `"5511912345678"`.
- **Preços**: número sem "R$". Exemplo: `preco: 85`.
- **Mapa**: cole o link do Google Maps em `linkMapa` para o endereço no rodapé virar link. O mapa incorporado na seção de agendamento usa `mapaIncorporado` (endereço do Google Maps com `&output=embed`, sem chave de API; `""` esconde).
- **Título da aba e `noindex`**: ficam no `index.html`. Remova a tag `noindex` (marcada com comentário) depois da aprovação do cliente.

Se faltar algum campo obrigatório ou houver erro de digitação no nome de um campo, o
editor sublinha em vermelho e o `npm run build` mostra onde está o problema.

### 3. Troque as fotos em `public/images/`

- O script `scripts/baixar-imagens.mjs` baixa as fotos, corta faixas pretas de prints de celular
  e salva em WebP com até 1600px. Edite a lista de endereços no início dele e rode
  `node scripts/baixar-imagens.mjs`.
- `scripts/inspecionar.mjs` aponta fotos repetidas (por comparação de imagem) e gera uma folha
  de contato: `node scripts/inspecionar.mjs folha.png`.
- Use o caminho a partir da barra no `conteudo.ts`. Exemplo: `public/images/salao.webp` vira
  `"/images/salao.webp"`.
- **Ícone da aba (favicon)**: `public/favicon.png` (64×64) e `public/apple-touch-icon.png`
  (180×180). O script `scripts/favicon.mjs` gera os dois a partir do logo.

### 4. Mude o nome no `wrangler.jsonc`

Abra `wrangler.jsonc` e troque o `name` por um nome único para o cliente, só com letras
minúsculas, números e hífens:

```jsonc
"name": "barbearia-do-ze",
```

Esse nome define o endereço do site na Cloudflare (por exemplo,
`barbearia-do-ze.<sua-conta>.workers.dev`).

### 5. Teste no seu computador

```bash
npm run dev
```

Abra o endereço que aparecer (normalmente http://localhost:5173) e confira o site no
computador e no celular (no navegador, use o modo de dispositivo móvel). As edições no
`conteudo.ts` aparecem na hora. Se mudar o `seo` (título da aba), recarregue a página.

Antes de publicar, confirme que o build passa sem erros:

```bash
npm run build
```

### 6. Publique

O site é publicado na Cloudflare a partir da pasta `dist`, gerada pelo `npm run build`.

```bash
npm run build
npx wrangler deploy
```

Na primeira vez, o `wrangler` pede para entrar na sua conta da Cloudflare. No fim ele
mostra o endereço do site publicado.

Se o projeto estiver ligado a um repositório no GitHub com deploy automático na
Cloudflare, basta fazer commit e push.

## Ajustes finos (opcional)

A paleta do bloco `cores` é aplicada em `src/main.tsx` como variáveis CSS (`--navy`,
`--navy-deep`, `--navy-raised`, `--white`, `--mist`). Em `src/index.css` ficam os tokens que
apontam para elas, a classe `.secao-clara` (que inverte as cores) e os estilos de título.
A fonte é a Archivo, com eixo de largura: títulos na versão larga, texto na normal.
