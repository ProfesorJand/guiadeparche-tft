import DeckStats from './DeckStats';
import { Fragment, useState, useEffect, useRef } from 'react';
import cardStyle from "./css/CardSelector.module.css";
import styles from './css/DeckPreview.module.css';
import NumberOfCards from './NumbersOfCards';
import { CapturarImagen } from '@functions/CapturarImagen';


export default function DeckPreview({ legendary, champion, mainDeck, sideDeck, runes, battlefields, setLegendary, setChampion, setRunes, setBattlefields, setSideDeck, setMainDeck }) {

  const [deckValue, setDeckValue] = useState(0);
  const [deckTitle, setDeckTitle] = useState();
  const [deckTier, setDeckTier] = useState("S");
  const refInfografia = useRef(null);
  const urlBackendCard = (id)=>`https://api.guiadeparche.com/riftbound/cards/${id}.png`

  useEffect(() => {
  if (legendary) {
    setDeckTitle(`${legendary.tags[0]} - ${legendary.name}`);
  } else {
    setDeckTitle("");
  }
}, [legendary]);
  

  
  const previewMainDeck = mainDeck.filter((card, i, array) =>
  i === array.findIndex((t) => (
    t.id === card.id // Compara por la propiedad 'id'
  ))
);

console.log({previewMainDeck})


  const columnsPreviewMainDeck = previewMainDeck.length <= 18 ? 6 : previewMainDeck.length <= 21 ? 7 : 8;
  const rowsPreviewMainDeck =
  Math.ceil(previewMainDeck.length / columnsPreviewMainDeck);

  const previewRunes = runes.filter((objeto, indice, array) =>
    array.findIndex(o => o.id === objeto.id) === indice
  );
  const previewSideDeck = sideDeck.filter((objeto, indice, array) =>
    array.findIndex(o => o.id === objeto.id) === indice
  );

  const exportDeck = ({
    legendary,
    champion,
    mainDeck,
    sideDeck,
    runes,
    battlefields
  }) => {
  const data =  JSON.stringify({
    legendary,
    champion,
    mainDeck,
    sideDeck,
    runes,
    battlefields
  }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    // 👇 NOMBRE DEL ARCHIVO
    a.download = `riftbound-deck-${legendary?.name ?? "sin-legenda" }-${legendary.tags.join("-")}.json`;

    a.click();

    URL.revokeObjectURL(url);

  };  

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        console.log("DECK IMPORTADO:", data); // 👈 CLAVE

        if (!data.legendary || !Array.isArray(data.mainDeck)) {
          throw new Error("Formato inválido");
        }

        setLegendary(data.legendary ?? null);
        setChampion(data.champion ?? null);
        setMainDeck(data.mainDeck ?? []);
        setSideDeck(data.sideDeck ?? []);
        setRunes(data.runes ?? []);
        setBattlefields(data.battlefields ?? []);
      }catch (err) {
        console.error("ERROR IMPORTANDO DECK:", err);
        alert(err.message || "Error al importar el deck");
      }
    };

    reader.readAsText(file);
  };

  


  return (
    <div className={styles.previewContainer}>
      <span>-----PREVIEW RIFTBOUND-----</span>
      <label for="deckValue">Deck Value:</label>
      <input id="deckValue" type='text' onChange={(e)=>setDeckValue(e.target.value)} value={deckValue}/>

      <label for="deckTitle">Deck Title</label>
      <input id="deckTitle" type='text' onChange={(e)=>setDeckTitle(e.target.value)} value={deckTitle}/>
      
      <label for="deckTier">Deck Tier</label>
      <input list="selectTier" id="deckTier" onChange={(e)=>setDeckTier(e.target.value)} value={deckTier}/>
      
      <datalist id="selectTier">
        <option value="S">S</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </datalist>

      <section className={styles.infographic} ref={refInfografia}>
        {
          Object.keys(legendary || {}).length &&
        <div className={styles.containerBackground}>
          <img className={`${styles.imgBackground} imgBackground` } src={urlBackendCard(legendary.id)} alt={legendary?.name}></img>
        </div>
        }
      
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.containerTier}>
            <img className={styles.tierImg} src={`/Tier-${deckTier}.png`} alt=""/>
          </div>
          <div className={styles.containerTitle}>
            <span className={styles.titleText}>{deckTitle}</span>
          </div>
          <div className={styles.deckValueContainer}>
            <span className={styles.deckValue}>Deck Value: {deckValue}</span>
          </div>
        </header>
        <div className={styles.bodyMain}>
          <div className={styles.bodyMainInner}>
            <div className={styles.firstLayerCard}>
              {/* Legend */}
              {
                Object.keys(legendary || {}).length &&
                <div className={styles.cardContainer}>
                  <img className={styles.card} src={urlBackendCard(legendary.id)} alt={legendary?.name} />
                </div>
              }
              {/* Champions */}
              {
                Object.keys(champion || {}).length &&
                <div className={styles.cardContainer}>
                  <img  className={styles.card} src={urlBackendCard(champion.id)} alt={champion?.name} />
                </div>
              }

              {/* Runes */}
              {previewRunes.map((card, i) => (
                <div key={card.id} className={styles.cardContainer}>
                  <NumberOfCards number={runes?.filter(searchCard => searchCard.id === card.id).length}/>
                  <img  className={styles.card} key={i} src={urlBackendCard(card.id)} alt={card.name} />
                </div>
              ))}
              {/* battlefields */}
              {/* {battlefields.map((card, i) => (
                <div key={card.id} className={`${styles.cardContainer} ${styles.battlefieldContainer}`}>
                <img  className={styles.battlefieldCard} key={i} src={card.art.thumbnailURL} alt={card.name} />
                </div>
                ))} */}
            </div>
          </div>

        </div>
          {/* Body 1 – Main Deck */}
          <div className={styles.mainDeckContainer} style={{"--columnsPreviewMainDeck": columnsPreviewMainDeck, "--rowsPreviewMainDeck":rowsPreviewMainDeck}}>
            {previewMainDeck.map((card, i) => (
              <div key={card.id} className={`${styles.cardContainer} ${styles.cardContainerMainDeck}`}>
                <NumberOfCards number={mainDeck?.filter(searchCard => searchCard.id === card.id).length } isInPreview={true}/>
                <img  className={styles.card} src={urlBackendCard(card.id)} alt={card.name} />
              </div>
            ))}
          </div>



        {/* Body 2 – Side Deck */}
        {/* <div className={styles.sideDeckContainer}>
          {previewSideDeck.map((card, i) => (
            <div key={card.id}  className={`${styles.cardContainer} ${styles.cardContainerMainDeck}`}>
              <NumberOfCards number={sideDeck?.filter(searchCard => searchCard.id === card.id).length}/>
              <img className={styles.card} src={card.art.thumbnailURL} alt={card.name} />
            </div>
          ))}
        </div> */}

        {/* Stats */}
        {/* <div className={styles.statsContainer}>
          <DeckStats cards={mainDeck} />
        </div> */}


        {/* Footer 2 – Logos */}
        <footer className={styles.footer}>
          <div>
            <img src="/Jupeson_LOGO_Sin_Publicidad_Sin_Bordes.png" />
          </div>
          <div>
            <img src="/textoGuiadeparcheSinEspacios.png" />
          </div>
          <div>
            <img src="/riftbound/logo/RiftboundLogo.png" />
          </div>
        </footer>
      </section>

      {/* Exportar */}
        <button
          onClick={() => {
            const json = exportDeck({
              legendary,
              champion,
              mainDeck,
              sideDeck,
              runes,
              battlefields
            });

            navigator.clipboard.writeText(json);
            alert("Deck copiado al portapapeles");
          }}
        >
          Exportar Deck
        </button>
        {/* Importar */}
        <input
          type="file"
          accept="application/json"
          id="import-deck"
          style={{ display: "none" }}
          onChange={handleImportFile}
        />

        <button onClick={() => document.getElementById("import-deck").click()}>
          Importar Deck
        </button>
        {/*Capturar Imagen */}
         <button
          onClick={() =>
            CapturarImagen({
              backgroundRef: refInfografia,
              nombre: `Riftbound-${deckTitle}`,
            })
          }
        >
          📸 Capturar Imagen
        </button>
      </div>
  );
}