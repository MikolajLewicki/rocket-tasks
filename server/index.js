import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js'
import * as path from 'path'

dotenv.config()
const app = express()

mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`) ))
.catch((err) => console.log(err))

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())
app.use('/api/users', usersRouter)
app.use('/api/tasks', tasksRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '../client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
    })
}else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

