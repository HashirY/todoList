// Sample tasks data structure
// let tasks = localStorage.getItem("items")
//   ? JSON.parse(localStorage.getItem("items"))
//   : [];

// console.log(tasks);

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelector(".addTask");
const btnCloseModal = document.querySelector(".close-modal");
const searchButton = document.querySelector(".search");

window.onload = (event) => {
  const currDate = new Date();
  const year = currDate.getFullYear();
  let month = currDate.getMonth() + 1;

  if (month <= 9) {
    month = "";
    month += "0";
    month += currDate.getMonth() + 1;
  }

  let date = currDate.getDate();

  if (date <= 9) {
    date = "";
    date += "0";
    date += currDate.getDate();
  }

  const dateToday = `${year}-${month}-${date}`;

  const taskElements = document.querySelectorAll(".task"); // Get all task elements

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskElement = taskElements[i]; // Corresponding task DOM element

    if (task.completed === false && task.dueDate === dateToday) {
      // sortByDueDate();
      taskElement.style.animation = "blink 1s infinite"; // Change the background color to red
    }

    if (tasks[i].dueDate < dateToday) {
      taskElement.classList.add("pastDueDate");
    }

    if (task.completed) {
      taskElement.style.animation = "none";
    }
  }
};
window.onmouseover = (event) => {
  const currDate = new Date();
  const year = currDate.getFullYear();
  let month = currDate.getMonth() + 1;

  if (month <= 9) {
    month = "";
    month += "0";
    month += currDate.getMonth() + 1;
  }

  let date = currDate.getDate();

  if (date <= 9) {
    date = "";
    date += "0";
    date += currDate.getDate();
  }

  const dateToday = `${year}-${month}-${date}`;

  const taskElements = document.querySelectorAll(".task"); // Get all task elements

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskElement = taskElements[i]; // Corresponding task DOM element
    console.log(taskElement);

    if (task.completed === false && task.dueDate === dateToday) {
      // sortByDueDate();
      taskElement.style.animation = "blink 1s infinite"; // Change the background color to red
    }

    if (task.completed === false && task.dueDate < dateToday) {
      taskElement.classList.add("pastDueDate");
    }

    if (task.completed === true) {
      taskElement.style.animation = "";
    }
  }
};

setInterval(() => {
  const date = new Date();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedHours = String(hours % 12 || 12).padStart(2, "0");
  // const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  // const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const time = `${formattedHours}:${minutes}:${seconds} ${ampm}`;

  document.querySelector(".time").textContent = time;

  const iconElement = document.querySelector(".icon");

  if (hours >= 6 && hours < 12) {
    iconElement.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>';
  } else if (hours >= 12 && hours < 18) {
    iconElement.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (hours >= 18 && hours < 21) {
    iconElement.innerHTML = '<i class="fa-solid fa-cloud-moon"></i>';
  } else {
    iconElement.innerHTML = '<i class="fas fa-moon"></i>';
  }
}, 1000);

btnOpenModal.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

let tasks = [];
let recurringTasks = [];

function renderTasks() {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const currDate = new Date();
    const year = currDate.getFullYear();
    let month = currDate.getMonth();

    if (month <= 9) {
      month = "";
      month += "0";
      month += currDate.getMonth();
    }

    let date = currDate.getDate();

    if (date <= 9) {
      date = "";
      date += "0";
      date += currDate.getDate();
    }

    const dateToday = `${year}-${month}-${date}`;

    // const dateToday = new Date(
    //   currDate.getFullYear(),
    //   currDate.getMonth(),
    //   currDate.getDate()
    // );

    if (task.dueDate < dateToday) {
      taskElement.classList.add("pastDueDate");
    }

    if (task.dueDate === dateToday) {
      taskElement.style.animation = "blink 1s infinite";
    }

    if (task.completed) {
      taskElement.classList.add("completed");
      taskElement.style.animation = "none";
    }

    let priorityBgColor;

    if (task.priority === "High") {
      priorityBgColor = "255, 0, 0";
    } else if (task.priority === "Medium") {
      priorityBgColor = "255, 255, 0";
    } else if (task.priority === "Low") {
      priorityBgColor = "9, 190, 76";
    }

    taskElement.innerHTML = `
          <h3 class="title"><span>${task.title}</span></h3>
          <p class = "des"><span>${task.description}</span></p>
          <p class="due">Due: <span>${task.dueDate}</span></p>
          <p class = "status">Status: <span>${
            task.completed ? "Completed" : "Incomplete"
          }</span></p>
          <p class="category">Category: <span>${task.category}</span></p>
          <button class="edit-button" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
          ${
            task.completed
              ? ""
              : `<button class="complete-button" onclick="toggleComplete(${index})"><i class="fa-solid fa-check"></i></button>`
          }
          <p class="priority" style="background-color: rgb(${priorityBgColor});">${
      task.priority
    }</p>
      `;

    taskList.appendChild(taskElement);
  });
  saveTasksToLocalStorage(); // Save tasks to local storage after rendering
  renderRecurringTasks();
}

