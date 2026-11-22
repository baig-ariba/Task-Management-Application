const addButton = document.getElementById('addTask');
const tName = document.getElementById('taskName');
const tCategory = document.getElementById('category');
const tDeadline = document.getElementById('deadline');
let tStatus = document.getElementById('status');
const taskTable = document.getElementById('taskTable');

let taskArray = [];

addButton.addEventListener("click", function () {
    const task = {
        taskName: tName.value,
        category: tCategory.value,
        deadline: tDeadline.value,
        status: tStatus.value || "in Progress",
    };

    if (!task.taskName) {
        alert("Please enter a task name");
        return;
    }

    task.status = updateStatus();

    for (let i = 0; i < taskArray.length; i++) {
        if (task.taskName.toLowerCase().trim() === taskArray[i].taskName.toLowerCase().trim()) {
            alert("Task is already in the list");
            return;
        }
    }
    
    const newRow = document.createElement("tr");
    const taskDetails = [task.taskName, task.category, task.deadline, task.status];
    for(d of taskDetails){
        const cell = document.createElement("td");
        cell.textContent = d;
        newRow.appendChild(cell);
    }
    taskTable.appendChild(newRow);

    addTask(task);
    
    tName.value = "";
    tCategory.value = "";
    tDeadline.value = "";
    tStatus.value = "";
})

function addTask(task) {
    taskArray.push(task);
}

function updateStatus(){
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(tDeadline.value);

    if (!tDeadline){
        return;
    }
    
    if(deadlineDate < today ){
        return "Overdue";
    }
}
