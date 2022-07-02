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
        const tasks = contentStore(state => state.content)
        const getUser = usersStore(state => state.getUser)
        const [confirmationStep, setConfirmationStep] = useState(false)
        const [task, setTask] = useState()
        const [author, setAuthor] = useState("")
        const [status, setStatus] = useState("")
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
        useEffect( () => {
            const result = tasks.filter((item) => item._id === taskToDelete)
            result?.length !== 1 && navigate('/tasks')

            switch (result[0]?.status){
                case 'new':
                    setStatus('Nowe Zadanie')
                    break;
                case 'work':
                    setStatus('W trakcie pracy')
                    break;
                case 'end':
                    setStatus('Praca zakończona')
                    break;
            }
            getUser(result[0]?.assignedFor, setAuthor)
            setTask({
                title: result[0]?.title,
                link: result[0]?.link,
                dateOfCreation: `${result[0]?.dateOfCreation.slice(0, 4)}/${result[0]?.dateOfCreation.slice(5, 7)}/${result[0]?.dateOfCreation.slice(8, 10)} ${result[0]?.dateOfCreation.slice(11, 16)}`,
                startOfWork: result[0]?.startOfWork ? `${result[0]?.startOfWork.slice(0, 4)}/${result[0]?.startOfWork.slice(5, 7)}/${result[0]?.startOfWork.slice(8, 10)} ${result[0]?.startOfWork.slice(11, 16)}` : false,
                endOfWork: result[0]?.endOfWork ? `${result[0]?.endOfWork.slice(0, 4)}/${result[0]?.endOfWork.slice(5, 7)}/${result[0]?.endOfWork.slice(8, 10)} ${result[0]?.endOfWork.slice(11, 16)}` : false,
            })
        }, [])
        
        return(
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.title}>Szczegóły zadania</div>
            <AnimatePresence>{!confirmationStep && <motion.div className={styles.content} initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.75}}>
                <p><span className={styles.spanTitle}>Tytuł:</span> {task?.title}</p>
                <p><span className={styles.spanTitle}>Status:</span> {status}</p>
                <p><span className={styles.spanTitle}>Właściciel:</span> {author}</p>
                <p><span className={styles.spanTitle}>Data utworzenia</span>: {task?.dateOfCreation}</p>
                {task?.startOfWork && <p><span className={styles.spanTitle}>Data zaczęcia pracy:</span> {task?.startOfWork}</p>}
                {task?.endOfWork && <p><span className={styles.spanTitle}>Data zakończenia pracy:</span> {task?.endOfWork}</p>}
            </motion.div>}</AnimatePresence>
            <AnimatePresence>{confirmationStep && <motion.div className={styles.confirmationStep} initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1, transition: {delay: 0.4}}} exit={{opacity: 0, scale: 0.75}} >
                <p className={styles.confirmationStepTitle}>Na pewno chcesz usunąć to zadanie?</p>
                <div className={styles.confirmationStepButtons}>
                    <Button submit style={{width: "40%"}} secondary text={"Tak"}/>
                    <Button onClick={() => {setIsModalOpen(false); navigate('/tasks')}} style={{width: "40%"}} text={"Nie"}/>
                </div>
            </motion.div>} </AnimatePresence>
            <div className={styles.buttons}>
                <a href={task?.link} ><Button style={{width: "100%"}} secondary text={"Sprawdź"}/></a>
                {user.isAdmin && !confirmationStep && <Button style={{width: "100%", marginTop: '1rem'}} submit text={"Usuń Zadanie"}/>}
            </div> 
        </form>
       )
}
export default TaskDetails