function renderRecurringTasks() {
  const recurringTaskList = document.querySelector(".recurring-task-list");
  recurringTaskList.innerHTML = "";

  recurringTasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const currDate = new Date();
    const year = currDate.getFullYear();
    let month = currDate.getMonth();

    if (month <= 9) {
      month = "";
      month += "0";
      month += currDate.getMonth();
    }

    let date = currDate.getDate();

    if (date <= 9) {
      date = "";
      date += "0";
      date += currDate.getDate();
    }

    const dateToday = `${year}-${month}-${date}`;

    // const dateToday = new Date(
    //   currDate.getFullYear(),
    //   currDate.getMonth(),
    //   currDate.getDate()
    // );

    if (task.dueDate < dateToday) {
      taskElement.classList.add("pastDueDate");
    }

    if (task.dueDate === dateToday) {
      taskElement.style.animation = "blink 1s infinite";
    }

    if (task.completed) {
      taskElement.classList.add("completed");
    }
    if (task.completed) {
      taskElement.style.animation = "none";
    }

    let priorityBgColor;

    if (task.priority === "High") {
      priorityBgColor = "255, 0, 0";
    } else if (task.priority === "Medium") {
      priorityBgColor = "255, 255, 0";
    } else if (task.priority === "Low") {
      priorityBgColor = "9, 190, 76";
    }

    taskElement.innerHTML = `
          <h3 class="title"><span>${task.title}</span></h3>
          <p class = "des"><span>${task.description}</span></p>
          <p class="due">Due: <span>Everyday</span></p>
          <p class = "status">Status: <span>${
            task.completed ? "Completed" : "Incomplete"
          }</span></p>
          <p class="category">Category: <span>${task.category}</span></p>
          <button class="edit-button" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
          ${
            task.completed
              ? ""
              : `<button class="complete-button" onclick="toggleComplete(${index})"><i class="fa-solid fa-check"></i></button>`
          }
        
    
      `;

    recurringTaskList.appendChild(taskElement);
  });
  saveTasksToLocalStorage(); // Save tasks to local storage after rendering
}

// Function to add a new task
function addTask(title, description, dueDate, category, priority, recurring) {
  const currentDate = new Date();
  const selectedDate = new Date(dueDate);

  // if (selectedDate >= currentDate) {
  const task = {
    title,
    description,
    dueDate,
    category,
    completed: false,
    priority: priority,
    recurring,
  };

  if (recurring === "yes") {
    recurringTasks.push(task);
  } else tasks.push(task);

  renderTasks();
  location.reload();
  // }
  //  else {
  // alert("The due date must be ahead of or the same as the current date.");
  // }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  // location.reload();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("recurringTasks", JSON.stringify(recurringTasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }

  const savedRecurringTasks = localStorage.getItem("recurringTasks");
  if (savedRecurringTasks) {
    recurringTasks = JSON.parse(savedRecurringTasks);
  }

  renderTasks();
  renderRecurringTasks();
}

