import React, {useState, useEffect} from 'react'
import styles from './StatsFilters.module.scss'
import usersStore from '../../../zustand/usersStore' 
import { motion } from 'framer-motion'
import { ScaleAndOpacity2 } from '../../../animations/animations'
import Button from '../../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
import statsStore from '../../../zustand/statsStore'

const StatsFilters = ({handleCloseModal}) => {
    const users = usersStore(state => state.users)
    const getUsers = usersStore(state => state.getUsers)
    const getContent = statsStore(state => state.getContent)

    const handleSubmit = (e) => {
        e.preventDefault()
        let filtersToSend = newFilters
        if(filtersToSend.users.length === 0){
            filtersToSend.users = users.map(i => i._id)
        }
        getContent(filtersToSend)
        handleCloseModal()
    }

    const [newFilters, setNewFilters] = useState({
        users: [],
        range1Start: new Date().toISOString().split("T")[0],
        range1End: new Date().toISOString().split("T")[0],
        range2Start: new Date().toISOString().split("T")[0],
        range2End: new Date().toISOString().split("T")[0],
    })

    useEffect(() => {
        getUsers()
    }, [])

    const handleSetFilters = (value, type) => {
        if(type === "users"){
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
            <div className={styles.title}>Filtruj statystyki</div>
            <motion.div className={styles.content} variants={ScaleAndOpacity2}>
                <div className={styles.contentItem}><span className={styles.spanTitle}>Właściciel:</span>
                    {users.map((item) => {return(
                        <span onClick={() => handleSetFilters(item._id, "users")} style={{marginLeft: '0.5rem', cursor: 'pointer'}}>
                            {item.name} <FontAwesomeIcon style={{color: '#C1BDDB'}} icon={ newFilters.users.filter(i => i === item._id).length === 0 ? faSquare : faCheckSquare} />
                        </span>)}
                    )}
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.spanTitle}>1 Zakres Dat:</span>
                    <input type="date" className={styles.calendar} value={newFilters.range1Start}
                    onChange={(e) => handleSetFilters(e.target.value, "range1Start")} min="2022-07-01" max={newFilters.range1End}/>
                    <input type="date" className={styles.calendar} value={newFilters.range1End} 
                    onChange={(e) => handleSetFilters(e.target.value, "range1End")} min="2022-07-01" max={new Date().toISOString().split("T")[0]}/>
                </div>
                <div className={styles.contentItem}><span className={styles.spanTitle}>2 Zakres Dat:</span>
                    <input type="date" className={styles.calendar} value={newFilters.range2Start}
                    onChange={(e) => handleSetFilters(e.target.value, "range2Start")} min="2022-07-01" max={newFilters.range2End}/>
                    <input type="date" className={styles.calendar} value={newFilters.range2End} 
                    onChange={(e) => handleSetFilters(e.target.value, "range2End")} min="2022-07-01" max={new Date().toISOString().split("T")[0]}/>
                </div>
            </motion.div>
            <div className={styles.buttons}>
                <Button style={{width: "100%"}} submit secondary text={"Zastosuj"}/>
            </div> 
        </form>
    )
}
export default StatsFilters