const traducoes = {
  pt: {
    ano: "ANO",
    mes: "SEMANA",
    dia: "DIA",
    concluido: "do ano concluído",
  },
  en: {
    ano: "YEAR",
    mes: "WEEK",
    dia: "DAY",
    concluido: "of the year completed",
  },
};

// detecta idioma do sistema (ex: 'pt-BR' vira 'pt')
const idiomaUsuario = navigator.language.slice(0, 2);
// se o sistema estiver em inglês, usa 'en'. Caso contrário, o padrão é 'pt'.
const lang = traducoes[idiomaUsuario] || traducoes["pt"];

function atualizarRelogio() {
  const agora = new Date();

  // marca a data de início do relógio
  const dataInicio = new Date("2026-01-01T00:00:00");

  const diffEmMs = agora - dataInicio;
  const umDia = 1000 * 60 * 60 * 24;
  const diasDesdeOInicio = Math.floor(diffEmMs / umDia);

  // lógica das 12 semanas (84 dias por ano)
  const cicloTotal = 84;
  const anoAtual = Math.floor(diasDesdeOInicio / cicloTotal) + 1;
  const diaNoCiclo = (((diasDesdeOInicio % cicloTotal) + cicloTotal) % cicloTotal) + 1;

  const mesAtual = Math.ceil(diaNoCiclo / 7);
  const diaNoMes = ((diaNoCiclo - 1) % 7) + 1;

  // mudei as variaveis aqui
  const campoAno = document.getElementById("ano-display");
  const campoMes = document.getElementById("mes-display");
  const campoDia = document.getElementById("dia-display");
  const campoRelogio = document.getElementById("relogio");

  // (correção)
  if (campoAno) campoAno.innerText = `${lang.ano} ${anoAtual}`;
  if (campoMes) campoMes.innerText = `${lang.mes} ${mesAtual}`;
  if (campoDia) campoDia.innerText = `${lang.dia} ${diaNoMes}`;

  // relógio das 24h
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");
  if (campoRelogio) campoRelogio.innerText = `${horas}:${minutos}:${segundos}`;

  // barra de Progresso
  const percentual = (diaNoCiclo / cicloTotal) * 100;
  const bar = document.getElementById("progress-bar");
  const percentText = document.getElementById("percent-text");

  if (bar) {
    bar.style.width = `${percentual}%`;

    if (percentual > 75) {
      bar.style.background = "linear-gradient(90deg, #ff4444, #ffbb00)";
      bar.style.boxShadow = "0 0 10px #ff4444";
    } else {
      bar.style.background = "linear-gradient(90deg, #00ff88, #00ccff)";
      bar.style.boxShadow = "0 0 10px #00ff88";
    }
  }

  // atualiza o texto descritivo com a tradução correta
  if (percentText)
    percentText.innerText = `${percentual.toFixed(1)}% ${lang.concluido}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();
