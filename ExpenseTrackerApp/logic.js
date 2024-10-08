const historyTab = document.querySelector(".exp-tab"); 
const balanceAmount = document.getElementById("in-num");
const spendAmount = document.getElementById("out-num");
const optionPanel = document.querySelector(".options");
const btnGroup = [...document.getElementsByClassName("btn")];
const functionTab = document.querySelector(".func-tab");

let isBlncActive = false;
let btnConfirmActive = false;
let btnCancelActive = false;
let isExpsActive = false;
let newBalance = 0;

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

function initBlncTab(container) {
    const heading = document.createElement('H2');
    heading.textContent = 'New Amount';
    const input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', 'num');
    input.setAttribute('placeholder', '0.00');

    container.appendChild(heading);
    container.appendChild(input);
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

btnGroup.forEach(el => {
    el.addEventListener("click", () => {
        if (el == btnGroup[0] && !isBlncActive && !btnConfirmActive) {
            optionPanel.classList.add("active");
            functionTab.classList.add('func-active');
            initBlncTab(functionTab);
            el.textContent = 'Confirm';
            btnGroup[1].textContent = 'Cancel';
            btnGroup[1].style.backgroundColor = 'var(--clr-tertiory)';
            isBlncActive = true;
            btnConfirmActive = true;
            btnCancelActive = true;
        }
        if (el == btnGroup[0] && functionTab.children[1].value && btnConfirmActive) {
            let newBlnc = functionTab.children[1].value;
            newBalance += Number(newBlnc);
            balanceAmount.textContent = newBalance;
            functionTab.innerHTML = '';
            optionPanel.classList.remove("active");
            functionTab.classList.remove('func-active');
            el.textContent = 'Add Balance';
            btnGroup[1].textContent = 'Add Expense';
            btnGroup[1].style.backgroundColor = 'var(--clr-secondary)';
            isBlncActive = false;
            btnConfirmActive = false;
        }
        if (btnCancelActive && btnConfirmActive) {
            btnGroup[1].addEventListener("click", () => {
                functionTab.innerHTML = '';
                optionPanel.classList.remove("active");
                functionTab.classList.remove('func-active');
                el.textContent = 'Add Balance';
                btnGroup[1].textContent = 'Add Expense';
                btnGroup[1].style.backgroundColor = 'var(--clr-secondary)';
                isBlncActive = false;
                btnConfirmActive = false;
            })
        }
        else if (el == btnGroup[1] && !isExpsActive) {
            optionPanel.classList.add("active");
            functionTab.setAttribute('class', 'add-Exp');
            functionTab.removeAttribute('func-tab');
            initExpTab(functionTab);
            functionTab.classList.add('exp-active');
            btnGroup[0].textContent = 'Confirm';
            el.textContent = 'Cancel';
            el.style.backgroundColor = 'var(--clr-tertiory)';
            isExpsActive = true;
            btnCancelActive = true;
            btnConfirmActive = true;
        }
        /* if (el == btnGroup[1] && functionTab.children[2].value && btnConfirmActive) {
            let newBlnc = functionTab.children[1].value;
            newBalance += Number(newBlnc);
            balanceAmount.textContent = newBalance;
            functionTab.innerHTML = '';
            optionPanel.classList.remove("active");
            functionTab.classList.remove('func-active');
            el.textContent = 'Add Balance';
            btnGroup[1].textContent = 'Add Expense';
            btnGroup[1].style.backgroundColor = 'var(--clr-secondary)';
            isBlncActive = false;
            btnConfirmActive = false;
        } */
        /* else if (el == btnGroup[0] && btnConfirmActive) {
            functionTab.innerHTML = '';
            functionTab.classList.remove('func-active');
            isBlncActive = false;
        } */
        /* 
        }
        else if (el == btnGroup[1] && isExpsActive) {
            functionTab.innerHTML = '';
            functionTab.classList.remove('exp-active');
            functionTab.removeAttribute('add-Exp');
            functionTab.setAttribute('class', 'func-tab');
            isExpsActive = false;
        } */
    })
});