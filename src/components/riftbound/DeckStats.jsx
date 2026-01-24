import styles from "./css/DeckStats.module.css"
export default function DeckStats({ cards }) {
  const stats = cards.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    acc.cost[c.stats.cost] = (acc.cost[c.stats.cost] || 0) + 1;
    return acc;
  }, { cost: {} });

  return (
    <div className={styles.containerDeckStats}>
      <p>Units: {stats.Unit || 0}</p>
      <p>Spells: {stats.Spell || 0}</p>
      <p>Gear: {stats.Gear || 0}</p>

      {/* Mini chart simple */}
      {Object.entries(stats.cost).map(([cost, count]) => (
      <div key={cost}>Coste {cost}: {count}</div>
      ))}
    </div>
  );
}