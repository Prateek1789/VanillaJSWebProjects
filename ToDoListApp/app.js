const count = document.querySelector(".count");
const addTaskInput = document.querySelector("#new-task");
const addBtn = document.querySelector(".add");
const taskContainer = document.querySelector(".task-list-group");
let countNum = 0;
let taskPresent = false;

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

addBtn.addEventListener("click", () => {
    const text = addTaskInput.value;
    if (text) {
        initTask(taskContainer, text);
        addTaskInput.value = '';
        countNum++;
        count.textContent = countNum;
        taskPresent = true;
    }
})