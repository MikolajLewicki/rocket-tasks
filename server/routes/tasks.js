import express from 'express'
import { addTasks } from '../controlers/tasks.js'
import auth from '../middleware/auth.js'


const router = express.Router()
router.post('/addTask', addTask)



export default router   