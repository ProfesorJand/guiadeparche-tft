import { useStore } from "@nanostores/react";
import {dataTFTChampions, urlDragon, dataTFTAllItems,dataTFT} from "@stores/dataTFT.js"
import style from "./css/CampeonImgInTierList.module.css";

const CampeonImgInTierList = ({id, apiNameCampeon, apiNameItems, compUrl, showItems= false, showStars=false, showTooltipOnHover=false})=>{
  const championsData = useStore(dataTFTChampions);
  const itemsData = useStore(dataTFTAllItems);
  const {name, squareIcon,cost} = championsData?.find(c => c.apiName === apiNameCampeon) || {};
  const items = apiNameItems?.map(apiNameItem => {
    const foundItem = itemsData.find(item => item.apiName === apiNameItem);
    return foundItem ? { icon: foundItem.icon, name: foundItem.name } : null;
  });
  if (!name) return null;
  return (
    <a href={`/tft/meta-comps-tier-list-teamfight-tactics/${compUrl}`} target="_blank" className={`${style.champTier} ${id ? style.activeComp : ""}`}>
      <img className={`${style.champTierImg} ${style[`cost-${cost}`]}`} src={`${urlDragon()}${squareIcon.toLowerCase().replace(".tex",".png")}`} alt={name} />
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