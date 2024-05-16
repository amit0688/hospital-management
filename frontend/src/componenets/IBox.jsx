import React from 'react'
import { useState } from "react";

function IBox({type, name, placeholder, id, value, onChange, label, disabled}) {
    const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="relative w-[100%] mb-4 flex flex-col gap-1">
        <label htmlFor="form" className="pl-4 text-sm text-textColor font-[550]">{label} :</label>
        <input type={type == "password" ? passwordVisible ? "text" : "password" : type } 
        name={name} 
        placeholder={placeholder} 
        id={id} 
        value={value}
        onChange={onChange}
        disabled= {disabled}
        className="input_box pl-4" />

        {
            type == "password" ?
            <i className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input_icon left-[auto] right-4 cursor-pointer"}
            onClick={()=> setPasswordVisible(currentVal => !currentVal)}
            ></i>
            :""
        }
        </div>
  )
}

export default IBox