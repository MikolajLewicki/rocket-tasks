import React from "react";
import styles from './ListItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faCheck} from '@fortawesome/free-solid-svg-icons'
import { motion} from 'framer-motion'
import {Link} from 'react-router-dom'
const ListItem = ({name, id, setIsModalOpen}) => {

    return(
        <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} className={styles.wrapper}>
            <div className={styles.title}>{name}</div>
            <div className={styles.buttons}>
                <Link to={`/users/${id}`}><button className={styles.button} onClick={() => {setIsModalOpen(true); }}>Edytuj <FontAwesomeIcon style={{marginLeft: '1rem'}} icon={faUserPen}/></button></Link>
            </div>
        </motion.div>
    )
}

export default ListItem