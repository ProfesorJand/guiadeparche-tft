import dataRiftboundCards from "@json/riftbound/data_nov_2025.json"
// Todas las reglas del mazo en un solo lugar
export const DECK_RULES = {
	MAIN_DECK_SIZE: 39,
	SIDE_DECK_SIZE: 8,
	MAX_COPIES_BATTEFIELDS: 1,
	BATTLEFIELD_DECK_SIZE: 3,
	MAX_COPIES: 3,
	MAX_SIZE_RUNES: 12,
};


// Verifica si se puede agregar una carta
// Verifica si se puede agregar una carta (solo validación)
export function canAddCard({
  card,
  deck,
  legendary,
  champion,
  toChooseChampion = false,
  toChooseLegend = false
}) {

  // 🧱 tamaño máximo del mazo
  if (deck.length >= DECK_RULES.MAIN_DECK_SIZE) {
		console.log("canAddCard es FALSE")
    return false;
  }

  // 📌 máximo de copias
  const copies = deck.filter(c => c.id === card.id).length;
  if (copies >= DECK_RULES.MAX_COPIES) {
		console.log("canAddCard es FALSE")
    return false;
  }

  // 🟣 eligiendo legendaria → solo Legends
  if (toChooseLegend && card.type !== "Legend") {
		console.log("canAddCard es FALSE")
    return false;
  }

  // 🟢 eligiendo champion → solo Units
  if (toChooseChampion && card.type !== "Unit") {
		console.log("canAddCard es FALSE")
    return false;
  }

  // 🧩 Champion debe ser compatible con la legend existente
  if (toChooseChampion && legendary) {
		console.log(`canAddCard es ${isFactionCompatible(card, legendary)}`)
    return isFactionCompatible(card, legendary);
  }

	console.log("CanAddCart ultimo true")
  return true;
}

export const isFactionCompatible = (cardA, cardB) => {
	if (!cardA?.faction || !cardB?.faction) return true;
		console.log("tiene facciones diferentes")
		console.log({cardA:cardA.faction})
		console.log({cardB:cardB.faction})
	const factionsA = Array.isArray(cardA.faction)
		? cardA.faction
		: [cardA.faction];

	const factionsB = Array.isArray(cardB.faction)
		? cardB.faction
		: [cardB.faction];

	console.log({factionsA, factionsB})
	console.log({resultadoFaction: factionsA.some(faction => factionsB.includes(faction))})

	return factionsA.some(faction => factionsB.includes(faction));
};

export function canAddBattlefield({card, battlefields}) {
	// Máximo de copias
	const copies = battlefields.filter(c => c.id === card.id).length;

	if (copies >= DECK_RULES.MAX_COPIES_BATTEFIELDS ) return false;

	return true
}

export async function getDataRiftboundCards(){
	return dataRiftboundCards
} 

export function exportDeck({ legendary, mainDeck, sideDeck, battlefields }) {
return JSON.stringify({ legendary, mainDeck, sideDeck, battlefields });
}


export function importDeck(json) {
return JSON.parse(json);
}