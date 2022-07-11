import React, {useEffect, useState} from "react";
import styles from './Menu.module.scss'
import FileBase64 from 'react-file-base64';
import { motion, AnimatePresence} from 'framer-motion'
import { MenuSlide, UpAndOpacity2 } from "../../animations/animations";
import usersStore from "../../zustand/usersStore";
import Button from "../Button/Button";
import Input from "../Input/Input";
const Menu = ({setIsMenuOpen, isMenuOpen, isLogged}) => {
    const user = usersStore((state) => state.user)
    const logOut = usersStore((state) => state.logOut)
    const changeAvatar = usersStore((state) => state.changeAvatar)
    const changePassword = usersStore((state) => state.changePassword)

    const [wrapperWidth, setWrapperWidth] = useState("0%")
    const [newPassword, changeNewPassword] = useState("")
    const [passwordFormVisibility, setPasswordFormVisibility] = useState(false)

    useEffect(() => {
        isMenuOpen ? setWrapperWidth("100%") : setTimeout(() => {setWrapperWidth("0%")}, 250)
        const element = document.querySelector('input[type=file]')
        element?.setAttribute("accept", "image/gif, image/jpeg, image/png")
        setPasswordFormVisibility(false)
        changeNewPassword("")
    }, [isMenuOpen])

    const handleSubmit = (e) => {
        e.preventDefault()
        changePassword(newPassword, user._id)
        setIsMenuOpen(false)
        changeNewPassword("")
    }
    const handleInputHover = () => {
        const element = document.querySelector('input[type=file]')
        element?.classList.toggle(styles.inputActive)
    }
    return(
        <>{isLogged && 
            <div className={styles.wrapper} style={{width: wrapperWidth}}>
                <div className={styles.backWall} onClick={() => setIsMenuOpen(false)}></div>
                <AnimatePresence>
                    {isMenuOpen &&
                        <motion.div className={styles.contentContainer} variants={MenuSlide} initial="initial" animate="animate" exit="initial">
                            <div className={styles.userInfo}>
                                <img className={styles.avatar} src={user.img} />
                                <p className={styles.welcomeText}>Cześć, <span className={styles.welcomeTextImportant}>{user.name}</span></p>
                            </div>
                            <div className={styles.content}>
                                <Button style={{width: "100%"}} secondary text={"Zmień hasło"} onClick={() => setPasswordFormVisibility(!passwordFormVisibility)}/>
                                <AnimatePresence>
                                    {passwordFormVisibility && 
                                        <motion.form onSubmit={handleSubmit} className={styles.changePassword} variants={UpAndOpacity2} initial="initial" animate="animate" exit="exit" >
                                            <Input onChange={(e) => changeNewPassword(e.target.value)}
                                            required value={newPassword} type="password" 
                                            style={{width: "100%", marginTop: "1rem"}} placeholder="Hasło"/>
                                            <Button style={{width: "100%", marginTop: "1rem"}} submit text={"Zapisz hasło"}/>
                                        </motion.form>}
                                </AnimatePresence>
                                <div className={styles.inputContainer} onMouseEnter={handleInputHover} onMouseLeave={handleInputHover}>
                                    <FileBase64
                                        multiple={ false }
                                        onDone={ ({base64}) => changeAvatar(base64, user._id)}
                                    />
                                </div>
                            </div>
                            <Button style={{width: "100%"}} text={"Wyloguj się"} onClick={() => logOut()}/>
                        </motion.div>}
                </AnimatePresence>
            </div>}
        </>
    )
}
export default Menu