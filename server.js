require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/dbConn.js')
const mongoose = require('mongoose')
const PORT = process.env.PORT ?? 3500

connectDB()

app.disable('x-powered-by')
app.use(express.json())

app.use('/tasks', require('./routes/tasks.js'))

app.use('*', (req, res) => {
  res.status(400).send('Error 404 resource not found')
})

// Start express server once MongoDB is connected
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
