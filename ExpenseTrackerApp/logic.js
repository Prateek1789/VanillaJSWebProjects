const historyTab = document.querySelector(".exp-tab"); 
const balanceAmount = document.getElementById("in-num");
const spendAmount = document.getElementById("out-num");
const optionPanel = document.querySelector(".options");
const btnGroup = [...document.getElementsByClassName("btn")];
const functionTab = document.querySelector(".func-tab");

let isBlncActive = false;
let isExpActive = false;
let btnConfirmActive = false;
let btnCancelActive = false;
let newBalance = 0;
let totalExpense = 0;
let value1 = 0;
let value2 = 0;

function initAddBalanceUI(container) {
    const heading = document.createElement('H2');
    heading.textContent = 'New Amount';
    const input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', 'num');
    input.setAttribute('placeholder', '0.00');

    container.appendChild(heading);
    container.appendChild(input);
}
function resetAddBalanceUI() {
    functionTab.innerHTML = '';
    optionPanel.classList.remove("active");
    functionTab.classList.remove('func-active');
    // Reset Balance State
    isBlncActive = false;
    btnConfirmActive = false;
    btnCancelActive = false;
    // Reset Button text & UI
    btnGroup[0].textContent = 'Add Balance';
    btnGroup[1].textContent = 'Add Expense';
    btnGroup[1].style.backgroundColor = 'var(--clr-secondary)';
}
function initExpTab(container) {
    const $heading = document.createElement('H4');
    $heading.textContent = 'Enter Amount';
    const heading2 = document.createElement('H5');
    heading2.textContent = 'No. of Items';
    const heading3 = document.createElement('H5');
    heading3.textContent = 'Description';
    const input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', 'num');
    input.setAttribute('placeholder', '0.00');
    input.setAttribute('class', 'input1');
    const input2 = document.createElement('INPUT');
    input2.setAttribute('type', 'number');
    input2.setAttribute('name', 'num');
    input2.setAttribute('placeholder', '0.00');
    input2.setAttribute('class', 'input2');
    const textBox = document.createElement('INPUT');
    textBox.setAttribute('type', 'text');
    textBox.setAttribute('name', 'items');
    textBox.setAttribute('placeholder', 'Items..');
    textBox.setAttribute('class', 'products');

    container.appendChild($heading);
    container.appendChild(input);
    container.appendChild(heading2);
    container.appendChild(input2);
    container.appendChild(heading3);
    container.appendChild(textBox);
}
function resetExpenseUI() {
    functionTab.innerHTML = '';
    optionPanel.classList.remove("active");
    functionTab.setAttribute('class', 'func-tab');
    functionTab.removeAttribute('add-exp');
    functionTab.classList.remove('exp-active');
    // Reset button text & UI
    btnGroup[1].textContent = 'Add Expense';
    btnGroup[1].style.backgroundColor = 'var(--clr-secondary)';
    btnGroup[0].textContent = 'Add Balance';
    // Reset ExpenseUI State
    isExpActive = false;
    btnCancelActive = false;
    btnConfirmActive = false;
}
function initExpense(container, amount, quant) {
    const expense = document.createElement('DIV');
    expense.setAttribute('class', 'expense');

    const main = document.createElement('DIV');
    main.setAttribute('class', 'main');

    const amt = document.createElement('DIV');
    amt.setAttribute('class', 'amt');
    const H5 = document.createElement('H5');
    H5.textContent = 'Amount';
    const H5Second = document.createElement('H5');
    const txtNode = document.createTextNode(`${amount}`);
    const icon = document.createElement('i');
    icon.setAttribute('class', 'bx bx-rupee');

    const itm = document.createElement('DIV');
    itm.setAttribute('class', 'itm');
    const H6 = document.createElement('H6');
    const H6Second = document.createElement('H6');

    /* const description = document.createElement('DIV');
    description.setAttribute('class', 'amt');
    */
    const del = document.createElement('DIV');
    del.setAttribute('class', 'btn-del');
    const iconDel = document.createElement('i');
    iconDel.setAttribute('class', 'bx bx-trash');

    container.appendChild(expense);
    expense.appendChild(main);
    expense.appendChild(del);
    del.appendChild(iconDel);
    main.appendChild(amt);
    amt.appendChild(H5);
    amt.appendChild(H5Second);
    H5Second.appendChild(icon);
    H5Second.appendChild(txtNode);
    main.appendChild(itm);
    itm.appendChild(H6);
    itm.children[0].textContent = 'Items';
    itm.appendChild(H6Second);
    itm.children[1].textContent = quant;
}

btnGroup.forEach(el => {
    el.addEventListener("click", () => {
        if (el == btnGroup[0]) {
            if (!isBlncActive && !isExpActive) {
                // Open Balance UI
                optionPanel.classList.add("active");
                functionTab.classList.add('func-active');
                initAddBalanceUI(functionTab);
                // Update Button text & UI
                btnGroup[0].textContent = 'Confirm';
                btnGroup[1].textContent = 'Cancel';
                btnGroup[1].style.backgroundColor = 'var(--clr-tertiory)';
                // Update BalanceUI state
                isBlncActive = true;
                btnConfirmActive = true;
                btnCancelActive = true;
            }
            else if (isBlncActive && btnConfirmActive && !isExpActive) {
                if (functionTab.lastChild.value) {
                    newBalance += Number(functionTab.lastChild.value);
                    balanceAmount.textContent = newBalance;
                    resetAddBalanceUI();
                }
            }
            else if (isExpActive && btnConfirmActive && !isBlncActive) {
                value1 = Number(functionTab.children[1].value);
                value2 = Number(functionTab.children[3].value);
                if (value1 && value2) {
                    initExpense(historyTab, value1, value2);
                    totalExpense += value1;
                    newBalance -= value1;
                    spendAmount.textContent = totalExpense;
                    balanceAmount.textContent = newBalance;
                    resetExpenseUI();
                }
            }
        }
        if (el == btnGroup[1]) {
            if (!isBlncActive && !isExpActive) {
                // Open Expense UI
                optionPanel.classList.add("active");
                functionTab.setAttribute('class', 'add-Exp');
                functionTab.removeAttribute('func-tab');
                functionTab.classList.add('exp-active');
                initExpTab(functionTab);
                // Update Button Text & UI
                btnGroup[0].textContent = 'Confirm';
                btnGroup[1].textContent = 'Cancel';
                btnGroup[1].style.backgroundColor = 'var(--clr-tertiory)';
                // Update Expense UI state
                isExpActive = true;
                btnCancelActive = true;
                btnConfirmActive = true;
            }
            else if (isBlncActive && !isExpActive) {
                resetAddBalanceUI();
            }
            else if (isExpActive && !isBlncActive) {
                resetExpenseUI();
            }
        }
    })
})