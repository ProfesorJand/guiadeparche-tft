import { canAddCard } from '@stores/dataRiftbound';
import styles from './css/CardSelector.module.css';
import { useState, useEffect } from 'react';

export default function CardSelector({
  cards,
  deck = [],
  setDeck,
  legendary,
  champion,
  setChampion,
  onSelect,
  toChooseChampion = false,
  toChooseLegend = false,
  isFactionCompatible
}) {

  const [contextMenu, setContextMenu] = useState(null);
  const [previewCard, setPreviewCard] = useState(null);

  const handleAdd = (card) => {

    if (
      !canAddCard({
        card,
        deck,
        legendary,
        champion,
        toChooseChampion,
        toChooseLegend
      })
    ) return;

    // 🟣 SELECCIÓN DE LEGENDARIA
    if (toChooseLegend) {
			console.log("toChooseLegend If")
      // quitar legend previa + cartas incompatibles
			console.log("quitar legend previa + cartas incompatibles")
			console.log({VerAca:champion, verCa:!isFactionCompatible(champion,card)})
      // validar champion actual
      if (champion && !isFactionCompatible(champion, card)) {
				
				setChampion(null);
      }
			setDeck(cardsInDeck =>
				cardsInDeck.filter(c =>
					c.type !== "Legend" &&
					isFactionCompatible(c, card)
				)
			);

      onSelect(card);
      return;
    }

    // 🟢 SELECCIÓN DE CHAMPION
    if (toChooseChampion) {
      // setDeck(cardsInDeck => [...cardsInDeck, card]);
      onSelect(card);
      return;
    }

    // ⚪ CARTAS NORMALES
    setDeck(cardsInDeck => [...cardsInDeck, card]);
  };

  const handleRemove = (card) => {
    setDeck(cardsInDeck => {
      const index = cardsInDeck.findIndex(c => c.id === card.id);
      if (index === -1) return cardsInDeck;

      const copy = [...cardsInDeck];
      copy.splice(index, 1);
      return copy;
    });

    if (toChooseChampion || toChooseLegend) {
      onSelect(null);
    }
  };

  useEffect(() => {
    const close = () => setContextMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <>
    <div className={styles.grid}>
      {cards?.length ? (
        cards.map(card => (
          <div
            key={card.id}
            className={[
              styles.card,
              legendary?.id === card.id ? styles.selectedCard : ""
            ].join(" ")}
            onClick={() => handleAdd(card)}
            onContextMenu={(e) => {
              e.preventDefault(); // ⛔ menú del navegador
              setContextMenu({
                x: e.clientX,
                y: e.clientY,
                card
              });
            }}
          >
            <span
              className={styles.numbersOfCards}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(card);
              }}
            >
              {deck.filter(c => c.id === card.id).length}
            </span>

            <img
              src={card.art.thumbnailURL}
              alt={card.name}
              className={styles.cardImage}
            />
          </div>
        ))
      ) : (
        <span>No hay cartas disponibles</span>
      )}
    </div>

    {/* 🔹 CONTEXT MENU (AFUERA DEL GRID) */}
    {contextMenu && (
      <div
        className={styles.contextMenu}
        style={{
          top: contextMenu.y,
          left: contextMenu.x
        }}
      >
        <button onClick={() => {
          handleAdd(contextMenu.card);
          setContextMenu(null);
        }}>
          ➕ Añadir al deck
        </button>

        <button onClick={() => {
          handleRemove(contextMenu.card);
          setContextMenu(null);
        }}>
          ➖ Quitar del deck
        </button>

        <button onClick={() => {
          setPreviewCard(contextMenu.card);
          setContextMenu(null);
        }}>
          🔍 Ver carta
        </button>
      </div>
    )}
    {previewCard && (
      <div className={styles.cardModal} onClick={() => setPreviewCard(null)}>
        <img src={previewCard.art.thumbnailURL} alt={previewCard.name} />
      </div>
    )}
  </>
  );
}