// Function to edit a task
function editTask(index) {
  const task = tasks[index];
  const taskElement = document.querySelector(".task-list").children[index];

  const currDate = new Date();
  const year = currDate.getFullYear();
  let month = currDate.getMonth();

  if (month <= 9) {
    month = "";
    month += "0";
    month += currDate.getMonth();
  }

  let date = currDate.getDate();

  if (date <= 9) {
    date = "";
    date += "0";
    date += currDate.getDate();
  }

  const dateToday = `${year}-${month}-${date}`;

  if (task.dueDate < dateToday) {
    taskElement.classList.add("pastDueDate");
  }

  if (task.dueDate === dateToday) {
    taskElement.style.animation = "blink 1s infinite";
  }

  if (task.completed) {
    taskElement.classList.add("completed");
  }
  if (task.completed) {
    taskElement.style.animation = "none";
  }

  const titleInput = document.createElement("input");
  titleInput.style.marginRight = "0.5rem";
  titleInput.type = "text";
  titleInput.value = task.title;

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.style.marginRight = "0.5rem";
  descriptionInput.value = task.description;

  const dueDateInput = document.createElement("input");
  dueDateInput.style.marginRight = "0.5rem";
  dueDateInput.type = "date";
  dueDateInput.value = task.dueDate;

  const categorySelect = document.createElement("select");
  const categories = ["Uniwork", "Personal", "Leisure"];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    if (category === task.category) {
      option.selected = true;
    }
    categorySelect.appendChild(option);
  });

  const prioritySelect = document.createElement("select");
  const priorities = ["High", "Medium", "Low"];
  priorities.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    if (category === task.category) {
      option.selected = true;
    }
    prioritySelect.appendChild(option);
  });

  const saveButton = document.createElement("button");
  saveButton.classList.add("editSave");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => {
    task.title = titleInput.value;
    task.description = descriptionInput.value;
    task.dueDate = dueDateInput.value;
    task.category = categorySelect.value;
    task.priority = prioritySelect.value;
    renderTasks();
    // location.reload();
  });

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("editSave");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    renderTasks();
    // location.reload();
  });

  taskElement.innerHTML = "";
  taskElement.appendChild(titleInput);
  taskElement.appendChild(descriptionInput);
  taskElement.appendChild(dueDateInput);
  taskElement.appendChild(categorySelect);
  taskElement.appendChild(prioritySelect);
  taskElement.appendChild(saveButton);
  taskElement.appendChild(cancelButton);
}

document.getElementById("addTaskButton").addEventListener("click", function () {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const dueDate = document.getElementById("taskDueDate").value;
  const category = document.getElementById("taskCategory").value;
  const priority = document.getElementById("priority").value;
  const recurring = document.getElementById("recurring").value;
  addTask(title, description, dueDate, category, priority, recurring);
  location.reload();
});

let isSortedByDueDate = false;

function sortByDueDate() {
  isSortedByDueDate = !isSortedByDueDate; // Toggle the sorting state

  if (isSortedByDueDate) {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else {
    tasks.sort((a, b) => tasks.indexOf(b) - tasks.indexOf(a));
  }

  // renderTasks();

  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let priorityBgColor;

    if (task.priority === "High") {
      priorityBgColor = "255, 0, 0";
    } else if (task.priority === "Medium") {
      priorityBgColor = "255, 255, 0";
    } else if (task.priority === "Low") {
      priorityBgColor = "9, 190, 76";
    }

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const currDate = new Date();
    const year = currDate.getFullYear();
    let month = currDate.getMonth() + 1;

    if (month <= 9) {
      month = "";
      month += "0";
      month += currDate.getMonth() + 1;
    }

    let date = currDate.getDate();

    if (date <= 9) {
      date = "";
      date += "0";
      date += currDate.getDate();
    }

    const dateToday = `${year}-${month}-${date}`;

    console.log(dateToday);
    console.log(currDate);

    if (task.dueDate < dateToday) {
      taskElement.classList.add("pastDueDate");
    }

    if (task.dueDate === dateToday) {
      taskElement.style.animation = "blink 1s infinite";
    }

    if (task.completed) {
      taskElement.classList.add("completed");
    }
    taskElement.innerHTML = `
    <h3 class="title"><span>${task.title}</span></h3>
    <p class = "des"><span>${task.description}</span></p>
    <p class="due">Due: <span>${task.dueDate}</span></p>
    <p class = "status">Status: <span>${
      task.completed ? "Completed" : "Incomplete"
    }</span></p>
    <p class="category">Category: <span>${task.category}</span></p>
    <button class="edit-button" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
    ${
      task.completed
        ? ""
        : `<button class="complete-button" onclick="toggleComplete(${index})"><i class="fa-solid fa-check"></i></button>`
    }
    <p class="priority" style="background-color: rgb(${priorityBgColor});">${
      task.priority
    }</p>
      `;
    taskList.appendChild(taskElement);
  });
}

