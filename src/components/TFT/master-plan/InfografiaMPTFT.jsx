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
const InfografiaMPTFT = ({comp = {}, gruposSalidasEarly = []}) => {
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
        <div className={style.headerLeft}>
          <div className={`${style.containerTopLeft} ${style.cBoxTitleInfo}`}>
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
                {/* <div className={style.containerTextoInfoPrimarioCode} onClick={(e)=>copyToClipboard(e, "codigo copiado", codeForPBE(tableroArray.map((info)=>info.apiNameCampeon)))}>
                  {"COPIAR CÓDIGO 📋"}
                </div> */}
              </div>
            </div>
          </div>
          <Fundamentals/>
        </div>
        <div className={style.headerRight}>
          <Preliminares/>
        </div>
      </div>
    )
  }
  const renderCondicion = (condicion, index) => {
    const condicionGrande= condicion.apiNameGrande;
    const condicionPequeno = condicion.ApiNamePequeno;
    const isCondicionGrandeAugment = AllAugments.some((item) => item.apiName === condicionGrande);
    const isCondicionPequenoAugment = AllAugments.some((item) => item.apiName === condicionPequeno);
    const isCondicionGrandeItem = AllItems.some((item) => item.apiName === condicionGrande);
    const isCondicionPequenoItem = AllItems.some((item) => item.apiName === condicionPequeno);
    const isCondicionGrandeChamp = AllChampions.some((item) => item.apiName === condicionGrande);
    const isCondicionPequenoChamp = AllChampions.some((item) => item.apiName === condicionPequeno);
    const isCondicionGrandeSinergia = AllTraits.some((item) => item.apiName === condicionGrande);
    const isCondicionPequenoSinergia = AllTraits.some((item) => item.apiName === condicionPequeno);
    const extras = [
      { apiName:"winstreak", img:"/tft/assets/WinStreak.webp" },
      { apiName:"lossstreak", img:"/tft/assets/LossStreak.webp" },
      { apiName:"Win Streak", img:"/tft/assets/WinStreak.webp" },
      { apiName:"Loss Streak", img:"/tft/assets/LossStreak.webp" },
      { apiName:"orbedecampeon", img:"/tft/assets/Orbe.webp" },
      { apiName:"3 estrellas", img:"/tft/assets/3estrellas.webp" },
      { apiName:"4 estrellas", img:"/tft/assets/4estrellas.webp" }
    ];
    const isCondicionGrandeExtra = extras.some((item) => item.apiName === condicionGrande);
    const isCondicionPequenoExtra = extras.some((item) => item.apiName === condicionPequeno);

    const isOPM = condicion.op === 'opm';
    
    let containerClass = condicion.op ? style.cCondicionOP : style.cCondicionNormal;
    if (isOPM) {
      containerClass += ` ${style.cCondicionOPM}`;
    }

    return (
      <div key={`${condicionGrande}-${index}`} className={containerClass}>
        <div className={style.cCondicionGrande}>
          {isCondicionGrandeAugment && <ImgAugment augment={AllAugments.find((item) => item.apiName === condicionGrande)}/>}
          {isCondicionGrandeItem && <ImgItem item={AllItems.find((item) => item.apiName === condicionGrande)}/>}
          {isCondicionGrandeChamp && <ImgCampeon championData={AllChampions.find((item) => item.apiName === condicionGrande)}/>}
          {isCondicionGrandeSinergia && <ImgTrait trait={AllTraits.find((item) => item.apiName === condicionGrande)} />}
          {isCondicionGrandeExtra && <img src={extras.find((item) => item.apiName === condicionGrande).img} alt="" style={{width:"100%"}}/>}
          {condicion.op && (
          <div className={style.opAumento}>
            <span className={`${style.textOP} ${isOPM ? style.textOPM : ''}`}>{isOPM ? 'OPM' : 'OP'}</span>
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
    );
  };

  const Preliminares = ()=>{
    const todasCondiciones = (comp?.condiciones || []).filter(c => c.early);
    
    const condicionesOP = todasCondiciones.filter(c => c.op === true || c.op === 'opm');
    const condicionesNormales = todasCondiciones.filter(c => !c.op);

    condicionesOP.sort((a, b) => {
      if (a.op === 'opm' && b.op !== 'opm') return -1;
      if (a.op !== 'opm' && b.op === 'opm') return 1;
      return 0;
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', height: '100%' }}>
        {condicionesOP.length > 0 && (
          <div className={`${style.cBoxTitleInfo} ${style.cCondicionOpEarly}`}>
            <span className={style.tBox}>Preliminares OP</span>
            <div className={style.cCondicionOpEarlyImg}>
              {condicionesOP.map((c, i) => renderCondicion(c, i))}
            </div>
          </div>
        )}
        
        {condicionesNormales.length > 0 && (
          <div className={`${style.cBoxTitleInfo} ${style.cCondicionOpEarly}`}>
            <span className={style.tBox}>Preliminares</span>
            <div className={style.cCondicionOpEarlyImg}>
              {condicionesNormales.map((c, i) => renderCondicion(c, i))}
            </div>
          </div>
        )}
      </div>
    );
  }
  const Fundamentals = ()=>{
    const allEarlyChamps = (comp.salidasEarly || [])
                    .map(grupoId => gruposSalidasEarly.find(g => g.id === grupoId))
                    .filter(Boolean)
                    .flatMap(grupo => grupo.campeones);
                  
    const uniqueChamps = [...new Set(allEarlyChamps)].slice(0, 6);
    return(
        <div className={style.cFundamentalsInfo}>
          <div className={`${style.cBoxTitleInfo} ${style.cCampeonesPrio}`}> 
            <span className={style.tBox}>Salidas Early</span>
            <div className={style.cCampeonesPrioInfo}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

                  
                 {(uniqueChamps.length === 0) ? (
                   <span style={{ fontSize: '0.85rem', color: '#aaa', fontStyle: 'italic' }}>Sin salidas early</span>
                  )
                  :
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', width: '100%', justifyContent: 'center' }}>
                      {uniqueChamps.map(apiName => {
                        const champ = AllChampions.find(c => c.apiName === apiName);
                        return champ ? (
                          <div key={apiName} style={{ width: 'calc((100% - (4px *4)) / 5)'}}>
                            <ImgCampeon championData={champ} imgType="tileIcon" showName={true} />
                          </div>
                        ) : null;
                      })}
                    </div>
                    }
                  
              </div>
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
        <span className={style.tBox}>Aumentos Early (2-1)</span>
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
        <span className={style.tBox}>Aumentos Mid/Late (3-2 & 4-2)</span>
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
        {comp?.planB && comp.planB.length > 0 && (
        <div className={style.cBoxRow}>
          {PlanB()}
        </div>
      )}
      </div>
    )
  }
  const Posicionamiento = ()=>{
    const [activeTableroIndex, setActiveTableroIndex] = useState(0);

    if (!comp?.posicionamiento || comp.posicionamiento.length === 0) return null;

    const activePos = comp.posicionamiento[activeTableroIndex] || comp.posicionamiento[0];

    const NavegacionTableros = () => {
      // Si quieres que siempre se muestre la columna incluso con 1 tablero, quita esta condición.
      if (comp.posicionamiento.length <= 1) return null;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100px', flexShrink: 0 }}>
          {comp.posicionamiento.map((pos, index) => {
            const condicion = pos.condicionExtra;
            let imgUrl = null;
            if (condicion) {
              if (condicion.type === 'campeon') imgUrl = getLocalTftImage(AllChampions?.find(c => c.apiName === condicion.apiName)?.tileIcon, 'champions/tileIcon');
              else if (condicion.type === 'item') imgUrl = getLocalTftImage(AllItems?.find(i => i.apiName === condicion.apiName)?.icon, 'items');
              else if (condicion.type === 'augment') imgUrl = getLocalTftImage(AllAugments?.find(a => a.apiName === condicion.apiName)?.icon, 'augments/choiceui');
              else if (condicion.type === 'trait') imgUrl = getLocalTftImage(AllTraits?.find(t => t.apiName === condicion.apiName)?.icon, 'traits');
              else if (condicion.type === 'extra') {
                const extrasMap = { "Win Streak": "/tft/assets/WinStreak.webp", "Loss Streak": "/tft/assets/LossStreak.webp", "orbedecampeon": "/tft/assets/Orbe.webp", "3 estrellas": "/tft/assets/3estrellas.webp", "4 estrellas": "/tft/assets/4estrellas.webp" };
                imgUrl = extrasMap[condicion.apiName];
              }
            }

            return (
              <div 
                key={index} 
                onClick={() => setActiveTableroIndex(index)}
                style={{
                  cursor: 'pointer',
                  padding: '8px',
                  background: activeTableroIndex === index ? 'var(--bg-box-color-active, rgba(255, 255, 255, 0.2))' : 'var(--bg-box-color, rgba(0, 0, 0, 0.3))',
                  border: activeTableroIndex === index ? '1px solid #fff' : '1px solid transparent',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  minHeight: '60px',
                  transition: 'all 0.2s'
                }}
                title={pos.nombreTablero || `Tablero ${index + 1}`}
              >
                {imgUrl ? (
                  <img src={imgUrl} alt={pos.nombreTablero || `Tablero ${index + 1}`} style={{ width: '100%', objectFit: 'contain' }} />
                ) : (
                  <span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold', wordBreak: 'break-word', lineHeight: '1.2' }}>{pos.nombreTablero || `Tablero ${index + 1}`}</span>
                )}
              </div>
            )
          })}
        </div>
      );
    };

    return (
      <div className={`${style.cBoxTitleInfo} ${style.cPosicionamiento}`}>
        <span className={style.tBox}>Posicionamiento</span>
        <div style={{ display: 'flex', gap: '15px', width:"100%" }}>
          
          <div className={style.cPosicionamientoInfo} style={{ flex: 1 }}>
            <div className={style.containerSinergiasActivas}>
              <Sinergias sinergias={activePos.tablero} orientacion={"vertical"} show={true} version={"latest" || comp?.version} />
            </div>
            <NuevoBuilderTFT customTablero={activePos.tablero} readOnly={true} />
          </div>

          <NavegacionTableros />

        </div>
      </div>
    )
  }
  const MejoresItems = ()=>{
    return (
      <div className={`${style.cBoxTitleInfo} ${style.cBestItemComp}`}>
        <span className={style.tBox}>Mejores Objetos de la Composición</span>
        <div className={style.cBestItemCompInfo}>
          {
            Object.keys(comp?.mejoresItems || {}).map((key, index)=>{
              const allItemApiNames = (comp?.mejoresItems?.[key] || [])
                .flatMap(data => data?.apiNameItemsDelCampeon || []);
              const uniqueItems = [...new Set(allItemApiNames)];

              return (
                <div key={index} className={style.cBestItemCompItem}>
                  <span className={style.tBox}>{key}</span>
                  <div className={style.cBestItemsInfo}>
                  {
                    uniqueItems.map((itemApiName, itemIndex) => {
                      return (
                        <div key={itemIndex} className={style.cBestItem} onMouseEnter={()=>handleBestItemHelper(itemApiName, "show")} onMouseLeave={()=>handleBestItemHelper(itemApiName, "hide")}>
                          <ImgItem item={AllItems.find((item) => item.apiName === itemApiName)}/>
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
              console.log({itemsDataSpecial})
              const campeonData = AllChampions.find((campeon) => campeon.apiName === info.apiNameCampeon);
              return (
                <div key={index} className={`${style.cardCampeonBIS}`} style={{ borderColor: `var(--color-hex-cost-${campeonData?.cost}, var(--border-purple-color))`,backgroundColor: `rgba(0, 0, 0, 0.5)` }}>
                  
                  {/* {campeonData?.name} */}
                  <ImgCampeon championData={campeonData} imgType="icon" showName={true} borderColor={false}/>
                  <div className={style.cardCampeonBISItems}>
                    <span className={style.lineWithText}>BIS</span>
                    {
                      itemsData.map((itemsData, index) => {

                        return (
                          <div key={index} className={style.cItems}>
                            
                            <div className={`${style.cItemsInfo} ${hoveredItemApiName && itemsData.some(item => item?.apiName === hoveredItemApiName) ? style.highlightedItem : ''}`}>
                            {itemsData.filter(Boolean).map((itemData, idx) => {
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
                  {
                    itemsDataSpecial.some(itemsArray => itemsArray.some(item => item)) && (
                  <div className={style.cardCampeonBISItems}>
                    <span className={style.lineWithText}>BIS ESPECIALES</span>
                    {
                      itemsDataSpecial.map((itemsData, index) => {
                        return (
                          <div key={index} className={style.cItems}>
                            {/* <span>Especial Bis</span> */}
                            <div className={`${style.cItemsInfo} ${hoveredItemApiName && itemsData.some(item => item?.apiName === hoveredItemApiName) ? style.highlightedItem : ''}`}>
                            {itemsData.filter(Boolean).map((itemData, idx) => {
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
                    )}
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  const PlanB = () => {
    return (
      <div className={`${style.cBoxTitleInfo} ${style.cPlanB}`} style={{ width: '100%' }}>
        <span className={style.tBox}>Plan B (Reemplazos)</span>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '10px' }}>
          {(comp?.planB || []).map((row, index) => {
            if (!row[0] || !row[1]) return null;
            const champLeft = AllChampions.find(c => c.apiName === row[0]);
            const champRight = AllChampions.find(c => c.apiName === row[1]);
            if (!champLeft || !champRight) return null;

            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.3)', padding: '5px 10px', borderRadius: '8px' }}>
                <div style={{ width: '45px' }}>
                  <ImgCampeon championData={champLeft} imgType="tileIcon" showName={false} />
                </div>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>{'⇄'}</span>
                <div style={{ width: '45px' }}>
                  <ImgCampeon championData={champRight} imgType="tileIcon" showName={false} />
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
      {/* <div className={style.cBoxRow}>
        {Fundamentals()}
      </div>             */}
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
