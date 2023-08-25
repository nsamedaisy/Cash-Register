const billAmountInput = document.getElementById("bill-amount");
const cashAmountInput = document.getElementById("cash-amount");
const balanceButton = document.getElementById("balance");

const statusMessage = document.getElementById("status-message");
const changeList = document.getElementById("change-list");

const penny = document.getElementById("penny");
const nickel = document.getElementById("nickel");
const dime = document.getElementById("dime");
const quarter = document.getElementById("quarter");
const one = document.getElementById("one");
const five = document.getElementById("five");
const ten = document.getElementById("ten");
const twenty = document.getElementById("twenty");

balanceButton.addEventListener("click", () => {
  const billAmount = parseFloat(billAmountInput.value);
  const cashAmount = parseFloat(cashAmountInput.value);
  const cid = [
    ["PENNY", +penny.dataset.value],
    ["NICKEL", +nickel.dataset.value],
    ["DIME", +dime.dataset.value],
    ["QUARTER", +quarter.dataset.value],
    ["ONE", +one.dataset.value],
    ["FIVE", +five.dataset.value],
    ["TEN", +ten.dataset.value],
    ["TWENTY", +twenty.dataset.value],
    ["ONE HUNDRED", 100],
  ];

  const result = checkCashRegister(billAmount, cashAmount, cid);

  // Update the status message element with the result
  statusMessage.textContent = result.status;

  // Clear the change list element
  changeList.innerHTML = "";

  // Loop through the denominations and amounts in the result and add them to the change list element
  result.change.forEach((denomination) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${denomination[0]}: ${denomination[1]}`;
    changeList.appendChild(listItem);
  });

  if (result.status === "INSUFFICIENT_FUNDS") {
    statusMessage.textContent = "Insufficient funds";
    statusMessage.classList.add("funds");
    changeList.textContent = "";
  } else if (result.status === "CLOSED") {
    statusMessage.textContent = "Closed";
    statusMessage.classList.add("closed");
    changeList.textContent = "";
  } else {
    statusMessage.textContent = "Open";
    statusMessage.classList.add("open");
    changeList.innerHTML = result.change
      .map(([name, amount]) => `${name}: ${amount}`)
      .join("<br>");
  }
});

function checkCashRegister(billAmount, cashAmount, cid) {
  const INSUFFICIENT_FUNDS = { status: "INSUFFICIENT_FUNDS", change: [] };

  const CLOSED = { status: "CLOSED", change: cid };

  const OPEN = { status: "OPEN", change: [] };

  let cidTotal = 0;
  let changeDue = cashAmount - billAmount;
  let mult = 0;
  let penny = 0;
  let changeArr = [];

  if (changeDue >= 20) {
    while (changeDue >= 20 && cid[7][1] >= 20) {
      changeDue -= 20;
      cid[7][1] -= 20;
      mult += 1;
    }
    changeArr.push(["TWENTY", 20 * mult]);
    mult = 0;
  }
  if (changeDue >= 10) {
    while (changeDue >= 10 && cid[6][1] >= 10) {
      changeDue -= 10;
      cid[6][1] -= 10;
      mult += 1;
    }
    changeArr.push(["TEN", 10 * mult]);
    mult = 0;
  }
  if (changeDue >= 5) {
    while (changeDue >= 5 && cid[5][1] >= 5) {
      changeDue -= 5;
      cid[5][1] -= 5;
      mult += 1;
    }
    changeArr.push(["FIVE", 5 * mult]);
    mult = 0;
  }
  if (changeDue >= 1) {
    while (changeDue >= 1 && cid[4][1] >= 1) {
      changeDue -= 1;
      cid[4][1] -= 1;
      mult += 1;
    }
    changeArr.push(["ONE", 1 * mult]);
    mult = 0;
  }
  if (changeDue >= 0.25) {
    while (changeDue >= 0.25 && cid[3][1] >= 0.25) {
      changeDue -= 0.25;
      cid[3][1] -= 0.25;
      mult += 1;
    }
    changeArr.push(["QUARTER", 0.25 * mult]);
    mult = 0;
  }
  if (changeDue >= 0.1) {
    while (changeDue >= 0.1 && cid[2][1] >= 0.1) {
      changeDue -= 0.1;
      cid[2][1] -= 0.1;
      mult += 1;
    }
    changeArr.push(["DIME", 0.1 * mult]);
    mult = 0;
  }
  if (changeDue >= 0.05) {
    while (changeDue >= 0.05 && cid[1][1] >= 0.05) {
      changeDue -= 0.05;
      cid[1][1] -= 0.05;
      mult += 1;
    }
    changeArr.push(["NICKEL", 0.05 * mult]);
    mult = 0;
  }
  if (changeDue >= 0.01) {
    while (changeDue >= 0.01 && cid[0][1] >= 0.01) {
      changeDue -= 0.01;
      cid[0][1] -= 0.01;
      mult += 1;
    }

    if (0 < changeDue && changeDue <= 0.01 && cid[0][1] >= 0.01) {
      penny = 0.01;
    }
    changeArr.push(["PENNY", 0.01 * mult + penny]);
    mult = 0;
  }

  let changeTotal = changeArr.reduce((acc, curr) => acc + curr[1], 0);

  if (changeTotal < cashAmount - billAmount) {
    return INSUFFICIENT_FUNDS;
  }

  for (let i = 0; i < cid.length; i++) {
    cidTotal += cid[i][1];
  }

  if (changeTotal === cidTotal) {
    return CLOSED;
  } else {
    return { status: "OPEN", change: changeArr.reverse() };
  }
}
