// Task list array to store tasks
let tasks = [];

// DOM elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskText');
const taskList = document.getElementById('taskList');

// Event listener for form submission
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

// Function to add a new task
function addTask(taskText) {
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    description: '', // Renamed from 'notes'
    priority: 'high' // Default priority set to 'high'
  };
  tasks.push(task);
  renderTasks();
}

// Function to render all tasks
function renderTasks() {
  // Clear the task list
  taskList.innerHTML = '';

  // Render each task
  tasks.forEach(renderTask);
}

// Function to render a task item
function renderTask(task) {
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item');
  taskItem.innerHTML = `
    <input type="checkbox" data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
    <span>${task.text}</span>
    <button data-task-id="${task.id}">Delete</button>
  `;

  const taskDetails = document.createElement('div');
  taskDetails.classList.add('task-details');
  taskDetails.innerHTML = `
    <input type="text" class="task-description" placeholder="Description of Task..." data-task-id="${task.id}">
    <input type="date" class="task-due-date" data-task-id="${task.id}">
    <select class="task-priority" data-task-id="${task.id}">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high" selected>High</option>
    </select>
    <div class="task-attachment-container">
      <input type="file" class="task-attachment" data-task-id="${task.id}">
      <label class="task-attachment-label" for="attachment-${task.id}"></label>
    </div>
  `;

  taskItem.appendChild(taskDetails);
  taskList.appendChild(taskItem);
}

// Event listener for task completion
taskList.addEventListener('change', function(event) {
  if (event.target.type === 'checkbox') {
    const taskId = event.target.getAttribute('data-task-id');
    const task = tasks.find(t => t.id === parseInt(taskId));
    task.completed = event.target.checked;
    event.target.nextElementSibling.classList.toggle('completed', task.completed);
  }
});

// Event listener for task deletion
taskList.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    const taskId = event.target.getAttribute('data-task-id');
    tasks = tasks.filter(t => t.id !== parseInt(taskId));
    renderTasks();
  }
});

// Event listener for task description
taskList.addEventListener('input', function(event) {
  if (event.target.classList.contains('task-description')) {
    const taskId = event.target.getAttribute('data-task-id');
    const task = tasks.find(t => t.id === parseInt(taskId));
    task.description = event.target.value;
  }
});

// Event listener for task due date
taskList.addEventListener('change', function(event) {
  if (event.target.classList.contains('task-due-date')) {
    const taskId = event.target.getAttribute('data-task-id');
    const task = tasks.find(t => t.id === parseInt(taskId));
    task.dueDate = event.target.value;
  }
});

// Event listener for task priority
taskList.addEventListener('change', function(event) {
  if (event.target.classList.contains('task-priority')) {
    const taskId = event.target.getAttribute('data-task-id');
    const task = tasks.find(t => t.id === parseInt(taskId));
    task.priority = event.target.value;
  }
});

// Event listener for task attachment
taskList.addEventListener('change', function(event) {
  if (event.target.classList.contains('task-attachment')) {
    const taskId = event.target.getAttribute('data-task-id');
    const task = tasks.find(t => t.id === parseInt(taskId));
    // Handle attachment file here
  }
});

