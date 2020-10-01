const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rates and update DOM
function calculate() {
    const currency_one = currencyEl_one.value
    const currency_two = currencyEl_two.value
    bring_exchange(currency_one, currency_two)
}

function bring_exchange(currency1, currency2) {
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency1}`)
        .then(res => res.json()
            .then(data => {
                const rate = data.rates[currency2]
                rateEl.innerText = `1 ${currency1} = ${rate} ${currency2}`
                amountEl_two.value = (amountEl_one.value * rate).toFixed(3)
            }))
}

function change() {
    let temp = currencyEl_two.value
    currencyEl_two.value = currencyEl_one.value
    currencyEl_one.value = temp
    calculate()
}

//Event Listeners

currencyEl_one.addEventListener('change', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
amountEl_two.addEventListener('input', calculate)
swap.addEventListener('click', change)

//execute
calculate()