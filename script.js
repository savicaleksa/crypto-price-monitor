const api =
  'https://api.coingecko.com/api/v3/coins/bitcoin?tickers=false&community_data=false&developer_data=false&sparkline=false';
const apiPrice =
  'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=1&interval=minutely';

const logo = document.querySelector('#logo');
const logoName = document.querySelector('#name');
const current = document.querySelector('#currentPrice');
const changeHour = document.querySelector('#priceChangeHour');
const changeDay = document.querySelector('#priceChangeDay');
const changeMinute = document.querySelector('#priceChangeMinute');
async function callAPI() {
  let response = await fetch(api, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });
  let responsePrice = await fetch(apiPrice, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  result = await response.json();
  resultPrice = await responsePrice.json();
  console.log(resultPrice);
  logo.src = result.image.small;
  logoName.innerText = result.name;
  current.innerText = `${
    resultPrice.prices[resultPrice.prices.length - 1][1]
  } EUR`;

  let changeMinPerc =
    (resultPrice.prices[resultPrice.prices.length - 1][1] /
      resultPrice.prices[resultPrice.prices.length - 2][1]) *
      100 -
    100;

  changeMinute.innerText = `Minutely change: ${changeMinPerc} %`;
  changeHour.innerText = `Hourly change: ${result.market_data.price_change_percentage_1h_in_currency.eur}%`;
  changeDay.innerText = `Daily change: ${result.market_data.price_change_percentage_24h_in_currency.eur}%`;
}
callAPI();
