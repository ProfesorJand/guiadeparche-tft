import { useEffect, useState, useRef, useCallback } from "react";
import { fetchHeroes, Dota2Constantes, Dota2AgentsMeta, LaneDota2, fetchHeroesMeta } from "@stores/dataDota2";
import { useStore } from "@nanostores/react";
import { toPng } from 'html-to-image';
import TierListDota2 from "./TierListDota2";
import style from "./css/FormularioTierListDota2.module.css"
import VersionCompo from "@components/dota-2/VersionCompo";

const FormularioTierListDota2 = () => {
  const backgroundRef = useRef(null);
  const ConstantesDota2 = useStore(Dota2Constantes);
  const [localMetaDota2, setLocalMetaDota2] = useState({});
  const [listHeroes, setListHeroes] = useState([]);
  const [version, setVersion] = useState("10.10");
  const [titulo, setTitulo] = useState("TOP RANKED HEROES - TIER S+")
  const [logoMovilnet, setLogoMovilnet] = useState(false)
  const admin = localStorage.getItem("user") || false;
  const Dota2MetaStore = useStore(Dota2AgentsMeta);
  useEffect(()=>{
    const fetching = async () =>{
      const uploadMeta = await fetchHeroesMeta();
      console.log("Meta Dota2 cargada", uploadMeta);
      setLocalMetaDota2(uploadMeta);
    }
    fetching();
  },[])

  useEffect(()=>{
    const fetchingHeroes = async ()=>{
      const heroes = await fetchHeroes();
      setListHeroes(heroes)
    }
    fetchingHeroes();
  },[])

  // useEffect(()=>{
  //   setLocalMetaDota2(JSON.parse(JSON.stringify(Dota2MetaStore)))
  // },[Dota2MetaStore])

  useEffect(()=>{
  if (ConstantesDota2) {
    setVersion(ConstantesDota2.versionVisualizadorMeta)
    setTitulo(ConstantesDota2.tituloVisualizadorMeta)
    setLogoMovilnet(ConstantesDota2.logoMovilnet)
  }
  },[ConstantesDota2])



  const handleHero = ({ hero, iHeroeSpot, rol }) => {
    const updateRol = localMetaDota2?.[rol] ? [...localMetaDota2[rol]] : [];

    // Si aún no hay selección válida (solo está escribiendo), solo guarda el texto
    if (!hero || !listHeroes.some(h => h.name === hero)) {
      updateRol[iHeroeSpot] = { name: hero }; // Solo el texto temporal
    } else {
      const findDataHero = listHeroes.find((h) => h.name === hero);
      updateRol[iHeroeSpot] = findDataHero || { id: null, name: null, image: null };
    }

    setLocalMetaDota2((prev) => {
      const newMeta = { ...prev };
      newMeta[rol] = updateRol;
      return newMeta;
    });
  };

  const saveChanges = async () => {
    try {
      const response = await fetch("https://api.guiadeparche.com/dota-2/saveMetaDota2.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`,
        },
        body: JSON.stringify(localMetaDota2),
      });
  
      if (!response.ok) {
        throw new Error("Error saving MetaDota2");
      }
  
      console.log("%cMetaDota2 saved successfully", "background:green;color:white");
  
      // 🔄 Actualizar el store con la versión más reciente desde el servidor
      const updatedMeta = await fetchHeroesMeta();
      Dota2AgentsMeta.set(updatedMeta);
  
      console.log("%cMetaDota2 updated from server", "background:blue;color:white");
  
    } catch (error) {
      console.error("Error saving or updating MetaDota2:", error);
    }
  };

  const saveContantes = async ({key,value})=>{
    console.log({key,value})
    try{
      const response = await fetch("https://api.guiadeparche.com/dota-2/constantes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`,
        },
        body: JSON.stringify({key,value}),
      });
      alert(`${key} se ha guardado`)
    }catch(err){
      console.error("Error saving or updating constantes Dota2:", err)
      alert(`${key} NO se ha guardado`)
    }
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
        link.download = `Mejores-Heroes-Dota2-v${version}.png`;
        link.href = dataUrl;
        link.click();
        console.log("📸 Imagen capturada");
        alert("📸 Imagen capturada")
      })
      .catch((err) => {
        console.error("❌ Error al capturar imagen:", err);
      });
  }, [backgroundRef]);


  return (
    <div>
      {
        admin &&
        <>
      <div>
        <h1>Dota 2 Heroes Tier List</h1>
        <VersionCompo/>
      {LaneDota2.map((rol, iRol)=>{
        return (
          <div key={`rols${iRol}`}>
            {/* <img src={`/valorant/rols/${rol}.svg`} style={{ filter: "brightness(0) invert(1)" }}></img> */}
            {rol}
            {Array.from({ length: 8}, (_, iHeroeSpot)=>{
              return (
                <div key={`inputsHeros${iHeroeSpot}`}>
                  <input
                    list={`heroesList${rol}`}
                    placeholder="Find Hero"
                    value={localMetaDota2?.[rol]?.[iHeroeSpot]?.name || ""}
                    onChange={(e)=>{
                      const hero = e.target.value;
                      if(hero===""){
                        handleHero({
                          hero:null,
                          rol,
                          iHeroeSpot
                        })
                      }else{
                        handleHero({
                          hero,
                          rol,
                          iHeroeSpot
                        })
                      }
                    }}
                  />
                  <datalist id={`heroesList${rol}`}>
                    {listHeroes.map((hero,iHeroOption)=>{
                      return (
                        <option key={`agentInputs${iHeroeSpot}${iHeroOption}${rol}`} value={hero.name}>{hero.name}</option>
                      )
                    })}
                  </datalist>
                </div>
              )
            })}
          </div>
          )
        })}
      </div>
      <div className={style.botones}>
        <input type="button" onClick={()=>{saveChanges()}} defaultValue="Guardar Cambios"/>
        <input type="text"  id={"titulo"} onChange={(e)=>{setTitulo(e.target.value)}} value={titulo} className={style.inputText}/>
        <input type="button" onClick={(e)=>{saveContantes({key:"tituloVisualizadorMeta",value:document.getElementById("titulo").value})}} value={"Guardar Titulo"}></input>
        <input type="text" id={"version"} onChange={(e)=>{setVersion(e.target.value)}} value={version} className={style.inputText}/>
        <input type="button" onClick={(e)=>{saveContantes({key:"versionVisualizadorMeta",value:document.getElementById("version").value})}} value={"Guardar Version"}></input>
        <span>Logo Movilnet ({logoMovilnet ? "activado": "desactivado"})</span>
        <label className={style.switch}>
          <input type="checkbox" id={"logoMovilnet"} onChange={(e)=>{setLogoMovilnet(e.target.checked)}} value={logoMovilnet} className={style.inputText} checked={logoMovilnet}/>
          <span className={style.slider}></span>
        </label>
        <input type="button" onClick={(e)=>{saveContantes({key:"logoMovilnet",value:document.getElementById("logoMovilnet").checked})}} value={"Guardar Vista de Logo Movilnet"}></input>
        <input type="button" onClick={()=>{onButtonClick()}} defaultValue="Capturar Imagen"/>
      </div>
        </>
      }
      <TierListDota2 localMetaDota2={localMetaDota2} rols={LaneDota2} backgroundRef={backgroundRef} version={version} titulo={titulo} logoMovilnet={logoMovilnet}/>
    </div>
  )
}

export default FormularioTierListDota2