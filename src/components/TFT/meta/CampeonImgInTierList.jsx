import { useStore } from "@nanostores/react";
import {dataTFTChampions, dataTFTAllItems,dataTFT, dataTFTAllAugments} from "@stores/dataTFT.js"
import { getLocalTftImage } from "@utils/images";
import style from "./css/CampeonImgInTierList.module.css";
import { navigate } from "astro:transitions/client";
import { useState, useEffect } from "react";
import CardsCompos from "../CardsCompos.jsx";

const CampeonImgInTierList = ({comp, id, aumento, emblema, apiNameCampeon, apiNameItems, compUrl, isInfografia=false, estrellas, showTooltipOnHover=false, onSelectForInfografia, isSelectedForInfografia, isDraggable=false})=>{
  const [isMounted, setIsMounted] = useState(false);
  const [localIsActive, setLocalIsActive] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  

  const championsData = useStore(dataTFTChampions);
  const itemsData = useStore(dataTFTAllItems);
  const aumentosData = useStore(dataTFTAllAugments);

  const safeChampionsData = isMounted ? championsData : [];
  const safeItemsData = isMounted ? itemsData : [];
  const safeAugmentsData = isMounted ? aumentosData : [];

  const {name, squareIcon,cost} = safeChampionsData?.find(c => c.apiName === apiNameCampeon) || {};
  const items = apiNameItems?.map(apiNameItem => {
    const foundItem = safeItemsData.find(item => item.apiName === apiNameItem);
    return foundItem ? { icon: foundItem.icon, name: foundItem.name } : null;
  });
  const aumentoIcon = aumento ? safeAugmentsData?.find(c => c.apiName === aumento)?.icon : null;
  const emblemaIcon = emblema ? safeItemsData?.find(c => c.apiName === emblema)?.icon : null;
  const handleClick = async (e) => {
    e.preventDefault();
    if (isDraggable) return;
    // Guardamos la posición absoluta del scroll actual para evitar que la página salte arriba
    sessionStorage.setItem("tft-tierlist-scroll", window.scrollY.toString());
    
    setLocalIsActive(!localIsActive);
  };

   const handleInfografia = (e)=>{
    e.preventDefault();
    if (onSelectForInfografia) {
      onSelectForInfografia();
    }
  }

  if (!name) return (
    <a href={isDraggable ? "#" : `/tft/meta-comps-tier-list-teamfight-tactics/${compUrl}`} className={`${style.champTier} ${isInfografia ? (isSelectedForInfografia ? style.activeComp : "") : (id ? style.activeComp : "")}`}>
      <div className={style.containerChamp} style={{ width: "100%" }}>
        <div className={style.champTierImg} style={{width: "100%", minWidth: "45px", height: "100%", minHeight: "45px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "0.5rem", aspectRatio: "1/1"}}></div>
      </div>
    </a>
  );
  return (
    <>
      <a href={isDraggable ? "#" : `#${compUrl}`} onClick={isInfografia ? handleInfografia : handleClick} className={`${style.champTier} ${isInfografia ? (isSelectedForInfografia ? style.activeComp : "") : (id ? style.activeComp : "")}`}>
        <div className={style.containerChamp}>  
        {
          (aumento || emblema) && 
          <div className={style.containerAugmentEmblema}>
            {aumento && <img className={style.imgAumento} src={getLocalTftImage(aumentoIcon, 'augments/hexcore')}></img>}
            {emblema && <img className={style.imgEmblema} src={getLocalTftImage(emblemaIcon, 'items')}></img>}
          </div>
        }
          <img className={`${style.champTierImg} ${style[`cost-${cost}`]}`} src={getLocalTftImage(squareIcon, 'champions/squareIcon')} alt={name} />
          <div className={style.containerChampName}>
            <span className={style.champTierName}>{name}</span>
          </div>
        </div>
        {estrellas && <img className={style.imgEstrellas} src={`/tft/assets/3-estrellas.webp`}></img>}
        <div className={style.champTierItems}>
          {
            items?.map((item, index)=>{
              return (
                <img key={`item-${index}`} className={style.champTierItemImg} src={getLocalTftImage(item?.icon, 'items')} alt={item?.name} />
              );
            })
          }
        </div>
      </a>
      {localIsActive && comp && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999999, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'default' }} 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLocalIsActive(false); }}
        >
          <div 
            className={style.modalScroll}
            style={{ width: '100%', maxWidth: '900px', backgroundColor: '#131127', borderRadius: '8px', position: 'relative', maxHeight: '95vh', overflowY: 'auto' }} 
            onClick={(e) => e.stopPropagation()}
          >
             <div style={{ position: 'sticky', top: '10px', zIndex: 10, height: 0, display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setLocalIsActive(false)} style={{ transform: 'translate(-15px, 5px)', background: '#e11d48', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', lineHeight: '1', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>&times;</button>
             </div>
             <CardsCompos comp={comp} isInfografia={isInfografia} isActive={true} expandInline={true} hideToggleButton={true} hideRightContainer={true} />
          </div>
        </div>
      )}
    </>
  )
}
export default CampeonImgInTierList;