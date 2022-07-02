import React, {useEffect, useState} from "react";
import styles from './Modal.module.scss'
import { motion, AnimatePresence} from 'framer-motion'
import { useLocation, useNavigate } from "react-router";
import NewUser from "./NewUser/NewUser";
import LogIn from "./LogIn/LogIn";
import EditUser from "./EditUser/EditUser";
import TaskDetails from "./TaskDetails/TaskDetails";

const Modal = ({setIsModalOpen, isModalOpen}) => {
    const location = useLocation().pathname
    const navigate = useNavigate()
    const [wrapperWidth, setWrapperWidth] = useState("0%")
    useEffect(() => {
        isModalOpen ? setWrapperWidth("100%") : setTimeout(() => {setWrapperWidth("0%")}, 200)
    }, [isModalOpen])
    const handleCloseModal = () => {
        setIsModalOpen(false)
        if(location.slice(1).indexOf('/') !== -1){
            navigate(location.slice(0, (location.slice(1).indexOf('/') + 1)))        
        }
    }

    return(
        <div className={styles.wrapper} style={{width: location === "/logIn" ? "100%" : wrapperWidth}}>
            {location !== "/logIn" && <div className={styles.backWall} onClick={handleCloseModal}></div>}
            <AnimatePresence>
            {isModalOpen && <motion.div className={styles.contentContainer}             
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0}} 
            transition={{ default: {duration: 0.2}}}>
                {location === "/users" && <NewUser setIsModalOpen={setIsModalOpen}/>}
                {location.includes("/users/") && <EditUser setIsModalOpen={setIsModalOpen}/>}
                {location === "/logIn" && <LogIn setIsModalOpen={setIsModalOpen}/>}
                {location.includes("/tasks/") && <TaskDetails setIsModalOpen={setIsModalOpen}/>}
            </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default Modal