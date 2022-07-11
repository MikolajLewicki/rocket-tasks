import React from "react";
import styles from './LoadingScreen.module.scss'
import logo from '../../assets/logo.svg'
import { motion} from 'framer-motion'
import { LoadingScreenCurtain, LoadingScreenContent } from "../../animations/animations";
const LoadingScreen = () => {

    return(
            <div className={styles.wrapper}>
                <div className={styles.container}>
                <motion.div variants={LoadingScreenCurtain} initial="initial" animate="animate" className={styles.curtain}></motion.div>
                    <motion.div variants={LoadingScreenContent} initial="initial" animate="animate" className={styles.content}>
                        <img className={styles.logo} src={logo} />   
                        <div className={styles.logoText}>Rocket Tasks</div>
                    </motion.div>
                </div>
            </div>
    )
}

export default LoadingScreen