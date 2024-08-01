const express = require('express')
const cors = require('cors')
require('dotenv').config()


// Initilizing an express app
const app = express()

// Middleware for CORS (allows all CORS requests)
app.use(cors())

const port = process.env.PORT || 8000

app.get('/api/v1/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Todo app backend is listening on port ${port}`)
})