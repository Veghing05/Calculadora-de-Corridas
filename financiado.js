function calcularValorFinanciado() {
    const valorAutomovel = parseFloat(document.getElementById('valorAutomovel').value);
    const valorParcela = parseFloat(document.getElementById('valorParcela').value);
    const ipva = parseFloat(document.getElementById('ipva').value);
    const depreciacaoAnual = parseFloat(document.getElementById('depreciacaoAnual').value);
    const quilometrosRodados = parseFloat(document.getElementById('quilometrosRodados').value);
    const precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
    const consumoKmLitro = parseFloat(document.getElementById('consumoKmLitro').value);
    const seguroMensal = parseFloat(document.getElementById('seguroMensal').value);
    const lucroDesejado = parseFloat(document.getElementById('lucroDesejado').value) || 0;

    if (isNaN(valorAutomovel) || isNaN(valorParcela) || isNaN(ipva) || isNaN(depreciacaoAnual) ||
        isNaN(quilometrosRodados) || isNaN(precoCombustivel) || isNaN(consumoKmLitro) || isNaN(seguroMensal)) {
        document.getElementById('mensagemInformativaFinanciado').innerText = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    // Calcular custos
    const custoCombustivel = (quilometrosRodados / consumoKmLitro) * precoCombustivel;
    const custoParcelaPorKm = valorParcela / quilometrosRodados;
    const custoSeguroPorKm = seguroMensal / quilometrosRodados;
    const custoDepreciacaoPorKm = ((depreciacaoAnual / 100) * valorAutomovel) / (quilometrosRodados * 12);
    const custoIpvaPorKm = ipva / quilometrosRodados;
    const custoTotalPorKm = custoCombustivel / quilometrosRodados + custoParcelaPorKm + custoSeguroPorKm + custoDepreciacaoPorKm + custoIpvaPorKm;

    // Valor ideal por km e lucro por km
    const valorIdealKm = custoTotalPorKm + (lucroDesejado / quilometrosRodados);
    const lucroPorKm = valorIdealKm - custoTotalPorKm;

    // Calcular custo total mensal
    const custoTotalMensal = valorParcela + seguroMensal + custoCombustivel + ipva;

    // Meta diária e semanal considerando o custo e o lucro desejado
    const metaDiaria = (custoTotalMensal + lucroDesejado) / 26;  // 26 dias úteis no mês
    const metaSemanal = metaDiaria * 6;  // 6 dias úteis por semana

    // Função para formatar como dinheiro
    const formatarDinheiro = valor => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Exibir mensagem com os resultados
    document.getElementById('mensagemInformativaFinanciado').innerHTML = `
        <div class="caixa-info">
            <div class="caixa">
                <h4>Valor da Parcela</h4>
                <span class="custo">${formatarDinheiro(valorParcela)}</span>
            </div>
            <div class="caixa">
                <h4>Custo do Combustível Mensal</h4>
                <span class="custo">${formatarDinheiro(custoCombustivel)}</span>
            </div>
            <div class="caixa">
                <h4>Custo Total Mensal</h4>
                <span class="custo">${formatarDinheiro(custoTotalMensal)}</span>
            </div>
        </div>
        <div class="caixa-info">
            <div class="caixa">
                <h4>Custo Total por Quilômetro</h4>
                <span class="custo">${formatarDinheiro(custoTotalPorKm)}</span>
            </div>
            <div class="caixa">
                <h4>Meta Diária</h4>
                <span class="lucro">${formatarDinheiro(metaDiaria)}</span>
            </div>
        </div>
        <div class="caixa-info">
            <div class="caixa">
                <h4>Meta Semanal</h4>
                <span class="lucro">${formatarDinheiro(metaSemanal)}</span>
            </div>
            <div class="caixa">
                <h4>Lucro Mensal Desejado</h4>
                <span class="lucro">${formatarDinheiro(lucroDesejado)}</span>
            </div>
        </div>
        <p>Com base nas informações fornecidas, para obter um lucro líquido de 
        <span class="lucro">${formatarDinheiro(lucroDesejado)}</span>, rodando 
        <span>${quilometrosRodados.toFixed(0)} quilômetros</span> no mês, você deve aceitar viagens com tarifas de, no mínimo, 
        <span class="custo">${formatarDinheiro(valorIdealKm)}</span>.</p>
        <p>Aceitando valores superiores a este, seu lucro por quilômetro será de 
        <span class="lucro">${formatarDinheiro(lucroPorKm)}</span>.</p>
    `;
}
    