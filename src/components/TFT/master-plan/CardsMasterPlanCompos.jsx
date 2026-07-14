import React, { useState, useRef, useEffect } from "react";
import style from "./css/CardsMasterPlanCompos.module.css"
import { useStore } from "@nanostores/react";
import Tooltip from "@components/tooltips";

import { dataTFTAllItems, dataTFTChampions } from "@stores/dataTFT";
import { getLocalTftImage } from "@utils/images";
const CardsMasterPlanCompos = ({compo})=>{
  const allItemsTFT = useStore(dataTFTAllItems);
  const allChampionsTFT = useStore(dataTFTChampions);
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
              let busquedaGrande;
              let busquedaPequeno;
              let textoGrande;
              let textoPequeño;
              const extras = ["Win Streak","Loss Streak","Orbe"]
              if(extras.includes(condicion.apiNameGrande)){
                busquedaGrande = `/tft/assets/${condicion.apiNameGrande.replace(" ","")}.webp`
                textoGrande= condicion.apiNameGrande;
              }else{
                const rapido = allItemsTFT.find((x) => x.apiName === condicion.apiNameGrande) || allChampionsTFT.find((x) => x.apiName === condicion.apiNameGrande)
                console.log({rapido})
                const filtrado = allItemsTFT.find((x) => x.apiName === condicion.apiNameGrande)?.icon || allChampionsTFT.find((x) => x.apiName === condicion.apiNameGrande)?.tileIcon
                busquedaGrande = filtrado ? getLocalTftImage(filtrado, 'augments/choiceui') : ""
                textoGrande= rapido?.name;
              }
              if(extras.includes(condicion.apiNamePequeno)){
                busquedaPequeno = `/tft/assets/${condicion.apiNamePequeno.replace(" ","")}.webp`
                textoPequeño = condicion.apiNamePequeno;
              }else{
                const rapido = allItemsTFT.find((x) => x.apiName === condicion.apiNamePequeno) || allChampionsTFT.find((x) => x.apiName === condicion.apiNamePequeno)
                console.log({rapido})
                const filtrado = allItemsTFT.find((x) => x.apiName === condicion.apiNamePequeno)?.icon || allChampionsTFT.find((x) => x.apiName === condicion.apiNamePequeno)?.tileIcon
                busquedaPequeno = filtrado ? getLocalTftImage(filtrado, 'augments/choiceui') : ""
                textoPequeño= rapido?.name;
              }
              if(condicion.early)
              return (
                <Tooltip key={`condicion-${index}`} type="default" text={[textoGrande,textoPequeño]} >

                  <div className={style.containerCuadrosCondicion}>
                    {condicion.apiNameGrande && condicion.early && busquedaGrande && 
                      <img 
                        className={style.imgCondicionGrande} 
                        src={busquedaGrande} 
                        alt="cuadro grande"/>
                    }
                    {condicion.apiNamePequeno && condicion.early && busquedaPequeno &&
                      <img 
                        className={style.imgCondicionPequeno} 
                        src={busquedaPequeno} 
                        alt="cuadro pequeño"/>
                    }
                    {condicion.op && <span className={style.opText}>OP</span>}
                  </div>
                </Tooltip>
              )
            })}
          </div>
        </div>
        <div className={style.initialAumentos}>
          <span className={style.titleMiniInfoCard}>Aumentos</span>
          <div className={style.containerAumentos}>
            {compo.aumentos.map((aumento, index)=>{
              let busquedaGrande;
              let busquedaPequeno;
              const extras = ["Win Streak","Loss Streak","Orbe"]
              if(extras.includes(aumento.apiNameGrande)){
                busquedaGrande = `/tft/assets/${aumento.apiNameGrande.replace(" ","")}.webp`
              }else{
                const filtrado = allItemsTFT.find((x) => x.apiName === aumento.apiNameGrande)?.icon || allChampionsTFT.find((x) => x.apiName === aumento.apiNameGrande)?.tileIcon
                busquedaGrande = filtrado ? getLocalTftImage(filtrado, 'augments/choiceui') : ""
              }
              if(extras.includes(aumento.apiNamePequeno)){
                busquedaPequeno = `/tft/assets/${aumento.apiNamePequeno.replace(" ","")}.webp`
              }else{
                const filtrado = allItemsTFT.find((x) => x.apiName === aumento.apiNamePequeno)?.icon || allChampionsTFT.find((x) => x.apiName === aumento.apiNamePequeno)?.tileIcon
                busquedaPequeno = filtrado ? getLocalTftImage(filtrado, 'augments/choiceui') : ""
              }
              if(aumento.early)
                return (
              <div key={`aumento-${index}`} className={style.containerCuadrosAumentos}>
                  {aumento.apiNameGrande && aumento.early && busquedaGrande && <img className={style.imgAumentoCuadroGrande} src={busquedaGrande} alt="item aumento cuadro grande"/>}
                  {aumento.apiNamePequeno && aumento.early &&  busquedaPequeno && <img className={style.imgAumentoCuadroPequeno} src={busquedaPequeno} alt="item aumento cuadro pequeño"/>}
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