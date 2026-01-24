import { canAddBattlefield } from '@stores/dataRiftbound';
import { useEffect } from 'react';
import styles from './css/CardSelector.module.css';

export default function BattlefieldSelector({ cards, battlefields, setBattlefields }) {
	const handleAdd = (card) => {
		if (!canAddBattlefield({card, battlefields})) return;
		setBattlefields([...battlefields, card]);
	};

	const handleRemove = (card) => {
		const index = battlefields.findIndex(c => c.id === card.id);
		if (index === -1) return;
		const copy = [...battlefields];
		copy.splice(index, 1);
		setBattlefields(copy);
	};

	const handlerBtn = (card)=>{
		const index = battlefields.findIndex(c => c.id === card.id);
		if (index === -1) {
			handleAdd(card)
		}else{
			handleRemove(card)	
		}
	}

	return (
		<div className={styles.grid}>
			{cards.map(card => (
				<div key={card.id} className={`${styles.card} ${styles.battlefieldCardSelector}`} onClick={() => handlerBtn(card)}>
					<img className={styles.cardImage} src={card.art.thumbnailURL} alt={card.name} />
				</div>
			))}
		</div>
	);
}