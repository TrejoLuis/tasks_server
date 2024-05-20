const tasks = require('../tasks.json')
const crypto = require('node:crypto')

const taskModel = ({ description, project, complete }) => {
  return {
    id: crypto.randomUUID(),
    description,
    project: project ?? 'General',
    complete: !!complete
  }
}

const getAllTasks = () => {
  return tasks
}

const getTask = ({ id }) => {
  const taskIndx = tasks.findIndex(t => t.id === id)
  if (taskIndx === -1) return false
  return tasks[taskIndx]
}

const createTask = ({ description, project }) => {
  const task = taskModel({ description, project })
  tasks.push(task)
  return task
}

const updateTask = ({ id, description, project, complete }) => {
  const taskIndx = tasks.findIndex(t => t.id === id)
  if (taskIndx === -1) return false
  const task = { ...tasks[taskIndx] }

  if (description) task.description = description
  if (project) task.project = project
  if (typeof complete === 'boolean') task.complete = complete

  tasks[taskIndx] = task
  return task
}

const deleteTask = ({ id }) => {
  const taskIndx = tasks.findIndex(t => t.id === id)
  if (taskIndx === -1) return false

  tasks.splice(taskIndx, 1)
  return true
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}
