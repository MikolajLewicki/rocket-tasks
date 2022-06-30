import React from "react";
import styles from './Header.module.scss'
import logo from '../../assets/icons8-rocket-64.png'
import avatar from '../../assets/avatar.webp'
import { Link } from "react-router-dom";
import usersStore from "../../zustand/usersStore";
const Header = ({setIsMenuOpen}) => {
    const user = usersStore((state) => state.user)
    return(
        <div className={styles.wrapper}>
            <Link to="/" className={styles.left}>
                <img className={styles.logo} src={logo} />
                <p className={styles.logoText}>Rocket Tasks</p>
            </Link>
            <div className={styles.right} onClick={() => setIsMenuOpen(true)}>
                <p className={styles.welcomeText}>Cześć, <span className={styles.welcomeTextImportant}>{user.name}</span></p>
                <img className={styles.avatar} src={user.img} />
            </div>
        </div>
    )
}
export default Header