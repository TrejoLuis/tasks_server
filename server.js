const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3500
const tasks = require('./tasks.json')
const crypto = require('node:crypto')

app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

// memory
app.get('/tasks', (req, res) => {
  if (!tasks) return res.status(400).json({ message: 'No tasks found' })
  res.json(tasks)
})
app.get('/tasks/:id', (req, res) => {
  const { id } = req?.params
  if (!id) return res.status(400).json({ message: 'Id is required' })
  const foundTask = tasks.find(t => t.id === id)
  if (!foundTask) return res.sendStatus(204)
  res.json(foundTask)
})
app.post('/tasks', (req, res) => {
  const { description, project } = req?.body
  if (!description) return res.status(400).json({ message: 'Description is required' })
  const newTask = {
    id: crypto.randomUUID(),
    description,
    project: project ?? 'General',
    complete: false
  }
  tasks.push(newTask)
  res.json(newTask)
})
app.patch('/tasks/:id', (req, res) => {
  const { id } = req?.params
  const taskIndx = tasks.findIndex(t => t.id === id)
  console.log(taskIndx)
  if (taskIndx === -1) res.status(404).json({ message: `Task ${id} not found` })

  console.log(tasks[taskIndx])
  const updatedTask = {
    ...tasks[taskIndx]
  }
  console.log(updatedTask)
  if (!req?.body) return res.json(updatedTask)

  const { description, project, complete } = req?.body
  console.log(complete)
  if (description) updatedTask.description = description
  if (project) updatedTask.project = project
  if (typeof complete !== 'undefined') updatedTask.complete = complete
  console.log(updatedTask)

  tasks[taskIndx] = updatedTask
  res.json(updatedTask)
})

app.delete('/tasks/:id', (req, res) => {
  const { id } = req?.params
  const taskIndx = tasks.findIndex(t => t.id === id)
  if (taskIndx === -1) return res.status(404).json({ message: `Task ${id} not found` })

  tasks.splice(taskIndx, 1)
  res.json({ message: 'Task deleted' })
})

app.use('*', (req, res) => {
  res.status(400).send('Error 404 resource not found')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
