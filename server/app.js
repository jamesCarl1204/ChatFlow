const express = require('express')
const app = express()
const routes = require('./routes/routes')
const notesRoutes = require('./routes/notesRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(express.json())


app.use(routes)
app.use(notesRoutes)

app.listen(3000)