import React from "react";
import style from "./css/CarouselItems.module.css"

const CarouselItems = ({carouselItems}) =>{

  return (
    <div className={style.containerGlobal}>
      <div className={style.containerBasicItem}>
        <img className={style.imgBasicItem} src={carouselItems.BasicItem1.img} alt={carouselItems.BasicItem1.nombre}></img>
        <div className={style.containerCompleteItem}>
          <img className={style.imgCompleteItem} src={carouselItems.CompleteItem1.img} alt={carouselItems.CompleteItem1.nombre}></img>
        </div>
      </div>
      {">"}
      <div className={style.containerBasicItem}>
        <img className={style.imgBasicItem} src={carouselItems.BasicItem2.img} alt={carouselItems.BasicItem2.nombre}></img>
        <div className={style.containerCompleteItem}>
          <img className={style.imgCompleteItem} src={carouselItems.CompleteItem2.img} alt={carouselItems.CompleteItem2.nombre}></img>
        </div>
      </div>
      {">"}
      <div className={style.containerBasicItem}>
        <img className={style.imgBasicItem} src={carouselItems.BasicItem3.img} alt={carouselItems.BasicItem3.nombre}></img>
        <div className={style.containerCompleteItem}>
          <img className={style.imgCompleteItem} src={carouselItems.CompleteItem3.img} alt={carouselItems.CompleteItem3.nombre}></img>
        </div>
      </div>
    </div>
  )
}

export default CarouselItems;