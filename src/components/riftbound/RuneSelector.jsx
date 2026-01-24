import styles from './css/CardSelector.module.css';
import { DECK_RULES } from '@stores/dataRiftbound';


// Selector exclusivo para Runas
export default function RuneSelector({ cards, runes = [], setRunes, legendary }) {
  const handleAdd = (rune) => {
    if (runes.length >= DECK_RULES.MAX_SIZE_RUNES) return;

    const copies = runes.filter(r => r.id === rune.id).length;

    setRunes([...runes, rune]);
  };

  const handleRemove = (rune) => {
    const index = runes.findIndex(r => r.id === rune.id);
    if (index === -1) return;


    const copy = [...runes];
    copy.splice(index, 1);
    setRunes(copy);
  };


  return (
    <section>
      <h3>Runas ({runes.length}/{DECK_RULES.MAX_SIZE_RUNES})</h3>
      <div className={styles.grid}>
        {cards.map(rune => (
          <div
            key={rune.id} 
            className={styles.card}
            onClick={() => handleAdd(rune)}
          >
            <span 
              className={styles.numbersOfCards}
              onClick={(e) => {
                e.stopPropagation()
                handleRemove(rune)
              }}
            >{runes?.filter(searchCard => searchCard.id === rune.id).length}</span>
            <img src={rune.art.thumbnailURL} alt={rune.name}  className={styles.cardImage}/>
          </div>
        ))}
      </div>
    </section>
  );
}