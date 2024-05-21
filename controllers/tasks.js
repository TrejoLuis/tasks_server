const taskModel = require('../models/task.js')
const { validateTask, validatePartialTask } = require('../schemes/taskScheme.js')

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
  const validateData = validateTask(req.body)
  if (validateData.error) return res.status(400).json({ error: JSON.parse(validateData.error.message) })

  const { description, project } = validateData.data
  const result = taskModel.createTask({ description, project })
  if (!result) return res.status(500).json({ message: '500 Internal Server Error' })

  res.status(201).send(result)
}

const updateTask = (req, res) => {
  const { id } = req?.params
  if (!id) return res.status(400).json({ message: 'id is required' })

  const validateData = validatePartialTask(req.body)
  if (validateData.error) return res.status(400).json({ error: JSON.parse(validateData.error.message) })
  const { description, project, complete } = validateData.data

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
