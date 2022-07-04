import React, {useState, useEffect} from "react";
import styles from './ListItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faCheck, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import usersStore from "../../zustand/usersStore";
import contentStore from "../../zustand/contentStore";
const ListItem = ({name, id, assignedFor, setIsModalOpen, tasks, status}) => {
    const user = usersStore((state) => state.user)
    const content = contentStore((state) => state.content)
    const changeStatus = contentStore((state) => state.changeStatus)
    const getContent = contentStore(state => state.getContent)
    const filters = contentStore(state => state.filters)
    const currentContent = contentStore(state => state.currentContent)
    const [secondButton, setSecondButton] = useState()
    useEffect(() => {
        if(assignedFor === user._id.toString()){
            switch (status){
                case 'new':
                    setSecondButton(<button className={styles.button3} onClick={() => {changeStatus('work', id); getContent('/tasks', currentContent, filters) }}>Zacznij Prace <FontAwesomeIcon style={{marginLeft: '1rem'}} icon={faCheck}/></button>)
                    break;
                case 'work':
                    setSecondButton(<button className={styles.button4} onClick={() => {changeStatus('end', id); getContent('/tasks', currentContent, filters) }}>Zakończ Prace <FontAwesomeIcon style={{marginLeft: '1rem'}} icon={faCheck}/></button>)
                    break;
                case 'end':
                    setSecondButton(<button className={styles.button2} >Praca zakończona</button>)
                    break;
            }  
        }else{
            switch (status){
                case 'new': 
                    setSecondButton(<button className={styles.button2} >Nowe Zadanie</button>)
                    break;
                case 'work':
                    setSecondButton(<button className={styles.button2} >W trakcie pracy</button>)
                    break;
                case 'end':
                    setSecondButton(<button className={styles.button2} >Praca zakończona</button>)
                    break;   
                     
            }
            
        }
    }, [content, ])

    return(
        <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} className={styles.wrapper}>
            <div className={styles.title}>{name}</div>
            <div className={styles.buttons}>
                {tasks ? <>{secondButton}
                <Link to={`/tasks/${id}`}><button className={styles.button} onClick={() => {setIsModalOpen(true); }}>Sprawdź <FontAwesomeIcon style={{marginLeft: '1rem'}} icon={faMagnifyingGlass}/></button></Link></>
                :<Link to={`/users/${id}`}><button className={styles.button} onClick={() => {setIsModalOpen(true); }}>Edytuj <FontAwesomeIcon style={{marginLeft: '1rem'}} icon={faUserPen}/></button></Link>}
            </div>
        </motion.div>
    )
}

export default ListItem