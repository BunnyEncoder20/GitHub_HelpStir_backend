const express = require('express')
require('dotenv').config()

// Initilizing an express app
const app = express()

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Todo app backend is listening on port ${port}`)
})