function calcularValorQuitado() {
    const valorAutomovelQuitado = parseFloat($('#valorAutomovelQuitado').val());
    const quilometrosRodadosQuitado = parseFloat($('#quilometrosRodadosQuitado').val());
    const precoCombustivelQuitado = parseFloat($('#precoCombustivelQuitado').val());
    const consumoKmLitroQuitado = parseFloat($('#consumoKmLitroQuitado').val());
    const seguroMensalQuitado = parseFloat($('#seguroMensalQuitado').val());
    const lucroDesejadoQuitado = parseFloat($('#lucroDesejadoQuitado').val()) || 0;

    // Verifica se todos os campos estão preenchidos corretamente
    if (isNaN(valorAutomovelQuitado) || isNaN(quilometrosRodadosQuitado) || 
        isNaN(precoCombustivelQuitado) || isNaN(consumoKmLitroQuitado) || 
        isNaN(seguroMensalQuitado)) {
        $('#mensagemInformativaQuitado').text("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Adicionando verificação se quilometrosRodados é zero
    if (quilometrosRodadosQuitado === 0) {
        $('#mensagemInformativaQuitado').text("Quilômetros rodados não pode ser zero.");
        return;
    }

    // Calcular IPVA e depreciação anual
    const ipvaQuitado = valorAutomovelQuitado * 0.04;  // 4% do valor do automóvel
    const depreciacaoAnualQuitado = valorAutomovelQuitado * 0.15;  // Exemplo de 15% de depreciação anual

    // Calcular custos por km
    const custoCombustivelQuitado = (quilometrosRodadosQuitado / consumoKmLitroQuitado) * precoCombustivelQuitado;
    const custoSeguroPorKmQuitado = seguroMensalQuitado / quilometrosRodadosQuitado;
    const custoTotalPorKmQuitado = (custoCombustivelQuitado + custoSeguroPorKmQuitado + ipvaQuitado) / quilometrosRodadosQuitado;

    // Valor ideal por km e lucro por km
    const valorIdealKmQuitado = custoTotalPorKmQuitado + (lucroDesejadoQuitado / quilometrosRodadosQuitado);
    const lucroPorKmQuitado = valorIdealKmQuitado - custoTotalPorKmQuitado;

    // Calcular custo total mensal
    const custoTotalMensalQuitado = custoCombustivelQuitado + seguroMensalQuitado + ipvaQuitado;

    // Meta diária e semanal considerando o custo e o lucro desejado
    const metaDiariaQuitado = (custoTotalMensalQuitado + lucroDesejadoQuitado) / 26;  // 26 dias úteis no mês
    const metaSemanalQuitado = metaDiariaQuitado * 6;  // 6 dias úteis por semana

    // Função para formatar como dinheiro
    const formatarDinheiro = valor => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Exibir mensagem com os resultados
    $('#mensagemInformativaQuitado').html(`
        <div class="caixa-info">
            <div class="caixa">
                <h4>Custo do Combustível Mensal</h4>
                <span class="custo">${formatarDinheiro(custoCombustivelQuitado)}</span>
            </div>
            <div class="caixa">
                <h4>IPVA</h4>
                <span class="custo">${formatarDinheiro(ipvaQuitado)}</span>
            </div>
            <div class="caixa">
                <h4>Custo Total Mensal</h4>
                <span class="custo">${formatarDinheiro(custoTotalMensalQuitado)}</span>
            </div>
        </div>
        <div class="caixa-info">
            <div class="caixa">
                <h4>Custo Total por Quilômetro</h4>
                <span class="custo">${formatarDinheiro(custoTotalPorKmQuitado)}</span>
            </div>
            <div class="caixa">
                <h4>Meta Diária</h4>
                <span class="lucro">${formatarDinheiro(metaDiariaQuitado)}</span>
            </div>
        </div>
        <div class="caixa-info">
            <div class="caixa">
                <h4>Meta Semanal</h4>
                <span class="lucro">${formatarDinheiro(metaSemanalQuitado)}</span>
            </div>
            <div class="caixa">
                <h4>Lucro Mensal Desejado</h4>
                <span class="lucro">${formatarDinheiro(lucroDesejadoQuitado)}</span>
            </div>
        </div>
        <p>Com base nas informações fornecidas, para obter um lucro líquido de 
        <span class="lucro">${formatarDinheiro(lucroDesejadoQuitado)}</span>, rodando 
        <span>${quilometrosRodadosQuitado.toFixed(0)} quilômetros</span> no mês, você deve aceitar viagens com tarifas de, no mínimo, 
        <span class="custo">${formatarDinheiro(valorIdealKmQuitado)}</span>.</p>
        <p>Aceitando valores superiores a este, seu lucro por quilômetro será de 
        <span class="lucro">${formatarDinheiro(lucroPorKmQuitado)}</span>.</p>
    `);
}

// Adicione um listener ao botão de calcular
$(document).ready(function() {
    $('.btn-calcular').on('click', calcularValorQuitado);
});
