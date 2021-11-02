// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector("#clear-tasks");
const taskInput = document.querySelector("#tasks");

// Load all event Listeners
loadEventListerners();

function loadEventListerners() {
  // Dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //  Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
}

// Get Tasks From Ls
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item  list-group-item";

    // create checkbox
    const input = document.createElement("input");

    // Add input attribute
    input.type = "checkbox";
    input.checked = false;

    // Add input class
    input.className = "mx-1 my-1";

    // Add input id to check when clicked
    input.id = task;

    // append input to li
    li.appendChild(input);

    // create text node and append to li
    li.appendChild(document.createTextNode(task));

    // create new link element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item  ms-5";
    // Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    const allItems = taskList.querySelectorAll("input");

    allItems.forEach((item) => {
      item.addEventListener("change", completeTask);
    });

    // Complete Tasks
    // Get the checkbox
    // var checkBox = document.getElementById("check");
    // checkBox.addEventListener("click", completeTask);

    var text = JSON.parse(localStorage.getItem("tasks"));
    //console.log(text);

    function completeTask(e) {
      e.target.checked = !e.target.checked;
      console.log(e.target.parentElement.textContent);

      e.target.parentElement.style.textDecoration = e.target.checked
        ? "line-through"
        : "none";

      //   for (let i = 0; i < text.lenght; ) {
      //     // If the checkbox is checked, display the output text
      // if (checkBox.checked == true) {
      // var completedTasks = [];
      // completedTasks.push(li.textContent);
      // console.log(completedTasks);
      // console.log(checkBox);
      // li.style.textDecoration = "line-through";
      // } else {
      // li.style.textDecoration = "none";
    }
    //   }
    ///var completedTasks = [];
    // for (i = 0; i < checkBox.length; i++) {
    //   if (checkBox[i].type == "checkbox") {
    //     if (checkBox[i].checked == true) {
    //       completedTasks.push(checkBox[i].value);
    //       alert(checkBox[i].value);
    //     }
    //   }
    // }
    // }
  });
}

// Add Task
function addTask(e) {
  event.preventDefault();
  if (taskInput.value === " ") {
    alert("Add a task");
  }

  // Create li element
  const li = document.createElement("li");

  // Add class
  li.className = "collection-item list-group-item";

  // create checkbox
  const input = document.createElement("input");

  // Add input type
  input.type = "checkbox";

  // Add input class
  input.className = "mx-1 my-1";

  // Add input id to check when clicked
  input.id = "check";

  // append input to li
  li.appendChild(input);

  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create new link element
  const link = document.createElement("a");
  // add class
  link.className = "delete-item ms-5";

  // Add icon
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';

  // append the link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  //Store in Local storage
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = "";
}

// Store In Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // one way of clearing tasks
  //taskList.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

// clear from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
