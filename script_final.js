const logo = document.querySelector('#logo');
const idSel = document.querySelector('#idSel');
const valSel = document.querySelector('#valSel');
const price = document.querySelector('#price');
const hChange = document.querySelector('#hChange');
const dChange = document.querySelector('#dChange');
const call = document.querySelector('#call');
const ids = [
  'Bitcoin',
  'Ethereum',
  'Ripple',
  'Litecoin',
  'Chainlink',
  'Tether',
  'IOTA',
  'NEO',
];
const money = ['EUR', 'USD', 'CAD', 'AUD', 'RUB'];
var interval = setInterval(callApi, 1000 * 90);

//creating options
ids.forEach((id) => {
  let opt = document.createElement('option');
  opt.value = id.toLowerCase();
  opt.innerText = id;
  idSel.add(opt);
});
money.forEach((val) => {
  let opt = document.createElement('option');
  opt.value = val.toLowerCase();
  opt.innerText = val;
  valSel.add(opt);
});

//function
async function callApi() {
  let id = idSel.value;
  let val = valSel.value;
  let api = `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&community_data=false&developer_data=false&sparkline=false`;

  let response = await fetch(api, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });
  let result = await response.json();
  console.log(result);
  //changes
  logo.src = result.image.small;
  price.innerText = `${result.market_data.current_price[val]} ${String(
    val
  ).toUpperCase()}`;

  hChange.classList.remove('minus', 'plus');
  dChange.classList.remove('minus', 'plus');

  let hChangeText =
    result.market_data.price_change_percentage_1h_in_currency[val];
  let dChangeText =
    result.market_data.price_change_percentage_24h_in_currency[val];

  if (hChangeText < 0) {
    hChange.innerText = `${hChangeText}%`;
    hChange.classList.add('minus');
  } else {
    hChange.classList.add('plus');
    hChange.innerText = `+${hChangeText}%`;
  }

  if (dChangeText < 0) {
    dChange.innerText = `${dChangeText}%`;
    dChange.classList.add('minus');
  } else {
    dChange.classList.add('plus');
    dChange.innerText = `+${dChangeText}%`;
  }
  //reset interval
  clearInterval(interval);
  interval = setInterval(callApi, 1000 * 90);
}

callApi();

//event listeners
call.addEventListener('click', callApi);
call.addEventListener('mousedown', () => {
  call.classList.toggle('clicked');
});
call.addEventListener('mouseup', () => {
  call.classList.toggle('clicked');
});
