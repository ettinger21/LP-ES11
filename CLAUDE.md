# João Vittor Andrade — Landing Page (ES11 Capital)

LP pessoal, institucional e de conversão do consultor **João Vittor Andrade**, da **ES11 Capital**.
Objetivo único: levar o visitante a **Agendar Diagnóstico Gratuito** via **WhatsApp** — sem cara de
vendedor de consórcio, transmitindo planejamento patrimonial e atendimento consultivo.

Site **estático**: HTML + CSS + JavaScript vanilla, **sem build**. Abre direto no navegador
(duplo-clique no `index.html` ou Live Server).

## Stack e decisões técnicas

- **Vanilla, sem dependências de script.** Fontes via Google Fonts (`<link>`). Padrão da pasta
  `202 trilha/` (mesma arquitetura da LP AJA irmã).
- **Conteúdo editorial direto no HTML** (não renderizado por JS) → melhor SEO/Lighthouse, sem flash.
  Os **dados variáveis** (nome, cargo, WhatsApp, mensagens, redes) ficam em `js/consultor.js`, que é
  o único arquivo a mudar ao clonar para outro consultor (Felipe). Trade-off e passo a passo em
  `plan.md` e no topo de `js/consultor.js`.
- **CTA único** em toda a página → `wa.me` do João com mensagem pré-preenchida. Rótulo sempre
  **"Agendar Diagnóstico Gratuito"**. Nunca "Comprar/Contratar/Solicitar proposta".
- **Compliance** (setor financeiro): proibido "garantido", "contemplação garantida", "rentabilidade",
  "sem risco", "enriquecimento". Aviso legal no rodapé + resposta obrigatória sobre contemplação na FAQ.

## Design system

**Identidade** (fonte: briefing ES11 + site es11capital.com.br): **azul-marinho + dourado (só em
filete/detalhe) + fundos claros**. Muito espaço em branco, cards discretos, tipografia sóbria.
Sensação: confiança, clareza, patrimônio, planejamento, proximidade.

**Cores** (`css/tokens.css`):

| Token | Hex | Uso |
|---|---|---|
| `--navy-900` | `#0A1A2F` | Títulos, footer, cards de destaque, CTA final |
| `--gold` / `--gold-deep` | `#C4A24C` / `#A8863A` | Filete/detalhe, eyebrows, ícones — **nunca bloco** |
| `--paper` / `--paper-2` / `--paper-3` | `#FFFFFF` / `#F6F4EF` / `#EEF1F5` | Bases e alternância de seção |
| `--ink` | `#12233B` | Texto navy sobre claro |
| `--on-navy` | `#EAF0F8` | Texto claro sobre navy |

**Tipografia**: **Fraunces** (serif óptica, variável) para títulos e citação — tom editorial /
patrimonial; **Inter** para corpo, UI e eyebrows (uppercase, tracking). *Escolha ajustável em
checkpoint* — a ES11 usa sans puro; ver justificativa no `plan.md`.

**Motion** (princípios Emil Kowalski, em `tokens.css` + `animation.css`): `--ease-out
cubic-bezier(.23,1,.32,1)`; anima só `transform`/`opacity` (GPU); entradas via IntersectionObserver
(uma vez); botões `:active{scale(.97)}`; `reveal-media` usa blur+scale sutil (nada surge do nada);
`prefers-reduced-motion` remove movimento e mantém só fade leve.

## Estrutura

```
index.html
css/  tokens.css · base.css · sections.css · animation.css
js/   consultor.js (config/dados) · reveal.js (IO + mask-reveal) · main.js (nav, WhatsApp, analytics)
assets/img/  joao-retrato.webp (hero) · joao-es11.webp (sobre/institucional)
```

Fonte original das imagens: `joao-vittor-retrato.webp`, `joao-vittor-es11.webp` (raiz) →
copiadas com nomes limpos em `assets/img/`. Briefing: `Briefing_LPs_Consultores_ES11.pdf`.

## Seções (página única — cada uma responde a uma pergunta do visitante)

1. **Nav** flutuante (logo ES11 + João · âncoras · CTA WhatsApp). Mobile: menu compacto + CTA visível.
2. **Hero** — "Posso confiar?": headline de valor + 3 diferenciais (diagnóstico grátis; estratégia
   personalizada; dirá se o consórcio não for o melhor caminho) + CTA + retrato.
3. **Sobre** — "Quem é ele?": esporte→disciplina, iFood/Loggi/XP→ES11, filosofia + citação de destaque.
4. **Para quem é** — cards (Investidores em destaque · Empresários · Profissionais liberais · Diversificação).
5. **Especialidades** — 3 especialidades numeradas + lista "decisões em que o diagnóstico ajuda".
6. **Como funciona** — 5 passos (Objetivo → Diagnóstico → Cenários → Estratégia → Acompanhamento).
7. **Institucional ES11** — bloco navy com o vínculo + links (site ES11, Instagram).
8. **Dúvidas (FAQ)** — `<details>` acessível, inclui a resposta obrigatória sobre contemplação.
9. **CTA final** — card navy com o fechamento → Agendar Diagnóstico Gratuito.
10. **Footer** — navegação, contato, aviso legal/compliance.

## SEO / Analytics

- `<head>`: title, meta description, canonical, Open Graph + Twitter, favicon SVG inline, `lang=pt-BR`.
- **JSON-LD** (`@graph`): `ProfilePage` + `Person` (jobTitle, worksFor Organization ES11, address SP,
  sameAs Instagram) + `Organization` + `FAQPage`.
- **Eventos** (em `main.js`, no-op sem gtag/dataLayer): `consultant_page_view`, `whatsapp_click`,
  `instagram_click`, `es11_site_click` — com `consultant_id`, `cta_position`, `page_type`.

## Convenções

- HTML semântico (`header`/`main`/`section`/`article`/`footer`), H1 único, hierarquia H2/H3.
- Acessibilidade é piso: skip-link, `:focus-visible`, `alt` descritivo, FAQ por teclado,
  contraste (ouro só como filete), `prefers-reduced-motion`.
- Imagens WebP com `aspect-ratio` (evita CLS); hero com `preload`+`fetchpriority=high`, resto `lazy`.
- Copy no tom consultivo: sem promessas, verbos ativos, adequação ao perfil.
- **Clonar para novo consultor**: editar só `js/consultor.js` + imagens + textos/SEO do `index.html`
  (passo a passo no topo de `consultor.js`). Nenhum CSS/JS de layout muda.
