import styles from "./css/MejoresMazosRiftbound.module.css"
const MejoresMazosRiftbound = ()=>{
  const admin = localStorage.getItem("user") || false;

  return (
    <div className={styles.container}>
      {/* formulario admin */}
      {
        admin && 
        <div className={styles.formulario}>

        </div>
      }

      {/* pagina web */}
      <div className={styles.containerPaginaWeb}>
        <h1>Titulo 1</h1>
        <p>Descripcion1</p>
        <div className={styles.containerMazosMeta}>
          {/* ficha */}
          <div className={styles.ficha}>
            {/* HeaderFicha */}
            <div className={styles.headerFicha}>
              {/* HeaderFicha 1*/}
              <div className={styles.headerRow}>
                <div className={styles.containerImgTier}>
                  <img className={styles.imgTier}></img>
                </div>
                <p className={styles.nombreMazo}>Nombre del Mazo</p>
                <div className={styles.containerDeckValue}>
                  <img className={styles.imgDolar}></img>
                  <p className={styles.imgDolar}>{`${"Deck Value"}`}</p>
                </div>
              </div>
              {/* HeaderFicha 2*/}
              <div className={styles.headerRow}>
                {/* Legend */}
                <div className={styles.containerCard}>
                  <img className={styles.imgCard}></img>
                </div>
                {/* Champion Unit */}
                <div className={styles.containerCard}>
                  <img className={styles.imgCard}></img>
                </div>
                {/* Runas */}
                <div className={styles.containerCard}>
                  <img className={styles.imgCard}></img>
                </div>
              </div>
            </div>
            {/* Body */}
            <div className={styles.body}> {/* Oculto / Mostrar */}
              {/* Map de Cartas del mazo */}
              <div className={styles.containerCard}>
                <img className={styles.imgCard}></img>
              </div>
            </div>
            {/* Footer */}
            <div className={styles.footer}>
              
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MejoresMazosRiftbound;
