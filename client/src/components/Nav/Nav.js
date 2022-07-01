import React from "react";
import styles from './Nav.module.scss'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus} from '@fortawesome/free-solid-svg-icons'
import Button from "../Button/Button";
import { useLocation } from "react-router";
import usersStore from "../../zustand/usersStore";
const Nav = ({setIsModalOpen}) => {
    const location = useLocation()
    const user = usersStore((state) => state.user)
    return(
        <div className={styles.wrapper}>
            <div className={styles.nav}>
            <div className={styles.left}>
                    <NavLink to="/tasks">{({ isActive }) => (<Button style={{marginLeft: "2rem"}} secondary={isActive} text="Zadania"/>)}</NavLink>
                    <NavLink to="/statistics">{({ isActive }) => (<Button style={{marginLeft: "2rem"}} secondary={isActive} text="Statystyki"/>)}</NavLink>
                    {user.isAdmin && <NavLink to="/users">{({ isActive }) => (<Button style={{marginLeft: "2rem"}} secondary={isActive} text="Użytkownicy"/>)}</NavLink>}
                </div>
                <div className={styles.right}>
                    <div className={styles.button} onClick={() => setIsModalOpen(true)}>
                        {location.pathname.includes("/users") ?  <p className={styles.buttonContent}>Dodaj <FontAwesomeIcon icon={faPlus}/></p>  : <p className={styles.buttonContent}>Filtry <FontAwesomeIcon icon={faFilter}/></p>}
                    </div>
                </div>
            </div>
            <div className={styles.line}></div>
        </div>
    )
}
export default Nav