function calcularValorIdeal() {
  // Obtendo os valores dos campos do formulário
  const aluguelMensal = parseFloat(document.getElementById('aluguelMensal').value);
  const quilometrosRodados = parseFloat(document.getElementById('quilometrosRodados').value);
  const precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
  const consumoKmLitro = parseFloat(document.getElementById('consumoKmLitro').value);
  const lucroDesejado = parseFloat(document.getElementById('lucroDesejado').value);

  // Calculando o custo do combustível por mês
  const custoCombustivel = (quilometrosRodados / consumoKmLitro) * precoCombustivel;

  // Calculando o custo total mensal
  const custoTotalMensal = aluguelMensal + custoCombustivel;

  // Calculando o custo por quilômetro
  const custoPorKm = custoTotalMensal / quilometrosRodados;

  // Calculando a tarifa mínima para obter o lucro desejado
  const tarifaMinima = (custoTotalMensal + lucroDesejado) / quilometrosRodados;

  // Calculando o lucro por quilômetro com a tarifa mínima
  const lucroPorKm = tarifaMinima - custoPorKm;

  // Exibindo o resultado
  const mensagemInformativa = document.getElementById('mensagemInformativa');
  mensagemInformativa.innerHTML = `
      <p>Lucro mensal desejado: R$ ${lucroDesejado.toFixed(2).replace('.', ',')}</p>
      <p>Custo mensal: R$ ${custoTotalMensal.toFixed(2).replace('.', ',')}</p>
      <p>Custo por quilômetro: R$ ${custoPorKm.toFixed(2).replace('.', ',')}</p>
      <p>Com base nas informações fornecidas, para obter um lucro líquido de R$ ${lucroDesejado.toFixed(2).replace('.', ',')}, rodando ${quilometrosRodados.toFixed(2).replace('.', ',')} quilômetros no mês, você deve aceitar viagens com tarifas de, no mínimo, R$ ${tarifaMinima.toFixed(2).replace('.', ',')}.</p>
      <p>Aceitando valores superiores a este, seu lucro por quilômetro será de R$ ${lucroPorKm.toFixed(2).replace('.', ',')}.</p>
  `;
}
