const exchangeRates = {
    BHD: { BHD: 1, USD: 2.65, EUR: 2.44, JPY: 398.87, IDR: 40301 },
    USD: { BHD: 0.38, USD: 1, EUR: 0.92, JPY: 150.42, IDR: 15200 },
    EUR: { BHD: 0.41, USD: 1.09, EUR: 1, JPY: 163.55, IDR: 16550 },
    JPY: { BHD: 0.0025, USD: 0.0066, EUR: 0.0061, JPY: 1, IDR: 101.13 },
    IDR: { BHD: 0.000025, USD: 0.000066, EUR: 0.000060, JPY: 0.0099, IDR: 1 }
};

function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').textContent = 'Masukkan jumlah yang valid.';
        return;
    }

    const conversionRate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = (amount * conversionRate).toFixed(2);

    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

