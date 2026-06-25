import { useStore } from "@nanostores/react";
import {dataTFTChampions, urlDragon, dataTFTAllItems,dataTFT} from "@stores/dataTFT.js"
import style from "./css/CampeonImgInTierList.module.css";
import { navigate } from "astro:transitions/client";

const CampeonImgInTierList = ({id, aumento, emblema, apiNameCampeon, apiNameItems, compUrl, isInfografia=false, estrellas, showTooltipOnHover=false, onSelectForInfografia, isSelectedForInfografia})=>{
  // const [compsSelected, setCompsSelected] = useState([])
  const championsData = useStore(dataTFTChampions);
  const itemsData = useStore(dataTFTAllItems);
  const {name, squareIcon,cost} = championsData?.find(c => c.apiName === apiNameCampeon) || {};
  const items = apiNameItems?.map(apiNameItem => {
    const foundItem = itemsData.find(item => item.apiName === apiNameItem);
    return foundItem ? { icon: foundItem.icon, name: foundItem.name } : null;
  });
  const aumentoIcon = aumento ? itemsData?.find(c => c.apiName === aumento)?.icon : null;
  const emblemaIcon = emblema ? itemsData?.find(c => c.apiName === emblema)?.icon : null;
  
  const handleClick = async (e) => {
    e.preventDefault();
    // Guardamos la posición absoluta del scroll actual para evitar que la página salte arriba
    sessionStorage.setItem("tft-tierlist-scroll", window.scrollY.toString());
    
    const targetUrl = `/tft/meta-comps-tier-list-teamfight-tactics/${compUrl}`;
    await navigate(targetUrl, { scroll: false });
  };

   const handleInfografia = (e)=>{
    e.preventDefault();
    if (onSelectForInfografia) {
      onSelectForInfografia();
    }
  }

  if (!name) return null;
  return (
    <a href={`/tft/meta-comps-tier-list-teamfight-tactics/${compUrl}`} onClick={isInfografia ? handleInfografia : handleClick} className={`${style.champTier} ${isInfografia ? (isSelectedForInfografia ? style.activeComp : "") : (id ? style.activeComp : "")}`}>
      <div className={style.containerChamp}>  
      {
        (aumento || emblema) && 
        <div className={style.containerAugmentEmblema}>
          {aumento && <img className={style.imgAumento} src={`${urlDragon()}${aumentoIcon?.toLowerCase().replace(".tex",".png")}`}></img>}
          {emblema && <img className={style.imgEmblema} src={`${urlDragon()}${emblemaIcon?.toLowerCase().replace(".tex",".png")}`}></img>}
        </div>
      }
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