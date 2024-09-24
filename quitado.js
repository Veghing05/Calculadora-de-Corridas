function calcularValorQuitado() {
    const valorAutomovel = parseFloat(document.getElementById('valorAutomovelQuitado').value);
    const ipva = parseFloat(document.getElementById('ipvaQuitado').value);
    const depreciacaoAnual = parseFloat(document.getElementById('depreciacaoAnualQuitado').value);
    const quilometrosRodados = parseFloat(document.getElementById('quilometrosRodadosQuitado').value);
    const precoCombustivel = parseFloat(document.getElementById('precoCombustivelQuitado').value);
    const consumoKmLitro = parseFloat(document.getElementById('consumoKmLitroQuitado').value);
    const seguroMensal = parseFloat(document.getElementById('seguroMensalQuitado').value);
    const lucroDesejado = parseFloat(document.getElementById('lucroDesejadoQuitado').value) || 0;

    if (isNaN(valorAutomovel) || isNaN(ipva) || isNaN(depreciacaoAnual) ||
        isNaN(quilometrosRodados) || isNaN(precoCombustivel) || isNaN(consumoKmLitro) || isNaN(seguroMensal)) {
        document.getElementById('mensagemInformativaQuitado').innerText = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    // Calcular custos
    const custoCombustivel = (quilometrosRodados / consumoKmLitro) * precoCombustivel;
    const custoSeguroPorKm = seguroMensal / quilometrosRodados;
    const custoDepreciacaoPorKm = ((depreciacaoAnual / 100) * valorAutomovel) / (quilometrosRodados * 12);
    const custoIpvaPorKm = ipva / quilometrosRodados;
    const custoTotalPorKm = custoCombustivel / quilometrosRodados + custoSeguroPorKm + custoDepreciacaoPorKm + custoIpvaPorKm;

    // Valor ideal por km e lucro por km
    const valorIdealKm = custoTotalPorKm + (lucroDesejado / quilometrosRodados);
    const lucroPorKm = valorIdealKm - custoTotalPorKm;

    // Calcular custo total mensal
    const custoTotalMensal = seguroMensal + custoCombustivel + ipva;

    // Meta diária e semanal considerando o custo e o lucro desejado
    const metaDiaria = (custoTotalMensal + lucroDesejado) / 26;  // 26 dias úteis no mês
    const metaSemanal = metaDiaria * 6;  // 6 dias úteis por semana

    // Função para formatar como dinheiro
    const formatarDinheiro = valor => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Exibir mensagem com os resultados
    document.getElementById('mensagemInformativaQuitado').innerHTML = `
        <div class="caixa-info">
            <div class="caixa">
                <h4>Custo do IPVA Anual</h4>
                <span class="custo">${formatarDinheiro(ipva)}</span>
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
