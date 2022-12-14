const taskForm = document.querySelector('.task-form')
const taskInput = document.querySelector('.task-input')
const filterTask = document.querySelector('.filter-task')
const taskList = document.querySelector('.task-list')
const tasksList = document.querySelector('.tasks')
const clearTasksBtn = document.querySelector('.clear-btn')

// Load all Event listeners
loadEventListeners()

// All event listeners
function loadEventListeners() {
  // Dom load event
  document.addEventListener('DOMContentLoaded', loadUI)
  // Add task event
  taskForm.addEventListener('submit', addTask)
  // delete task event
  tasksList.addEventListener('click', deleteTask)
  // Clear tasks event
  clearTasksBtn.addEventListener('click', clearTasks)
  // Filter task event
  filterTask.addEventListener('keyup', filterTasks)
}

function loadUI() {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(task => {
    const newTask = `
      <li class="task-list">
        ${task}
        <a href="#" class="delete-task delete">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </a>
      </li>
    `
    tasksList.insertAdjacentHTML('afterbegin', newTask)
  })

}

if(localStorage.getItem('tasks') === null) {
  tasksList.innerHTML = `
    <h5 class='no-task'>There is no Task</h5>
  `
}


function filterTasks(e) {
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.task-list').forEach(task => {
    const item = task.firstChild.textContent
    console.log(item)
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}

function clearTasks() {
  tasksList.innerHTML = ''
  // clearTasksFromLocalStorage()
  
  localStorage.clear()
  tasksList.innerHTML = `
    <h5 class='no-task'>There is no Task</h5>
  `
  // if (localStorage.getItem('tasks') === null) {
  // }
}

// function clearTasksFromLocalStorage() {
// }

function deleteTask(e) {
  if (e.target.parentElement.classList.contains('delete-task')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()

      // Remove from LS
      const del = e.target.parentElement.parentElement
      removeTaskFromLocalStorage(del)

      if (JSON.parse(localStorage.getItem('tasks')).length === 0) {
        tasksList.innerHTML = `
          <h5 class='no-task'>There is no Task</h5>
        `
      }
    }
  }
}

function addTask(e) {
  // UI
  if (taskInput.value === '') {
    alert('Add a Task')
    return ''
  }

  document.querySelector('.no-task').style.display = 'none'
  const newTask = `
    <li class="task-list">
      ${taskInput.value}
      <a href="#" class="delete-task delete">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </a>
    </li>
  `
  tasksList.insertAdjacentHTML('afterbegin', newTask)
  
  // Store in LS
  storeTaskInLocalStorage(taskInput.value)
  
  // Clear Input
  taskInput.value = ''
  e.preventDefault()
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  console.log(taskItem.textContent.trim())

  tasks.forEach((task, index) => {
    if(taskItem.textContent.trim() === task) {
      tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  })


}