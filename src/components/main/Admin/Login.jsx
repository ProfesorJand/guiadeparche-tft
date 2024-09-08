import React, {useEffect, useRef, useState} from "react";

import style from "./css/Login.module.css"

const Login = ({allAdmins, setIsLoged, setAdminName})=>{
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    
    function handleChange(e, input){
      
        const value = e.target.value
        if(input === "user"){
            setUser(value)
        }else{
            setPassword(value)
        }
    }
    function handleButton(e){
        e.preventDefault();
        const usuario = allAdmins.find((admin)=>{
            return admin.user === user && admin.password === password;
        })
        if(usuario){
            localStorage.setItem("user",usuario.user);
            localStorage.setItem("login",true)
            localStorage.setItem("superAdmin",usuario.superAdmin)
            setAdminName(usuario.user)
            setIsLoged(true);
        }else{
            console.error(`usuario: no encontrado`)
        }
    }
    function showPassword(input){
        const $ = (html)=>document.querySelector(html);
        let inputToShow = $(`#${input}`);
        if(inputToShow.type === "password"){
            inputToShow.type = "text"
        }else{
            inputToShow.type = "password"
        }
    }
    return (
        <form className={style.containerLogin} onSubmit={(e)=>{handleButton(e)}}>
            <label htmlFor="user">User:&nbsp;
                <input type="password" id="user" name="user" value={user} onChange={(e)=>{handleChange(e,"user")}}/>
                <input type="checkbox" onClick={()=>showPassword("user")} />
            </label>
            <label htmlFor="password" >Password:&nbsp;
                <input type="password" id="password" name="password" value={password} onChange={(e)=>{handleChange(e,"password")}}/>
                <input type="checkbox" onClick={()=>showPassword("password")} />
            </label>
            <label>
                <input type="submit" value="Log In" />
            </label>
        </form>
    )
}

export default Login;