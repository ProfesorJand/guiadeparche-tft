import style from "./css/InfografiaMPTFT.module.css";
import { dataTFTAllAugments, dataTFTAllItems, dataTFTChampions } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import ImgItem from "@components/TFT/ImgItem";
import CampeonesNivel from "../elementosInfografia/CampeonesNivel";
import Sinergias from "@components/main/Admin/Sinergias.jsx";
import NuevoBuilderTFT from "../NuevoBuilderTFT";
import ImgCampeon from "../ImgCampeon";
const InfografiaMPTFT = ({comp}) => {
  const AllItems = useStore(dataTFTAllItems);
  const AllChampions = useStore(dataTFTChampions);
  const AllAugments = useStore(dataTFTAllAugments)
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
                  const extras = ["Win Streak","Loss Streak","Orbe","3 estrellas","4 estrellas"];
                // aca debe de haber varias condiciones si es un aumento o item o emblema o encuentro
                  return (
                    <div key={condicionGrande} className={style.cCondicionOP}>
                      <div className={style.cCondicionGrande}>
                        <ImgItem item={AllAugments.find((item) => item.apiName === condicionGrande) || AllItems.find((item) => item.apiName === condicionGrande)}/>
                      </div>
                      <div className={style.cCondicionPequeno}>
                        <ImgItem item={AllAugments.find((item) => item.apiName === condicionPequeno) || AllItems.find((item) => item.apiName === condicionPequeno)}/>
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
                  <ImgItem item={AllAugments.find((item) => item.apiName === aumento.apiNameGrande)}/>
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
                <ImgItem item={AllAugments.find((item) => item.apiName === aumento.apiNameGrande)}/>
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
            <span>ARTEFACTOS</span>
            <span>RADIANTES</span>
            <span>EMBLEMAS</span>
            <span>ESPECIALES</span>
          </div>
        </div>
        <div className={`${style.cBoxTitleInfo} ${style.cBestItems}`}>
          <span className={style.tBox}>Mejores Objetos</span>
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
                  <div key={index} className={style.cardCampeonBIS}>
                    
                    {campeonData?.name}
                    <ImgCampeon championData={campeonData} imgType="icon" showName={false}/>
                    <div className={style.cardCampeonBISItems}>
                    {
                      itemsData.map((itemsData, index) => {

                        return (
                          <div key={index} className={style.cItems}>
                            <span>BIS</span>
                            <div className={style.cItemsInfo}>
                            {itemsData.map((itemData, index) => {
                              return (
                                <div key={index} className={style.cItem}>
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
                            <span>Especial Bis</span>
                            <div className={style.cItemsInfo}>
                            {itemsData.map((itemData, index) => {
                              return (
                                <div key={index} className={style.cItem}>
                                  <ImgItem item={itemData} key={index} />
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