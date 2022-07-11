import React, {useState} from "react";
import styles from './NewUser.module.scss'
import defaultAvatar from '../../../assets/user.png'
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import usersStore from "../../../zustand/usersStore";
import contentStore from "../../../zustand/contentStore";
import { motion, AnimatePresence } from 'framer-motion'
import { Opacity } from "../../../animations/animations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'

const NewUser = ({setIsModalOpen}) => {
    const addUser = usersStore(state => state.addUser)
    const getContent = contentStore(state => state.getContent)

    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        mail: "",
        isAdmin: false, 
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addUser(formData, setIsModalOpen, setError)
        getContent('/users')
    }

    return(
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.title}> Dodaj nowego użytkownika</div>
            <div className={styles.content}>
                <img className={styles.avatar} src={defaultAvatar} alt="defaultAvatar" />
                <Input onChange={handleChange} value={formData.name} name="name"
                 required style={{width: "100%"}} placeholder="Imie"/>
                <Input onChange={handleChange} value={formData.mail} name="mail" 
                required style={{width: "100%"}}  placeholder='E-mail' type="email" />
                <div className={styles.checkBoxContainer} onClick={() => setFormData({...formData, isAdmin: !formData.isAdmin})}>
                    Administrator? <FontAwesomeIcon className={styles.checkbox} icon={formData.isAdmin ? faCheckSquare : faSquare} />
                </div>
                <div className={styles.errorContainer}>
                    <AnimatePresence>
                        {error !== "" && <motion.p variants={Opacity} initial="initial" animate="animate" exit="initial">{error}</motion.p>}
                    </AnimatePresence>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button style={{width: "100%"}} submit secondary text={"Dodaj użytkownika"}/>
            </div>
        </form>
    )
}

export default NewUser