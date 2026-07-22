# Deploy — joaovittorandrade.com.br (Vercel)

Site **estático**, sem build. A Vercel só precisa servir os arquivos como estão.

## 1. Criar o projeto na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório `LP-ES11`.
2. Em **Framework Preset**, escolha **Other**.
3. Deixe **Build Command** e **Output Directory** *vazios* — não há build.
4. Clique em **Deploy**.

O primeiro deploy sai numa URL `*.vercel.app`. O site já funciona ali, mas as
meta tags apontam para o domínio final (passo 2) — a prévia de link só fica
correta depois que o domínio estiver ativo.

## 2. Apontar o domínio

No projeto: **Settings → Domains → Add** → `joaovittorandrade.com.br`.

A Vercel mostra os registros de DNS a criar no seu registrador (Registro.br ou onde
o domínio estiver):

- **A** `@` → `76.76.21.21`, ou
- **CNAME** `www` → `cname.vercel-dns.com`

Adicione também `www.joaovittorandrade.com.br` e configure **redirect para o
domínio sem www**, para não existirem duas versões do site (o canonical aponta
para a versão sem `www`).

> DNS pode levar de minutos a algumas horas para propagar.

## 3. Ativar o Vercel Analytics

**Projeto → Analytics → Enable.** Só isso — o script já está na página
(`/_vercel/insights/script.js`) e passa a receber dados sozinho.

- **Plano Hobby:** conta visitas, origem do tráfego e páginas vistas.
- **Plano Pro:** libera os *eventos personalizados* já instrumentados no código:
  `whatsapp_click` (com `cta_position`: nav, hero, faq, cta_final, footer),
  `consultant_page_view`, `instagram_click`, `es11_site_click`.

No plano Hobby o código dos eventos continua rodando sem erro — eles apenas não
são registrados.

## 4. Conferir depois do deploy

- [ ] Abrir o site no celular e no desktop
- [ ] Clicar em todos os CTAs e ver se o WhatsApp abre com a mensagem preenchida
- [ ] Colar a URL numa conversa do WhatsApp e conferir se a **prévia com a foto**
      aparece. Se não aparecer, limpe o cache do scraper em
      [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
- [ ] Validar os dados estruturados em
      [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- [ ] Cadastrar o site no [Google Search Console](https://search.google.com/search-console)
      e enviar `https://joaovittorandrade.com.br/sitemap.xml`

## Se o domínio mudar

O endereço aparece em 4 arquivos. Para trocar de uma vez (PowerShell, na pasta do projeto):

```powershell
$antigo = "https://joaovittorandrade.com.br"
$novo   = "https://NOVO-DOMINIO.com.br"
foreach ($f in "index.html","sitemap.xml","robots.txt") {
  $c = Get-Content $f -Raw -Encoding UTF8
  [System.IO.File]::WriteAllText((Resolve-Path $f), $c.Replace($antigo,$novo), (New-Object System.Text.UTF8Encoding($false)))
}
```

Depois confira se sobrou algo: `Select-String -Path index.html,sitemap.xml,robots.txt -Pattern "joaovittorandrade"`

## O que NÃO é publicado

O `.vercelignore` impede que estes arquivos vão ao ar — em especial o briefing,
que é documento interno e ficaria baixável por qualquer pessoa:

`Briefing_LPs_Consultores_ES11.pdf`, `CLAUDE.md`, `plan.md`, `DEPLOY.md` e as
imagens originais duplicadas da raiz.
