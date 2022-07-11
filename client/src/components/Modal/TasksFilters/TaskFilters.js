import React, {useState, useEffect} from "react";
import styles from './TaskFilters.module.scss'
import usersStore from '../../../zustand/usersStore' 
import contentStore from '../../../zustand/contentStore' 
import { motion, AnimatePresence } from 'framer-motion'
import { ScaleAndOpacity2, UpAndOpacity } from "../../../animations/animations";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'

const TaskFilters = ({handleCloseModal}) => {
    const getUsers = usersStore(state => state.getUsers)
    const users = usersStore(state => state.users)
    const applyFilters = contentStore(state => state.applyFilters)
    const getContent = contentStore(state => state.getContent)
    const filters = contentStore(state => state.filters)
    const currentContent = contentStore(state => state.currentContent)

    const [newFilters, setNewFilters] = useState({
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
        let filtersToSend = newFilters
        e.preventDefault()
        if(filtersToSend.assignedFor.length === 0){
            filtersToSend.assignedFor = users.map(i => i._id)
        }
        if(newFilters.status.length === 0){
            filtersToSend.status = ["new", "work", "end"]
            filtersToSend.startOfWork1 = filtersToSend.dateOfCreation1
            filtersToSend.startOfWork2 = filtersToSend.dateOfCreation2
            filtersToSend.endOfWork1 = filtersToSend.dateOfCreation1
            filtersToSend.endOfWork2 = filtersToSend.dateOfCreation2
        }
        applyFilters(filtersToSend)
        getContent('/tasks', currentContent, filtersToSend)
        handleCloseModal()
    }
    
    useEffect(() => {
        getUsers()
    }, [])

    const handleSetFilters = (value, type) => {
        if(type === "assignedFor" || type === "status"){
            if(newFilters[type].filter(item => item === value).length === 0){
                setNewFilters({
                    ...newFilters, [type]: [...newFilters[type], value]
                })
            }else{
                setNewFilters({
                    ...newFilters, [type]: newFilters[type].filter(item => item !== value)
                })
            }
        }else{
            setNewFilters({
                ...newFilters, [type]: value
            })
        }   
    }

    return(
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.title}>Filtruj zadania</div>
            <motion.div className={styles.content} variants={ScaleAndOpacity2} initial="initial" animate="animate" exit="initial">
                <div className={styles.contentItem}>
                    <span className={styles.spanTitle}>Właściciel:</span>
                    {users.map((item) => {return(
                        <span onClick={() => handleSetFilters(item._id, "assignedFor")} style={{marginLeft: '0.5rem', cursor: 'pointer'}}>
                            {item.name} <FontAwesomeIcon style={{color: '#C1BDDB'}} icon={ newFilters.assignedFor.filter(i => i === item._id).length === 0 ? faSquare : faCheckSquare} />
                        </span>
                    )})}
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.spanTitle}>Status:</span>
                    <span onClick={() => handleSetFilters("new", "status")} style={{marginLeft: '0.5rem', cursor: 'pointer'}}>
                        Nowe Zadanie <FontAwesomeIcon style={{color: '#C1BDDB'}} icon={ newFilters.status.filter(i => i === "new").length === 0 ? faSquare : faCheckSquare} />
                    </span>
                    <span onClick={() => handleSetFilters("work", "status")} style={{marginLeft: '0.5rem', cursor: 'pointer'}}>
                        W trakcie pracy <FontAwesomeIcon style={{color: '#C1BDDB'}} icon={ newFilters.status.filter(i => i === "work").length === 0 ? faSquare : faCheckSquare} />
                    </span>
                    <span onClick={() => handleSetFilters("end", "status")} style={{marginLeft: '0.5rem', cursor: 'pointer'}}>
                        Praca zakończona <FontAwesomeIcon style={{color: '#C1BDDB'}} icon={ newFilters.status.filter(i => i === "end").length === 0 ? faSquare : faCheckSquare} />
                    </span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.spanTitle}>Data dodania:</span>
                    <input type="date" className={styles.calendar} value={newFilters.dateOfCreation1}
                    onChange={(e) => handleSetFilters(e.target.value, "dateOfCreation1")} min="2022-07-01" max={newFilters.dateOfCreation2}/>
                    <input type="date" className={styles.calendar} value={newFilters.dateOfCreation2} 
                    onChange={(e) => handleSetFilters(e.target.value, "dateOfCreation2")} min="2022-07-01" max={new Date().toISOString().split("T")[0]}/>
                </div>
                <AnimatePresence>
                    {newFilters.status.filter(item => item === "work").length !== 0 && 
                        <motion.div variants={UpAndOpacity} initial="initial" animate="animate" exit="initial" className={styles.contentItem}>
                            <span className={styles.spanTitle}>Data rozpoczęcia pracy:</span>
                            <input type="date" className={styles.calendar} value={newFilters.startOfWork1}
                            onChange={(e) => handleSetFilters(e.target.value, "startOfWork1")} min="2022-07-01" max={newFilters.startOfWork2}/>
                            <input type="date" className={styles.calendar} value={newFilters.startOfWork2}
                            onChange={(e) => handleSetFilters(e.target.value, "startOfWork2")} min="2022-07-01" max={new Date().toISOString().split("T")[0]}/>
                        </motion.div>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {newFilters.status.filter(item => item === "end").length !== 0 &&
                        <motion.div variants={UpAndOpacity} initial="initial" animate="animate" exit="initial" className={styles.contentItem}>
                            <span className={styles.spanTitle}>Data zakończenia pracy:</span>
                            <input type="date" className={styles.calendar} value={newFilters.endOfWork1} 
                            onChange={(e) => handleSetFilters(e.target.value, "endOfWork1")} min="2022-07-01" max={newFilters.endOfWork2}/>
                            <input type="date" className={styles.calendar} value={newFilters.endOfWork2} 
                            onChange={(e) => handleSetFilters(e.target.value, "endOfWork2")} min="2022-07-01" max={new Date().toISOString().split("T")[0]}/>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
            <div className={styles.buttons}>
                <Button style={{width: "100%"}} submit secondary text={"Zastosuj"}/>
                <Button style={{width: "100%", marginTop: '1rem'}} onClick={handleCloseModal} text={"Anuluj"}/>
            </div> 
        </form>
    )
}

export default TaskFilters