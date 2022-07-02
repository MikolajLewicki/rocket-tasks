import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    content: [],
    currentContent: "",
    getContent:  async (type, currentContent) => {
        try{
            if(type.includes("/users")){
                console.log((state) => state.currentContent)
                if(currentContent === "/tasks" ){
                    set((state) => ({content: []}))
                }  
                const result = await api.getUsers();
                set((state) => ({content: result.data.result}))
                set((state) => ({currentContent: "/users"}))
            }
            if(type.includes("/tasks")){
                if(currentContent === "/users" ){
                    set((state) => ({content: []}))
                }  
                const result = await api.getTasks();
                set((state) => ({content: result.data.result}))
                set((state) => ({currentContent: "/tasks"}))
            }
        }catch(err){
            console.log(err)
        }
    },
    changeStatus: async (value, id) => {
        const data = [value, id]
        try{
            await api.changeStatus(data)
            const result = await api.getTasks();
            set((state) => ({content: result.data.result}))
        }catch(err){
            console.log(err)
        }
    },
    deleteTask: async (id) => {
        const data = [id]
        try{
            await api.deleteTask(data)
            const result = await api.getTasks();
            set((state) => ({content: result.data.result}))
        }catch(err){
            console.log(err)
        }
    },
})

const contentStore = create(devtools(store))
export default contentStore