import React, {useState} from "react";
import styles from './LogIn.module.scss'
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { motion, AnimatePresence } from 'framer-motion'
import { Opacity } from "../../../animations/animations";
import Logo from '../../../assets/logo.svg'
import usersStore from "../../../zustand/usersStore";

const LogIn = () => {
    const logIn = usersStore(state => state.logIn)

    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        mail: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        setError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        logIn(formData, setError)
    }

    return(
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.title}>Zaloguj się</div>
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={Logo} alt="Logo" />
                    <p className={styles.logoText}>Rocket Tasks</p>
                </div> 
                <Input onChange={handleChange} value={formData.mail} name="mail" required
                style={{width: "100%"}}  placeholder="E-mail" type="email"/>
                <Input onChange={handleChange} value={formData.password} name="password" required
                style={{width: "100%"}}  placeholder='Hasło' type="password" />
                <div className={styles.errorContainer}>
                    <AnimatePresence>
                        {error !== "" && <motion.p variants={Opacity} initial="initial" animate="animate" exit="initial">{error}</motion.p>}
                    </AnimatePresence>
                </div>
            </div>
            <div className={styles.buttons}>
                <Button style={{width: "100%"}} submit secondary text={"Zaloguj się"}/>
            </div>
        </form>
        )
}
export default LogIn