// const bill = document.getElementById('bill-amount')
// const cash = document.getElementById('cash-amount')
// const change = document.getElementById('balance')

function checkCashRegister(price, cash, cid) {
  const INSUFFICIENT_FUNDS = {status: 'INSUFFICIENT_FUNDS', change: []}
  const CLOSED = {status: 'CLOSED', change: cid}
  const OPEN = {status: 'OPEN', change: []}
  let change = parseFloat((cash - price).toFixed(2))
  let totalCid = cidTotal()
  
  if(change === totalCid) {
    return CLOSED
  }

  if (change > totalCid) {
    return INSUFFICIENT_FUNDS
  }

  const arrCurrency = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ]

  for(let i = 0; i < arrCurrency.length; i++) {
    let totalCash = cid.find(item =>[0] === arrCurrency[i][0])[1]

    if(change > arrCurrency[i][1] && change > totalCash) {
      change -= totalCash
      OPEN.change.push([arrCurrency[i][0], totalCash])
    }
    else if (change > arrCurrency[i][1] && totalCash > change) {
      let pay = Math.floor(change/arrCurrency[i][1]) * arrCurrency[i][1]
      change -= pay
      change = parseFloat(change.toFixed(2))
      OPEN.change.push([arrCurrency[i][0], pay])
    }
  }

  if(change > 0) {
    return INSUFFICIENT_FUNDS
  }

  return OPEN

  function cidTotal() {
    return parseFloat(cid.reduce((a, b) => a + b[1], 0).toFixed(2))
  }
}
console.log(checkCashRegister)
