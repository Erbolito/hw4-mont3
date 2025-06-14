const from = document.getElementById("form"),
      taskCount = document.getElementById("taskCount"),
      listTask = document.getElementById("listTask"),
      listDoneTask = document.getElementById("listDoneTask");

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#listTask li").forEach((li) => {
        tasks.push(li.querySelector("p")?.textContent || li.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const doneTasks = [];
    document.querySelectorAll("#listDoneTask li").forEach((li) => {
        doneTasks.push(li.querySelector("p")?.textContent || li.textContent.trim());
    });
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedDoneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    listTask.innerHTML = "";
    listDoneTask.innerHTML = "";

    savedTasks.forEach((taskText) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.innerHTML = `
            <p>${taskText}</p>
            <div>
                <button class="check">
                    <img src="./icons/Check.svg" alt="">
                </button>
                <button class="remove">
                    <img src="./icons/TrashSimple.svg" alt="">
                </button>
            </div>`;
        listTask.appendChild(li);
    });

    savedDoneTasks.forEach((taskText) => {
        const li = document.createElement("li");
        li.classList.add("task");
        li.innerHTML = `<p>${taskText}</p>`;
        listDoneTask.appendChild(li);
    });

    taskCount.textContent = `Task to do - ${listTask.children.length}`;
}

document.addEventListener("DOMContentLoaded", loadTasks);

document.addEventListener("click", (e) => {
    if (e.target.closest(".remove")) {
        const li = e.target.closest("li");
        li.remove();
        saveTasks();
        taskCount.textContent = `Task to do - ${listTask.children.length}`;
    }

    if (e.target.closest(".check")) {
        const li = e.target.closest("li");
        listDoneTask.appendChild(li);
        li.querySelector(".check").remove();
        li.querySelector(".remove").remove();
        saveTasks();
    }
});
