import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

///users
export const addUser = (data) => API.post('/users/addUser', data)
export const getUsers = () => API.get('/users/getUsers')
export const logIn = (data) => API.post('/users/logIn', data)
export const checkLogin = (data) => API.post('/users/checkLogin', data)
export const updateAvatar = (data) => API.post('/users/updateAvatar', data)
export const updatePassword = (data) => API.post('/users/updatePassword', data)
export const deleteUser = (data) => API.post('/users/deleteUser', data)
export const resetAvatar = (data) => API.post('/users/resetAvatar', data)
export const resetPassword = (data) => API.post('/users/resetPassword', data)
export const changeMail = (data) => API.post('/users/changeMail', data)
export const changeName = (data) => API.post('/users/changeName', data)
export const getUser = (data) => API.post('/users/getUser', data)