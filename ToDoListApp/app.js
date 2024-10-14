const count = document.querySelector(".count");
const addTaskInput = document.querySelector("#new-task");
const addBtn = document.querySelector(".add");
const taskContainer = document.querySelector(".task-list-group");
let countNum = 0;
let istaskPresent = false;

function initTask(elem, text) {
    const container = document.createElement('DIV');
    container.setAttribute('class', 'task-container');

    const checkBtn = document.createElement("button");
    checkBtn.setAttribute('class', 'check');
    const checkMark = document.createElement("i");
    checkMark.setAttribute('class', 'bx bx-check');

    const taskContent = document.createElement("H3");
    taskContent.setAttribute('class', 'task');
    taskContent.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute('class', 'delete');
    const trashIcon = document.createElement("i");
    trashIcon.setAttribute('class', 'bx bxs-trash');

    elem.appendChild(container);
    container.appendChild(checkBtn);
    checkBtn.appendChild(checkMark);
    container.appendChild(taskContent);
    container.appendChild(deleteBtn);
    deleteBtn.appendChild(trashIcon);
}
function checkTask() {
    let newNum = countNum;
    const checkBtn = [...document.querySelectorAll(".check")];
    checkBtn.forEach((itm) => {
        if (!itm.dataset.listenerAttached) {
            const container = itm.closest(".task-container");
            itm.addEventListener("click", () => {
                container.classList.toggle("container-checked");
                /* if (container.classList.contains('container-checked')) {
                    newNum--;
                    countNum = newNum;
                    count.textContent = newNum;                    
                }
                else {
                    newNum++;
                    countNum = newNum;
                    count.textContent = newNum;
                } */
            });
            itm.dataset.listenerAttached = 'true';
        }
    });
}
function deletetask() {
    let newNum = countNum;
    delBtn = [...document.querySelectorAll(".delete")];
    delBtn.forEach(elm => {
        elm.addEventListener("click", () => {
            if (countNum > 0) {
                newNum--;
                countNum = newNum;
                count.textContent = newNum;
            }
            elm.classList.add('del-active');
            const container = elm.closest('.task-container');
            container.classList.add('delete-active');
            container.addEventListener("transitionend", () => {
                container.remove();
            }, {once: true});
        })
    })
}

addBtn.addEventListener("click", () => {
    const text = addTaskInput.value;
    if (text) {
        initTask(taskContainer, text);
        addTaskInput.value = '';
        countNum++;
        count.textContent = countNum;
        istaskPresent = true;
    }
    if (istaskPresent) {
        checkTask();
        deletetask();
    }
})