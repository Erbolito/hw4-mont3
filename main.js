const from = document.getElementById("form"), 
taskCount = document.getElementById("taskCount")
listCount = document.getElementById("listCount"),
listTask = document.getElementById("listTask"),
doneTaskCount = document.getElementById("doneTaskCount"),
listDoneTask = document.getElementById("listDoneTask");

from.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.children[0];
    
    if (input.value !== ""){
    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `
    <p>${input.value}</p>
                    <div>
                        <button class="check">
                            <img src="./icons/Check.svg" alt="">
                        </button>
                        <button class="remove">
                            <img src="./icons/TrashSimple.svg" alt="">
                        </button>
                </div>`
listTask.insertAdjacentElement('beforeend', li)
taskCount.textContent = `Task to do - ${listTask.children.length}`;
input.value = ""

const deletes = document.querySelectorAll(".remove")
deletes.forEach((el) => {
    el.addEventListener("click", () => {
        const div = el.parentElement;
        const isLi = div.parentElement;
        isLi.remove()
        })
    })
const checks = document.querySelectorAll(".check")
checks.forEach((el) => {
    el.addEventListener("click", () => {
        const taskItem = el.closest("li"); 
        listDoneTask.appendChild(taskItem); 
        taskItem.querySelector(".check").remove();
        taskItem.querySelector(".remove").remove();
        
    })
})


} else {
    alert("empty input")
}
})