import React, {useEffect, useState} from "react";
import styles from "./List.module.scss"
import ListItem from "../ListItem/ListItem";
import { useLocation } from "react-router";
import contentStore from "../../zustand/contentStore";
import usersStore from "../../zustand/usersStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { motion} from 'framer-motion'

const Content = ({setIsModalOpen}) => {
    const location = useLocation().pathname
    const getContent = contentStore(state => state.getContent)
    const getUsers = usersStore(state => state.getUsers)
    const filters = contentStore(state => state.filters)
    const currentContent = contentStore(state => state.currentContent)
    const content = contentStore(state => state.content)
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        getContent(location, currentContent, filters)
        getUsers()
    }, [location])

    const handleSwitchPage = (side) =>{
        if(side === 'left'){
            if(currentPage !== 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1)
            }
        }else{
            if(currentPage < Math.ceil(content.length / 10)){
                setCurrentPage(currentPage + 1)
            }
        }
    }
    return(
        
            <>{content.length !== 0 ? <>{content === "no tasks" ? <motion.div initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1, transition: {delay: 0.4}}}  className={styles.noMatchingResults}><h1>Ooops!</h1><h2>Brak pasujących zadań</h2><p>Dostosuj filtry aby znaleźć inne wyniki</p></motion.div> :
            <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <div className={styles.title}>{location.includes("/users") ? "Lista użytkowników" : 'Lista zadań'}</div>
                <div className={styles.nav}>
                <span style={{cursor: currentPage !== 1 &&  'pointer', color: currentPage !== 1 ? '#b0aadb' : '#C1BDDB'}} onClick={() => {currentPage !== 1 &&  handleSwitchPage('left')}}> <FontAwesomeIcon icon={faAngleLeft} /></span>
                {` ${currentPage} / ${Math.ceil(content.length / 10)} `}
                 <span style={{cursor: currentPage < Math.ceil(content.length / 10)  && 'pointer', color: currentPage < Math.ceil(content.length / 10)  ? '#b0aadb' : '#C1BDDB' }} onClick={() => {currentPage < Math.ceil(content.length / 10)  && handleSwitchPage('right')}}> <FontAwesomeIcon icon={faAngleRight} /></span>
                </div>
            </div>
            {content.map((item, i) => {if(i > currentPage * 10 - 11 && i < currentPage * 10){return(<ListItem tasks={location.includes("/tasks") && true} name={location.includes("/users") ? item.name : item.title} id={item._id} assignedFor={item.assignedFor} status={item?.status} setIsModalOpen={setIsModalOpen}/>)}})}</div> }</>: 
            <div className={styles.loadingWrapper}>
            <div class={styles.loadingContainer}>
                <span class={styles.circle}></span>
                <span class={styles.circle}></span>
                <span class={styles.circle}></span>
                <span class={styles.circle}></span>
            </div></div>}</>
        
    )
}

export default Content