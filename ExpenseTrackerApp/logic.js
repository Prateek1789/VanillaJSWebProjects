const balanceAmount = document.getElementById("in-num");
const spendAmount = document.getElementById("out-num");
const optionPanel = document.querySelector(".options");
const btnGroup = [...document.getElementsByClassName("btn")];

/* function checkContext(btnGroup) {
    if (btnGroup[0].classList.contains("open")) {
        const addNew = document.createElement('DIV');
        addNew.setAttribute('class', 'new-blnc');
        optionPanel.appendChild(addNew);
    }
} */

btnGroup.forEach(el => {
    el.addEventListener("click", () => {
        optionPanel.classList.toggle("active");
        el.classList.toggle("open");

        checkContext(btnGroup);
    })
});








