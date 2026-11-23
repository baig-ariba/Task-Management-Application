//const prompt = require("prompt-sync")();

const addButton = document.getElementById('addTask');

const tName = document.getElementById('taskName');
const tCategory = document.getElementById('category');
const tDeadline = document.getElementById('deadline');
const taskTable = document.getElementById('taskTable');
let tStatus = document.getElementById('status');

const updateButton = document.getElementById('updateStatus');

const filterCategory = document.getElementById('statusCFilter');
const filterStatus = document.getElementById('statusSFilter');
const filterTaskTable = document.getElementById('filterTaskTable');

let taskCounter = 1;
let taskArray = [];
let filterCounter = 1;
let filteredArray = [];

addButton.addEventListener("click", function () {
    const task = {
        taskNumber: taskCounter,
        taskName: tName.value,
        category: tCategory.value,
        deadline: tDeadline.value,
        status: tStatus.value || "In Progress",
    };

    if (!task.taskName) {
        alert("Please enter a task name");
        return;
    }

    for (let i = 0; i < taskArray.length; i++) {
        if (task.taskName.toLowerCase().trim() === taskArray[i].taskName.toLowerCase().trim()) {
            alert("Task is already in the list");
            return;
        }
    }

    let stat = task.status;
    task.status = updateStatus(stat);

    const newRow = document.createElement("tr");
    const taskDetails = [task.taskNumber, task.taskName, task.category, task.deadline, task.status];
    for(d of taskDetails){
        const cell = document.createElement("td");
        cell.textContent = d;
        newRow.appendChild(cell);
    }
    taskTable.appendChild(newRow);
    taskCounter++;

    addTask(task);
    
    tName.value = "";
    tCategory.value = "";
    tDeadline.value = "";
    tStatus.value = "";
})

function addTask(task) {
    taskArray.push(task);
}

function updateStatus(stat){
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(tDeadline.value);

    if (!tDeadline.value){
        return stat;
    }
    
    if(deadlineDate < today && stat !== "Completed"){
        stat = "Overdue";
    }

    return stat;
}

updateButton.addEventListener("click", function () {
    if(taskArray.length === 0){
        alert("There is no task in the list to update");
        return;
    }

    let tNum = prompt("Which task do you want to update? Enter number:");
    
    if (tNum === null) {
        return;
    }
    
    for (let j=0; j<taskArray.length; j++){
        if(Number(tNum) === 0){
            alert("No such task in the list");
            return;
        }
        else if((Number(tNum)-1) === j){
            let uStatus = prompt("What status you want to update it to? 1. In progress   2. Completed   3. Overdue");
            
            if(uStatus === null){
                return;
            }
            
            if(uStatus.toLowerCase().trim() === "inprogress" || uStatus.toLowerCase().trim() === "1"){
                taskArray[j].status = "In Progress";
            }
            else if(uStatus.toLowerCase().trim() === "completed" || uStatus.toLowerCase().trim() === "2"){
                taskArray[j].status = "Completed";
            }
            else if(uStatus.toLowerCase().trim() === "overdue" || uStatus.toLowerCase().trim() === "3"){
                taskArray[j].status = "Overdue";
            }
            else{
                alert("Wrong input");
            }
            taskTable.rows[j].cells[4].textContent = taskArray[j].status;
            break;
        }   
    }
})

filterCategory.addEventListener("change", function(){
    if(taskArray.length === 0){
        alert("There is no task to filter")
        return;
    }
    
    filterTaskTable.innerHTML = "";
    filterCounter = 1;
    
    const catTasks = taskArray.filter(t => t.category === filterCategory.value)
    for(t of catTasks){
        const newRow = document.createElement("tr");
        const filterDetails = [filterCounter, t.taskName, t.category, t.deadline, t.status];
        console.log(filterCounter);

        for (const d of filterDetails) {
            const cell = document.createElement("td");
            cell.textContent = d;
            newRow.appendChild(cell);
        }
        
        filterTaskTable.appendChild(newRow);
        filterCounter++;
    }
})

filterStatus.addEventListener("change", function(){
    if(taskArray.length === 0){
        alert("There is no task to filter")
        return;
    }
    
    filterTaskTable.innerHTML = "";
    filterCounter = 1;
    
    const catTasks = taskArray.filter(t => t.status === filterStatus.value)
    for(t of catTasks){
        const newRow = document.createElement("tr");
        const filterDetails = [filterCounter, t.taskName, t.category, t.deadline, t.status];
        
        for (const d of filterDetails) {
            const cell = document.createElement("td");
            cell.textContent = d;
            newRow.appendChild(cell);
        }
        
        filterTaskTable.appendChild(newRow);
        filterCounter++;
    }
})