import express from 'express'
import { addTask, getTasks, changeStatus, deleteTask } from '../controlers/tasks.js'
import auth from '../middleware/auth.js'


const router = express.Router()
router.post('/addTask', addTask)
router.get('/getTasks', auth, getTasks)
router.post('/changeStatus', auth, changeStatus)
router.post('/deleteTask', auth, deleteTask)




export default router   