import React, {useEffect, useRef, useState} from "react";


import style from "./css/Login.module.css"

const Login = ({setIsLoged, setAdmins})=>{
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

    async function handleButton(e){
        e.preventDefault();

        try{
            const res = await fetch("https://api.guiadeparche.com/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user,
                    password: password
                })
            });

            const data = await res.json();

            if(data.success){
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", true);
                localStorage.setItem("login", "true");

                setAdmins(user);
                setIsLoged(true);
            }else{
                alert("Credenciales incorrectas");
            }

        }catch(error){
            console.error(error);
            alert("Error de conexión con el servidor");
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