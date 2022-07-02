import React from "react";
import styles from './ListItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faCheck, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { motion} from 'framer-motion'
import {Link} from 'react-router-dom'
const ListItem = ({name, id, setIsModalOpen, tasks}) => {

    return(
        <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} className={styles.wrapper}>
            <div className={styles.title}>{name}</div>
            <div className={styles.buttons}>
                {tasks ? <><button className={styles.button} onClick={() => {setIsModalOpen(true); }}>Zacznij Prace <FontAwesomeIcon style={{marginLeft: '1rem'}} icon={faCheck}/></button>
                <Link to={`/tasks/${id}`}><button className={styles.button} onClick={() => {setIsModalOpen(true); }}>Sprawdź <FontAwesomeIcon style={{marginLeft: '1rem'}} icon={faMagnifyingGlass}/></button></Link></>
                :<Link to={`/users/${id}`}><button className={styles.button} onClick={() => {setIsModalOpen(true); }}>Edytuj <FontAwesomeIcon style={{marginLeft: '1rem'}} icon={faUserPen}/></button></Link>}
            </div>
        </motion.div>
    )
}

export default ListItem