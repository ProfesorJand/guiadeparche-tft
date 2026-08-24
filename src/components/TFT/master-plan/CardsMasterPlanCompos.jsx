import React, { useState, useRef, useEffect } from "react";
import style from "./css/CardsMasterPlanCompos.module.css"
import { useStore } from "@nanostores/react";
import Tooltip from "@components/tooltips";

import { dataTFTAllItems, dataTFTChampions, dataTFTAllAugments, dataTFTTraits, versionTFT, setNumberLatest, setNumberPBE, dataDBTFTAumentos } from "@stores/dataTFT";
import { getLocalTftImage } from "@utils/images";
import { getTraitDisplayName } from "@components/main/Admin/TraitsList";
import ImgAugment from "@components/TFT/ImgAugment";
import ImgItem from "@components/TFT/ImgItem";
import ImgCampeon from "@components/TFT/ImgCampeon";

const CardsMasterPlanCompos = ({compo, activateMissingOPM, filtroSoft={}, gruposSalidasEarly=[], selectedAugmentTiers=[]})=>{
  const allItemsTFT = useStore(dataTFTAllItems);
  const allChampionsTFT = useStore(dataTFTChampions);
  const allAugmentsTFT = useStore(dataTFTAllAugments);
  const allTraitsTFT = useStore(dataTFTTraits);
  const currentVersion = useStore(versionTFT);
  const versionNumber = currentVersion === "latest" ? setNumberLatest : setNumberPBE;
  const dbAumentos = useStore(dataDBTFTAumentos) || {};

  const renderCondicionElement = (apiName, isGrande) => {
    if (!apiName) return null;
    const augObj = allAugmentsTFT?.find((item) => item.apiName === apiName);
    if (augObj) return <ImgAugment augment={augObj} />;
    const itemObj = allItemsTFT?.find((item) => item.apiName === apiName);
    if (itemObj) return <ImgItem item={itemObj} />;
    const champObj = allChampionsTFT?.find((champ) => champ.apiName === apiName);
    if (champObj) return <ImgCampeon showBorderColor={false} championData={champObj} imgType="tileIcon" showName={false} />;
    const traitObj = allTraitsTFT?.find((trait) => trait.apiName === apiName);
    if (traitObj) {
      const traitImgUrl = traitObj.icon ? (traitObj.icon.includes("http") ? traitObj.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(traitObj.icon, 'traits', versionNumber)) : "";
      const displayName = getTraitDisplayName(traitObj);
      return <img src={traitImgUrl} alt={displayName} title={displayName} style={{ width: isGrande ? '100%' : '50%', height: isGrande ? '100%' : '50%', objectFit: 'contain' }} />;
    }
    const extraMap = {
      'winstreak': { name: 'Win Streak', icon: '/tft/assets/WinStreak.webp' },
      'lossstreak': { name: 'Loss Streak', icon: '/tft/assets/LossStreak.webp' },
      'orbedecampeon': { name: 'Orbe de Campeón', icon: '/tft/assets/Orbe.webp' },
      'Win Streak': { name: 'Win Streak', icon: '/tft/assets/WinStreak.webp' },
      'Loss Streak': { name: 'Loss Streak', icon: '/tft/assets/LossStreak.webp' },
      'Orbe': { name: 'Orbe', icon: '/tft/assets/Orbe.webp' }
    };
    if (extraMap[apiName]) {
      const ex = extraMap[apiName];
      return <img src={ex.icon} alt={ex.name} title={ex.name} className={style.textExtra} />;
    }
    return <span className={style.textExtra}>{apiName}</span>;
  };

  const cardColorTier = {
    "S": "linear-gradient(135deg, #aa444499, #751616cc)",
    "A": "linear-gradient(135deg, #aa871e99, #5c480ecc)",
    "B": "linear-gradient(135deg, #4b556399, #1f2937cc)",
    "C": "linear-gradient(135deg, #6e3c1e99, #3c1e0acc)",
  };
  console.log({compo})
  console.log({filtroSoft})

  const isItemHighlighted = (nombreItem) => {
    if (!filtroSoft?.selectedSoftItems || filtroSoft.selectedSoftItems.length === 0) return false;
    const itemData = allItemsTFT.find(x => x.apiName === nombreItem);
    return filtroSoft.selectedSoftItems.some(x => {
      const selApiName = typeof x === 'object' && x !== null ? x.apiName : x;
      if (nombreItem === selApiName) return true;
      if (itemData?.composition && Array.isArray(itemData.composition)) {
        return itemData.composition.includes(selApiName);
      }
      return false;
    });
  };

  const isChampionHighlighted = (apiNameCampeon) => {
    if (!filtroSoft?.selectedSoftChampions || filtroSoft.selectedSoftChampions.length === 0) return false;
    return filtroSoft.selectedSoftChampions.some(x => {
      const selApiName = typeof x === 'object' && x !== null ? x.apiName : x;
      return apiNameCampeon === selApiName;
    });
  };

  return (
    <div className={style.container} style={{background: cardColorTier[compo.tier]}}>
      {compo._missingOPM && (
        <div 
          className={style.opmLockOverlay}
          onClick={(e) => {
            e.stopPropagation();
            if (activateMissingOPM) {
              activateMissingOPM(compo._missingOPM.type, compo._missingOPM.apiName);
            }
          }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(10, 10, 10, 0.9)',
            backdropFilter: 'blur(3px)',
            zIndex: 10,
            borderRadius: '0 0 8px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '16px',
            textAlign: 'center',
            color: 'white',
            gap: '8px'
          }}
        >
          {/* Meta Campeon & Compo Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ position: 'relative', width: '36px', height: '36px' }}>
              <img 
                src={getLocalTftImage(allChampionsTFT.find(x => x.apiName === compo?.campeonMeta?.apiNameCampeon)?.tileIcon, 'champions/tileIcon')} 
                alt="Campeón Meta"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '1px solid #777' }}
              />
              {compo?.campeonMeta?.estrellas && (
                <img 
                  src="/tft/assets/3-estrellas.webp" 
                  alt="3 estrellas"
                  style={{ position: 'absolute', top: '0', left: '0', width: '100%' }}
                />
              )}
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{compo.nombre}</span>
          </div>

          <span style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#ff4d4d' }}>Composición Bloqueada</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            {compo._missingOPM.icon && (
              <img src={compo._missingOPM.icon} alt={compo._missingOPM.name} style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '6px', border: '2px solid #ff4500' }} />
            )}
          </div>
          
          <span style={{ fontSize: '0.8rem', color: '#bbb', maxWidth: '90%', lineHeight: '1.2' }}>
            Activa <strong>{compo._missingOPM.name}</strong> para jugar
          </span>
          
          <span style={{ fontSize: '0.75rem', background: '#ff4500', padding: '4px 10px', borderRadius: '12px', marginTop: '2px' }}>
            Click para desbloquear
          </span>
        </div>
      )}
      <div className={style.header}>
            <span
              className={style.tierCard}
              data-tier={compo.tier}
            >{compo.tier}
            </span>
              <div className={style.containerTags}>
                <span 
                  className={style.dificultadCard}
                  data-dificultad={compo.dificultad}
                >{compo.dificultad}
                </span>
                <span 
                  className={style.categoriaCard}
                  data-categoria={compo.categoria}
                >{compo.categoria}
                </span>
                {compo.tipoDeDano && <span className={style.dañoCard} data-tipoDeDano={compo.tipoDeDano}>{compo.tipoDeDano}</span>}
              </div>
        {/* <span className={style.titleComp} style={{fontSize: compo?.titulo?.length > 10 ? "8px" : "10px"}}>{compo.titulo}</span> */}
      </div>
      <div className={style.body}>
        <div className={`${style.initialInfoComp} ${style.borderContainer}`}>
          <div className={style.containerCampeonMeta}>
            <img 
              className={style.imgCampeonCard} 
              src={getLocalTftImage(allChampionsTFT.find(x => x.apiName === compo?.campeonMeta?.apiNameCampeon)?.tileIcon, 'champions/tileIcon')} 
              alt="Img Campeon"/>
            {compo?.campeonMeta?.estrellas &&
              <img 
              className={style.imgEstrellasCard} 
              src="/tft/assets/3-estrellas.webp" 
              alt="estrellas del campeon"/>}
            {compo.campeonMeta.aumento &&
                <img 
                className={style.imgAumentoCard} 
                src={getLocalTftImage(allItemsTFT.find(x => x.apiName === compo.campeonMeta.aumento)?.icon, 'augments/choiceui')} 
                alt="aumento del campeon meta"/>}
            {compo.campeonMeta.emblema &&
              <img 
              className={style.imgEmblemaCard} 
              src={getLocalTftImage(allItemsTFT.find(x => x.apiName === compo.campeonMeta.emblema)?.icon, 'items')} 
              alt="emblema del campeon meta"/>}
          </div>
          <div className={style.containerName}>
              <span className={`${style.textFillSize}`}>{compo.nombre}</span>
          </div>
          
        </div>
        <div className={`${style.initialFundamentals}` }>
          <div className={`${style.containerFundamentalsItems} ${style.borderContainer}`}>
            <span className={style.titleMiniInfoCard}>Objetos Prio</span>    
            <div className={style.containerItemsPrio}>
              {compo.itemsPrio.map((itemEntry, index)=>{
                const nombreItem = typeof itemEntry === 'object' && itemEntry !== null ? itemEntry.apiName : itemEntry;
                const opStatus = typeof itemEntry === 'object' && itemEntry !== null ? itemEntry.op : false;
                if (!nombreItem) return null;
                return (
                  <div key={index} className={`${style.containerItemPrio} ${style.highlightable} ${isItemHighlighted(nombreItem) ? style.highlight : ""}`}>
                    <ImgItem item={allItemsTFT.find(x => x.apiName === nombreItem)}/>
                    {opStatus && <span className={opStatus === 'opm' ? style.opmText || style.opText : style.opText}>{opStatus === 'opm' ? 'OPM' : 'OP'}</span>}
                  </div>
                )
              })}
            </div>
          </div>
          <div className={`${style.containerFundamentalsCampeones} ${style.borderContainer}`}>
            <span className={style.titleMiniInfoCard}>Salidas Early</span>
            <div className={style.containerCampeonesEarly} style={{ display: 'flex', flexDirection: 'column', gap: '5px', overflowY: 'auto', maxHeight: '90%' }}>
              {(compo.salidasEarly || []).map((grupoId, index)=>{
                const grupo = gruposSalidasEarly?.find(g => g.id === grupoId);
                if (!grupo) return null;
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', width: '100%', height:'100%' }}>
                    <div style={{ display: 'flex', gap: '2px', width: '100%', height: '100%', minHeight: 0, minWidth: 0, justifyContent: 'flex-start', alignItems: 'center', }}>
                      {grupo.nombre?.toLowerCase() === 'open fort' ? (
                        <div style={{ background: '#080808a4', color: '#faf600ff', borderRadius: '4px', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%', boxSizing:"border-box" }}>
                          Open Fort
                        </div>
                      ) : (
                        grupo.campeones.map(apiName => {
                          const champ = allChampionsTFT?.find(c => c.apiName === apiName);
                          if (!champ) return null;
                          
                          // Determinar color de borde por coste
                          const cost = champ.cost != null ? Number(champ.cost) : 1;
                          const colors = { 1: '#808080', 2: '#11b288', 3: '#207ac7', 4: '#c440da', 5: '#ffb93b' };
                          const borderColor = colors[cost] || '#808080';
                          
                          return (
                            <Tooltip key={apiName} type="campeon" campeon={champ}>
                              <img 
                                src={getLocalTftImage(champ.img || champ.tileIcon, 'champions/tileIcon', versionNumber)} 
                                alt={champ.name}
                                style={{ 
                                  height: '100%', 
                                  maxHeight: '100%', 
                                  maxWidth: '100%', 
                                  aspectRatio: '1/1', 
                                  borderRadius: '3px', 
                                  border: `1.5px solid ${borderColor}`, 
                                  objectFit: 'cover',
                                  flexShrink: 1,
                                  minWidth: 0,
                                  minHeight: 0,
                                  boxSizing: 'border-box'
                                }}
                              />
                            </Tooltip>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>        
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <div className={`${style.initialCondiciones} ${style.borderContainer}`}>
          <span className={style.titleMiniInfoCard}>Condiciones</span>
          <div className={style.containerCondicion}>
            {compo.condiciones.map((condicion, index)=>{
              if(condicion.early){

                const condicionGrande = condicion.apiNameGrande;
                const condicionPequeno = condicion.ApiNamePequeno;
                return (
                  <div key={index} className={style.containerCuadrosCondicion}>
                    <div className={style.containerCuadroCondicionGrande}>
                      {renderCondicionElement(condicionGrande, true)}
                    </div>
                    <div className={style.containerCuadroCondicionPequeno}>
                      {renderCondicionElement(condicionPequeno, false)}
                    </div>
                    {condicion.op && <span className={condicion.op === 'opm' ? style.opmText || style.opText : style.opText}>{condicion.op === 'opm' ? 'OPM' : 'OP'}</span>}
                  </div>
                );
            }
            })}
          </div>
        </div>
        <div className={`${style.initialAumentos} ${style.borderContainer}`}>
          <span className={style.titleMiniInfoCard}>Aumentos 2-1</span>
          <div className={style.containerAumentos}>
            {compo.aumentos
              .filter(aumento => aumento.op || aumento.early)
              .filter(aumento => {
                if (!selectedAugmentTiers || selectedAugmentTiers.length === 0) return true;
                const augmentApi = aumento.apiNameGrande || aumento.apiNamePequeno;
                if (!augmentApi) return false;
                const dbAugData = dbAumentos[augmentApi];
                if (!dbAugData) return false;
                const augTier = (dbAugData.categoria_tier || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return selectedAugmentTiers.some(tier => {
                  if (tier === 'Otros') return augTier !== 'plata' && augTier !== 'oro' && augTier !== 'prismatico';
                  return augTier === tier.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                });
              })
              .sort((a, b) => (b.op ? 1 : 0) - (a.op ? 1 : 0))
              .slice(0, 4)
              .map((aumento, index) => {
              console.log({aumento})
              let busquedaGrande;
              let busquedaPequeno;
              const extras = ["Win Streak","Loss Streak","Orbe"]
              if(extras.includes(aumento.apiNameGrande)){
                busquedaGrande = `/tft/assets/${aumento.apiNameGrande.replace(" ","")}.webp`
              }else{
                const filtrado = allAugmentsTFT.find((x) => x.apiName === aumento.apiNameGrande)?.icon || allChampionsTFT.find((x) => x.apiName === aumento.apiNameGrande)?.tileIcon
                busquedaGrande = filtrado ? getLocalTftImage(filtrado, 'augments/choiceui') : ""
              }
              if(extras.includes(aumento.apiNamePequeno)){
                busquedaPequeno = `/tft/assets/${aumento.apiNamePequeno.replace(" ","")}.webp`
              }else{
                const filtrado = allAugmentsTFT.find((x) => x.apiName === aumento.apiNamePequeno)?.icon || allChampionsTFT.find((x) => x.apiName === aumento.apiNamePequeno)?.tileIcon
                busquedaPequeno = filtrado ? getLocalTftImage(filtrado, 'augments/choiceui') : ""
              }
              return (
                <div key={`aumento-${index}`} className={style.containerCuadrosAumentos}>
                  {aumento.apiNameGrande && busquedaGrande && (
                    allAugmentsTFT.some(x => x.apiName === aumento.apiNameGrande) ? (
                      <ImgAugment augment={allAugmentsTFT.find(x => x.apiName === aumento.apiNameGrande)} className={style.imgAumentoCuadroGrande} />
                    ) : (
                      <img className={style.imgAumentoCuadroGrande} src={busquedaGrande} alt="item aumento cuadro grande"/>
                    )
                  )}
                  {aumento.apiNamePequeno && busquedaPequeno && (
                    allAugmentsTFT.some(x => x.apiName === aumento.apiNamePequeno) ? (
                      <ImgAugment augment={allAugmentsTFT.find(x => x.apiName === aumento.apiNamePequeno)} className={style.imgAumentoCuadroPequeno} />
                    ) : (
                      <img className={style.imgAumentoCuadroPequeno} src={busquedaPequeno} alt="item aumento cuadro pequeño"/>
                    )
                  )}
                  {aumento.op && <span className={aumento.op === 'opm' ? style.opmText || style.opText : style.opText}>{aumento.op === 'opm' ? 'OPM' : 'OP'}</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CardsMasterPlanCompos;