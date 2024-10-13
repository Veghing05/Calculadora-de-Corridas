function calcularValorIdealAlugado() {
    const aluguelMensal = parseFloat($('#aluguelMensal').val());
    const quilometrosRodados = parseFloat($('#quilometrosRodados').val());
    const precoCombustivel = parseFloat($('#precoCombustivel').val());
    const consumoKmLitro = parseFloat($('#consumoKmLitro').val());
    const lucroDesejado = parseFloat($('#lucroDesejado').val()) || 0;

    if (isNaN(aluguelMensal) || isNaN(quilometrosRodados) || 
        isNaN(precoCombustivel) || isNaN(consumoKmLitro)) {
        $('#mensagemInformativa').text("Por favor, preencha todos os campos corretamente.");
        return;
    }

    if (quilometrosRodados === 0) {
        $('#mensagemInformativa').text("Quilômetros rodados não pode ser zero.");
        return;
    }

    const custoCombustivel = (quilometrosRodados / consumoKmLitro) * precoCombustivel;
    const custoTotalMensal = aluguelMensal + custoCombustivel;
    const custoTotalPorKm = custoTotalMensal / quilometrosRodados;
    const valorIdealKm = (custoTotalMensal + lucroDesejado) / quilometrosRodados;
    const lucroPorKm = valorIdealKm - custoTotalPorKm;

    const metaDiaria = (custoTotalMensal + lucroDesejado) / 26;
    const metaSemanal = metaDiaria * 6;

    // Aluguel e custos diários
    const aluguelDiario = aluguelMensal / 26;
    const custoTotalDiario = custoTotalMensal / 26;

    // Aluguel e custos semanais
    const aluguelSemanal = aluguelMensal / 4;
    const custoTotalSemanal = custoTotalMensal / 4;

    // Quilometragem por dia
    const kmPorDia = quilometrosRodados / 26;
    const kmAluguelPorDia = aluguelMensal / kmPorDia;
    const kmTotalDiario = custoTotalMensal / kmPorDia;

    // Função para formatar como dinheiro
    const formatarDinheiro = valor => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Exibir mensagem com os resultados
    $('#mensagemInformativa').html(`
        <div class="caixa-info">
            <div class="caixa">
                <h4>Custo do Combustível Mensal</h4>
                <span class="custo">${formatarDinheiro(custoCombustivel)}<br>
                ${formatarDinheiro(custoCombustivel / quilometrosRodados)}</span>
            </div>
            <div class="caixa">
                <h4>Custo do Aluguel Mensal</h4>
                <span class="custo">${formatarDinheiro(aluguelMensal)}<br>
                ${formatarDinheiro(aluguelMensal / quilometrosRodados)}</span>
            </div>
            <div class="caixa">
                <h4>Custo Total Mensal</h4>
                <span class="custo">${formatarDinheiro(custoTotalMensal)}<br>
                ${formatarDinheiro(custoTotalMensal / quilometrosRodados)}</span>
            </div>
        </div>
        <div class="caixa-info">
            <div class="caixa">
                <h4>Custo Total por Quilômetro</h4>
                <span class="custo">${formatarDinheiro(custoTotalPorKm)}</span>
            </div>
            <div class="caixa">
                <h4>Meta Diária</h4>
                <span class="lucro">${formatarDinheiro(metaDiaria)}<br>
                ${formatarDinheiro(metaDiaria / (quilometrosRodados / 26))}</span>
            </div>
        </div>
        <div class="caixa-info">
            <div class="caixa">
                <h4>Meta Semanal</h4>
                <span class="lucro">${formatarDinheiro(metaSemanal)}<br>
                ${formatarDinheiro(metaSemanal / ((quilometrosRodados / 26 * 6 )))}</span>
            </div>
            <div class="caixa">
                <h4>Lucro Mensal Desejado</h4>
                <span class="lucro">${formatarDinheiro(lucroDesejado)}<br>
                ${formatarDinheiro(lucroDesejado / quilometrosRodados)}</span>
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

// Adicionando um listener ao botão de calcular
$(document).ready(function() {
    $('#btn-calcular').on('click', calcularValorIdealAlugado);
});
