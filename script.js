const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const todoList = document.querySelector('.todo-list');

// Function to retrieve tasks from local storage
function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to update tasks in local storage
function updateTasksInStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks from storage
function renderTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach((taskText) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
      <span class="task">${taskText}</span>
      <button class="delete">Delete</button>
    `;
    todoList.appendChild(todoItem);
  });
}

// Add task to the list and local storage
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = input.value.trim();
  if (task !== '') {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
      <span class="task">${task}</span>
      <button class="delete">Delete</button>
    `;
    todoList.appendChild(todoItem);

    const tasks = getTasksFromStorage();
    tasks.push(task);
    updateTasksInStorage(tasks);

    input.value = '';
  }
});

// Handle delete and task completion
todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    event.target.parentNode.remove();
    const tasks = getTasksFromStorage();
    const taskText = event.target.parentNode.querySelector('.task').textContent;
    const filteredTasks = tasks.filter((task) => task !== taskText);
    updateTasksInStorage(filteredTasks);
  } else if (event.target.classList.contains('task')) {
    event.target.classList.toggle('completed');
  }
});

// On page load, render tasks from local storage
window.addEventListener('load', renderTasks);

// Save tasks to local storage before closing the tab or browser
window.addEventListener('beforeunload', () => {
  const tasks = [];
  document.querySelectorAll('.task').forEach((task) => {
    tasks.push(task.textContent);
  });
  updateTasksInStorage(tasks);
});
