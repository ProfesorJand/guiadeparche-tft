import { useState } from "react";
import style from "./css/InfografiaMPTFT.module.css";
import { dataTFTAllAugments, dataTFTAllItems, dataTFTChampions,dataTFTTraits,teamPlannerCode,setMutatorPBE,setMutatorLatest,versionTFT } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import Sinergias from "@components/main/Admin/Sinergias";
import ImgItem from "@components/TFT/ImgItem";
import CampeonesNivel from "../elementosInfografia/CampeonesNivel";
import NuevoBuilderTFT from "../NuevoBuilderTFT";
import ImgCampeon from "../ImgCampeon";
import ImgAugment from "../ImgAugment";
import ImgTrait from "../ImgTrait";

import copyToClipboard from "@functions/copyToClipboard.js";
import { getLocalTftImage } from "@utils/images.js";
import { getTraitDisplayName } from "@components/main/Admin/TraitsList";
const InfografiaMPTFT = ({comp = {}}) => {
  const AllItems = useStore(dataTFTAllItems);
  const AllChampions = useStore(dataTFTChampions);
  const AllAugments = useStore(dataTFTAllAugments);
  const AllTraits = useStore(dataTFTTraits);
  const codeOfChampions = useStore(teamPlannerCode);
  const currentVersion = useStore(versionTFT)
  const [hoveredItemApiName, setHoveredItemApiName] = useState(null);
  console.log({comp})

  const handleBestItemHelper = (apiName, action) => {
    if (action === "show") {
      setHoveredItemApiName(apiName);
    } else {
      setHoveredItemApiName(null);
    }
  };
  const Header= ()=>{
    function codeForPBE(allChampionsApiName) {
    let sinDuplicados = [...new Set(allChampionsApiName)];
    let championsCode = "02";
    let cantidadDeCampeones = sinDuplicados.length;
    sinDuplicados.forEach(( apiName) => {
      championsCode = championsCode.concat(codeOfChampions[apiName] || "")
    })
    let espaciosVacios = 10 - cantidadDeCampeones;
    if (espaciosVacios > 0) {
      championsCode = championsCode.concat("000".repeat(espaciosVacios));
    }
    championsCode = championsCode.concat(currentVersion === "pbe" ? setMutatorPBE : setMutatorLatest)
    return championsCode
  }
    const campeonMetaObj = comp?.campeonMeta?.apiNameCampeon ? AllChampions.find((apiName)=>apiName.apiName===comp.campeonMeta.apiNameCampeon) : null;
    const tableroArray = comp?.posicionamiento?.[0]?.tablero || [];
    return (
      <div className={style.headerInfografia}>
        <div className={style.containerChampCarry}>
          {comp?.campeonMeta?.estrellas && <img className={style.champStars} src="/tft/assets/3estrellas.webp"/>}
          {comp?.campeonMeta?.estrellas === 4 && <img className={style.champStars} src="/tft/assets/4estrellas.webp"/>}
          <img className={style.backgroundComp} src={getLocalTftImage(campeonMetaObj?.tileIcon, "champions/tileIcon")} alt={comp?.nombre || "Nueva Composición"} />
        </div>
        <div className={style.containerTitleInfo}>
          <span className={style.titleInfografia}>{comp?.nombre || "Nueva Composición"}</span>
          <div className={style.containerTopInfo}>
            <span className={style.dificultadCard} data-dificultad={comp?.dificultad}>{comp?.dificultad}</span>
            <span className={style.categoriaCard} data-categoria={comp?.categoria}>{comp?.categoria}</span>
            <span className={style.dañoCard} data-tipoDeDano={comp?.tipoDeDano}>{comp?.tipoDeDano}</span>
            <div className={style.containerTextoInfoPrimarioCode} onClick={(e)=>copyToClipboard(e, "codigo copiado", codeForPBE(tableroArray.map((info)=>info.apiNameCampeon)))}>
              {"COPIAR CODIGO 📋"}
            </div>
          </div>
        </div>
        <AumentosOP/>
      </div>
    )
  }
  const AumentosOP = ()=>{
   return (
    <div className={`${style.cBoxTitleInfo} ${style.cCondicionOpEarly}`}>
      <span className={style.tBox}>Preliminares OP</span>
      <div className={style.cCondicionOpEarlyImg}>
      {
        (comp?.condiciones || []).map((condicion) => {
          if(condicion.early){
            const condicionGrande= condicion.apiNameGrande;
            const condicionPequeno = condicion.ApiNamePequeno;
            console.log({condicion, esSinergia:AllTraits.some((item) => item.apiName === condicionGrande), AllTraits})
            const isCondicionGrandeAugment = AllAugments.some((item) => item.apiName === condicionGrande);
            const isCondicionPequenoAugment = AllAugments.some((item) => item.apiName === condicionPequeno);
            const isCondicionGrandeItem = AllItems.some((item) => item.apiName === condicionGrande);
            const isCondicionPequenoItem = AllItems.some((item) => item.apiName === condicionPequeno);
            const isCondicionGrandeChamp = AllChampions.some((item) => item.apiName === condicionGrande);
            const isCondicionPequenoChamp = AllChampions.some((item) => item.apiName === condicionPequeno);
            const isCondicionGrandeSinergia = AllTraits.some((item) => item.apiName === condicionGrande);
            const isCondicionPequenoSinergia = AllTraits.some((item) => item.apiName === condicionPequeno);
            const extras = [
              {
                apiName:"Win Streak",
                img:"/tft/assets/WinStreak.webp"
              },
              {
                apiName:"Loss Streak",
                img:"/tft/assets/LossStreak.webp"
              },
              {
                apiName:"orbedecampeon",
                img:"/tft/assets/Orbe.webp"
              },
              {
                apiName:"3 estrellas",
                img:"/tft/assets/3estrellas.webp"
              },
              {
                apiName:"4 estrellas",
                img:"/tft/assets/4estrellas.webp"
              }
            ];
            const isCondicionGrandeExtra = extras.some((item) => item.apiName === condicionGrande);
            const isCondicionPequenoExtra = extras.some((item) => item.apiName === condicionPequeno);
          // aca debe de haber varias condiciones si es un aumento o item o emblema o encuentro
            return (
              <div key={condicionGrande} className={style.cCondicionOP}>
                <div className={style.cCondicionGrande}>
                  {isCondicionGrandeAugment && <ImgAugment augment={AllAugments.find((item) => item.apiName === condicionGrande)}/>}
                  {isCondicionGrandeItem && <ImgItem item={AllItems.find((item) => item.apiName === condicionGrande)}/>}
                  {isCondicionGrandeChamp && <ImgCampeon championData={AllChampions.find((item) => item.apiName === condicionGrande)}/>}
                  {isCondicionGrandeSinergia && <ImgTrait trait={AllTraits.find((item) => item.apiName === condicionGrande)} />}
                  {isCondicionGrandeExtra && <img src={extras.find((item) => item.apiName === condicionGrande).img} alt="" style={{width:"100%"}}/>}
                  {condicion.op && (
                  <div className={style.opAumento}>
                    <span className={style.textOP}>OP</span>
                  </div>
                    )}
                </div>
                <div className={style.cCondicionPequeno}>
                  {isCondicionPequenoAugment && <ImgAugment augment={AllAugments.find((item) => item.apiName === condicionPequeno)}/>}
                  {isCondicionPequenoItem && <ImgItem item={AllItems.find((item) => item.apiName === condicionPequeno)}/>}
                  {isCondicionPequenoChamp && <ImgCampeon championData={AllChampions.find((item) => item.apiName === condicionPequeno)} showName={false}/>}
                  {isCondicionPequenoSinergia && <ImgTrait trait={AllTraits.find((item) => item.apiName === condicionPequeno)} showName={false} />} 
                  {isCondicionPequenoExtra && <img src={extras.find((item) => item.apiName === condicionPequeno).img} alt="" style={{width:"100%"}} />}
                </div>
              </div>
            )
          } 
        })
      }
      </div>
    </div>
   )
  }
  const Fundamentals = ()=>{
    return(
      <div className={`${style.cBoxTitleInfo} ${style.cFundamentals}`}>
        <span className={style.tBox}>Fundamentals</span>
        <div className={style.cFundamentalsInfo}>
          <div className={`${style.cBoxTitleInfo} ${style.cCampeonesPrio}`}> 
            <span className={style.tBox}>Campeones Prio en Early</span>
            <div className={style.cCampeonesPrioInfo}>
              {/* <div className={style.cCampeonesEarly}> */}
                <CampeonesNivel comp={comp} isMP={true} isEarly={true}/>
              {/* </div> */}
            </div>
          </div>
          <div className={`${style.cBoxTitleInfo} ${style.cPrioridadObjetos}`}> 
            <span className={style.tBox}>Priodidad de Objetos</span>
            <div className={style.cPrioridadObjetosInfo}>
              {(comp?.itemsPrio || []).map((itemEntry, index) => {
                  const itemName = typeof itemEntry === 'object' && itemEntry !== null ? itemEntry.apiName : itemEntry;
                  const isOp = typeof itemEntry === 'object' && itemEntry !== null ? !!itemEntry.op : false;
                  const itemData = AllItems.find(i => i.apiName === itemName);
                  return itemData ? [
                    <div key={`itemPrio-${index}`} className={style.carouselItem}>
                      <ImgItem item={itemData} />
                      {isOp && (
                        <div className={style.opAumento}>
                          <span className={style.textOP}>OP</span>
                        </div>
                      )}
                    </div>,
                    index < (comp?.itemsPrio?.length || 0) - 1 ? <span key={`itemPrio-gt-${index}`} className={style.mayorQue}>{'>'}</span> : null
                  ] : null;
                })}
            </div>
          </div>
        </div>
      </div>
    )
  }
  const sortAumentos = (a, b) => {
    const getTierPriority = (tier) => {
      const t = (tier || "").toLowerCase();
      if (t === "plata" || t === "silver") return 1;
      if (t === "oro" || t === "gold") return 2;
      if (t === "prismatico" || t === "prismatic") return 3;
      return 4;
    };
    
    const pA = getTierPriority(a.tier);
    const pB = getTierPriority(b.tier);
    
    if (pA !== pB) return pA - pB;
    
    // Si tienen el mismo tier, el OP va primero
    if (a.op && !b.op) return -1;
    if (!a.op && b.op) return 1;
    
    return 0;
  };

  const AumentosEarly = ()=>{
    const list = (comp?.aumentos || []).filter(a => a.early).sort(sortAumentos);

    return (
      <div className={`${style.cBoxTitleInfo} ${style.cAumentos}`}>
        <span className={style.tBox}>Aumentos Early</span>
        <div className={style.cAumentosInfo}>
          {list.map((aumento, index) => (
            <div key={index} className={style.cAumento}>
              <ImgAugment augment={AllAugments.find((item) => item.apiName === aumento.apiNameGrande)}/>
              {aumento.op && (
                <div className={style.opAumento}>
                  <span className={style.textOP}>OP</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const AumentosMidLate = ()=>{
    const list = (comp?.aumentos || []).filter(a => !a.early).sort(sortAumentos);

    return (
      <div className={`${style.cBoxTitleInfo} ${style.cAumentos}`}>
        <span className={style.tBox}>Aumentos Mid/Late</span>
        <div className={style.cAumentosInfo}>
          {list.map((aumento, index) => (
            <div key={index} className={style.cAumento}>
              <ImgAugment augment={AllAugments.find((item) => item.apiName === aumento.apiNameGrande)}/>
              {aumento.op && (
                <div className={style.opAumento}>
                  <span className={style.textOP}>OP</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }
  const Niveles = ()=>{
    return (
      <div className={`${style.cBoxTitleInfo} ${style.cNiveles}`}>
        <span className={style.tBox}>Niveles</span>
        <CampeonesNivel comp={comp} isMP={true}/>
      </div>
    )
  }
  const Posicionamiento = ()=>{
    return (
      <div className={`${style.cBoxTitleInfo} ${style.cPosicionamiento}`}>
        <span className={style.tBox}>Posicionamiento</span>
        <div className={style.cPosicionamientoInfo}>
          <div className={style.containerSinergiasActivas}>
            <Sinergias sinergias={comp?.posicionamiento?.[0]?.tablero} orientacion={"vertical"} show={true} version={"latest" || comp?.version} />
          </div>
          <NuevoBuilderTFT customTablero={comp?.posicionamiento?.[0]?.tablero} readOnly={true} />
        </div>
      </div>
    )
  }
  const MejoresItems = ()=>{
    console.log({mejoresItems: comp?.mejoresItems})
    return (
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
                    (comp?.mejoresItems?.[key] || []).map((data, index) => {
                      return ((data?.apiNameItemsDelCampeon || []).map((itemApiName, itemIndex) => {
                              return (
                                <div key={itemIndex} className={style.cBestItem} onMouseEnter={()=>handleBestItemHelper(itemApiName, "show")} onMouseLeave={()=>handleBestItemHelper(itemApiName, "hide")}>
                                  <ImgItem item={AllItems.find((item) => item.apiName === itemApiName)}/>
                                  {/* <div className={style.cChampWrapper}>
                                    <ImgCampeon showName={false} championData={AllChampions.find((champ) => champ.apiName === data.apiNameCampeon)} />
                                  </div> */}
                                </div>
                              )
                            })

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
    )
  }
  const MejoresBuilds = ()=>{
    return (
      <div className={`${style.cBoxTitleInfo} ${style.cBestItems}`}>
        <span className={style.tBox}>Mejores Builds</span>
        <div className={style.cBestItemsInfo}>
          {(comp?.bestBuild || []).map((info, index) => {
              const itemsData = (info?.apiNameItemsBisDelCampeon || []).map((itemsName) => {
                
                const infoItems = (itemsName || []).map((itemName)=>AllItems.find(i => i.apiName === itemName))
                return infoItems
              });
              const itemsDataSpecial = (info?.apiNameItemsSpecialBisDelCampeon || []).map((itemsName) => {
                const infoItems = (itemsName || []).map((itemName)=>AllItems.find(i => i.apiName === itemName))
                return infoItems
              });
              const campeonData = AllChampions.find((campeon) => campeon.apiName === info.apiNameCampeon);
              return (
                <div key={index} className={`${style.cardCampeonBIS}`} style={{ borderColor: `var(--color-hex-cost-${campeonData?.cost}, var(--border-purple-color))`,backgroundColor: `rgba(0, 0, 0, 0.5)` }}>
                  
                  {/* {campeonData?.name} */}
                  <ImgCampeon championData={campeonData} imgType="icon" showName={true} borderColor={false}/>
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
    )
  }
  return (
    <div className={style.cardsMPCompContainer}>
      <Header/>
      <div className={style.cBoxRow}>
        {(comp?.condiciones || []).some(condicion => condicion.op) && AumentosOP()}   
        {Fundamentals()}
      </div>            
      {(comp?.aumentos || []).some(aumento => aumento.early) && AumentosEarly()}
      {(comp?.aumentos || []).some(aumento => !aumento.early) && AumentosMidLate()}
      <div className={style.cBoxRow}>
        {Niveles()}
        {Posicionamiento()}
      </div>
      <div className={style.cBoxRow}>
        {comp?.mejoresItems && Object.keys(comp.mejoresItems).length > 0 && MejoresItems()}
        {(comp?.bestBuild || []).length > 0 && MejoresBuilds()}
      </div>
      
    </div>
  )
}

export default InfografiaMPTFT;
