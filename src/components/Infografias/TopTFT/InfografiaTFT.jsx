import InfografiaTFTComps from "@components/TFT/InfografiaTFTComps"
import { useRef, useCallback, useState, useEffect } from "react";
import { toPng } from 'html-to-image';
import SliderButtom from "@components/inputs/SliderButtom";
import SliderButtomLogoGuiadeparche from "@components/inputs/SliderButtomLogoGuiadeparche";
import { metaCompsTFT } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import CampeonImgInTierList from "@components/TFT/meta/CampeonImgInTierList"
const InfografiaTFT = ()=>{
  const backgroundRef = useRef(null);
  const [tituloInfografiaTFT, setTituloInfografiaTFT] = useState("Top 4 TFT Meta Comps");
  const [logoMovilnet, setLogoMovilnet] = useState(true);
  const [logoGuiadeparche, setLogoGuiadeparche] = useState(false)
  const [compsSelected, setCompsSelected] = useState([])
  const metaComps = useStore(metaCompsTFT);
  
  const toggleCompSelection = (comp) => {
    setCompsSelected(prev => {
      const exists = prev.some(c => c.id === comp.id);
      let newSelected;
      if (exists) {
        newSelected = prev.filter(c => c.id !== comp.id);
      } else {
        newSelected = [...prev, comp];
      }
      
      const tierOrder = { S: 1, A: 2, B: 3, C: 4, H: 5, X: 6 };
      newSelected.sort((a, b) => {
        if (tierOrder[a.tier] !== tierOrder[b.tier]) {
          return tierOrder[a.tier] - tierOrder[b.tier];
        }
        return (a.posicion || 0) - (b.posicion || 0);
      });
      return newSelected;
    });
  };
  
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
    document.fonts.ready.then(() => {
      loadAllImages(backgroundRef.current)
      .then(() => {
        return toPng(backgroundRef.current, {
          cacheBust: true,
          pixelRatio: 2, // mejora calidad (escala la resolución)
        });
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${"InfografiaTFT"}.png`;
        link.href = dataUrl;
        link.click();
        console.log("📸 Imagen capturada");
      })
      .catch((err) => {
        console.error("❌ Error al capturar imagen:", err);
      });
    })
  }, [backgroundRef]);


  return (
    <div style={{display:"flex", flexDirection:"column", width:"100%", height:"auto", margin:"0 auto", flexWrap:"wrap", gap:"1rem"}}>
      {/* Seleccionar las compos que van en la infografia */}
      <span>hola</span>
      {['S', 'A', 'B', 'C'].map(tierLetter => {
        const tierComps = metaComps.filter(c => c.tier === tierLetter);
        if (tierComps.length === 0) return null;
        return (
          <div key={tierLetter} style={{ marginBottom: "20px" }}>
            <h2>Tier {tierLetter}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              {tierComps.map(comp => (
                <CampeonImgInTierList
                  key={comp.id}
                  id={comp.id}
                  apiNameCampeon={comp?.campeonMeta?.apiNameCampeon}
                  apiNameItems={comp?.campeonMeta?.apiNameItemsDelCampeon}
                  estrellas={comp?.campeonMeta?.estrellas}
                  aumento={comp?.campeonMeta?.aumento}
                  emblema={comp?.campeonMeta?.emblema}
                  compUrl={comp.urlSEO}
                  isInfografia={true}
                  isSelectedForInfografia={compsSelected.some(c => c.id === comp.id)}
                  onSelectForInfografia={() => toggleCompSelection(comp)}
                />
              ))}
            </div>
          </div>
        )
      })}
      <div>
        {/*Boton para capturar imagen de la InfografiaTFTComps */}
        <button onClick={()=>{
          onButtonClick()
        }}>Descargar Infografía TFT</button>
        <input 
          type="text"
          placeholder="Cambiar Titulo"
          value={tituloInfografiaTFT}
          onChange={(e)=>{setTituloInfografiaTFT(e.target.value)}}
          />
        <SliderButtom setLogoMovilnet={setLogoMovilnet} logoMovilnet={logoMovilnet}/>
        <SliderButtomLogoGuiadeparche setLogoGuiadeparche={setLogoGuiadeparche} logoGuiadeparche={logoGuiadeparche}/>
        
      </div>

      <InfografiaTFTComps backgroundRef={backgroundRef} compsSelected={compsSelected} setTituloInfografiaTFT={setTituloInfografiaTFT} tituloInfografiaTFT={tituloInfografiaTFT} logoMovilnet={logoMovilnet} logoGuiadeparche={logoGuiadeparche} webInfografia={true}/>
    </div>
  )
}

export default InfografiaTFT