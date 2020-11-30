const select = document.querySelector('#select');
const selectM = document.querySelector('#selectM');
const coinListUrl = 'https://api.coingecko.com/api/v3/coins/list';
const coins = ['bitcoin', 'ethereum', 'ripple', 'litecoin'];
const money = ['usd', 'eur'];
function makeOpt() {
  coins.forEach((id) => {
    let newOpt = document.createElement('option');
    newOpt.value = id;
    newOpt.innerText = id;
    select.appendChild(newOpt);
  });
  money.forEach((mon) => {
    let newOpt = document.createElement('option');
    newOpt.value = mon;
    newOpt.innerText = mon;
    selectM.appendChild(newOpt);
  });
}
makeOpt();
