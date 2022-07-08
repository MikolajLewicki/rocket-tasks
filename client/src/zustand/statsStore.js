import create from 'zustand'
import * as api from '../api/index'
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    chartsContent: {},
    status: "no filters",
    filters: {},
    getContent: async (filters) => {
        let range1 = (await api.getTasks()).data.result;
        let range2 = (await api.getTasks()).data.result;


        //// Checking is user in filters
        range1 = range1.filter(item => { 
            for(let i = 0; i < filters.users.length; i++){
                if(item.assignedFor === filters.users[i]){
                    return item
                }
            }
        })
        range2 = range2.filter(item => { 
            for(let i = 0; i < filters.users.length; i++){
                if(item.assignedFor === filters.users[i]){
                    return item
                }
            }
        })

        /// Checking is task fits in date filters
        const checkDate = (date1, date2, date3) => {
            const from = new Date(date1.slice(0,4), parseInt(date1.slice(6,7)) - 1, date1.slice(8,10), 0, 0).getTime()
            const to = new Date(date2.slice(0,4), parseInt(date2.slice(6,7)) - 1, date2.slice(8,10), 23, 59).getTime()
            const check = new Date(date3.slice(0,4), parseInt(date3.slice(6,7)) - 1, date3.slice(8,10), date3.slice(11, 13)).getTime()
            if(check > from && check < to){
                return true
            }else{
                return false
            }
        }

        range1 = range1.filter(item => { 
            if(checkDate(filters.range1Start, filters.range1End, item.dateOfCreation )){
                return item
            }
        }) 
        range2 = range2.filter(item => { 
            if(checkDate(filters.range2Start, filters.range2End, item.dateOfCreation)){
                return item
            }
        }) 
        ///Making pie chart ready objects
        const makePieChart = (obj) => {
            let result = {
                new: obj.filter(item => item.status === "new"),
                work: obj.filter(item => item.status === "work"),
                end: obj.filter(item => item.status === "end"),
            }
            return result
        }


        ///Making bar chart ready objects
        const makeBarChart = (obj1, obj2, toCheck) => {
            let result = {}
            let endresult = {}
            obj1.map(item => {
                if(typeof(item[toCheck]) !== "undefined"){
                    result = {
                        ...result,
                        [item[toCheck].slice(0,10)]: {date: `${item[toCheck].slice(0,10)}`, 
                        range1: typeof(result[item[toCheck].slice(0,10)]) !== "undefined" ? result[item[toCheck].slice(0,10)].range1 + 1 : 1,
                        range2: 0,
                    }
        
                    }
                }
            })
            obj2.map(item => {
                if(typeof(item[toCheck]) !== "undefined"){
                    if(typeof(result[item[toCheck].slice(0,10)]) !== "undefined"){
                            result = {
                                ...result,
                                [item[toCheck].slice(0,10)]: {date: `${item[toCheck].slice(0,10)}`,
                                 range1: result[item[toCheck].slice(0,10)].range1,
                                 range2: typeof(result[item[toCheck].slice(0,10)].range2) !== "undefined" ? result[item[toCheck].slice(0,10)].range2 + 1 : 1  
                            }}
                    }else{
                        result = {
                            ...result,
                            [item[toCheck].slice(0,10)]: {date: `${item[toCheck].slice(0,10)}`, range1: 0, range2: 1}
                        }
                    }
            }})
            const getDifference = (num1, num2) => {
                let result = Math.round(((((num1 - num2) / num2)* 100)* 10) / 10)
                if(result !== Infinity){
                    return result
                }else{
                    return '∞'
                }
            }
            if(toCheck === "dateOfCreation"){ ///get stats about numbers of tasks assigend
                endresult = {
                    chartData: Object.values(result),
                    data: {
                        range1Length: range1.length,
                        range2Length: range2.length,
                        difference: getDifference(range1.length, range2.length),
                    }
                }
            }else{ ///get stats about time of work
                
                const getAvgTime = (obj) => {
                    let SumTime = 0
                    let numOfItems = 0
                    obj.map(item => {
                        if(typeof(item[toCheck]) !== "undefined"){
                        SumTime = SumTime + (new Date(item[toCheck]).getTime() - new Date(item.dateOfCreation).getTime())
                        numOfItems++
                    }})

                    if(numOfItems !== 0){
                        let miliseconds =  Math.round((SumTime / numOfItems * 10) / 10)
                        let hours = Math.floor(Math.floor(Math.floor(miliseconds / 1000) / 60) / 60)
                        if(hours !== 0){
                            return hours
                        }
                        return 1
                    }else{
                        return 0
                    }

                }

                endresult = {
                    chartData: Object.values(result),
                    data: {
                        range1Ang: getAvgTime(range1),
                        range2Avg: getAvgTime(range2),
                        difference: getDifference(getAvgTime(range1), getAvgTime(range2)),
                    }
                }
            }

            
            return endresult
        }


        if(range1.length === 0 && range2.length === 0){
            set((state) => ({status: "no tasks"}))
        }else{
            set((state) => ({chartsContent: {
                pieChart1: makePieChart(range1),
                pieChart2: makePieChart(range2),
                barChart1: makeBarChart(range1, range2, "dateOfCreation"),
                barChart2: makeBarChart(range1, range2, "startOfWork"),
                barChart3: makeBarChart(range1, range2, "endOfWork"),
            }}))
            set((state) => ({status: "showing tasks"}))
        }
    }
})

const statsStore = create(devtools(store))
export default statsStore