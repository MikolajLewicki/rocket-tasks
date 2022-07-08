import React, {useEffect, useState} from "react";
import styles from './EditUser.module.scss'
import contentStore from "../../../zustand/contentStore";
import usersStore from "../../../zustand/usersStore";
import { useLocation, useNavigate} from "react-router";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import { motion, AnimatePresence } from 'framer-motion'
const EditUser = ({setIsModalOpen}) => {
    const users = contentStore(state => state.content)
    const getContent = contentStore(state => state.getContent)
    const updateUser = usersStore(state => state.updateUser)
    const user = usersStore(state => state.user)
    const userToEditId = useLocation().pathname.slice(7)
    const navigate = useNavigate()
    const [confirmationStep, setConfirmationStep] = useState(false)
    const [editUser, setEditUser] = useState({
        toDo: "",
        details: "",
        newName: "",
        newMail: "",
    })
    useEffect(() => {
        const result = users.filter((item) => item._id === userToEditId)
        result?.length !== 1 && navigate('/users')
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(confirmationStep){
            setIsModalOpen(false)
            await updateUser(editUser, userToEditId, user._id)
            getContent("/users")
        }else{
            setConfirmationStep(true)
        }   
    }
    const handleSetToDo = (name, details) => {
        editUser.toDo === name ? setEditUser({...editUser, toDo: "", details: ""}) : setEditUser({...editUser, toDo: name, details})
    }
    const handleChange = (e) => {
        setEditUser({...editUser, [e.target.name]: e.target.value})
    }
    return(
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.title}> Edytuj użytkownika</div>
            <AnimatePresence>{!confirmationStep && <motion.div className={styles.content} initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.75}}>
                <Button style={{width: "100%", marginTop: '1rem'}} onClick={() => handleSetToDo("changeName", "zmienić imie?")} secondary text={"Zmień imie"}/>
                <AnimatePresence>{editUser.toDo === "changeName" && <motion.div initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
                <Input onChange={handleChange} value={editUser.newName} name="newName" required style={{width: "100%", marginTop: '1rem'}}  placeholder='Nowe Imie' />
                <Button style={{width: "100%", marginTop: '1rem'}} submit text={"Zapisz imie"}/></motion.div>}</AnimatePresence>
                <Button style={{width: "100%", marginTop: '1rem'}} onClick={() => handleSetToDo("changeMail", "zmienić maila?")} secondary text={"Zmień maila"}/>
                <AnimatePresence>{editUser.toDo === "changeMail" && <motion.div initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
                <Input onChange={handleChange} type="email" value={editUser.newMail} name="newMail" required style={{width: "100%", marginTop: '1rem'}}  placeholder='Nowy mail' />
                <Button style={{width: "100%", marginTop: '1rem'}} submit text={"Zapisz maila"}/></motion.div>}</AnimatePresence>
                
                <Button style={{width: "100%", marginTop: '1rem'}} submit onClick={() => handleSetToDo("changeAvatar", "zresetować avatar?")} secondary text={"Zresetuj avatar"}/>
                <Button style={{width: "100%", marginTop: '1rem'}} submit onClick={() => handleSetToDo("changePassword", "zresetować hasło?")} secondary text={"Zresetuj hasło"}/>
            </motion.div>}</AnimatePresence>
            <AnimatePresence>{confirmationStep && <motion.div className={styles.confirmationStep} initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1, transition: {delay: 0.4}}} exit={{opacity: 0, scale: 0.75}} >
                <p className={styles.confirmationStepTitle}>Na pewno chcesz {editUser.details}</p>
                <div className={styles.confirmationStepButtons}>
                    <Button submit style={{width: "40%"}} secondary text={"Tak"}/>
                    <Button onClick={() => {setIsModalOpen(false); navigate('/users')}} style={{width: "40%"}} text={"Nie"}/>
                </div>
            </motion.div>} </AnimatePresence>
            <div className={styles.buttons}>
            {!confirmationStep && <>{user._id.toString() !== userToEditId && <Button style={{width: "100%"}} submit text={"Usuń użytkownika"} onClick={() => handleSetToDo("deleteUser", "usunąć użytkownika?")}/>}</>}
            </div> 
        </form>
    )
}
export default EditUser