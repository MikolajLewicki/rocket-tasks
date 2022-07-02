import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    users: [],
    user: [],
    addUser: async (formData, setIsModalOpen, setError) => {
        try{
            await api.addUser(formData)
            setIsModalOpen(false)
            
        }catch(err){
            if(err.response.data.message === "user already exist"){
                setError("użytkownik już istnieje")
            }else if(err.response.data.message === "unauthenticated"){
                set((state) => ({user: []}))
            }else{
                setError("powstał błąd skontaktuj się z administratorem")
            }
        }
    },
    logIn: async (formData, setError) => {
        try{
            const result = await api.logIn(formData)
            localStorage.setItem('profile', JSON.stringify(result.data))
            set((state) => ({user: result.data.result}))
        }catch(err){
            if(err.response.data.message === "invalid credentials"){
                setError("Błędne dane")
            }else if(err.response.data.message === "user doesn't exist"){
                setError("Użytkownik nie istnieje")
            }else if(err.response.data.message === "unauthenticated"){
                set((state) => ({user: []}))
            }else{
                setError("powstał błąd skontaktuj się z administratorem")
            }
        }
    },
    checkLogin: async (setisLoaded) => {
        try{
            const local = await localStorage.getItem('profile')
            if(local){
            const userId = [JSON.parse(local).result._id]
            const result = await api.checkLogin(userId)
            set((state) => ({user: result.data.result}))
            setisLoaded(true)
            }else{
                set((state) => ({user: []}))
                setisLoaded(true)
            }
        }catch(err){
            if(err.response.data.message === "unauthenticated"){
                set((state) => ({user: []}))
                setisLoaded(true)
            }else{
                console.log("powstał błąd skontaktuj się z administratorem")
            }
        }
    },    
    logOut: async () => {
        try{
            localStorage.clear()
            set((state) => ({user: []}))
        }catch(err){
            console.log(err)
        }
    },
    changeAvatar: async (img, id) => {
        try{
            const data = [img, id]
            const result = await api.updateAvatar(data)
            set((state) => ({user: result.data.result}))
        }catch(err){
            console.log(err)
        }
    },
    changePassword: async (password, id) => {
        try{
            const data = [password, id]
            const result = await api.updatePassword(data)
            set((state) => ({user: result.data.result}))
        }catch(err){
            console.log(err)
        }
    },
    getUsers: async () => {
        try{
            const result = await api.getUsers()
            set((state) => ({users: result.data.result}))
        }catch(err){
            console.log(err)
        }
    },
    getUser: async (id, setAuthor) => {
        try{
            const data = [id]
            const result = await api.getUser(data)
            setAuthor(result.data.result.name)
        }catch(err){
            console.log(err)
        }
    },
    updateUser: async (editUser, userToEditId, id) => {
        try{
            let data = [editUser, userToEditId]
            switch(editUser.toDo) {
                case 'changeName':
                    await api.changeName(data)
                    break
                case 'changeMail':
                    await api.changeMail(data)
                    break
                case 'changeAvatar':
                    await api.resetAvatar(data)
                    break
                case 'changePassword':
                    await api.resetPassword(data)
                    break
                case 'deleteUser':
                    await api.deleteUser(data)
                    break
            }
            data = [id]
            const result = await api.getUser(data)
            set((state) => ({user: result.data.result}))
        }catch(err){
            console.log(err)
        }
    },
})


const usersStore = create(devtools(store))

export default usersStore