// Função para calcular valores do veículo alugado
function calcularValorAlugado() {
  const aluguelMensal = parseFloat(document.getElementById('aluguelMensal').value);
  const quilometrosRodados = parseFloat(document.getElementById('quilometrosRodados').value);
  const precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
  const consumoKmLitro = parseFloat(document.getElementById('consumoKmLitro').value);
  const lucroDesejado = parseFloat(document.getElementById('lucroDesejado').value);

  const custoCombustivel = (quilometrosRodados / consumoKmLitro) * precoCombustivel;
  const custoTotalMensal = aluguelMensal + custoCombustivel;
  const custoPorKm = custoTotalMensal / quilometrosRodados;
  const tarifaMinima = (custoTotalMensal + lucroDesejado) / quilometrosRodados;
  const lucroPorKm = tarifaMinima - custoPorKm;

  const mensagemInformativa = document.getElementById('mensagemInformativa');
  mensagemInformativa.innerHTML = `
      <p>Lucro mensal desejado: R$ ${lucroDesejado.toFixed(2).replace('.', ',')}</p>
      <p>Custo mensal: R$ ${custoTotalMensal.toFixed(2).replace('.', ',')}</p>
      <p>Custo por quilômetro: R$ ${custoPorKm.toFixed(2).replace('.', ',')}</p>
      <p>Com base nas informações fornecidas, para obter um lucro líquido de R$ ${lucroDesejado.toFixed(2).replace('.', ',')}, rodando ${quilometrosRodados.toFixed(2).replace('.', ',')} quilômetros no mês, você deve aceitar viagens com tarifas de, no mínimo, R$ ${tarifaMinima.toFixed(2).replace('.', ',')}.</p>
      <p>Aceitando valores superiores a este, seu lucro por quilômetro será de R$ ${lucroPorKm.toFixed(2).replace('.', ',')}.</p>
  `;
}

// Função para calcular valores do veículo financiado
function calcularValorFinanciado() {
  const valorAutomovel = parseFloat(document.getElementById('valorAutomovel').value);
  const valorParcela = parseFloat(document.getElementById('valorParcela').value);
  const ipva = parseFloat(document.getElementById('ipva').value);
  const depreciacaoAnual = parseFloat(document.getElementById('depreciacaoAnual').value) / 100;
  const quilometrosRodados = parseFloat(document.getElementById('quilometrosRodados').value);
  const seguroMensal = parseFloat(document.getElementById('seguroMensal').value);
  const custoPneus = parseFloat(document.getElementById('custoPneus').value);
  const vidaUtilPneus = parseFloat(document.getElementById('vidaUtilPneus').value);
  const custoTrocaOleo = parseFloat(document.getElementById('custoTrocaOleo').value);
  const frequenciaTrocaOleo = parseFloat(document.getElementById('frequenciaTrocaOleo').value);
  const precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
  const consumoKmLitro = parseFloat(document.getElementById('consumoKmLitro').value);
  const lucroDesejado = parseFloat(document.getElementById('lucroDesejado').value);

  const depreciacaoMensal = (valorAutomovel * depreciacaoAnual) / 12;
  const custoMensalPneus = (custoPneus / vidaUtilPneus) * quilometrosRodados;
  const custoMensalTrocaOleo = (custoTrocaOleo / frequenciaTrocaOleo) * quilometrosRodados;
  const custoCombustivel = (quilometrosRodados / consumoKmLitro) * precoCombustivel;
  const custoTotalMensal = valorParcela + ipva + depreciacaoMensal + seguroMensal + custoMensalPneus + custoMensalTrocaOleo + custoCombustivel;
  const custoPorKm = custoTotalMensal / quilometrosRodados;
  const tarifaMinima = (custoTotalMensal + lucroDesejado) / quilometrosRodados;
  const lucroPorKm = tarifaMinima - custoPorKm;

  const mensagemInformativa = document.getElementById('mensagemInformativa');
  mensagemInformativa.innerHTML = `
      <p>Lucro mensal desejado: R$ ${lucroDesejado.toFixed(2).replace('.', ',')}</p>
      <p>Custo mensal: R$ ${custoTotalMensal.toFixed(2).replace('.', ',')}</p>
      <p>Custo por quilômetro: R$ ${custoPorKm.toFixed(2).replace('.', ',')}</p>
      <p>Com base nas informações fornecidas, para obter um lucro líquido de R$ ${lucroDesejado.toFixed(2).replace('.', ',')}, rodando ${quilometrosRodados.toFixed(2).replace('.', ',')} quilômetros no mês, você deve aceitar viagens com tarifas de, no mínimo, R$ ${tarifaMinima.toFixed(2).replace('.', ',')}.</p>
      <p>Aceitando valores superiores a este, seu lucro por quilômetro será de R$ ${lucroPorKm.toFixed(2).replace('.', ',')}.</p>
  `;
}
