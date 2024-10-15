const count = document.querySelector(".count");
const addTaskInput = document.querySelector("#new-task");
const addBtn = document.querySelector(".add");
const taskListContainer = document.querySelector(".task-list-group");
let countNum = 0;

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
function task_check_Delete() {
    taskListContainer.addEventListener("click", (e) => {
        let target = e.target;
        // When the target element is check button
        if (target.closest('.check')) {
            const container = target.closest(".task-container");
            container.classList.toggle("container-checked");

            container.addEventListener("transitionend", () => {
                let newCount = [...document.querySelectorAll('.container-checked')].length;
                let finalNum = countNum - newCount;
                count.textContent = finalNum;
            }, {once: true});
        }
        // When the target element is delete button
        if (target.closest('.delete')) {
            const container = target.closest('.task-container');
            container.classList.add('container-delete-active');

            container.addEventListener("transitionend", () => {
                container.remove();
                countNum = document.querySelectorAll('.task-container').length;
                count.textContent = countNum;
            }, {once: true});
        }
    })
}

addBtn.addEventListener("click", () => {
    const text = addTaskInput.value;
    if (text) {
        initTask(taskListContainer, text);
        countNum = [...document.querySelectorAll(".task-container")].length;
        count.textContent = countNum;
    }
    task_check_Delete();
})