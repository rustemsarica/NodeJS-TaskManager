const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const taskSearchInputDOM = document.querySelector('.task-search-input')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/tasks')
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      taskSearchInputDOM.style.visibility = 'hidden'
      return
    }else{
      taskSearchInputDOM.style.visibility = 'visible'
    }
    const allTasks = tasks
      .map((task) => {
        const { status, _id: taskID, name } = task
        return `<div class="single-task ${status && 'task-status'}">
                <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">
                <!-- edit link -->
                <a href="task.html?id=${taskID}"  class="edit-link">
                <i class="fas fa-edit"></i>
                </a>
                <!-- delete btn -->
                <button type="button" class="delete-btn" data-id="${taskID}">
                <i class="fas fa-trash"></i>
                </button>
                </div>
                </div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// search tasks
const searchTasks = async (e) => {
  const searchValue = e.target.value.toLowerCase()
  const {
    data: { tasks },
  } = await axios.get('/tasks')

  const filteredTasks = tasks.filter((task) => {
    return task.name.toLowerCase().includes(searchValue)
  })

  if (filteredTasks.length < 1) {
    tasksDOM.innerHTML = '<h5 class="empty-list">No tasks found</h5>'
    return
  }

  const allTasks = filteredTasks
    .map((task) => {
      const { status, _id: taskID, name } = task
      return `<div class="single-task ${status && 'task-status'}">
              <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
              <div class="task-links">
              <!-- edit link -->
              <a href="task.html?id=${taskID}"  class="edit-link">
              <i class="fas fa-edit"></i>
              </a>
              <!-- delete btn -->
              <button type="button" class="delete-btn" data-id="${taskID}">
              <i class="fas fa-trash"></i>
              </button>
              </div>
              </div>`
    })
    .join('')
  tasksDOM.innerHTML = allTasks
}
taskSearchInputDOM.addEventListener('keyup', searchTasks)


// delete task /task/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/task/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value

  try {
    await axios.post('/tasks', { name })
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
    
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})