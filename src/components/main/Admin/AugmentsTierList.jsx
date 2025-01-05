
import style from "./css/AugmentsTierList.module.css";

const AugmentsTierList = ({tierList} )=>{
  const urlDataDragon="https://raw.communitydragon.org/latest/game/";
if(tierList?.Prismatic?.length > 0 || tierList?.Gold?.length > 0 || tierList?.Silver?.length > 0 ){
  return(
    <>
      <h2>
      Augments
      </h2>
      <div className={style.containerTierList}>
        <div className={style.containerTierListTiers}>
          <img className={style.tierImg} src="/tiers/Tier-S.webp" alt="Tier S" />
        </div>
        <div
          className={style.containerTierListItems}
          id="S"
          onDrop={(e)=>{handleDrop(e)}}
          onDragOver={(e) => {
            handleDragOver(e);
          }}
          draggable
          >
          {tierList?.Prismatic?.map((dataItem,i)=>{
              return (
                <div key={"Prismatic"+i} className={style.containerItem}>
                  <div className={style.tooltipContainer}>
                    <img 
                      className={style.imgItem} 
                      src={dataItem?.img || urlDataDragon + dataItem?.icon?.replace(".tex",".png").toLowerCase()} 
                      alt={dataItem?.nombre || dataItem?.name} 
                      data-from="itemBoard" 
                      data-tier="S" 
                      data-item={JSON.stringify(dataItem)} 
                      onDrop={(e)=>handleDrop(e)} 
                      onDragStart={(e)=>handleDragStart(e)} 
                      onDragEnd={(e)=>handleDropOutside(e,"item")}
                    />
                    <span className={style.tooltip}>{dataItem?.name}</span>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <div className={style.containerTierList}>
        <div className={style.containerTierListTiers}>
          <img className={style.tierImg} src="/tiers/Tier-S.webp" alt="Tier S" />
        </div>
        <div
          className={style.containerTierListItems}
          id="S"
          onDrop={(e)=>{handleDrop(e)}}
          onDragOver={(e) => {
            handleDragOver(e);
          }}
          draggable
          >
          {tierList?.Gold?.map((dataItem,i)=>{
            return (
              <div key={"Gold"+i} className={style.containerItem}>
                  <div className={style.tooltipContainer}>
                    <img 
                      className={style.imgItem} 
                      src={dataItem?.img || urlDataDragon + dataItem?.icon?.replace(".tex",".png").toLowerCase()} 
                      alt={dataItem?.nombre || dataItem?.name} 
                      data-from="itemBoard" 
                      data-tier="S" 
                      data-item={JSON.stringify(dataItem)} 
                      onDrop={(e)=>handleDrop(e)} 
                      onDragStart={(e)=>handleDragStart(e)} 
                      onDragEnd={(e)=>handleDropOutside(e,"item")}
                    />
                    <span className={style.tooltip}>{dataItem?.name}</span>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      <div className={style.containerTierList}>
        <div className={style.containerTierListTiers}>
          <img className={style.tierImg} src="/tiers/Tier-S.webp" alt="Tier S" />
        </div>
        <div
          className={style.containerTierListItems}
          id="S"
          onDrop={(e)=>{handleDrop(e)}}
          onDragOver={(e) => {
            handleDragOver(e);
          }}
          draggable
          >
          {tierList?.Silver?.map((dataItem,i)=>{
            return (
              <div key={"Silver"+i} className={style.containerItem}>
                  <div className={style.tooltipContainer}>
                    <img 
                      className={style.imgItem} 
                      src={dataItem?.img || urlDataDragon + dataItem?.icon?.replace(".tex",".png").toLowerCase()} 
                      alt={dataItem?.nombre || dataItem?.name} 
                      data-from="itemBoard" 
                      data-tier="S" 
                      data-item={JSON.stringify(dataItem)} 
                      onDrop={(e)=>handleDrop(e)} 
                      onDragStart={(e)=>handleDragStart(e)} 
                      onDragEnd={(e)=>handleDropOutside(e,"item")}
                    />
                    <span className={style.tooltip}>{dataItem?.name}</span>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )}
}

export default AugmentsTierList