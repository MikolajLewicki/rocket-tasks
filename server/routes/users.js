import express from 'express'
import { addUser, getUsers, logIn, checkLogin, updateAvatar, updatePassword, deleteUser, resetAvatar, resetPassword, changeMail, changeName, getUser } from '../controlers/users.js'
import auth from '../middleware/auth.js'


const router = express.Router()
router.post('/addUser', auth, addUser)
router.get('/getUsers', auth, getUsers)
router.post('/logIn', logIn)
router.post('/checkLogin', auth, checkLogin)
router.post('/updateAvatar', auth, updateAvatar)
router.post('/updatePassword', auth, updatePassword)
router.post('/deleteUser', auth, deleteUser)
router.post('/resetAvatar', auth, resetAvatar)
router.post('/resetPassword', auth, resetPassword)
router.post('/changeMail', auth, changeMail)
router.post('/changeName', auth, changeName)
router.post('/getUser', auth, getUser)


export default router   