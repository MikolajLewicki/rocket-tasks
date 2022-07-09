import React, {useState, useEffect} from "react";
import styles from './Background.module.scss'
import pic1 from '../../assets/1.png'
import pic2 from '../../assets/2.png'
import pic4 from '../../assets/4.png'
import pic5 from '../../assets/5.png'
import pic6 from '../../assets/6.png'
import pic7 from '../../assets/7.png'
const Background = ({mousePosition}) => {
    
    const [asteroids, setAsteroids] = useState(
        [<img src={pic1} className={styles.asteroid} dataValue="-2" alt="" />,
        <img src={pic2} className={styles.asteroid} dataValue="6" alt="" />,
        <img src={pic4} className={styles.asteroid} dataValue="-6" alt="" />,
        <img src={pic5} className={styles.asteroid} dataValue="8" alt="" />,
        <img src={pic6} className={styles.asteroid} dataValue="-4" alt="" />,
        <img src={pic7} className={styles.asteroid} dataValue="5" alt="" />,]
    )
    useEffect(() => {
        if(typeof(mousePosition) !== 'undefined'){
            setAsteroids(asteroids.map(item => {
                const x = (mousePosition.clientX * item.props.dataValue) / 250
                const y = (mousePosition.clientY * item.props.dataValue) / 250
                item = {...item, props: {...item.props, style: {transform: `translate(${x}px, ${y}px)`}}}
                return item
            }))
        }
    }, [mousePosition])
    return(
        <div className={styles.wrapper} >
            {asteroids.map(item => item)}
        </div>
    )
}

export default Background