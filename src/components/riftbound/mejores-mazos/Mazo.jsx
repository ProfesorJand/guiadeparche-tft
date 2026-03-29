import styles from "./Mazo.module.css"
import { Fragment, useState } from "react";
const Mazo = ({
  urlCarta,
  mazo,
  backgroundRefCrear,
  preview = false,
  adminMenu = false,
  setMazo,
  setRefrescar
}) => {
  const admin = localStorage.getItem("user") || false;
  console.log({ admin, preview })
  const [isExpanded, setIsExpanded] = useState(!preview);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const handleHeaderClick = () => {
    setShowAdminMenu(false);
    if (preview) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleContextMenu = (e) => {
    if (admin && adminMenu) {
      e.preventDefault();
      setShowAdminMenu((prev) => !prev);
    }
  };

  console.log({ mazo })
  const cartasUnicas = mazo?.mainDeck?.length;
  const widthMainDek = cartasUnicas <= 10 ? 4 : cartasUnicas <= 15 ? 3 : cartasUnicas <= 20 ? 4 : 5;
  const gapMainDeck = "5px"
  const coloresRunas = {
    "Chaos Rune": "purple",
    "Calm Rune": "green",
    "Order Rune": "yellow",
    "Body Rune": "#ff8c00",
    "Mind Rune": "blue",
    "Fury Rune": "red",


  }

  const handleEdit = () => {
    if (setMazo) {
      setMazo(mazo);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  const handleDelete = async () => {
    if (window.confirm("¿Seguro que quieres eliminar este mazo?")) {
      try {
        const response = await fetch("https://api.guiadeparche.com/riftbound/eliminarMazo.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: mazo.id }),
        });
        const data = await response.json();
        if (data.success) {
          alert("Mazo eliminado correctamente");
          if (setRefrescar) {
            setRefrescar((prev) => !prev);
          }
        } else {
          alert("Error al eliminar: " + data.message);
        }
      } catch (error) {
        alert("Error en la solicitud: " + error);
      }
    }
  }

  const isMini = preview && !isExpanded;

  return (
    <div 
      ref={backgroundRefCrear} 
      className={`${styles.containerMazosMeta} ${isMini ? styles.miniOuter : styles.expandedOuter}`}
      onContextMenu={handleContextMenu}
      onMouseLeave={() => setShowAdminMenu(false)}
    >
      {/* admin Menu edit delete */}
      {admin && adminMenu && showAdminMenu && (
        <div className={styles.containerAdminMenu}>
          <button className={styles.btnAdminMenu} onClick={() => { handleEdit() }}>Editar</button>
          <button className={styles.btnAdminMenu} onClick={() => { handleDelete() }}>Eliminar</button>
        </div>
      )}
      {/* ficha tipo card pequeña con solo legendaria y champion */}
      <div
        className={`${styles.miniFicha} ${preview && !isExpanded ? "" : styles.hide}`}
        onClick={handleHeaderClick}
      >
        <div className={styles.containerCardLegendary}>
          <img src={mazo?.legend?.art?.nuevaThumbnailURL} className={styles.imgCard} crossOrigin="anonymous"></img>
        </div>
        <div className={styles.containerCardChampion}>
          <img src={mazo?.champion?.art?.nuevaThumbnailURL} className={styles.imgCard} crossOrigin="anonymous"></img>
        </div>
      </div>
      {/* ficha expandida*/}
      <div
        className={`${styles.ficha} ${isExpanded ? "" : styles.hide}`}
      >
        <div className={styles.containerGoldLinesFicha}>
          <img className={styles.goldLinesFicha} src="/riftbound/logo/bordes-dorados.png"></img>
        </div>
        <div className={styles.containerGoldLinesFicha}>
          <img className={styles.goldLinesFicha} src="/riftbound/logo/bordes-dorados.png"></img>
        </div>
        {/* HeaderFicha */}
        <div
          className={styles.headerFicha}
          onClick={handleHeaderClick}
          style={preview ? { cursor: "pointer" } : {}}
        >
          {/* HeaderFicha 1*/}
          <div className={styles.containerInfoMazo}>
            {/* <div className={styles.containerInfo}>  */}
            <div className={styles.containerImgTier}>
              <img
                className={styles.imgTier}
                src={`/tiers/Tier-${mazo?.tier?.toUpperCase()}.webp`}
              />
              <div className={styles.containerDeckValue}>
                {/* <img className={styles.imgDolar}></img> */}
                <span className={styles.deckValue}>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/047/247/748/small_2x/dollar-icon-3d-rendering-illustration-png.png"
                    crossOrigin="anonymous"
                    style={{ verticalAlign: 'middle', width: '20px', height: '20px' }}
                  ></img>
                  {mazo?.coste || "Sin Coste"}
                </span>
              </div>
            </div>
            <div className={styles.containerRunes}>
              {
                mazo?.runes?.length > 0 && mazo?.runes.map((rune, index) => {
                  return (
                    <div className={styles.containerRunesIndividual} key={index}>
                      <div className={styles.containerCardRune}>
                        <img
                          src={rune.art?.thumbnailURL}
                          className={styles.imgRunes}
                          crossOrigin="anonymous"
                        ></img>
                        <div className={styles.containerNumberOfRunes}>
                          <span className={styles.numberOfRunes}>
                            {`x${rune?.quantity}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {/* </div> */}
            <div className={styles.containerNombre}
              style={{
                background:
                  `linear-gradient(135deg,
              transparent 0%,
              ${coloresRunas[mazo?.runes?.[0]?.name]} 45%,
              ${coloresRunas[mazo?.runes?.[1]?.name]} 55%,
              transparent 100%
            )`}}>
              <div
                className={styles.efecto1}
                style={{
                  backgroundImage:
                    `radial-gradient(circle, ${coloresRunas[mazo?.runes?.[0]?.name]} 40%, transparent 42%)`
                }}
              ></div>
              <div
                className={styles.efecto2}
                style={{
                  backgroundImage:
                    `radial-gradient(circle, ${coloresRunas[mazo?.runes?.[1]?.name]} 40%, transparent 42%)`
                }}
              ></div>
              <span className={styles.nombreMazo}>{mazo?.nombre}</span>
            </div>
          </div>
          <div className={styles.containerHeaderCards}>
            {/* Legend */}
            <div className={[styles.containerVerticalText].join(" ")}>
              <div className={styles.containerGoldLines}>
                <img
                  className={styles.goldLines}
                  src="/riftbound/logo/bordes-dorados.png"
                ></img>
              </div>
              <div className={styles.containerGoldLines}>
                <img className={styles.goldLines} src="/riftbound/logo/bordes-dorados.png"></img>
              </div>
              {/* <div className={[styles.horizontalLines, styles.horizontalLinesTop].join(" ")}></div>
              <div className={[styles.horizontalLines, styles.horizontalLinesBottom].join(" ")}></div>
              <div className={[styles.verticalLines, styles.verticalLineTopLegend].join(" ")}></div>
              <div className={[styles.verticalLines, styles.verticalLineBottomLegend].join(" ")}></div> */}
              <div className={styles.containerCQHVerticalText}>
                <span className={styles.verticalText}>LEGEND</span>
              </div>
            </div>
            <div className={[styles.containerCard, styles.containerCardPrimary].join(" ")}>
              <img
                src={mazo?.legend?.art?.nuevaThumbnailURL}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = mazo.legend.art.thumbnailURL }}
                alt={mazo?.legend?.name}
                className={styles.imgCard}
                crossOrigin="anonymous"
              ></img>
            </div>
          </div>
          <div className={styles.containerHeaderCards}>
            {/* Champion Unit */}
            <div className={[styles.containerVerticalText].join(" ")}>
              <div className={[styles.containerGoldLines, styles.containerGoldLinesChampion].join(" ")}>
                <img
                  className={styles.goldLines}
                  src="/riftbound/logo/bordes-dorados.png"></img>
              </div>
              <div className={[styles.containerGoldLines, styles.containerGoldLinesChampion].join(" ")}>
                <img className={styles.goldLines} src="/riftbound/logo/bordes-dorados.png"></img>
              </div>
              {/* <div className={[styles.horizontalLines, styles.horizontalLinesTop].join(" ")}></div>
              <div className={[styles.horizontalLines, styles.horizontalLinesBottom].join(" ")}></div>
              <div className={[styles.verticalLines, styles.verticalLineTopChampion].join(" ")}></div>
              <div className={[styles.verticalLines, styles.verticalLineBottomChampion].join(" ")}></div> */}
              <div className={styles.containerCQHVerticalText}>
                <span className={styles.verticalText}>CHAMPION</span>
              </div>
            </div>
            <div className={[styles.containerCard, styles.containerCardPrimary].join(" ")}>
              <img
                src={mazo?.champion?.art?.nuevaThumbnailURL}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = mazo.champion.art.thumbnailURL }}
                crossOrigin="anonymous"
                className={styles.imgCard}>

              </img>
            </div>
          </div>
        </div>
        {/* Body */}
        <div className={`${styles.body} ${!isExpanded ? styles.hide : ""}`}> {/* Oculto / Mostrar */}
          <div className={styles.bodyMainDeck} style={{ gap: gapMainDeck }}>

            {/* Map de Cartas del mazo */}
            {
              mazo?.mainDeck?.length > 0 && mazo?.mainDeck.map((card, index) => (
                <div key={index} className={[styles.containerCard, styles.containerCardSecondary].join(" ")}>
                  <img
                    src={card.art.nuevaThumbnailURL}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = card.art.thumbnailURL }}
                    className={styles.imgCard}
                    alt={card.name}
                    crossOrigin="anonymous"
                  >
                  </img>
                  <div className={styles.containerNumberOfRunes}>
                    <span className={styles.numberOfRunes}>
                      {`x${card?.quantity}`}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Batlefields */}
          <div className={styles.containerBattlefields}>

            {
              mazo?.battlefields?.length > 0 && mazo?.battlefields.map((card, index) => (
                // <div key={index} className={[styles.containerCard, styles.containerBattlefieldCard].join(" ")}>
                <img
                  src={card.art.nuevaThumbnailURL + "?rotate=90"}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = card.art.thumbnailURL + "?rotate=90" }}
                  className={`${styles.imgCard} ${styles.imgCardBattlefield}`}
                  alt={card.name}
                  crossOrigin="anonymous"
                ></img>
                // </div>
              ))
            }
          </div>
        </div>
        {/* Footer */}
        <div className={`${styles.footer} ${!isExpanded ? styles.hide : ""}`}>
          <div className={styles.containerLogo}>
            <img
              className={styles.imgLogoRiftbound}
              src={"/tft/assets/Jupeson_LOGO_Sin_Publicidad_Sin_Bordes.png"}
              alt={"logoJupeson"} />
          </div>
          <div className={styles.containerLogo}>
            <img
              className={styles.imgLogoRiftbound}
              src={"/tft/assets/GP_logo.png"}
              alt={"logoGuiadeparche"} />
          </div>
          <div className={styles.containerLogo}>
            <img
              className={styles.imgLogoRiftbound}
              src={"/riftbound/logo/RiftboundLogo.png"}
              alt={"logoRiftbound"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mazo;