document
  .getElementById("sortDueDateButton")
  .addEventListener("click", sortByDueDate);

// Function to filter tasks by completion status
function filterByCompletion(completionStatus) {
  const filteredTasks = tasks.filter((task) => {
    if (completionStatus === "completed") {
      return task.completed;
    } else if (completionStatus === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    let priorityBgColor;

    if (task.priority === "High") {
      priorityBgColor = "255, 0, 0";
    } else if (task.priority === "Medium") {
      priorityBgColor = "255, 255, 0";
    } else if (task.priority === "Low") {
      priorityBgColor = "9, 190, 76";
    }

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const currDate = new Date();
    const year = currDate.getFullYear();
    let month = currDate.getMonth() + 1;

    if (month <= 9) {
      month = "";
      month += "0";
      month += currDate.getMonth() + 1;
    }

    let date = currDate.getDate();

    if (date <= 9) {
      date = "";
      date += "0";
      date += currDate.getDate();
    }

    const dateToday = `${year}-${month}-${date}`;

    console.log(dateToday);
    console.log(currDate);

    if (task.dueDate < dateToday) {
      taskElement.classList.add("pastDueDate");
    }

    if (task.completed === false && task.dueDate === dateToday) {
      taskElement.style.animation = "blink 1s infinite";
    }

    if (task.completed) {
      taskElement.classList.add("completed");
    }
    taskElement.innerHTML = `
    <h3 class="title"><span>${task.title}</span></h3>
    <p class = "des"><span>${task.description}</span></p>
    <p class="due">Due: <span>${task.dueDate}</span></p>
    <p class = "status">Status: <span>${
      task.completed ? "Completed" : "Incomplete"
    }</span></p>
    <p class="category">Category: <span>${task.category}</span></p>
    <button class="edit-button" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
    ${
      task.completed
        ? ""
        : `<button class="complete-button" onclick="toggleComplete(${index})"><i class="fa-solid fa-check"></i></button>`
    }
    <p class="priority" style="background-color: rgb(${priorityBgColor});">${
      task.priority
    }</p>
      `;
    taskList.appendChild(taskElement);
  });
}

document.getElementById("filter").addEventListener("change", function () {
  const filterBy = document.getElementById("filter").value;
  filterByCompletion(filterBy);
});

function filterByPriority(priorityFilter) {
  const filteredTasks = tasks.filter((task) => {
    if (priorityFilter === "high") {
      return task.priority === "High";
    } else if (priorityFilter === "medium") {
      return task.priority === "Medium";
    } else if (priorityFilter === "low") {
      return task.priority === "Low";
    }
    return true; // Show all tasks if no specific priority filter is selected
  });

  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    let priorityBgColor;

    if (task.priority === "High") {
      priorityBgColor = "255, 0, 0";
    } else if (task.priority === "Medium") {
      priorityBgColor = "255, 255, 0";
    } else if (task.priority === "Low") {
      priorityBgColor = "9, 190, 76";
    }

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const currDate = new Date();
    const year = currDate.getFullYear();
    let month = currDate.getMonth() + 1;

    if (month <= 9) {
      month = "";
      month += "0";
      month += currDate.getMonth() + 1;
    }

    let date = currDate.getDate();

    if (date <= 9) {
      date = "";
      date += "0";
      date += currDate.getDate();
    }

    const dateToday = `${year}-${month}-${date}`;

    if (task.dueDate < dateToday) {
      taskElement.classList.add("pastDueDate");
    }

    if (task.completed === false && task.dueDate === dateToday) {
      taskElement.style.animation = "blink 1s infinite";
    }

    if (task.completed) {
      taskElement.classList.add("completed");
    }
    taskElement.innerHTML = `
      <h3 class="title"><span>${task.title}</span></h3>
      <p class="des"><span>${task.description}</span></p>
      <p class="due">Due: <span>${task.dueDate}</span></p>
      <p class="status">Status: <span>${
        task.completed ? "Completed" : "Incomplete"
      }</span></p>
      <p class="category">Category: <span>${task.category}</span></p>
      <button class="edit-button" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
    ${
      task.completed
        ? ""
        : `<button class="complete-button" onclick="toggleComplete(${index})"><i class="fa-solid fa-check"></i></button>`
    }
      <p class="priority" style="background-color: rgb(${priorityBgColor});">${
      task.priority
    }</p>
    `;
    taskList.appendChild(taskElement);
  });
}
document.getElementById("filter2").addEventListener("change", function () {
  const filterByPriorityValue = document.getElementById("filter2").value;
  filterByPriority(filterByPriorityValue);
});

