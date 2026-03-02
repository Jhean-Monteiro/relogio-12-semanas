const traducoes = {
  pt: {
    ano: "ANO",
    mes: "MÊS",
    dia: "DIA",
    concluido: "do ano concluído",
  },
  en: {
    ano: "YEAR",
    mes: "MONTH",
    dia: "DAY",
    concluido: "of the year completed",
  },
};

// detectamos o idioma do sistema (ex: 'pt-BR' vira 'pt')
const idiomaUsuario = navigator.language.slice(0, 2);
// se o sistema estiver em inglês, usa 'en'. Se não, o padrão é 'pt'.
const lang = traducoes[idiomaUsuario] || traducoes["pt"];


function atualizarRelogio() {
  const agora = new Date();

  // marca a data de inicio do relogio como o dia 1 de janeiro de 2026 (talvez eu mude depois)
  const dataInicio = new Date("2026-01-01T00:00:00");

  const diffEmMs = agora - dataInicio;
  const umDia = 1000 * 60 * 60 * 24;
  const diasDesdeOInicio = Math.floor(diffEmMs / umDia);

  // lógica das 12 semanas (84 dias por ano)
  const cicloTotal = 84;
  const anoAtual = Math.floor(diasDesdeOInicio / cicloTotal) + 1;
  const diaNoCiclo =
    (((diasDesdeOInicio % cicloTotal) + cicloTotal) % cicloTotal) + 1;

  const mesAtual = Math.ceil(diaNoCiclo / 7);
  const diaNoMes = ((diaNoCiclo - 1) % 7) + 1;

  // atualização dos textos (com verificação de segurança)
  const elAno = document.getElementById("ano-display");
  const elMes = document.getElementById("mes-display");
  const elDia = document.getElementById("dia-display");
  const elRelogio = document.getElementById("relogio");

  // (testando)
  if (elAno) elAno.innerText = `${lang.ano} ${anoAtual}`;
  if (elMes) elMes.innerText = `${lang.mes} ${mesAtual}`;
  if (elDia) elDia.innerText = `${lang.dia} ${diaNoMes}`;

  if (elAno) elAno.innerText = `ANO ${anoAtual}`;
  if (elMes) elMes.innerText = `MÊS ${mesAtual}`;
  if (elDia) elDia.innerText = `DIA ${diaNoMes}`;

  // relógio das 24h
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");
  if (elRelogio) elRelogio.innerText = `${horas}:${minutos}:${segundos}`;

  // barra de Progresso
  const percentual = (diaNoCiclo / cicloTotal) * 100;
  const bar = document.getElementById("progress-bar");
  const percentText = document.getElementById("percent-text");

  // verifica se o elemento da barra de progresso existe no HTML antes de aplicar estilos
  if (bar) {
    // define a largura da barra proporcional ao progresso do ciclo de 12 semanas (84 dias)
    bar.style.width = `${percentual}%`;

    // gatilho de urgência: Se o "ano" estiver mais de 75% concluído (últimas 2 semanas)
    if (percentual > 75) {
      // Muda a cor para tons quentes/alerta (Vermelho/Laranja) para gerar senso de pressa
      bar.style.background = "linear-gradient(90deg, #ff4444, #ffbb00)";
      bar.style.boxShadow = "0 0 10px #ff4444";
    } else {
      // mantém cores frias/tranquilas (Verde/Azul) enquanto o prazo ainda está confortável
      bar.style.background = "linear-gradient(90deg, #00ff88, #00ccff)";
      bar.style.boxShadow = "0 0 10px #00ff88";
    }
  }

  // atualiza o texto descritivo com a porcentagem exata, formatada com uma casa decimal
  if (percentText)
    percentText.innerText = `${percentual.toFixed(1)}% ${lang.concluido}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();
