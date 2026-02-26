function atualizarRelogio() {
  const agora = new Date();

  // Pegamos o dia do ano (1 a 366)
  const inicioAno = new Date(agora.getFullYear(), 0, 0);
  const diff = agora - inicioAno;
  const umDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(diff / umDia);

  // Lógica do Calendário de 12 Semanas (cada mês = 7 dias)
  // Nota: Após 84 dias (12*7), o ciclo reinicia ou continua conforme sua preferência.
  // Aqui, vamos fazer o ciclo resetar a cada 84 dias para manter a estética.
  const diaNoCiclo = ((diaDoAno - 1) % 84) + 1;
  const mesAtual = Math.ceil(diaNoCiclo / 7);
  const diaNoMes = ((diaNoCiclo - 1) % 7) + 1;

  // Formatação do Relógio 24h
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  // Atualizar HTML
  document.getElementById("mes-display").innerText = `MÊS ${mesAtual}`;
  document.getElementById("dia-display").innerText = `DIA ${diaNoMes}`;
  document.getElementById("relogio").innerText =
    `${horas}:${minutos}:${segundos}`;
}

// Rodar a cada segundo
setInterval(atualizarRelogio, 1000);
atualizarRelogio();