function searchTasks() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchInput)
  );

  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    if (task.completed) {
      taskElement.classList.add("completed");
    }

    let priorityBgColor;

    if (task.priority === "High") {
      priorityBgColor = "255, 0, 0";
    } else if (task.priority === "Medium") {
      priorityBgColor = "255, 255, 0";
    } else if (task.priority === "Low") {
      priorityBgColor = "9, 190, 76";
    }

    const currDate = new Date();
    const year = currDate.getFullYear();
    let month = currDate.getMonth() + 1;

    if (month <= 9) {
      month = "";
      month += "0";
      month += currDate.getMonth() + 1;
    }

    let date = currDate.getDate();

    if (date <= 9) {
      date = "";
      date += "0";
      date += currDate.getDate();
    }

    const dateToday = `${year}-${month}-${date}`;

    if (task.dueDate < dateToday) {
      taskElement.classList.add("pastDueDate");
    }

    if (task.dueDate === dateToday) {
      taskElement.style.animation = "blink 1s infinite";
    }

    taskElement.innerHTML = `
          <h3 class="title"><span>${task.title}</span></h3>
          <p class = "des"><span>${task.description}</span></p>
          <p class="due">Due: <span>${task.dueDate}</span></p>
          <p class = "status">Status: <span>${
            task.completed ? "Completed" : "Incomplete"
          }</span></p>
          <p class="category">Category: <span>${task.category}</span></p>
          <button class="edit-button" onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
          ${
            task.completed
              ? ""
              : `<button class="complete-button" onclick="toggleComplete(${index})"><i class="fa-solid fa-check"></i></button>`
          }
          <p class="priority" style="background-color: rgb(${priorityBgColor});">${
      task.priority
    }</p>
      `;

    taskList.appendChild(taskElement);
  });
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", searchTasks);

document.addEventListener("click", function (event) {
  var searchInput = document.getElementById("searchInput");
  var searchIcon = document.querySelector(".search_icon");

  // Check if the clicked element is not the search input or the search icon
  if (
    !searchInput.contains(event.target) &&
    !searchIcon.contains(event.target)
  ) {
    searchInput.classList.remove("active");
  }
});

function toggleSearchBar() {
  var searchInput = document.getElementById("searchInput");
  var microphoneIcon = document.getElementById("microphoneIcon");
  searchInput.classList.toggle("active");

  // microphoneIcon.style.display = searchInput.classList.contains("active")
  //   ? "block"
  //   : "none";

  if (searchInput.classList.contains("active")) {
    searchInput.focus();
    microphoneIcon.style.display = "block";
  } else {
    searchInput.blur();
    microphoneIcon.style.display = "none";
  }
}

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "en-US";

recognition.onresult = function (event) {
  const result = event.results[0][0].transcript;
  var searchInput = document.getElementById("searchInput");
  searchInput.value = result;
  console.log(result);
  searchTasks();
};

recognition.onerror = function (event) {
  console.error("Speech recognition error:", event.error);
};

function startSpeechRecognition() {
  recognition.start();
  let microphoneIcon = document.getElementById("microphoneIcon");
  microphoneIcon.style.display = "none";
}

const synth = window.speechSynthesis;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
    addTask();
  }
}

const heading = document.getElementById("recurring-task-heading");
const list = document.getElementById("recurring-task-list");

// Add a click event listener to the heading
heading.addEventListener("click", () => {
  // Toggle the display of the list
  if (list.style.opacity === "0") {
    list.style.opacity = "1";
    list.style.display = "block";
  } else {
    list.style.opacity = "0";
    list.style.display = "none";
  }
});

loadTasksFromLocalStorage();

renderTasks();
