import {lanersChampionsMeta, urlPositionLaners} from "@stores/dataLeagueOfLegends.js";
import { useEffect, useState, useRef, useCallback } from "react";
import { useStore } from "@nanostores/react";
import style from "./VisualizadorMetaLOL.module.css";
import { toPng } from 'html-to-image';

//usar tile en ves de portrait
// victory url : https://raw.communitydragon.org/latest/game/en_gb/assets/ux/endofgame/en_us/victory.png
//https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/tier/
const VisualizadorMetaLOL = () => {
  const lanersChampionsMetaStore = useStore(lanersChampionsMeta);
  const [versionMeta, setVersionMeta] = useState("25.11");
  const [elo, setElo] = useState("emerald");
  const backgroundRef = useRef(null);
  const eloRanks = [
    "iron",
    "bronze",
    "silver",
    "gold",
    "platinum",
    "emerald",
    "diamond",
    "master",
    "grandmaster",
    "challenger"
  ];
  const versionBg = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/mastery-banner-3.svg`;
  const urlEloImg = (elo) => {
    const url = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/${elo}.png`
    return url;
  }

  const loadAllImages = (container) => {
    const images = container.querySelectorAll("img");
    const promises = [];

    images.forEach((img) => {
      // ⚠️ Eliminar el lazy loading para forzar la carga inmediata
      if (img.loading === "lazy") {
        img.loading = "eager";
      }
      if (img.complete && img.naturalWidth === 0) {
        console.warn("⚠️ Imagen rota:", img, img.src);
      }
      if (img.complete) {
        if (img.naturalWidth === 0) {
          promises.push(Promise.reject(`❌ Falló imagen: ${img.src}`));
        }
      } else {
        promises.push(
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = () =>{
              reject(`❌ Falló imagen: ${img.src}`)};
          })
        );
      }
    });

    return Promise.allSettled(promises).then(results => {
      const errors = results.filter(r => r.status === "rejected");
      if (errors.length > 0) {
        throw new Error(`❌ ${errors.length} imágenes fallaron`);
      }
    });
  };


  const onButtonClick = useCallback(() => {
    if (backgroundRef.current === null) return;
  
    loadAllImages(backgroundRef.current)
      .then(() => {
        return toPng(backgroundRef.current, {
          cacheBust: true,
          pixelRatio: 2, // mejora calidad (escala la resolución)
        });
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `Mejores-Campeones-${versionMeta}.png`;
        link.href = dataUrl;
        link.click();
        console.log("📸 Imagen capturada");
      })
      .catch((err) => {
        console.error("❌ Error al capturar imagen:", err);
      });
  }, [backgroundRef]);

  useEffect(() => {
    console.log("⚠️ lanersChampionsMeta cambió:", lanersChampionsMetaStore);
  }, [lanersChampionsMetaStore]);
  return (
    <div className={style.visualizadorMetaLOL}>
      <div>
        <label className={style.labelVersion}>
          Versión del Meta:
          <input type="text" className={style.inputVersion} value={versionMeta} onChange={(e) => setVersionMeta(e.target.value)} placeholder="Ingrese la versión del meta" />
        </label>
        <label className={style.labelVersion}>
          <input type="button" className={style.inputVersion} onClick={onButtonClick} value="Capturar imagen"  />
        </label>
        {/* <label className={style.labelElo}>
          Elo:
          <select className={style.selectElo} value={elo} onChange={(e) => setElo(e.target.value)}>
            {
              eloRanks.map((rank, index) => (
                <option key={index} value={rank}>
                  {rank.charAt(0).toUpperCase() + rank.slice(1)}
                </option>
              ))
            }
          </select>
        </label> */}
      </div>
      <div className={style.containerVisualizadorMetaLOL}  ref={backgroundRef}>
        <img className={style.imgBackground} src={"https://cdn.communitydragon.org/latest/champion/Aatrox/splash-art/centered"} alt={"background de fondo"}></img>
        <div className={style.contenido}>
          <div className={style.header}>
            <div className={style.headerLeft}>
              <img src="/lol/lol_icon.png" alt="logo GP" className={style.lolIcon} />
            </div>
            <div className={style.headerRight}>
              <div className={style.headerVersion}>
                <img src={versionBg} alt={""} className={style.versionBg}></img>
                <p className={style.versionTxt}>v{versionMeta}</p>
              </div>
            </div>
            {/* <div className={style.headerElo}>
              <img src={urlEloImg(elo)} className={style.eloEmblem}></img>
            </div> */}
            <div className={style.title}>
              <p>MEJORES CAMPEONES - TIER S</p>
            </div>
          </div>
          <div className={style.containerMeta}>
          
          {
            Object.keys(lanersChampionsMetaStore).map((laner, index) =>{
              const data = lanersChampionsMetaStore[laner];
              return (
                <div key={index} className={style.container}>
                  {/* <h3>{laner}</h3> */}
                  <div className={style.containerLanerImg}>
                    <img src={urlPositionLaners(laner)} alt={laner} className={style.lanerImg}/>
                  </div>
                  <div className={style.championsInLaner}>
                    {data.map((meta, idx) => {
                      const champion = meta?.champion || [];
                      const items = meta?.items || [];
                      const runes = meta?.runes || [];
                      const slotsRunes = meta?.slotsRunes || [];
                      if(champion?.name === undefined) {
                        return (<></>)
                      }else{
                        return (
                          <div key={idx} className={style.champion}>
                            {/* <img src={champion.imageSquare} alt={champion.name} className={style.championImg} /> */}
                            <img src={champion.imagePortrait} alt={champion.name} className={style.championImg} />
                            <div className={style.bgBlurred}>
                              <p className={style.championsName}>{champion.name}</p>
                            </div>
                            <div className={style.items}>
                              {/* <h4>Items</h4> */}
                              {items.length > 0 && items.map((item, idx) => (
                                <div key={idx} className={style.item}>
                                  <img src={item.image} alt={item.name} className={style.itemImg}/>
                                    <p>{item.name}</p>
                                </div>
                              ))}
                            </div>

                            {/* <h4>Runes</h4> */}
                            {/* {runes.length > 0 && runes.map((rune, idx) => (
                              <div key={idx} className={ idx === 0 ? style.runePrimary : style.runeSecondary}>
                                <img src={rune.icon} alt={rune.name} className={style.runeImg}/>
                              </div>
                            ))} */}

                            {/* <h4>SlotRunes</h4> */}
                            {slotsRunes.length > 0 && slotsRunes.map((rune, idx) => (
                              <div key={idx} className={ idx === 0 ? style.runePrimary : style.runeSecondary}>
                                <img src={rune.icon} alt={rune.name} className={style.runeImg}/>
                                {/* <svg width="90" height="90">       
                                  <image xlink:href={rune.icon} src={rune.icon} width="90" height="90"/>    
                                </svg> */}
                                {/* <p>{rune.name}</p> */}
                              </div>
                            ))}
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )
            })
          }
          </div>
          <div className={style.footer}>
            <img src="/tft/assets/Jupeson_LOGO_Sin_Publicidad.png" alt="logo Jupeson" style={{transform:"scale(0.6)"}}></img>
            <img src="/tft/assets/logoMovilnet-e-letras-blancas.png" alt="logo Movilnet" ></img>
            <img src="/lol/league-logo-blanco.png" style={{transform:"scale(0.6)"}} alt="logo League of Legends"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualizadorMetaLOL;