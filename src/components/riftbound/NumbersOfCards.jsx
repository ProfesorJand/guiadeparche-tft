import styles from "./css/NumbersOfCards.module.css"
export default function NumberOfCards({number, isInPreview=false}){
  return (
    <div className={`${styles.containerNomberOfCards} ${isInPreview ? styles.containerNomberOfCardsInMainDeck : ""}`}>
      <span className={`${styles.numbersOfCards} ${isInPreview ? styles.resizeNombersOfCards : ""} `}>x{number}</span>
    </div>
  )
}