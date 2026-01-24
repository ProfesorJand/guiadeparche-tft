import CardSelector from './CardSelector';
import BattlefieldSelector from './BattlefieldSelector';
import SideDeck from './SideDeck';
import styles from './css/DeckForm.module.css';
import RuneSelector from './RuneSelector';
import { useEffect, useState } from 'react';
import { isFactionCompatible, DECK_RULES } from '@stores/dataRiftbound';


export default function DeckForm({
  allCards,
  legendary,
  setLegendary,
  champion,
  setChampion,
  runes,
  setRunes,
  battlefields,
  setBattlefields,
  mainDeck,
  setMainDeck,
  sideDeck,
  setSideDeck,
  }) {

  const pestanaValues = [
    "Leyend",
    "Champion",
    "Runes",
    "Battlefield",
    "Cards",
    "Side Deck"
  ]

  const [pestana, setPestana] = useState(0);


  useEffect(()=>{

    if(legendary !== null && Object?.keys(legendary)?.length) {
      setPestana(1)
    }
    console.log({champion})
    console.log({revisarLog:champion?.length > 0 && legendary?.tags.some((name)=> champion?.tags.includes(name))})
    if(champion?.id && legendary?.tags.some((name)=> champion?.tags.includes(name))){
      setPestana(2)
    }
    if(runes?.length >= 12){
      setPestana(3)
    }
    if(battlefields?.length >= 3){
      setPestana(4)
    }
    console.log({mainDeck:mainDeck.length})
    if(mainDeck?.length >= DECK_RULES.MAIN_DECK_SIZE ){
      setPestana(5)
    }
    if(sideDeck?.length >= 8){
      setPestana(null)
    }

  },[legendary, runes, champion, battlefields, sideDeck, mainDeck ])

  useEffect(()=>{
    console.log({legendary})
    console.log({champion})
    console.log({mainDeck})
  },[mainDeck, legendary, champion])

  return (
    <section className={styles.form}>
      {
        pestanaValues.map((p, i)=>{
          return (
            <input
              key={p}
              type='button'
              value={p}
              onClick={()=> setPestana(i)}
            />
          )
        })
      }
      {/* Selección de Legendaria */}
      {
        pestana === 0 &&
        <>
          <h3>Legendaria</h3>
          <CardSelector
            cards={allCards.filter(c => c.type === 'Legend')}
            onSelect={setLegendary}
            legendary={legendary}
            champion={champion}
            setPestana={setPestana}
            toChooseLegend={true}
            setDeck={setMainDeck}
            deck={mainDeck}
            isFactionCompatible={isFactionCompatible}
            />
        </>
      }
      {
        legendary && 
        <>
          {
            pestana === 1 &&
            <>
              <h3>Choose 1 Champion</h3>
              <CardSelector
              cards={allCards.filter(c => c.type === "Unit" && legendary.faction.includes(c.faction) && legendary.tags.some(tag => c.tags?.includes(tag)))}
              deck={mainDeck}
              setDeck={setMainDeck}
              legendary={legendary}
              champion={champion}
              toChooseChampion={true}
              onSelect={setChampion}
              />
            </>
          }

          {
            pestana === 2 &&
            <>
              <h3>Runes</h3>
              <RuneSelector
                cards={allCards.filter(c => c.type === 'Rune' && legendary.faction.includes(c.faction))}
                setRunes={setRunes}
                runes={runes}
                />
            </>
          }

          {
            pestana === 3 &&
            <>
              <h3>Battlefields</h3>
              <BattlefieldSelector
                cards={allCards.filter(c => c.type === 'Battlefield')}
                setBattlefields={setBattlefields}
                battlefields={battlefields}
                />
            </>
          }

          {
            pestana === 4 &&
            <>
              {/* Cartas del Deck Principal */}
              <h3>Deck Principal {`${mainDeck.length} / ${DECK_RULES.MAIN_DECK_SIZE}`}</h3>
              <CardSelector
                cards={allCards.filter(c => legendary.faction.includes(c.faction) && c.type !== 'Rune' && c.type !== 'Legend')}
                deck={mainDeck}
                setDeck={setMainDeck}
                legendary={legendary}
                />
            </>
          }

          {
            pestana === 5 &&
            <>
              {/* Side Deck */}
              <SideDeck
                cards={allCards.filter(c => legendary.faction.includes(c.faction) && c.type !== 'Rune' && c.type !== 'Legend')}
                sideDeck={sideDeck}
                setSideDeck={setSideDeck}
                legendary={legendary}
                />
            </>
          }
        </>
      }
    </section>
  );
}