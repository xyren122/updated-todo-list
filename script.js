let taskInput = document.querySelector("#taskInput");
let addTask = document.querySelector("#addTask");
let taskList = document.querySelector("#taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.innerText = task.text;

        if (task.completed) {
            text.classList.add("completed");
        }

        text.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const delBtn = document.createElement("button");
        delBtn.innerText = "×";

        delBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(text);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

addTask.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("You must write something to add");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

renderTasks();
