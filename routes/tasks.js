const express = require('express')
const router = express.Router()
const tasks = require('..//tasks.json')
const crypto = require('node:crypto')

router.route('/')
  .get((req, res) => {
    if (!tasks) return res.status(400).json({ message: 'No tasks found' })
    res.json(tasks)
  })
  .post((req, res) => {
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

router.route('/:id')
  .get((req, res) => {
    const { id } = req?.params
    if (!id) return res.status(400).json({ message: 'Id is required' })
    const foundTask = tasks.find(t => t.id === id)
    if (!foundTask) return res.sendStatus(204)
    res.json(foundTask)
  })
  .patch((req, res) => {
    const { id } = req?.params
    const taskIndx = tasks.findIndex(t => t.id === id)
    if (taskIndx === -1) res.status(404).json({ message: `Task ${id} not found` })

    const updatedTask = {
      ...tasks[taskIndx]
    }
    if (!req?.body) return res.json(updatedTask)

    const { description, project, complete } = req?.body
    if (description) updatedTask.description = description
    if (project) updatedTask.project = project
    if (typeof complete !== 'undefined') updatedTask.complete = complete

    tasks[taskIndx] = updatedTask
    res.json(updatedTask)
  })
  .delete((req, res) => {
    const { id } = req?.params
    const taskIndx = tasks.findIndex(t => t.id === id)
    if (taskIndx === -1) return res.status(404).json({ message: `Task ${id} not found` })

    tasks.splice(taskIndx, 1)
    res.json({ message: 'Task deleted' })
  })

module.exports = router
