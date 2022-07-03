import React, {useState, useEffect} from "react";
import styles from './TaskFilters.module.scss'
import { motion } from 'framer-motion'
import Button from "../../Button/Button";
const TaskFilters = ({handleCloseModal}) => {
    const handleSubmit = async (e) => {
        e.preventDefault()

    }
    return(
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.title}>Filtruj zadania</div>
            <motion.div className={styles.content} initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.75}}>
                <div className={styles.contentItem}><span className={styles.spanTitle}>Właściciel:</span>

                </div>
            </motion.div>
            <div className={styles.buttons}>
                <Button style={{width: "100%"}} submit secondary text={"Zastosuj"}/>
                <Button style={{width: "100%", marginTop: '1rem'}} onClick={handleCloseModal} text={"Anuluj"}/>
            </div> 
        </form>
    )
}

export default TaskFilters