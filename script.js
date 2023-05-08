// const bill = document.getElementById('bill-amount')
// const cash = document.getElementById('cash-amount')
// const change = document.getElementById('balance')

// const arrCurrency = [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ]


function checkCashRegister(price, cash, cid) {
  const INSUFFICIENT_FUNDS = {status: 'INSUFFICIENT_FUNDS', change: []}

  const CLOSED = {status: 'CLOSED', change: cid}

  const OPEN = {status: 'OPEN', change: []}

  let cidTotal = 0
  let change = []
  let changeDue = cash - price
  let mult = 0


  if (changeDue >= 20) {
    while (changeDue >= 20 && cid[7][1] >= 20){
      changeDue -= 20
      cid[7][1] -= 20
      mult += 1
    }
    change.push(['TWENTY', (20 * mult)])
    mult = 0
  }


  if (changeDue >= 10) {
    while (changeDue >= 10 && cid[6][1] >= 10){
      changeDue -= 10
      cid[6][1] -= 10
      mult += 1
    }
    change.push(['TEN', (10 * mult)])
    mult = 0
  }


  if (changeDue >= 5) {
    while (changeDue >= 5 && cid[5][1] >= 5){
      changeDue -= 5
      cid[5][1] -= 5
      mult += 1
    }
    change.push(['FIVE', (5 * mult)])
    mult = 0
  }


  if (changeDue >= 1) {
    while (changeDue >= 1 && cid[4][1] >= 1){
      changeDue -= 1
      cid[4][1] -= 1
      mult += 1
    }
    change.push(['ONE', (1 * mult)])
    mult = 0
  }


  if (changeDue >= 0.25) {
    while (changeDue >= 0.25 && cid[3][1] >= 0.25){
      changeDue -= 0.25
      cid[3][1] -= 0.25
      mult += 1
    }
    change.push(['QUARTER', (0.25 * mult)])
    mult = 0
  }


  if (changeDue >= 0.1) {
    while (changeDue >= 0.1 && cid[2][1] >= 0.1){
      changeDue -= 0.1
      cid[2][1] -= 0.1
      mult += 1
    }
    change.push(['DIME', (0.1 * mult)])
    mult = 0
  }


  if (changeDue >= 0.5) {
    while (changeDue >= 0.5 && cid[1][1] >= 0.5){
      changeDue -= 0.5
      cid[1][1] -= 0.5
      mult += 1
    }
    change.push(['NICKEL', (0.5 * mult)])
    mult = 0
  }


  if (changeDue >= 0.01) {
    while (changeDue >= 0.01 && cid[0][1] >= 0.01){
      changeDue -= 0.01;
      cid[0][1] -= 0.01;
      mult += 1;  
    }
    
    if (0 < changeDue && changeDue <= 0.01  && cid[0][1] >= 0.01){
      penny = 0.01;
      console.log(penny);
    } 
    
    change.push(["PENNY", ((0.01 * mult) + penny)]);
    mult = 0;
  }


  if (change >= 0.01) {
    return INSUFFICIENT_FUNDS
  }


for (let i = 0; i < cid.length; i++) {
  cidTotal += cid[i][1]
}

if (changeDue > cidTotal){
  return  INSUFFICIENT_FUNDS
}
else if (changeDue === cidTotal) {
  return CLOSED
}
else {
  countChange()
}

console.log(change)
 
}


// arrCurrency = [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ]
