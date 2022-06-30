import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'

dotenv.config()
const app = express()
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())
app.use('/users', usersRouter)

mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`) ))
.catch((err) => console.log(err))

