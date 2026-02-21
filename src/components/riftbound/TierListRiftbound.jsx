import { useState, useRef } from "react";
import styles from "./css/TierListRiftbound.module.css"
import { CapturarImagen } from "@functions/CapturarImagen";
const TierListRiftbound = ()=>{
  const numeroDeCartas = 8;
  const [tierList, setTierList] = useState([])
  const [titulo1, setTitulo1] = useState("TIER LIST")
  const [titulo2, setTitulo2] = useState("RIFTBOUND LEGENDS")
  const backgroundRef = useRef(null)
  return (
    <div className={styles.container}>
      <div>
        <datalist id="tiers">
          <option value="S"/>
          <option value="A"/>
          <option value="B"/>
          <option value="C"/>
          <option value="D"/>
        </datalist>
        <input
          type="text" 
          value={titulo1}
          onChange={(e)=>{
            setTitulo1(e.target.value)
          }} 
        />
        <input
          type="text" 
          value={titulo2}
          onChange={(e)=>{
            setTitulo2(e.target.value)
          }} 
        />
        {
          Array.from({length: numeroDeCartas}).map((_,index) =>{
            return (
              <div key={index}>
                <input 
                  type="text" 
                  onChange={(e)=>{
                    const value = e.target.value
                    setTierList((oldArray)=>{
                      const nuevoArray = [...oldArray]
                      nuevoArray[index] = {...nuevoArray[index]} || {};
                      nuevoArray[index].url = value;
                      return nuevoArray
                    })
                  }}
                  placeholder={`url ${index  + 1}`}
                  />
                  <input 
                  list="tiers"
                  onChange={(e)=>{
                    const value = e.target.value
                    setTierList((oldArray)=>{
                      const nuevoArray = [...oldArray]
                      nuevoArray[index] = {...nuevoArray[index]} || {};
                      nuevoArray[index].tier = value;
                      return nuevoArray
                    })
                  }}
                  placeholder={`tier ${index + 1}`}
                  />
              </div>
            )
          })
        }
        <input
          type="button"
          value="Capturar Imagen"
          onClick={()=>{
            CapturarImagen({backgroundRef, nombre:"Riftbound-Tier-List"})
          }}
          />
      </div>

      <div className={styles.containerInfografia} ref={backgroundRef}>
        <div className={[styles.containerImgBorder, styles.containerImgBorderTopLeft].join(" ")}>
          <img 
            src={"/riftbound/logo/bordes-dorados.png"}
            className={styles.imgBorder}
            />
        </div>
        <div className={[styles.containerImgBorder, styles.containerImgBorderTopRight].join(" ")}>
          <img 
            src={"/riftbound/logo/bordes-dorados.png"}
            className={styles.imgBorder}
            />
        </div>
        <div className={[styles.containerImgBorder, styles.containerImgBorderBottomLeft].join(" ")}>
          <img 
            src={"/riftbound/logo/bordes-dorados.png"}
            className={styles.imgBorder}
            />
        </div>
        <div className={[styles.containerImgBorder, styles.containerImgBorderBottomRight].join(" ")}>
          <img 
            src={"/riftbound/logo/bordes-dorados.png"}
            className={styles.imgBorder}
            />
        </div>
        <div className={styles.header}>
          <p className={styles.titulo}>{titulo1}</p>
          <p className={styles.titulo}>{titulo2}</p>
        </div>
        <div className={styles.body}>
          {
            tierList.length > 0 && tierList.map(({url,tier}, index)=>{
              return (
                <div key={index} className={styles.containerImgLegeng}>
                  <img 
                    src={`/tiers/Tier-${tier?.toUpperCase()}.webp`}
                    crossOrigin="anonymous"
                    className={styles.imgTier}
                    ></img>
                  <img 
                    src={url}
                    crossOrigin="anonymous"
                    className={styles.imgLegend}
                    ></img>
                </div>
              )
            })
          }
        </div>
        <div className={styles.footer}>
          <div className={styles.containerLogo}>
            <img 
              className={styles.logo}
              src="/Jupeson_LOGO_Sin_Publicidad_Sin_Bordes.png"
            ></img>
          </div>
          <div className={styles.containerLogo}>
            <img 
              className={styles.logo}
              src="/tft/assets/GP_logo.png"
            ></img>
          </div>
          <div className={styles.containerLogo}>
            <img 
              className={styles.logo}
              src="/riftbound/logo/RiftboundLogo.png"
            ></img>
          </div>
          <span className={styles.textoWeb}>GUIADEPARCHE.COM</span>
        </div>
      </div>
      
    </div>
  )
}

export default TierListRiftbound;