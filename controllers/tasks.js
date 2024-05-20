const taskModel = require('../models/task.js')

// TODO VALIDATE ALL REQ DATA
const getAllTasks = (req, res) => {
  const result = taskModel.getAllTasks()
  if (!result) return res.status(400).json({ message: 'No tasks found' })

  res.json(result)
}

const getTask = (req, res) => {
  const { id } = req?.params
  if (!id) return res.status(400).json({ message: 'id is required' })
  const result = taskModel.getTask({ id })
  if (!result) return res.status(404).json({ message: `Task ${id} not found` })

  res.json(result)
}

const createTask = (req, res) => {
  const { description, project } = req?.body
  if (!description) return res.status(400).json({ message: 'description is required' })
  const result = taskModel.createTask({ description, project })
  if (!result) return res.status(500).json({ message: '500 Internal Server Error' })

  res.status(201).send(result)
}

const updateTask = (req, res) => {
  const { id } = req?.params
  if (!id) return res.status(400).json({ message: 'id is required' })
  // validate body todo
  const { description, project, complete } = req?.body
  const result = taskModel.updateTask({
    id, description, project, complete
  })

  if (!result) return res.status(404).json({ message: `Task ${id} not found` })
  res.send(result)
}

const deleteTask = (req, res) => {
  const { id } = req?.params
  if (!id) return res.status(400).json({ message: 'id is required' })
  const result = taskModel.deleteTask({ id })
  if (!result) return res.status(404).json({ message: `Task ${id} not found` })

  res.json({ message: `Task ${id} deleted` })
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}
