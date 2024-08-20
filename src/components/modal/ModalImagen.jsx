import React, {useState} from "react";
import style from "./css/Modal.module.css"

const ModalImage = ({children}) =>{
    const [showModal, setShowModal] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
   
    function openModal(event){
       const element = event.target;
       const src = element.src;
       const alt = element.alt;
       if(src){
        setShowModal(true);
        setImgUrl({src, alt})
       }
    }

    function closeModal(event){
        setShowModal(false);
        setImgUrl(null)
    }
    return (
        <div className={style.imgCursor} onClick={(e)=>{openModal(e)}}>
            {children}
            {showModal && <div className={style.modal} onClick={(e)=>{closeModal(e)}}>
                <button className={style.btnClose}>X</button>
                <img src={imgUrl.src} alt={imgUrl.alt}></img>
            </div>}
        </div>
    )
}

export default ModalImage