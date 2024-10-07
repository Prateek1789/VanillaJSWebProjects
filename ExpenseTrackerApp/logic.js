const balanceAmount = document.getElementById("in-num");
const spendAmount = document.getElementById("out-num");
const optionPanel = document.querySelector(".options");
const btnGroup = [...document.getElementsByClassName("btn")];
const functionTab = document.querySelector(".func-tab");

let isBlncActive = false;
let blncConfrm = false;
let isExpsActive = false;

function initBlncTab(container) {
    const heading = document.createElement('H2');
    heading.textContent = 'Enter Amount';
    const input = document.createElement('INPUT');
    input.setAttribute('type', 'number');
    input.setAttribute('name', 'num');
    input.setAttribute('placeholder', '0.00');
        
    container.appendChild(heading);
    container.appendChild(input);
    container.classList.add('func-active');
}

btnGroup.forEach(el => {
    el.addEventListener("click", () => {
        optionPanel.classList.toggle("active");
        el.classList.toggle("open");

        if (el == btnGroup[0] && !isBlncActive) {
            initBlncTab(functionTab);
            isBlncActive = true;
        }
        else if (el == btnGroup[0] && isBlncActive) {
            functionTab.innerHTML = '';
            functionTab.classList.remove('func-active');
            isBlncActive = false;
        }
    })
});

/* function addBalance() {
    if (!addBalanceInterface) {
        const interfaceDiv = document.createElement('DIV');
        interfaceDiv.setAttribute('class', 'new-blnce');

        const heading = document.createElement('H2');
        heading.textContent = 'Enter Amount';

        const input = document.createElement('INPUT');
        input.setAttribute('type', 'number');
        input.setAttribute('name', 'blncAmt');
        input.setAttribute('placeholder', '0.00');

        optionPanel.appendChild(div);
        div.appendChild(header);
        div.appendChild(input);

        btnGroup[0].textContent = "Cancel";
        addBalanceInterface = true;
    }
    else if (addBalanceInterface) {
        interfaceDiv.remove();
        btnGroup[0].textContent = "Add Balance";
        addBalanceInterface = false;
    }
    const textNode = document.createTextNode('Enter Amount');
    header.appendChild(textNode);
} */
