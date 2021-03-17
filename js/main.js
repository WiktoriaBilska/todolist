let todoInput; //miejsce wpisywania treści zadań
let alertInfo; //info o braku zadań/konieczności dodana tekstu
let addBtn; // przycisk ADD dodawania nowych elementów do listy
let ulList; // lista zadań, tagi <ul></ul>
let task;

let popup; //pobrany popup
let popupInfo; //alert w popupie jak się doda pusty tekst
let editedTodo; //edytowany Todo
let popupInput; //tekst wpisany w inputa w popupie
let addPopupBtn; //przycisk 'zatwierdź' w popupie
let closeTodoBtn; //przycisk zamykania popupu
let idNumber = 0;
let allTasks;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};
//pobranie elementow
const prepareDOMElements = () => {
  todoInput = document.querySelector(".todoInput");
  alertInfo = document.querySelector(".alertInfo");
  addBtn = document.querySelector(".addBtn");
  ulList = document.querySelector(".todoList ul");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popupInfo");
  popupInput = document.querySelector(".popupInput");
  addPopupBtn = document.querySelector(".accept");
  closeTodoBtn = document.querySelector(".cancel");
  allTasks = ulList.getElementsByTagName("li");
};

//nadawanie nasluchiwania
const prepareDOMEvents = () => {
  addBtn.addEventListener("click", addNewTask);
  ulList.addEventListener("click", checkClick);
  closeTodoBtn.addEventListener("click", closePopup);
  addPopupBtn.addEventListener("click", changeTodo);
  todoInput.addEventListener("keyup", enterCheck);
};

const addNewTask = () => {
  if (todoInput.value !== "") {
    idNumber++;
    task = document.createElement("li");
    task.textContent = todoInput.value;
    task.setAttribute("id", `todo-${idNumber}`);
    ulList.appendChild(task);
    todoInput.value = "";
    alertInfo.textContent = "";
    createToolsArea();
  } else {
    alertInfo.textContent = "Enter content!";
  }
};

const enterCheck = (e) => {
  if (e.keyCode === 13) {
    addNewTask();
  }
};

const createToolsArea = () => {
  let toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");

  let completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  let editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "EDIT";

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  toolsPanel.appendChild(completeBtn);
  toolsPanel.appendChild(editBtn);
  toolsPanel.appendChild(deleteBtn);
  console.log(toolsPanel);
  task.appendChild(toolsPanel);
};

const checkClick = (e) => {
  if (e.target.closest("button").classList.contains("complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.closest("button").classList.toggle("completed");
  } else if (e.target.closest("button").className === "edit") {
    editTask(e);
  } else if (e.target.closest("button").className === "delete") {
    deleteTask(e);
  }
};

const editTask = (e) => {
  const oldTodo = e.target.closest("li").id;
  editedTodo = document.getElementById(oldTodo);
  popupInput.value = editedTodo.firstChild.textContent;
  popup.style.display = "flex";
};

const changeTodo = () => {
  if (popupInput.value !== "") {
    editedTodo.firstChild.textContent = popupInput.value;
    popup.style.display = "none";
    popupInfo.innerText = "";
  } else {
    popupInfo.innerText = "You must type something!";
  }
};

const closePopup = () => {
  popup.style.display = "none";
};

const deleteTask = (e) => {
  const deleteTodo = e.target.closest("li");
  deleteTodo.remove();

  if (allTasks.length === 0) {
    alertInfo.innerText = "There are currently no tasks.";
  }
};

document.addEventListener("DOMContentLoaded", main);
