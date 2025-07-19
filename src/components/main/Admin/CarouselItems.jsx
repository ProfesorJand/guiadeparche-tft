import React from "react";
import style from "./css/CarouselItems.module.css"

const CarouselItems = ({carouselItems}) =>{
  return (
    <div className={style.containerGlobal}>
      <div className={style.containerBasicItem}>
      {carouselItems.BasicItem1 &&
      <img className={style.imgBasicItem} src={carouselItems.BasicItem1.icon} alt={carouselItems.BasicItem1.nombre} loading="lazy"></img>
      }
        <div className={style.containerCompleteItem}>
        {carouselItems.CompleteItem1 && 
          <img className={style.imgCompleteItem} src={carouselItems.CompleteItem1.icon} alt={carouselItems.CompleteItem1.nombre} loading="lazy"></img>
        }
        </div>
      </div>
      {carouselItems.BasicItem2 && <span className={style.spanSeparator}>{">"}</span>}
      <div className={style.containerBasicItem}>
      {carouselItems.BasicItem2 &&
        <img className={style.imgBasicItem} src={carouselItems.BasicItem2.icon} alt={carouselItems.BasicItem2.nombre} loading="lazy"></img>
      }
        <div className={style.containerCompleteItem}>
        {carouselItems.CompleteItem2 &&
          <img className={style.imgCompleteItem} src={carouselItems.CompleteItem2.icon} alt={carouselItems.CompleteItem2.nombre} loading="lazy"></img>
        }
        </div>
      </div>
      {carouselItems.BasicItem3 && <span className={style.spanSeparator}>{">"}</span>}
      <div className={style.containerBasicItem}>
      {carouselItems.BasicItem3 &&
        <img className={style.imgBasicItem} src={carouselItems.BasicItem3.icon} alt={carouselItems.BasicItem3.nombre} loading="lazy"></img>
      }
        <div className={style.containerCompleteItem}>
        {carouselItems.CompleteItem3 &&
          <img className={style.imgCompleteItem} src={carouselItems.CompleteItem3.icon} alt={carouselItems.CompleteItem3.nombre} loading="lazy"></img>
        }
        </div>
      </div>
    </div>
  )
}

export default CarouselItems;