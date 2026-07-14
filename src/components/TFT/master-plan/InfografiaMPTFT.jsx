import { useState } from "react";
import style from "./css/InfografiaMPTFT.module.css";
import { dataTFTAllAugments, dataTFTAllItems, dataTFTChampions } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import ImgItem from "@components/TFT/ImgItem";
import CampeonesNivel from "../elementosInfografia/CampeonesNivel";
import Sinergias from "@components/main/Admin/Sinergias.jsx";
import NuevoBuilderTFT from "../NuevoBuilderTFT";
import ImgCampeon from "../ImgCampeon";
import ImgAugment from "../ImgAugment"
const InfografiaMPTFT = ({comp}) => {
  const AllItems = useStore(dataTFTAllItems);
  const AllChampions = useStore(dataTFTChampions);
  const AllAugments = useStore(dataTFTAllAugments);

  const [hoveredItemApiName, setHoveredItemApiName] = useState(null);

  const handleBestItemHelper = (apiName, action) => {
    if (action === "show") {
      console.log({apiName})
      setHoveredItemApiName(apiName);
    } else {
      setHoveredItemApiName(null);
    }
  };
  return (
    <div className={style.cardsMPCompContainer}>
      <div className={style.cBoxRow}>
        <div className={`${style.cBoxTitleInfo} ${style.cCondicionOpEarly}`}>

            <span className={style.tBox}>Preliminares OP</span>
            <div className={style.cCondicionOpEarlyImg}>
            {
              comp.condiciones.map((condicion) => {
                if(condicion.early){
                  const condicionGrande= condicion.apiNameGrande;
                  const condicionPequeno = condicion.ApiNamePequeno;
                  console.log({condicion})
                  const isCondicionGrandeAugment = AllAugments.some((item) => item.apiName === condicionGrande);
                  const isCondicionPequenoAugment = AllAugments.some((item) => item.apiName === condicionPequeno);
                  const isCondicionGrandeItem = AllItems.some((item) => item.apiName === condicionGrande);
                  const isCondicionPequenoItem = AllItems.some((item) => item.apiName === condicionPequeno);
                  const extras = ["Win Streak","Loss Streak","Orbe","3 estrellas","4 estrellas"];
                  const isCondicionGrandeExtra = extras.some((item) => item === condicionGrande);
                  const isCondicionPequenoExtra = extras.some((item) => item === condicionPequeno);
                // aca debe de haber varias condiciones si es un aumento o item o emblema o encuentro
                  return (
                    <div key={condicionGrande} className={style.cCondicionOP}>
                      <div className={style.cCondicionGrande}>
                        {isCondicionGrandeAugment && <ImgAugment augment={AllAugments.find((item) => item.apiName === condicionGrande)}/>}
                        {isCondicionGrandeItem && <ImgItem item={AllItems.find((item) => item.apiName === condicionGrande)}/>}
                        {isCondicionGrandeExtra && <span className={style.textExtra}>{condicionGrande}</span>}
                        {condicion.op && (
                        <div className={style.opAumento}>
                          <span className={style.textOP}>OP</span>
                        </div>
                         )}
                      </div>
                      <div className={style.cCondicionPequeno}>
                        {isCondicionPequenoAugment && <ImgAugment augment={AllAugments.find((item) => item.apiName === condicionPequeno)}/>}
                        {isCondicionPequenoItem && <ImgItem item={AllItems.find((item) => item.apiName === condicionPequeno)}/>}
                        {isCondicionPequenoExtra && <span className={style.textExtra}>{condicionPequeno}</span>}
                      </div>
                    </div>
                  )
                } 
              })
            }
          </div>
        </div>    
        <div className={`${style.cBoxTitleInfo} ${style.cFundamentals}`}>
            <span className={style.tBox}>Fundamentals</span>
          <div className={style.cFundamentalsInfo}>
            <div className={`${style.cBoxTitleInfo} ${style.cCampeonesPrio}`}> 
              <span className={style.tBox}>Campeones Prio en Early</span>
              <div className={style.cCampeonesPrioInfo}>
                <div className={style.cCampeonesEarly}>
                  <CampeonesNivel comp={comp} isMP={true} isEarly={true}/>
                </div>
              </div>
            </div>
            <div className={`${style.cBoxTitleInfo} ${style.cPrioridadObjetos}`}> 
              <span className={style.tBox}>Priodidad de Objetos</span>
              <div className={style.cPrioridadObjetosInfo}>
                {comp.itemsPrio.map((itemName, index) => {
                    const itemData = AllItems.find(i => i.apiName === itemName);
                    return itemData ? [
                      <div key={`itemPrio-${index}`} className={style.carouselItem}>
                        <ImgItem item={itemData} />
                      </div>,
                      index < comp.itemsPrio.length - 1 ? <span key={`itemPrio-gt-${index}`} className={style.mayorQue}>{'>'}</span> : null
                    ] : null;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>            
      <div className={`${style.cBoxTitleInfo} ${style.cAumentos}`}>
        <span className={style.tBox}>Aumentos Early</span>
        <div className={style.cAumentosInfo}>
        {
          comp.aumentos?.map((aumento, index) => {
            if(aumento.early){
              return (
                <div key={index} className={style.cAumento}>
                  <ImgAugment augment={AllAugments.find((item) => item.apiName === aumento.apiNameGrande)}/>
                  {aumento.op && (
                    <div className={style.opAumento}>
                    <span className={style.textOP}>OP</span>
                  </div>
                )}
              </div>
            )}
          })
        }
        </div>
      </div>
      <div className={`${style.cBoxTitleInfo} ${style.cAumentos}`}>
        <span className={style.tBox}>Aumentos Mid/Late</span>
        <div className={style.cAumentosInfo}>
        {
          comp.aumentos?.map((aumento, index) => {
            if(!aumento.early){
              return (
                <div key={index} className={style.cAumento}>
                <ImgAugment augment={AllAugments.find((item) => item.apiName === aumento.apiNameGrande)}/>
                {aumento.op && (
                  <div className={style.opAumento}>
                    <span className={style.textOP}>OP</span>
                  </div>
                )}
              </div>
            )}
          })
        }
        </div>
      </div>
      <div className={style.cBoxRow}>
        <div className={`${style.cBoxTitleInfo} ${style.cNiveles}`}>
            <span className={style.tBox}>Niveles</span>
            <CampeonesNivel comp={comp} isMP={true}/>
        </div>
        <div className={`${style.cBoxTitleInfo} ${style.cPosicionamiento}`}>
          <span className={style.tBox}>Posicionamiento</span>
          <div className={style.cPosicionamientoInfo}>
            <div className={style.containerSinergiasActivas}>
              <Sinergias sinergias={comp?.posicionamiento?.[0]?.tablero} orientacion={"vertical"} show={true} version={"latest" || comp?.version} />
            </div>
            <NuevoBuilderTFT customTablero={comp?.posicionamiento?.[0]?.tablero} readOnly={true} />
          </div>
        </div>
      </div>
      <div className={style.cBoxRow}>
        <div className={`${style.cBoxTitleInfo} ${style.cBestItemComp}`}>
          <span className={style.tBox}>Mejores Objetos de la composition</span>
          <div className={style.cBestItemCompInfo}>
            {
              Object.keys(comp?.mejoresItems || {}).map((key, index)=>{
                return (
                  <div key={index} className={style.cBestItemCompItem}>
                    <span className={style.tBox}>{key}</span>
                    <div className={style.cBestItemsInfo}>
                    {
                      comp?.mejoresItems[key].map((data, index) => {
                        return (
                          <div key={index} className={style.cChampWithItems}>
                            <div className={style.containerImgItems}>
                              {data.apiNameItemsDelCampeon.map((itemApiName, itemIndex) => {
                                return (
                                  <div key={itemIndex} className={style.cItem} onMouseEnter={()=>handleBestItemHelper(itemApiName, "show")} onMouseLeave={()=>handleBestItemHelper(itemApiName, "hide")}>
                                    <ImgItem item={AllItems.find((item) => item.apiName === itemApiName)}/>
                                    {/* <div className={style.cChampWrapper}>
                                      <ImgCampeon showName={false} championData={AllChampions.find((champ) => champ.apiName === data.apiNameCampeon)} />
                                    </div> */}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={`${style.cBoxTitleInfo} ${style.cBestItems}`}>
          <span className={style.tBox}>Mejores Builds</span>
          <div className={style.cBestItemsInfo}>
            {comp.bestBuild.map((info, index) => {
                const itemsData = info.apiNameItemsBisDelCampeon.map((itemsName) => {
                  
                  const infoItems = itemsName.map((itemName)=>AllItems.find(i => i.apiName === itemName))
                  return infoItems
                });
                const itemsDataSpecial = info.apiNameItemsSpecialBisDelCampeon.map((itemsName) => {
                  const infoItems = itemsName.map((itemName)=>AllItems.find(i => i.apiName === itemName))
                  return infoItems
                });
                const campeonData = AllChampions.find((campeon) => campeon.apiName === info.apiNameCampeon);
                return (
                  <div key={index} className={`${style.cardCampeonBIS}`} style={{ borderColor: `var(--color-hex-cost-${campeonData?.cost}, var(--border-purple-color))` }}>
                    
                    {/* {campeonData?.name} */}
                    <ImgCampeon championData={campeonData} imgType="icon" showName={true}/>
                    <div className={style.cardCampeonBISItems}>
                    {
                      itemsData.map((itemsData, index) => {

                        return (
                          <div key={index} className={style.cItems}>
                            {/* <span>BIS</span> */}
                            <div className={`${style.cItemsInfo} ${hoveredItemApiName && itemsData.some(item => item?.apiName === hoveredItemApiName) ? style.highlightedItem : ''}`}>
                            {itemsData.map((itemData, idx) => {
                              return (
                                <div key={idx} className={style.cItem}>
                                  <ImgItem item={itemData} />
                                </div>
                              )
                            })}
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>
                    <div className={style.cardCampeonBISItems}>
                    {
                      itemsDataSpecial.map((itemsData, index) => {
                        return (
                          <div key={index} className={style.cItems}>
                            {/* <span>Especial Bis</span> */}
                            <div className={`${style.cItemsInfo} ${hoveredItemApiName && itemsData.some(item => item?.apiName === hoveredItemApiName) ? style.highlightedItem : ''}`}>
                            {itemsData.map((itemData, idx) => {
                              return (
                                <div key={idx} className={style.cItem}>
                                  <ImgItem item={itemData} />
                                </div>
                              )
                            })}
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default InfografiaMPTFT;