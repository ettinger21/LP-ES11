# plan.md — LP João Vittor Andrade (ES11 Capital)

Documento de decisões de UX, design e implementação. Objetivo: qualquer dev assume o projeto sem
perda de contexto.

## 1. Objetivo e estratégia de UX

A página tem **um único objetivo de conversão**: fazer o visitante **iniciar uma conversa no
WhatsApp** por meio de um **Diagnóstico Gratuito**. Não vende consórcio nem serviços — vende a
primeira conversa.

O fluxo das seções foi desenhado para responder, em ordem, às perguntas mentais do visitante:

| Seção | Pergunta que responde |
|---|---|
| Hero | "Posso confiar nessa pessoa?" |
| Sobre | "Quem é ele?" |
| Para quem é | "Isso serve para mim?" |
| Especialidades | "Como ele pode me ajudar?" |
| Como funciona | "O que acontece depois que eu chamo?" |
| Institucional ES11 | "Ele tem estrutura por trás?" |
| Dúvidas (FAQ) | "E as minhas objeções?" |
| CTA final | "Qual é o próximo passo?" |

A confiança é construída **antes** de qualquer pedido: o Hero já afirma que o diagnóstico é gratuito,
que a estratégia é personalizada e que, se o consórcio não for o melhor caminho, o João dirá isso.

## 2. Decisões de design

- **Identidade** extraída do briefing ES11 e do site oficial: azul-marinho estrutural + dourado
  **só em filete/detalhe** (nunca bloco, nunca ouro sobre ouro) + fundos claros com muito espaço em
  branco. Cards discretos, sombras de relevo (não gloss), tipografia sóbria.
- **Tipografia — Fraunces (serif) + Inter.** O site da ES11 usa sans puro; optei por um display serif
  óptico (Fraunces) nos títulos/citação para dar peso "editorial/patrimonial" e diferenciar a LP de
  um template genérico, mantendo Inter em todo o corpo/UI para legibilidade e proximidade com a marca.
  **É a decisão mais discutível** e está isolada em `--font-display` (tokens.css): trocar para
  all-sans é um único ajuste. Registrar em checkpoint se o cliente preferir 100% fiel à ES11.
- **Motion discreto** (Emil Kowalski): fade-up, mask-reveal por linha nos títulos, stagger em
  cards/listas, blur+scale sutil nas imagens. Tudo dispara **uma vez** no scroll e respeita
  `prefers-reduced-motion`. Nada de parallax pesado ou animação que distraia.
  **Exceção deliberada:** a Hero revela no *load*, não via IntersectionObserver — a primeira
  dobra (e principalmente o CTA) nunca pode depender de scroll para existir.

### Ritmo de faixas (por que o institucional é claro)

Toda seção é uma **faixa de ponta a ponta**; não existe card flutuante dentro de faixa. A
alternância de fundos dá o ritmo:

| Seção | Fundo |
|---|---|
| Hero, Sobre | `--paper` |
| Para quem é | `--paper-2` |
| Especialidades | `--paper` |
| Como funciona | `--paper-3` |
| **Institucional ES11** | `--paper` + filetes dourados |
| Dúvidas | `--paper-2` |
| CTA final + Rodapé | `--navy-900` (full-bleed) |

O institucional já foi um card navy flutuante e destoava — parecia um bloco solto numa página
clara. Ele virou faixa clara por uma razão de hierarquia: **o navy é reservado ao fecho**. Cor
escassa carrega mais peso, então concentrar o escuro no CTA + rodapé transforma a chegada ali num
momento de "é agora". O institucional é conteúdo de credibilidade, não o clímax — sua identidade
vem dos filetes dourados e da logo em cores originais, não de fundo escuro.

## 3. Divergências do briefing (com justificativa)

1. **Header.** O prompt pedia "só logo + botão"; o PDF pedia nav completa (Sobre, Especialidades,
   Como funciona, Conteúdos, Dúvidas). Adotei um **meio-termo**: logo + 4 âncoras curtas + CTA de
   destaque. Motivo: navegação por âncoras melhora a orientação numa LP longa sem poluir; removi
   "Conteúdos" porque o **blog está fora do escopo desta fase** (decisão de escopo confirmada).
2. **CTA.** Unifiquei "Agendar Diagnóstico Gratuito" (prompt) com o destino WhatsApp do PDF — e o
   próprio site da ES11 usa exatamente esse rótulo. Todos os CTAs abrem `wa.me` com mensagem
   pré-preenchida do PDF. Não há CTAs de "comprar/contratar".
3. **Blog / multi-consultor.** Fora do escopo desta entrega (foco em conversão). A **reutilização**
   foi preservada mesmo sem framework: dados variáveis isolados em `js/consultor.js` + seções
   componentizadas + passo a passo de clonagem. Migrar para blog/SSG depois não exige refazer o design.
4. **Conteúdo em HTML (não data-driven por JS).** O PDF pede "dados separados da apresentação".
   Para uma LP estática com prioridade de SEO/Lighthouse, renderizar textos por JS prejudicaria
   indexação e criaria flash. Solução: conteúdo no HTML (crawlável) + config de contato/analytics
   separada em `consultor.js`. Atende ao espírito do requisito sem custo de performance.

## 4. Identidade visual (resumo aplicável)

- Cores e tipografia: ver tabela em `CLAUDE.md` e `css/tokens.css`.
- Filete de ouro como assinatura recorrente (eyebrows, molduras de imagem, separador do footer,
  bordas de card no hover).
- Imagens em molduras com `box-shadow` de relevo + hairline dourado interno.

## 5. Plano de implementação (executado)

1. Tokens → base (nav/botões/footer/primitivos) → `index.html` (todas as seções + JSON-LD) →
   sections.css → animation.css.
2. `consultor.js` (config) → `reveal.js` (IntersectionObserver + mask-reveal) → `main.js`
   (nav sticky/mobile, sync WhatsApp, analytics).
3. Docs (`CLAUDE.md`, este `plan.md`).

## 6. Performance / SEO / A11y

- WebP + `aspect-ratio` (sem CLS); hero `preload`/`fetchpriority=high`, demais `loading=lazy`.
- Fontes com `preconnect` + `display=swap`. CSS modular sem framework; JS `defer` sem libs.
- JSON-LD ProfilePage/Person/Organization/FAQPage; Open Graph/Twitter; canonical; favicon inline.
- Skip-link, foco visível, FAQ acessível (`<details>`), contraste forte, reduced-motion.
- **Meta Lighthouse ≥ 95** em todas as categorias.

## 7. Verificação

- Abrir `index.html` (Live Server) e conferir em 360 / 768 / 1280 px: sem overflow horizontal, cada
  seção redesenhada no mobile, header com estado ao rolar, menu mobile abre/fecha, reveals no scroll,
  FAQ abre/fecha (mouse + teclado).
- **Todos os CTAs** devem abrir `wa.me/5511976972750` com a mensagem correta (a da FAQ é a de dúvida).
- Validar JSON-LD (Rich Results Test) e rodar Lighthouse.
- Conferir compliance: nenhuma palavra proibida; aviso no rodapé; resposta de contemplação na FAQ.

## 8. Próximos passos possíveis (fora do escopo atual)

- Blog do consultor (listagem + artigos + BlogPosting) — provável migração para Astro/SSG.
- Página do Felipe Soares reusando esta base (clonagem via `consultor.js`).
- Integração real de analytics (GA4/GTM) — os eventos já estão instrumentados.
