import { useState } from "react";

const InputBox = ({type, name, icon, placeholder, id, value, onChange, label}) =>{
    const [passwordVisible, setPasswordVisible] = useState(false);

    return(
        <div className="relative w-[100%] mb-4">
        <label htmlFor="form" className="">{label}</label>
        <input type={type == "password" ? passwordVisible ? "text" : "password" : type } 
        name={name} 
        placeholder={placeholder} 
        id={id} 
        value={value}
        onChange={onChange}
        className="input-box" />
        <i className={"fi " + icon + " input-icon"}></i>

        {
            type == "password" ?
            <i className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"}
            onClick={()=> setPasswordVisible(currentVal => !currentVal)}
            ></i>
            :""
        }
        </div>
    )
}

export default InputBox;