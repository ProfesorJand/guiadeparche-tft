import React, { useState, useRef, useEffect } from "react";
import style from "./css/CardsMasterPlanCompos.module.css"
import { useStore } from "@nanostores/react";
import Tooltip from "@components/tooltips";

import { dataTFTAllItems, dataTFTChampions, dataTFTAllAugments } from "@stores/dataTFT";
import { getLocalTftImage } from "@utils/images";
import ImgAugment from "@components/TFT/ImgAugment";
import ImgItem from "@components/TFT/ImgItem";
import ImgCampeon from "@components/TFT/ImgCampeon";

const CardsMasterPlanCompos = ({compo})=>{
  const allItemsTFT = useStore(dataTFTAllItems);
  const allChampionsTFT = useStore(dataTFTChampions);
  const allAugmentsTFT = useStore(dataTFTAllAugments);
  return (
    <div className={style.container} >
      <div className={style.header}>
            <span
              className={style.tierCard}
              data-tier={compo.tier}
            >{compo.tier}
            </span>
        <span className={style.titleComp}>{compo.titulo}</span>
      </div>
      <div className={style.body}>
        <div className={style.initialInfoComp}>
          {compo?.campeonMeta?.estrellas === 3 &&
            <img 
            className={style.imgEstrellasCard} 
            src="/tft/assets/3-estrellas.webp" 
            alt="estrellas del campeon"/>}
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
              <span className={style.dañoCard} data-tipoDeDano={compo.tipoDeDano}>{compo.tipoDeDano}</span>
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
          <img 
            className={style.imgCampeonCard} 
            src={getLocalTftImage(allChampionsTFT.find(x => x.apiName === compo?.campeonMeta?.apiNameCampeon)?.squareIcon, 'champions/squareIcon')} 
            alt="Img Campeon"/>
        </div>
        <div className={style.initialFundamentalDioses}>
          <div className={style.initialFundamentals}>
            <span className={style.titleMiniInfoCard}>Fundamentals</span>
            
            <div className={style.containerItemsPrio}>
              {compo.itemsPrio.map((nombreItem, index)=>{
                return (
                  <div key={index} className={style.containerItemPrio}>
                    <Tooltip type="item" item={allItemsTFT.find(x => x.apiName === nombreItem)}>
                      <img 
                      className={style.imgItemsPrio} 
                      src={getLocalTftImage(allItemsTFT.find(x => x.apiName === nombreItem)?.icon, 'items')} 
                      alt="items del campeon"/>
                    </Tooltip>
                  </div>
                )
              })}
            </div>
            <div className={style.containerCampeonesEarly}>
              {compo.campeonesEarly.map((campeon, index)=>{
                return (
                  <div key={index} className={style.campeonEarly}>
                    <Tooltip type="campeon" campeon={allChampionsTFT.find(x => x.apiName === campeon?.apiNameCampeon)}>
                      <img className={style.imgCampeonEarly} src={getLocalTftImage(allChampionsTFT.find(x => x.apiName === campeon?.apiNameCampeon)?.tileIcon, 'champions/tileIcon')} alt="Campeon early 1"/>
                    </Tooltip>
                    <div className={style.containerItemsCampeonEarly}>
                      {campeon.apiNameItemsDelCampeon.map((item,index)=>{
                        if(item)
                        return (
                          <Tooltip key={`item-early-${index}`}  type="item" item={allItemsTFT.find(x => x.apiName === item)}>
                            <img 
                              className={style.imgItemsCampeonEarly} 
                              src={getLocalTftImage(allItemsTFT.find(x => x.apiName === item)?.icon, 'items')} 
                              alt="item early 1"/>
                          </Tooltip>
                        )
                      })}
                    </div>
                  </div>
                  )
                })}
            </div>        
          </div>
          <div className={style.initialDioses}>
              <span className={style.titleMiniInfoCard}>Dioses</span>
              <div className={style.containerDioses}>
                {compo.dioses.map((dios, index)=>{
                  return (
                    <div key={index} className={style.containerDios}>
                    
                    <Tooltip type="default" text={dios}>
                      <div className={style.containerImgDios}>
                        <img className={style.imgDios} src={"/tft/sets/17/dioses/"+dios.toLowerCase()+".webp"} alt="dios"/>
                      </div>
                    </Tooltip>
                    {/* <span className={style.nombreDios}>{dios}</span> */}
                  </div>)
                })}
              </div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.initialCondiciones}>
          <span className={style.titleMiniInfoCard}>Condiciones</span>
          <div className={style.containerCondicion}>
            {compo.condiciones.map((condicion, index)=>{
              if(condicion.early){

                const condicionGrande= condicion.apiNameGrande;
                const condicionPequeno = condicion.ApiNamePequeno;
                const isCondicionGrandeAugment = allAugmentsTFT.some((item) => item.apiName === condicionGrande);
                const isCondicionPequenoAugment = allAugmentsTFT.some((item) => item.apiName === condicionPequeno);
                const isCondicionGrandeCampeon = allChampionsTFT.some((item) => item.apiName === condicionGrande);
                const isCondicionPequenoCampeon = allChampionsTFT.some((item) => item.apiName === condicionPequeno);
                const isCondicionGrandeItem = allItemsTFT.some((item) => item.apiName === condicionGrande);
                const isCondicionPequenoItem = allItemsTFT.some((item) => item.apiName === condicionPequeno);
                const extras = ["Win Streak","Loss Streak","Orbe","3 estrellas","4 estrellas"];
                const isCondicionGrandeExtra = extras.some((item) => item === condicionGrande);
                const isCondicionPequenoExtra = extras.some((item) => item === condicionPequeno);
                return (
                  <div className={style.containerCuadrosCondicion}>

                    {isCondicionGrandeAugment && <ImgAugment augment={allAugmentsTFT.find((item) => item.apiName === condicionGrande)}/>}
                    {isCondicionGrandeItem && <ImgItem item={allItemsTFT.find((item) => item.apiName === condicionGrande)}/>}
                    {isCondicionGrandeCampeon && <ImgCampeon championData={allChampionsTFT.find((champ) => champ.apiName === condicionGrande)} imgType="icon" showName={false}/>}
                    {isCondicionGrandeExtra && <span className={style.textExtra}>{condicionGrande}</span>}

                    {isCondicionPequenoAugment && <ImgAugment augment={allAugmentsTFT.find((item) => item.apiName === condicionPequeno)}/>}
                    {isCondicionPequenoItem && <ImgItem item={allItemsTFT.find((item) => item.apiName === condicionPequeno)}/>}
                    {isCondicionPequenoCampeon && <ImgCampeon championData={allChampionsTFT.find((champ) => champ.apiName === condicionPequeno)} imgType="icon" showName={false}/>}
                    {isCondicionPequenoExtra && <span className={style.textExtra}>{condicionPequeno}</span>}
                    {condicion.op && <span className={style.opText}>OP</span>}
                  </div>
              )
            }
            })}
          </div>
        </div>
        <div className={style.initialAumentos}>
          <span className={style.titleMiniInfoCard}>Aumentos</span>
          <div className={style.containerAumentos}>
            {compo.aumentos
              .filter(aumento => aumento.op || aumento.early)
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
                  {aumento.apiNameGrande && busquedaGrande && <img className={style.imgAumentoCuadroGrande} src={busquedaGrande} alt="item aumento cuadro grande"/>}
                  {aumento.apiNamePequeno && busquedaPequeno && <img className={style.imgAumentoCuadroPequeno} src={busquedaPequeno} alt="item aumento cuadro pequeño"/>}
                  {aumento.op && <span className={style.opText}>OP</span>}
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