
import style from "./css/AugmentsTierList.module.css";
import styleAugments from "./css/AumentosCompos.module.css"

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
                    <div className={style.tooltip}>
                      <div className={style.tooltipTitle}>{dataItem.name}</div>
                      <div className={style.tooltipDesc}>{dataItem.desc}</div>
                      {Object.keys(dataItem.effects).length > 0 && Object.keys(dataItem.effects).map((variable, i)=>{
                        return (
                        <div key={i} className={style.effects}>
                          <span className={style.variableName}>{variable}</span> : <span>{dataItem.effects[variable]}</span>
                          </div>
                        )
                      })}
                      
                    </div>
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
                    <div className={style.tooltip}>
                      <div className={style.tooltipTitle}>{dataItem.name}</div>
                      <div className={style.tooltipDesc}>{dataItem.desc}</div>
                      {Object.keys(dataItem.effects).length > 0 && Object.keys(dataItem.effects).map((variable, i)=>{
                        return (
                        <div key={i} className={style.effects}>
                          <span className={style.variableName}>{variable}</span> : <span>{dataItem.effects[variable]}</span>
                          </div>
                        )
                      })}
                    </div>
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
                    <div className={style.tooltip}>
                      <div className={style.tooltipTitle}>{dataItem.name}</div>
                      <div className={style.tooltipDesc}>{dataItem.desc}</div>
                      {Object.keys(dataItem.effects).length > 0 && Object.keys(dataItem.effects).map((variable, i)=>{
                        return (
                        <div key={i} className={style.effects}>
                          <span className={style.variableName}>{variable}</span> : <span>{dataItem.effects[variable]}</span>
                          </div>
                        )
                      })}
                    </div>
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