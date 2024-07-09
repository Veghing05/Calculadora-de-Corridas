function calculate() {
    const distance = parseFloat(document.getElementById('distance').value);
    const time = parseFloat(document.getElementById('time').value);
    const fare = parseFloat(document.getElementById('fare').value);
    const platform = document.getElementById('platform').value;

    if (isNaN(distance) || isNaN(time) || isNaN(fare)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Taxas das plataformas
    const uberCommission = 0.25; // 25%
    const ninetynineCommission = 0.20; // 20%

    let netEarnings;
    if (platform === 'uber') {
        netEarnings = fare * (1 - uberCommission);
    } else if (platform === '99') {
        netEarnings = fare * (1 - ninetynineCommission);
    }

    // Calcular ganho por km e por minuto
    const earningsPerKm = netEarnings / distance;
    const earningsPerMin = netEarnings / time;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Valor total da viagem: R$ ${fare.toFixed(2)}</p>
        <p>Ganhos líquidos: R$ ${netEarnings.toFixed(2)}</p>
        <p>Ganhos por km: R$ ${earningsPerKm.toFixed(2)}</p>
        <p>Ganhos por minuto: R$ ${earningsPerMin.toFixed(2)}</p>
    `;

    const threshold = 10.0; // Valor mínimo aceitável hipotético
    if (netEarnings >= threshold) {
        resultDiv.innerHTML += "<p>Vale a pena aceitar a corrida.</p>";
    } else {
        resultDiv.innerHTML += "<p>Não vale a pena aceitar a corrida.</p>";
    }
}
