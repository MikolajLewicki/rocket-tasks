import React from "react";
import styles from './Button.module.scss' 
const Button = ({text, secondary, style, submit, onClick}) => {

    return(
        <button onClick={onClick} 
        style={style} 
        className={secondary ? styles.secondary : styles.primary} 
        type={submit ? "submit" : "button"}>
            {text}
        </button>
    )
}

export default Button