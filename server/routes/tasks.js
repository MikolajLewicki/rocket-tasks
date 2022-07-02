import express from 'express'
import { addTask, getTasks } from '../controlers/tasks.js'
import auth from '../middleware/auth.js'


const router = express.Router()
router.post('/addTask', addTask)
router.get('/getTasks', auth, getTasks)



export default router   