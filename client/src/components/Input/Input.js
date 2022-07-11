import React from "react";
import styles from './Input.module.scss'
   
const Input = ({placeholder, type, style, value, onChange, required, name}) => {

    return(
        <input name={name} 
        required={required} 
        value={value} 
        onChange={(e) => onChange(e)} 
        style={style} 
        type={type ? type : "text"} 
        className={styles.primary} 
        placeholder={placeholder} />
        )
}

export default Input