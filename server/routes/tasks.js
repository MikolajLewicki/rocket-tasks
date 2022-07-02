import express from 'express'
import { addTask, getTasks, changeStatus } from '../controlers/tasks.js'
import auth from '../middleware/auth.js'


const router = express.Router()
router.post('/addTask', addTask)
router.get('/getTasks', auth, getTasks)
router.post('/changeStatus', auth, changeStatus)



export default router   