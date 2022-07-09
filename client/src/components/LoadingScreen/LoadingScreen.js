import React from "react";
import styles from './LoadingScreen.module.scss'
import logo from '../../assets/logo.svg'
import { motion} from 'framer-motion'
const LoadingScreen = () => {

    return(
            <div className={styles.wrapper}>
                <div className={styles.container}>
                <motion.div initial={{x: 0}} animate={{x: '675px', transition: {duration: 1}}} className={styles.curtain}></motion.div>
                    <motion.div initial={{x: '300px'}} animate={{x: 0, transition: {duration: 1.2}}} className={styles.content}>
                        <img className={styles.logo} src={logo} />   
                        <div className={styles.logoText}>Rocket Tasks</div>
                    </motion.div>
                </div>
            </div>
    )
}

export default LoadingScreen