const express = require('express')
const app = express()
require('dotenv').config()

const cors = require('cors')
const { default: mongoose } = require('mongoose')

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/', (req, res) => {
  return res.json('Hello World!')
})

// user Authentication routes
const userRoutes = require('./routes/auth')
app.use('/v1/api/user/', userRoutes)
// Artist Routes
const artistRoutes = require('./routes/artist')
app.use('/v1/api/artists/', artistRoutes)
// Album Routes
const albumRoutes = require('./routes/album')
app.use('/v1/api/albums/', albumRoutes)
// Songs Routes
const songsRoutes = require('./routes/songs')
app.use('/v1/api/songs/', songsRoutes)

mongoose.connect(process.env.MONGOOSE_DB, {
  useNewUrlParser: true
})

mongoose.connection
  .once('open', () =>
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
  )
  .on('error', error => console.log(`Error DB: ${error}`))

app.listen(4000, () => {
  console.log('Server is running on port http://localhost:4000')
})
