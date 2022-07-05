import React from 'react'
import styles from './Stats.module.scss'
import statsStore from '../../zustand/statsStore'
import { motion } from 'framer-motion'
const Stats = () => {
    const content = statsStore(state => state.content)

    return(
        <>{content.length === 0 ? 
            <motion.div initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1, transition: {delay: 0.1}}}  className={styles.noMatchingResults}>
                <h2>Porównaj swoje wyniki!</h2>
                <p>Dostosuj filtry aby wyświetlić odpowiednie Statystyki</p>
            </motion.div> : <> {content === "no tasks" ? 
                <motion.div initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1, transition: {delay: 0.3}}}  className={styles.noMatchingResults}>
                    <h1>Ooops!</h1>
                    <h2>Brak pasujących zadań</h2>
                    <p>Dostosuj filtry aby znaleźć inne wyniki</p></motion.div> : 
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        Statystyki z okresu 
                    </div>
                </div>}
            </>}</>
        )
}
export default Stats