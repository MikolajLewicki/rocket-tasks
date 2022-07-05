import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    content: [],
    filters: {},
    getContent: (filters) => {
        console.log('im here')
        console.log(filters)
    }
})

const statsStore = create(devtools(store))
export default statsStore