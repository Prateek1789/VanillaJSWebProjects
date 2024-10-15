const count = document.querySelector(".count");
const addTaskInput = document.querySelector("#new-task");
const addBtn = document.querySelector(".add");
const taskListContainer = document.querySelector(".task-list-group");
let countNum = 0;
let istaskPresent = false;

function initTask(elem, text) {
    const newTask = `
        <div class="task-container">
            <button class="check">
                <i class="bx bx-check"></i>
            </button>
            <h3 class="task">${text}</h3>
            <button class="delete">
                <i class="bx bxs-trash"></i>
            </button>
        </div>
    `;
    elem.innerHTML += newTask;
    addTaskInput.value = '';
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
            const container = elm.closest('.task-container');
            container.classList.add('container-delete-active');
            container.addEventListener("transitionend", () => {
                container.remove();
                countNum = [...document.querySelectorAll(".task-container")];
                count.textContent = countNum.length;
            }, {once: true});
        })
    })
}

addBtn.addEventListener("click", () => {
    const text = addTaskInput.value;
    if (text) {
        initTask(taskListContainer, text);
        countNum = [...document.querySelectorAll(".task-container")];
        count.textContent = countNum.length;
        istaskPresent = true;
    }
    if (istaskPresent) {
        checkTask();
        deletetask();
    }
})