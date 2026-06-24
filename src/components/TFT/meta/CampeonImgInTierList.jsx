import { useStore } from "@nanostores/react";
import {dataTFTChampions, urlDragon, dataTFTAllItems,dataTFT} from "@stores/dataTFT.js"
import style from "./css/CampeonImgInTierList.module.css";
import { navigate } from "astro:transitions/client";

const CampeonImgInTierList = ({id, apiNameCampeon, apiNameItems, compUrl, showItems= false, estrellas, showTooltipOnHover=false})=>{
  const championsData = useStore(dataTFTChampions);
  const itemsData = useStore(dataTFTAllItems);
  const {name, squareIcon,cost} = championsData?.find(c => c.apiName === apiNameCampeon) || {};
  const items = apiNameItems?.map(apiNameItem => {
    const foundItem = itemsData.find(item => item.apiName === apiNameItem);
    return foundItem ? { icon: foundItem.icon, name: foundItem.name } : null;
  });
  
  const handleClick = async (e) => {
    e.preventDefault();
    // Guardamos la posición absoluta del scroll actual para evitar que la página salte arriba
    sessionStorage.setItem("tft-tierlist-scroll", window.scrollY.toString());
    
    const targetUrl = `/tft/meta-comps-tier-list-teamfight-tactics/${compUrl}`;
    await navigate(targetUrl, { scroll: false });
  };

  if (!name) return null;
  return (
    <a href={`/tft/meta-comps-tier-list-teamfight-tactics/${compUrl}`} onClick={handleClick} className={`${style.champTier} ${id ? style.activeComp : ""}`}>
      <div className={style.containerChamp}>  
        <img className={`${style.champTierImg} ${style[`cost-${cost}`]}`} src={`${urlDragon()}${squareIcon.toLowerCase().replace(".tex",".png")}`} alt={name} />
        <div className={style.containerChampName}>
          <span className={style.champTierName}>{name}</span>
        </div>
      </div>
      {estrellas && <img className={style.imgEstrellas} src={`/tft/assets/3-estrellas.webp`}></img>}
      <div className={style.champTierItems}>
        {
          items?.map((item, index)=>{
            return (
              <img key={`item-${index}`} className={style.champTierItemImg} src={`${urlDragon()}${item?.icon.toLowerCase().replace(".tex",".png")}`} alt={item?.name} />
            );
          })
        }
      </div>
    </a>
  )
}
export default CampeonImgInTierList;