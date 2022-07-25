import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js'

dotenv.config()
const app = express()
mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(process.env.PORT || 5000, () => console.log(`server running on port ${process.env.PORT}`) ))
.catch((err) => console.log(err))

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())
app.use('/api/users', usersRouter)
app.use('/api/tasks', tasksRouter)


