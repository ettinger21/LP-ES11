/* ============================================================
   ES11 · Config única do consultor  (FONTE DE DADOS VARIÁVEIS)
   ------------------------------------------------------------
   Este é o único arquivo que muda ao clonar a página para outro
   consultor (ex.: Felipe Soares). Ele centraliza os dados de
   contato usados para montar os links de WhatsApp e os eventos
   de analytics. O conteúdo editorial (textos das seções) vive no
   index.html — ver PASSO A PASSO no fim deste arquivo.
   ============================================================ */

window.ES11_CONSULTOR = {
  id: "joao-vittor-andrade",
  nome: "João Vittor Andrade",
  primeiroNome: "João",
  cargo: "Fundador e Consultor Financeiro",
  local: "São Paulo · SP",

  whatsapp: {
    // Número no formato internacional, só dígitos (55 + DDD + número)
    numero: "5511976972750",
    display: "(11) 97697-2750",
    mensagemPadrao:
      "Olá, João. Acessei seu perfil no site da ES11 e gostaria de conversar sobre meu planejamento patrimonial.",
    mensagemDuvida:
      "Olá, João. Acessei seu perfil no site da ES11 e tenho uma dúvida sobre planejamento patrimonial.",
  },

  instagram: "https://instagram.com/joao.vittorandrade",
  siteEs11: "https://www.es11capital.com.br",
};

/* Monta uma URL wa.me com mensagem pré-preenchida. */
window.ES11_waLink = function (mensagem) {
  var c = window.ES11_CONSULTOR;
  var msg = mensagem || c.whatsapp.mensagemPadrao;
  return "https://wa.me/" + c.whatsapp.numero + "?text=" + encodeURIComponent(msg);
};

/* ------------------------------------------------------------
   PASSO A PASSO — clonar esta página para um novo consultor
   ------------------------------------------------------------
   1. Copie a pasta inteira (ex.: "LP ES11" -> "LP ES11 - Felipe").
   2. Troque as imagens em assets/img/ (retrato + foto institucional).
   3. Edite ESTE arquivo (nome, cargo, número/mensagens, redes).
   4. No index.html, atualize: <title>, meta description/OG, JSON-LD
      (Person: name/jobTitle/sameAs), H1, e os textos das seções
      (Hero, Sobre, Para quem é, Especialidades, FAQ).
   5. Os hrefs de WhatsApp no HTML são fallback sem-JS; o main.js os
      re-sincroniza a partir deste arquivo — mantê-los coerentes é o ideal.
   Nenhum CSS/JS de layout precisa ser alterado.
   ------------------------------------------------------------ */
