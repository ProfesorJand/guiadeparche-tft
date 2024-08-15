import React from "react";
import stylesContainerMeta from "./css/ContainerMeta.module.css"
import stylesImgTier from "./css/ImgTier.module.css";
import loading from "../../assets/loading-180-v2.svg";


const LoadingMetaTFT = ()=>{
  return (
    <>
    <div className={stylesContainerMeta.containerTier}>
      <div className={stylesImgTier.Tier}>
        <img src="/Tier-S.png" alt="S" className={stylesImgTier.imgTier}/>
      </div>  
      <div className={stylesContainerMeta.containerChampionTierList}>
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
      </div>
    </div>
    <div className={stylesContainerMeta.containerTier}>
      <div className={stylesImgTier.Tier}>
        <img src="/Tier-A.png" alt="A" className={stylesImgTier.imgTier}/>  
      </div>
      <div className={stylesContainerMeta.containerChampionTierList}>
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
      </div>
    </div>
    <div className={stylesContainerMeta.containerTier}>
      <div className={stylesImgTier.Tier}>
        <img src="/Tier-B.png" alt="B" className={stylesImgTier.imgTier} /> 
      </div> 
      <div className={stylesContainerMeta.containerChampionTierList}>
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading="lazy"
          />
      </div>
    </div>
  </>
  )
}

export default LoadingMetaTFT;