const balanceAmount = document.getElementById("in-num");
const spendAmount = document.getElementById("out-num");
const optionPanel = document.querySelector(".options");
const btnGroup = [...document.getElementsByClassName("btn")];
const functionTab = document.querySelector(".func-tab");

let isBlncActive = false;
/* let blncConfrm = false; */
let isExpsActive = false;

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
        optionPanel.classList.toggle("active");
        el.classList.toggle("open");

        if (el == btnGroup[0] && !isBlncActive) {
            initBlncTab(functionTab);
            functionTab.classList.add('func-active');
            isBlncActive = true;
        }
        else if (el == btnGroup[0] && isBlncActive) {
            functionTab.innerHTML = '';
            functionTab.classList.remove('func-active');
            isBlncActive = false;
        }
        else if (el == btnGroup[1] && !isExpsActive) {
            functionTab.setAttribute('class', 'add-Exp');
            functionTab.removeAttribute('func-tab');
            initExpTab(functionTab);
            functionTab.classList.add('exp-active')
            isExpsActive = true;
        }
        else if (el == btnGroup[1] && isExpsActive) {
            functionTab.innerHTML = '';
            functionTab.classList.remove('exp-active');
            functionTab.removeAttribute('add-Exp');
            functionTab.setAttribute('class', 'func-tab');
            isExpsActive = false;
        }
    })
});