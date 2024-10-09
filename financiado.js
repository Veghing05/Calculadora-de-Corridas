function calcularValorIdeal() {
    const valorAutomovel = parseFloat($('#valorAutomovel').val());
    const valorParcela = parseFloat($('#valorParcela').val());
    const quilometrosRodados = parseFloat($('#quilometrosRodados').val());
    const precoCombustivel = parseFloat($('#precoCombustivel').val());
    const consumoKmLitro = parseFloat($('#consumoKmLitro').val());
    const seguroMensal = parseFloat($('#seguroMensal').val());
    const lucroDesejado = parseFloat($('#lucroDesejado').val()) || 0;

    if (isNaN(valorAutomovel) || isNaN(valorParcela) || isNaN(quilometrosRodados) || 
        isNaN(precoCombustivel) || isNaN(consumoKmLitro) || isNaN(seguroMensal)) {
        $('#mensagemInformativaFinanciado').text("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Adicionando verificação se quilometrosRodados é zero
    if (quilometrosRodados === 0) {
        $('#mensagemInformativaFinanciado').text("Quilômetros rodados não pode ser zero.");
        return;
    }

    // Calcular IPVA
    const ipva = valorAutomovel * 0.04;  // 4% do valor do automóvel

    // Calcular custos por kms
    const custoCombustivel = (quilometrosRodados / consumoKmLitro) * precoCombustivel;
    const custoParcelaPorKm = valorParcela / quilometrosRodados;
    const custoSeguroPorKm = seguroMensal / quilometrosRodados;
    const custoTotalPorKm = (custoCombustivel + custoParcelaPorKm + custoSeguroPorKm + ipva) / quilometrosRodados;

    // Valor ideal por km e lucro por km
    const valorIdealKm = custoTotalPorKm + (lucroDesejado / quilometrosRodados);
    const lucroPorKm = valorIdealKm - custoTotalPorKm;

    // Calcular custo total mensal (aluguel + combustível + seguro + IPVA)
    const custoTotalMensal = custoCombustivel + valorParcela + seguroMensal + ipva;

    // Meta diária e semanal considerando o custo e o lucro desejado
    const metaDiaria = (custoTotalMensal + lucroDesejado) / 26;  // 26 dias úteis no mês
    const metaSemanal = metaDiaria * 6;  // 6 dias úteis por semana

    // Função para formatar como dinheiro
    const formatarDinheiro = valor => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Exibir mensagem com os resultados
    $('#mensagemInformativaFinanciado').html(`
        <div class="caixa-info">
            <div class="caixa">
                <h4>Custo do Combustível Mensal</h4>
                <span class="custo">${formatarDinheiro(custoCombustivel)}</span>
            </div>
            <div class="caixa">
                <h4>Custo da Parcela Mensal</h4>
                <span class="custo">${formatarDinheiro(valorParcela)}</span>
            </div>
            <div class="caixa">
                <h4>Custo do Seguro Mensal</h4>
                <span class="custo">${formatarDinheiro(seguroMensal)}</span>
            </div>
            <div class="caixa">
                <h4>IPVA</h4>
                <span class="custo">${formatarDinheiro(ipva)}</span>
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
    `);
}

// Adicione um listener ao botão de calcular
$(document).ready(function() {
    $('#btn-calcular').on('click', calcularValorIdeal);
});
