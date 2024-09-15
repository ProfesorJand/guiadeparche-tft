import React from "react";
import style from "./css/CarouselItems.module.css"

const CarouselItems = ({carouselItems}) =>{

  return (
    <div className={style.containerGlobal}>
      <div className={style.containerBasicItem}>
      {carouselItems.BasicItem1 &&
      <img className={style.imgBasicItem} src={carouselItems.BasicItem1.img} alt={carouselItems.BasicItem1.nombre} loading="lazy"></img>
      }
        <div className={style.containerCompleteItem}>
        {carouselItems.CompleteItem1 && 
          <img className={style.imgCompleteItem} src={carouselItems.CompleteItem1.img} alt={carouselItems.CompleteItem1.nombre} loading="lazy"></img>
        }
        </div>
      </div>
      {carouselItems.BasicItem2 && ">"}
      <div className={style.containerBasicItem}>
      {carouselItems.BasicItem2 &&
        <img className={style.imgBasicItem} src={carouselItems.BasicItem2.img} alt={carouselItems.BasicItem2.nombre} loading="lazy"></img>
      }
        <div className={style.containerCompleteItem}>
        {carouselItems.CompleteItem2 &&
          <img className={style.imgCompleteItem} src={carouselItems.CompleteItem2.img} alt={carouselItems.CompleteItem2.nombre} loading="lazy"></img>
        }
        </div>
      </div>
      {carouselItems.BasicItem3 && ">"}
      <div className={style.containerBasicItem}>
      {carouselItems.BasicItem3 &&
        <img className={style.imgBasicItem} src={carouselItems.BasicItem3.img} alt={carouselItems.BasicItem3.nombre} loading="lazy"></img>
      }
        <div className={style.containerCompleteItem}>
        {carouselItems.CompleteItem3 &&
          <img className={style.imgCompleteItem} src={carouselItems.CompleteItem3.img} alt={carouselItems.CompleteItem3.nombre} loading="lazy"></img>
        }
        </div>
      </div>
    </div>
  )
}

export default CarouselItems;