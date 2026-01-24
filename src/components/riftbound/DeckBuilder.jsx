import { useState, useEffect } from 'react';
import DeckForm from './DeckForm';
import DeckPreview from './DeckPreview';
import { getDataRiftboundCards } from "@stores/dataRiftbound"
import styles from './css/DeckBuilder.module.css';
import Redirect from '@components/Redirect';

export default function DeckBuilder() {
  const admin = localStorage.getItem("user") || false;
  console.log({deckBuilderAdmin: admin})
  // Estado central del mazo
  const [legendary, setLegendary] = useState(null);
  const [battlefields, setBattlefields] = useState([])
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [allCards, setAllCards] = useState([])
  const [runes, setRunes] = useState([]);
  const [champion, setChampion] = useState(null)

  useEffect(()=>{
    const fetchingDatosRiftbound = async ()=>{
      const resultado = await getDataRiftboundCards()
      const allCards = resultado.sets.flatMap(set => set.cards);
      const getFactionKey = (card) => {
        if (Array.isArray(card.faction)) return card.faction[0];
        return card.faction ?? "";
      };
      allCards.sort((a, b) => {
        // 1️⃣ faction
        const factionCompare = getFactionKey(a).localeCompare(getFactionKey(b));
        if (factionCompare !== 0) return factionCompare;

        // 2️⃣ coste
        const costCompare = (a.stats?.cost ?? 0) - (b.stats?.cost ?? 0);
        if (costCompare !== 0) return costCompare;

        // 3️⃣ nombre
        return a.name.localeCompare(b.name);
      });
      setAllCards(()=>allCards)
    }
    fetchingDatosRiftbound()
  },[])

  useEffect(()=>{
    if(!admin){
      window.location.replace("https://guiadeparche.com");
    }
  },[admin])

  return (
    <div className={styles.container}>
      {/* Formulario de armado */}
      <DeckForm
        allCards={allCards}
        legendary={legendary}
        setLegendary={setLegendary}
        champion={champion}
        setChampion={setChampion}
        runes={runes}
        setRunes={setRunes}
        battlefields={battlefields}
        setBattlefields={setBattlefields}
        mainDeck={mainDeck}
        setMainDeck={setMainDeck}
        sideDeck={sideDeck}
        setSideDeck={setSideDeck}
      />


      {/* Infografía del mazo */}
      <DeckPreview
        legendary={legendary}
        champion={champion}
        battlefields={battlefields}
        mainDeck={mainDeck}
        sideDeck={sideDeck}
        runes={runes}
        setLegendary={setLegendary}
        setChampion={setChampion}
        setBattlefields={setBattlefields}
        setMainDeck={setMainDeck}
        setSideDeck={setSideDeck}
        setRunes={setRunes}
      />
    </div>
  );
}