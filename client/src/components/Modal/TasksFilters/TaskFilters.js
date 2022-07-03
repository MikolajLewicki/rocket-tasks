import React, {useState, useEffect} from "react";
import styles from './TaskFilters.module.scss'
import usersStore from '../../../zustand/usersStore' 
import contentStore from '../../../zustand/contentStore' 
import { motion, AnimatePresence } from 'framer-motion'
import Button from "../../Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
const TaskFilters = ({handleCloseModal}) => {
    const getUsers = usersStore(state => state.getUsers)
    const users = usersStore(state => state.users)
    const applyFilters = contentStore(state => state.applyFilters)
    const [filters, setFilters] = useState({
        assignedFor: [],
        status: [],
        dateOfCreation1: new Date().toISOString().split("T")[0],
        dateOfCreation2: new Date().toISOString().split("T")[0],
        startOfWork1: new Date().toISOString().split("T")[0],
        startOfWork2: new Date().toISOString().split("T")[0],
        endOfWork1: new Date().toISOString().split("T")[0],
        endOfWork2: new Date().toISOString().split("T")[0],
    })
    const handleSubmit = async (e) => {
        let newFilters = filters
        e.preventDefault()
        if(newFilters.assignedFor.length === 0){
            newFilters.assignedFor = users.map(i => i._id)
        }
        if(filters.status.length === 0){
            newFilters.status = ["new", "work", "end"]
            newFilters.startOfWork1 = newFilters.dateOfCreation1
            newFilters.startOfWork2 = newFilters.dateOfCreation2
            newFilters.endOfWork1 = newFilters.dateOfCreation1
            newFilters.endOfWork2 = newFilters.dateOfCreation2
        }
        applyFilters(newFilters)
        handleCloseModal()
    }
    useEffect(() => {
        getUsers()
    }, [])
    const handleSetFilters = (value, type) => {
        if(type === "assignedFor" || type === "status"){
            if(filters[type].filter(item => item === value).length === 0){
                setFilters({
                    ...filters, [type]: [...filters[type], value]
                })
            }else{
                setFilters({
                    ...filters, [type]: filters[type].filter(item => item !== value)
                })
            }
        }else{
            setFilters({
                ...filters, [type]: value
            })
        }   
    }
    return(
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.title}>Filtruj zadania</div>
            <motion.div className={styles.content} initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.75}}>
                <div className={styles.contentItem}><span className={styles.spanTitle}>Właściciel:</span>
                    {users.map((item) => <span onClick={() => handleSetFilters(item._id, "assignedFor")} style={{marginLeft: '0.5rem', cursor: 'pointer'}}>{item.name} <FontAwesomeIcon style={{color: '#C1BDDB'}} icon={ filters.assignedFor.filter(i => i === item._id).length === 0 ? faSquare : faCheckSquare} /></span>)}
                </div>
                <div className={styles.contentItem}><span className={styles.spanTitle}>Status:</span>
                    <span onClick={() => handleSetFilters("new", "status")} style={{marginLeft: '0.5rem', cursor: 'pointer'}}>Nowe Zadanie <FontAwesomeIcon style={{color: '#C1BDDB'}} icon={ filters.status.filter(i => i === "new").length === 0 ? faSquare : faCheckSquare} /></span>
                    <span onClick={() => handleSetFilters("work", "status")} style={{marginLeft: '0.5rem', cursor: 'pointer'}}>W trakcie pracy <FontAwesomeIcon style={{color: '#C1BDDB'}} icon={ filters.status.filter(i => i === "work").length === 0 ? faSquare : faCheckSquare} /></span>
                    <span onClick={() => handleSetFilters("end", "status")} style={{marginLeft: '0.5rem', cursor: 'pointer'}}>Praca zakończona <FontAwesomeIcon style={{color: '#C1BDDB'}} icon={ filters.status.filter(i => i === "end").length === 0 ? faSquare : faCheckSquare} /></span>
                </div>
                <div className={styles.contentItem}><span className={styles.spanTitle}>Data dodania:</span>
                    <input type="date" className={styles.calendar} value={filters.dateOfCreation1} onChange={(e) => handleSetFilters(e.target.value, "dateOfCreation1")} min="2022-07-01" max={filters.dateOfCreation2}/>
                    <input type="date" className={styles.calendar} value={filters.dateOfCreation2} onChange={(e) => handleSetFilters(e.target.value, "dateOfCreation2")} min="2022-07-01" max={new Date().toISOString().split("T")[0]}/>
                </div>
                <AnimatePresence>{filters.status.filter(item => item === "work").length !== 0 && <motion.div initial={{y: 15, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 15, opacity: 0}} className={styles.contentItem}><span className={styles.spanTitle}>Data rozpoczęcia pracy:</span>
                    <input type="date" className={styles.calendar} value={filters.startOfWork1} onChange={(e) => handleSetFilters(e.target.value, "startOfWork1")} min="2022-07-01" max={filters.startOfWork2}/>
                    <input type="date" className={styles.calendar} value={filters.startOfWork2} onChange={(e) => handleSetFilters(e.target.value, "startOfWork2")} min="2022-07-01" max={new Date().toISOString().split("T")[0]}/>
                </motion.div>}</AnimatePresence>
                <AnimatePresence>{filters.status.filter(item => item === "end").length !== 0 && <motion.div initial={{y: 15, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 15, opacity: 0}} className={styles.contentItem}><span className={styles.spanTitle}>Data zakończenia pracy:</span>
                    <input type="date" className={styles.calendar} value={filters.endOfWork1} onChange={(e) => handleSetFilters(e.target.value, "endOfWork1")} min="2022-07-01" max={filters.endOfWork2}/>
                    <input type="date" className={styles.calendar} value={filters.endOfWork2} onChange={(e) => handleSetFilters(e.target.value, "endOfWork2")} min="2022-07-01" max={new Date().toISOString().split("T")[0]}/>
                </motion.div>}</AnimatePresence>
            </motion.div>
            <div className={styles.buttons}>
                <Button style={{width: "100%"}} submit secondary text={"Zastosuj"}/>
                <Button style={{width: "100%", marginTop: '1rem'}} onClick={handleCloseModal} text={"Anuluj"}/>
            </div> 
        </form>
    )
}

export default TaskFilters