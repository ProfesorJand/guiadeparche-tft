import styles from "./InfografiaTopVideojuegos.module.css"
import { TOP10ANUAL, TOP10FEBRERO, TOP10MARZO } from "@stores/dataVideojuegos";
import { useRef, useState } from "react";
import { CapturarImagen } from "@functions/CapturarImagen";
const InfografiaTopVideoJuegos = ({type="anual"})=>{
  console.log({type})
  const backgroundRef = useRef(null)
  const titleMap = {
    anual: {
      titulo1:"Top 10 Lanzamientos",
      titulo2: "Videojuegos 2026"
    },
    febrero: {
      titulo1:"Top 10 Lanzamientos",
      titulo2: "Videojuegos Febrero 2026"
    },
    marzo: {
      titulo1:"Top 10 Lanzamientos",
      titulo2: "Videojuegos Marzo 2026"
    },
  };
  const [titulo1, setTitulo1] = useState(titleMap[type]["titulo1"]);
  const [titulo2, setTitulo2] = useState(titleMap[type]["titulo2"]);
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const consolas = {
    "PS5": "/plataformas/PS5.png",
    "Xbox Series X/S": "/plataformas/X_Box_X_S.png",
    "PC": "/plataformas/PC.png",
    "Nintendo Switch 2":"/plataformas/Nintendo_Switch_2.png",
  }
  const data =
    type === "febrero"
      ? TOP10FEBRERO
      : type === "marzo"
      ? TOP10MARZO
      : TOP10ANUAL;

  const sortedData = [...data].sort(
    (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
  );



  return (
    <div className={styles.container}>
      <div className={styles.containerFormulario}> 
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
          <input type="button" value="Capturar Imagen"
            onClick={()=>{
              CapturarImagen({backgroundRef, nombre:titleMap[type]["titulo1"]+ "_" + titleMap[type]["titulo2"] })
            }}
          />
      </div>
      <div ref={backgroundRef} className={styles.containerInfografia}>
        <div className={styles.header}>
          <span className={styles.titulo}>
            {titulo1.toUpperCase()}
          </span>
          <span className={styles.titulo2}>
            {titulo2.toUpperCase()}
          </span>
        </div>

        <div className={styles.body}>
          {/* Map */}
          {
            sortedData.map((game,index)=>{
              return (
                <div key={index} className={styles.card}>
                    <div className={styles.containerImgGame}>
                      <img 
                      className={styles.imgGame}
                      src={game.imageUrl} alt=""
                      crossOrigin="anonymous"
                      ></img>
                    </div>
                      <p className={[styles.gameName, styles.gameContent].join(" ") }>{game.title}</p>

                      {/* <p className={styles.gameDescription}>{game.description}</p> */}
                      <p className={[styles.relaseDate, styles.gameContent].join(" ")}>{game.releaseDate.slice(8,10) +" de " + meses[(Number(game.releaseDate.slice(5,7)) - 1)]}</p>
                      <div 
                        className={[styles.platformContainer, styles.gameContent].join(" ")} 
                        >{game.platforms.map((platform, iP)=>{
                          if(consolas[platform]){

                            return (
                              <div key={iP} className={styles.imgPlatformContainer}>
                              <img 
                                className={[styles.platform, platform === "PS5" &&  styles.platformPS5].join(" ")}
                                src={consolas[platform]} 
                                alt={platform}></img>
                            </div>
                          )
                        }
                        })}</div>

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
              className={[styles.logo, styles.logoMovilnet].join(" ")}
              src="/tft/assets/logoMovilnet-e-rojo-con-blanco.png"
            ></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfografiaTopVideoJuegos;