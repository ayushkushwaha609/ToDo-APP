const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const todoList = document.querySelector('.todo-list');

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
input.value = '';
}
});

todoList.addEventListener('click', (event) => {
if (event.target.classList.contains('delete')) {
event.target.parentNode.remove();
} else if (event.target.classList.contains('task')) {
event.target.classList.toggle('completed');
}
});