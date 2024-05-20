const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3500

app.disable('x-powered-by')
app.use(express.json())

app.use('/tasks', require('./routes/tasks.js'))

app.use('*', (req, res) => {
  res.status(400).send('Error 404 resource not found')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
