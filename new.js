
let tasksArray = [];
let idCounter = 1; 
let Editindex = null;

document.addEventListener("DOMContentLoaded", loadTasks);

function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    var task = {
      text: inputValue,
      id: idCounter++, 
      checked: false,
    };
    tasksArray.push(task);
    renderTask(tasksArray);
    saveTasks();
  }
  document.getElementById("myInput").value = "";
}

function closeclick(id) {
  tasksArray = tasksArray.filter(task => task.id !== id);
  renderTask(tasksArray);
  saveTasks();
}

function updateTask() {
  if (Editindex !== null) {
    const taskToEdit = tasksArray.find(task => task.id === Editindex);
    if (taskToEdit) {
      taskToEdit.text = document.getElementById("myInput").value;
      renderTask(tasksArray);
      document.getElementById("myInput").value = "";
      document.querySelector(".addBtn").style.display = "block";
      document.querySelector(".updateBtn").style.display = "none";
      saveTasks();
      Editindex = null;
    }
  }
}

function check(id) {
  const taskToCheck = tasksArray.find(task => task.id === id);
  if (taskToCheck) {
    taskToCheck.checked = !taskToCheck.checked;
    renderTask(tasksArray);
    saveTasks();
  }
}

function renderTask(tasksArray) {
  const tabel = document.getElementById("tabel");
  const data = tasksArray.map(function (item) {
    return `<div class="sub">
    <div class="data ${item.checked ? 'completed' : ''}" id="${item.id}" onclick="check(${item.id})">
      <span class="checkmark">${item.checked ? '✔' : ''}</span>
      <div>${item.text}</div>
      </div>
      <div class="btn">
      <button class="editbtn" onClick="Editclick(${item.id})">Edit</button>
      <button class="closebtn" onClick="closeclick(${item.id})">\u00D7</button>
    </div>
    </div>`;
  });
  tabel.innerHTML = data.join("");  
}


function Editclick(id) {
  const taskToEdit = tasksArray.find(task => task.id === id);
  if (taskToEdit) {
    document.getElementById("myInput").value = taskToEdit.text;
    document.querySelector(".addBtn").style.display = "none";
    document.querySelector(".updateBtn").style.display = "block";
    Editindex = id;
  }

}

function loadTasks() {
  var savedTasks = localStorage.getItem("tasks");
  var savedCounter = localStorage.getItem("idCounter");

  if (savedTasks) {
    tasksArray = JSON.parse(savedTasks);
    renderTask(tasksArray);
  }
  
  if (savedCounter) {
    idCounter = parseInt(savedCounter, 10);
  }
}

function saveTasks() {
  var tasksString = JSON.stringify(tasksArray);
  localStorage.setItem("tasks", tasksString);
  localStorage.setItem("idCounter", idCounter); 
}


