require('./models/User')
require('./models/Hunt')
const authRoutes = require('./routes/authRoutes')
const huntRoutes = require('./routes/huntRoutes')
const userRoutes = require('./routes/userRoutes')
const requireAuth = require('./middlewares/requireAuth')

const express = require('express')
const debug = require('debug')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const mongoDebug = debug('mongo')
const expressDebug = debug('express')

const app = express()

app.use(bodyParser.json({ limit: '20mb' }))
app.use(authRoutes)
app.use(huntRoutes)
app.use(userRoutes)

const MONGO_URI = 'mongodb://localhost:27017/hunterapp'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
  mongoDebug('Connected to mongo instance')
})
mongoose.connection.on('error', err => {
  mongoDebug('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  expressDebug(`Listening on port ${port}`)
})
