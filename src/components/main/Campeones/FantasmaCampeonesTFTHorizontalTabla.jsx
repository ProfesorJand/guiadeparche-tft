import React from "react";
import style from "./css/CampeonesTFTHorizontalTabla.module.css";
import loading from "../../../assets/loading-180-v2.svg";
console.log(loading)
const FantasmaCampeonesTFTHorizontalTabla = ()=>{
    return (
        <div className={style.containerCard}>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy" />
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
            <div>
                <img src={loading.src} alt={"loading"} loading="lazy"/>
            </div>
        </div>
    )
}

export default FantasmaCampeonesTFTHorizontalTabla;