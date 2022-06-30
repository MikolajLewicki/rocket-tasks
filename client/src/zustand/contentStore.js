import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    content: [],
    getContent:  async (type) => {
        try{
            if(type.includes("/users")){
                const result = await api.getUsers();
                set((state) => ({content: result.data.result}))
            }
        }catch(err){
            console.log(err)
        }
    },
})

const contentStore = create(devtools(store))
export default contentStore