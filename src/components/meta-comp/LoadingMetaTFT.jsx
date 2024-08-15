import React from "react";
import stylesContainerMeta from "./css/ContainerMeta.module.css"
import stylesImgTier from "./css/ImgTier.module.css";
import stylesInfoComp from "./css/InfoComp.module.css";
import styleComposicionPestana from "./css/ComposicionPestana.module.css";
import stylesContainerChampeonTierList from "./css/ContainerChampionTierList.module.css";
import styleLoading from "./css/StyleLoading.module.css";
import loading from "../../assets/loading-180-v2.svg";


const LoadingMetaTFT = ({alternativa})=>{
  return (
    <>
    <div className={stylesContainerMeta.containerTier}>
      <div className={stylesImgTier.Tier}>
        <img src="/Tier-S.png" alt="S" className={stylesImgTier.imgTier}/>
      </div>  
      <div className={stylesContainerMeta.containerChampionTierList}>
        {/* <div className={stylesContainerChampeonTierList.imgChampionTierList}> */}
          <img 
            src={loading.src}
            alt={`loading`}
            className={[stylesImgTier.imgTier, styleLoading.skeleton].join(" ")}
            loading={alternativa ? "lazy": "eager"}
            />
          <img 
            src={loading.src}
            alt={`loading`}
            className={[stylesImgTier.imgTier, styleLoading.skeleton].join(" ")}
            loading={alternativa ? "lazy": "eager"}
            />
          <img 
            src={loading.src}
            alt={`loading`}
            className={[stylesImgTier.imgTier, styleLoading.skeleton].join(" ")}
            loading={alternativa ? "lazy": "eager"}
            />
          <img 
            src={loading.src}
            alt={`loading`}
            className={[stylesImgTier.imgTier, styleLoading.skeleton].join(" ")}
            loading={alternativa ? "lazy": "eager"}
            />
          <img 
            src={loading.src}
            alt={`loading`}
            className={[stylesImgTier.imgTier, styleLoading.skeleton].join(" ")}
            loading={alternativa ? "lazy": "eager"}
            />
        {/* </div> */}
      </div>
    </div>
    <div className={[stylesInfoComp.infoComp , stylesInfoComp.show, styleLoading.skeleton].join(" ")}>
      <button className={stylesInfoComp.btnClose}>X</button>
      <header>
        <h1 className={[stylesInfoComp.titulo, styleLoading.skeleton, styleLoading.skeleton_text].join(" ")} ></h1>
      </header>
      <div className={stylesInfoComp.containerCompo}>
        <div className={stylesInfoComp.composicionDiv}>
          <img
              src={loading.src}
              alt={"loading"}
              className={stylesInfoComp.composicionImg}
              loading={alternativa ? "lazy": "eager"}
            />
        </div>
        <div className={stylesInfoComp.containerChampEspatula}>
        <img
            src={loading.src}
            alt={`loading`}
            className={[stylesInfoComp.campeonEspatula , stylesInfoComp.selected].join(" ")}
            loading={alternativa ? "lazy": "eager"}
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className={styleComposicionPestana.composicionPestanas}>
        <div className={styleComposicionPestana.containerPestanas}>
          <button className={styleComposicionPestana.pestanas}>Early</button>
          <button className={styleComposicionPestana.pestanas}>Mid</button>
          <button className={styleComposicionPestana.pestanas}>Late</button>
          <button className={styleComposicionPestana.pestanas}>Tips</button>
          <button className={styleComposicionPestana.pestanas}>Gameplay</button>
        </div>
      </div>
      <div className={styleComposicionPestana.contenido}>
        <div className={[styleComposicionPestana.containerAumentos, styleLoading.skeleton, styleLoading.skeleton_height].join(" ")}>
        </div>
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
          loading={alternativa ? "lazy": "eager"}
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading={alternativa ? "lazy": "eager"}
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading={alternativa ? "lazy": "eager"}
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading={alternativa ? "lazy": "eager"}
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading={alternativa ? "lazy": "eager"}
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
          loading={alternativa ? "lazy": "eager"}
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading={alternativa ? "lazy": "eager"}
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading={alternativa ? "lazy": "eager"}
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading={alternativa ? "lazy": "eager"}
          />
        <img 
          src={loading.src}
          alt={`loading`}
          className={stylesImgTier.imgTier}
          loading={alternativa ? "lazy": "eager"}
          />
      </div>
    </div>
  </>
  )
}

export default LoadingMetaTFT;