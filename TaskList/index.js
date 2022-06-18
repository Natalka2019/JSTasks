const LIMIT = 10;

const taskInput = document.querySelector('.input');
const addButton = document.querySelector('.addButton');
const removeButton = document.querySelector('.removeButton');
const taskList = document.querySelector('.taskList');
const error = document.querySelector('.error');
const emptyList = document.querySelector('.emptyList');

addButton.addEventListener("click", addTaskToList);
removeButton.addEventListener("click", removeTaskFromList);
taskInput.addEventListener("focus", removeError);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTaskToList();
  }
});

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

showHideEmptyList(tasks);

if (tasks.length > 0) {

  [...tasks].forEach(task => {
    createNewTask (task)
  });

};

function createNewTask (taskTitle) {

  let task = document.createElement('li');
  task.className = "task";
  task.innerText = taskTitle;
  taskList.append(task);

};

function addTaskToList () {

  const newTask = taskInput.value;

  if (tasks.length >= LIMIT) {
    
    alert("You've exceeded limit!");
    
  } else if (!newTask) {

    error.style.visibility = "visible";

  } else {
    
    createNewTask (newTask)

    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value='';

    showHideEmptyList(tasks);

  }

};

function removeTaskFromList () {

  taskList.removeChild(taskList.firstChild);
  tasks.shift();

  localStorage.setItem('tasks', JSON.stringify(tasks));

  showHideEmptyList(tasks);

};

function removeError () {

  error.style.visibility = "hidden";

};

function showHideEmptyList (tasks) {

  if (tasks.length > 0) {

    emptyList.style.display = "none";
    removeButton.disabled = false;

  } else {

    emptyList.style.display = "block";
    removeButton.disabled = true;

  }

}