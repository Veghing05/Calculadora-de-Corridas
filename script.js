// Função para formatar valores em reais
function formatarValor(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// Função para obter valores dos campos do formulário
function obterValor(id) {
  const valor = parseFloat(document.getElementById(id).value);
  return isNaN(valor) ? 0 : valor;
}

// Função para calcular valores do veículo alugado
function calcularValorIdeal() {
  const aluguelMensal = obterValor('aluguelMensal');
  const quilometrosRodados = obterValor('quilometrosRodados');
  const precoCombustivel = obterValor('precoCombustivel');
  const consumoKmLitro = obterValor('consumoKmLitro');
  const lucroDesejado = obterValor('lucroDesejado');

  if (quilometrosRodados <= 0 || consumoKmLitro <= 0) {
      alert('Por favor, insira valores válidos para quilômetros rodados e consumo de combustível.');
      return;
  }

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
      <p>Lucro mensal desejado: ${formatarValor(lucroDesejado)}</p>
      <p>Custo mensal: ${formatarValor(custoTotalMensal)}</p>
      <p>Custo por quilômetro: ${formatarValor(custoPorKm)}</p>
      <p>Com base nas informações fornecidas, para obter um lucro líquido de ${formatarValor(lucroDesejado)}, rodando ${quilometrosRodados} quilômetros no mês, você deve aceitar viagens com tarifas de, no mínimo, ${formatarValor(tarifaMinima)}.</p>
      <p>Aceitando valores superiores a este, seu lucro por quilômetro será de ${formatarValor(lucroPorKm)}.</p>
  `;
}
