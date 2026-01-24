import { DECK_RULES } from '@stores/dataRiftbound';
//import styles from './css/CardSelector.module.css';
const styles = {}

// Componente exclusivo para manejar el Side Deck
export default function SideDeck({ cards, sideDeck, setSideDeck }) {
  const handleAdd = (card) => {
    if (sideDeck.length >= DECK_RULES.SIDE_DECK_SIZE) return;

    const copies = sideDeck.filter(c => c.id === card.id).length;
    if (copies >= DECK_RULES.MAX_COPIES) return;

    setSideDeck([...sideDeck, card]);
  };


  const handleRemove = (card) => {
    const index = sideDeck.findIndex(c => c.id === card.id);
    if (index === -1) return;


    const copy = [...sideDeck];
    copy.splice(index, 1);
    setSideDeck(copy);
  };


  return (
    <section>
      <h3>Side Deck ({sideDeck.length}/{DECK_RULES.SIDE_DECK_SIZE})</h3>
      <div className={styles.grid}>
        {cards.map(card => (
        <div 
          key={card.id} 
          className={styles.card}
          onClick={() => handleAdd(card)}
          >
            <span 
						className={styles.numbersOfCards}
						onClick={(e) => {
                e.stopPropagation()
                handleRemove(card)
              }}
						>{sideDeck?.filter(searchCard => searchCard.id === card.id).length}</span>
          <img src={card.art.thumbnailURL} alt={card.name} />
          <button onClick={() => handleAdd(card)}>+</button>
          <button onClick={() => handleRemove(card)}>-</button>
        </div>
        ))}
      </div>
    </section>
  );
}