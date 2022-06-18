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
  taskList.prepend(task);

};

function addTaskToList () {

  const newTask = taskInput.value;

  if (tasks.length >= LIMIT) {
    
    alert('You exceeded limit!');
    
  } else if (!newTask) {

    error.style.visibility = "visible";

  } else {
    
    createNewTask (newTask)

    tasks.unshift(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value='';

    showHideEmptyList(tasks);

  }

};

function removeTaskFromList () {

  taskList.removeChild(taskList.lastChild);
  tasks.pop();

  localStorage.setItem('tasks', JSON.stringify(tasks));

  showHideEmptyList(tasks);

};

function removeError () {

  error.style.visibility = "hidden";

};

function showHideEmptyList (tasks) {

  if (tasks.length > 0) {

    emptyList.style.display = "none";

  } else {

    emptyList.style.display = "block";

  }

}