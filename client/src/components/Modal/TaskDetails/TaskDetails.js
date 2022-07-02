import React, {useState, useEffect} from "react";
import styles from './TaskDetails.module.scss'
import usersStore from "../../../zustand/usersStore";
import contentStore from "../../../zustand/contentStore";
import Button from "../../Button/Button";
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation} from "react-router";

const TaskDetails = ({setIsModalOpen}) => {
        const user = usersStore(state => state.user)
        const deleteTask = contentStore(state => state.deleteTask)
        const [confirmationStep, setConfirmationStep] = useState(false)
        const navigate = useNavigate()
        const taskToDelete = useLocation().pathname.slice(7)
        const handleSubmit = async (e) => {
            e.preventDefault()
            if(confirmationStep){
                setIsModalOpen(false)
                deleteTask(taskToDelete)
            }else{
                setConfirmationStep(true)
            }
        }
        
        return(
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.title}>Szczegóły zadania</div>
            <AnimatePresence>{!confirmationStep && <motion.div className={styles.content} initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.75}}>
            </motion.div>}</AnimatePresence>
            <AnimatePresence>{confirmationStep && <motion.div className={styles.confirmationStep} initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1, transition: {delay: 0.4}}} exit={{opacity: 0, scale: 0.75}} >
                <p className={styles.confirmationStepTitle}>Na pewno chcesz usunąć to zadanie?</p>
                <div className={styles.confirmationStepButtons}>
                    <Button submit style={{width: "40%"}} secondary text={"Tak"}/>
                    <Button onClick={() => {setIsModalOpen(false); navigate('/tasks')}} style={{width: "40%"}} text={"Nie"}/>
                </div>
            </motion.div>} </AnimatePresence>
            <div className={styles.buttons}>
                {user.isAdmin && !confirmationStep && <Button style={{width: "100%"}} submit text={"Usuń Zadanie"}/>}
            </div> 
        </form>
       )
}
export default TaskDetails