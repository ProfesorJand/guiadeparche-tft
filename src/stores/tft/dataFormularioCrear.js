import { deepMap, atom, task } from "nanostores";
export const dificultades = {
  Es: ["Facil", "Medio", "Dificil"],
  En: ["Easy", "Medium", "Hard"]
};

const prioCostes = {
  Es: ["Coste 1", "Coste 2", "Coste 3", "Coste 4", "Coste 5"],
  En: ["Cost 1", "Cost 2", "Cost 3", "Cost 4", "Cost 5"]
};
const cuandoRolearas = {
  Es: ["Roll Lv4 y Lv5", "Roll Lv5", "Roll Lv5 y Lv6", "Roll Lv6", "Roll Lv7", "Roll Lv8", "Roll Lv8 y Lv9", "Roll Lv9"],
  En: ["Roll Lv4 & Lv5", "Roll Lv5", "Roll Lv5 & Lv6", "Roll Lv6", "Roll Lv7", "Roll Lv8", "Roll Lv8 & Lv9", "Roll Lv9"]
};
const rondaRolls = {
  Es: [
    "Rocas y Soft Roll Fase 3 del Coste 1",
    "Fase 3 ronda 2 estabilizar 2 estrellas del Coste 2",
    "Fase 3 Ronda 5 estabilizar 2 estrellas del Coste 3",
    "Fase 4 ronda 2, estabilizar 2 estrellas del Coste 4"],
  En: [
    "2-5 neutrals & Soft Roll Stage 3 Cost 1",
    "Phase 3 round 2 stabilize w 2-star 2-cost",
    "Phase 3 Round 5 stabilize w 2-star 3-cost",
    "Phase 4 round 2, stabilize w 2-star 4-cost"
  ]
};
const rachaTipos = {
  Es: ["Racha de Victorias", "Racha de Derrotas"],
  En: ["Win Streak", "Loss Streak"]
};
export const categorias = {
  Es: ["Fast 8", "3 Estrellas", "Fast 9"],
  En: ["Fast 8", "3 Stars", "Fast 9"]
};
export const dioses = ["Thresh", "Yasuo", "Ahri", "Evelynn", "Kayle", "Aurelion Sol", "Soraka", "Ekko", "Varus"]
const tempo = {
  Es: ["Agresivo / Slam", "Open fort / Salvar HP"],
  En: ["Aggressive / Slam", "Open fort / Save HP"]
}
export const tiers = ["S", "A", "B", "C", "D"];
export const tiersExtras = ["N/A", "H", "X"]
export const dañoTipo = {
  Es: ["AD", "AP", "Híbrido"],
  En: ["AD", "AP", "Hybrid"]
}
const aumentosTipo = {
  Es: ["Economía", "Combate", "Items", "Emblemas"],
  En: ["Economy", "Combat", "Items", "Emblems"]
}

const defaultValuesComposicionTFT = {
  id: null,
  version: "pbe",
  ocultar:false,
  nombre: "",
  tier:"S",
  tierExtra:"N/A", // H o X
  posicion:1,
  dificultad: dificultades.Es[0],
  categoria: categorias.Es[1],
  campeonMeta:{ // Tier List Champ
    apiNameCampeon:"",
    apiNameItemsDelCampeon:[],
    estrellas:undefined,
    aumento:"",
    emblema:"",
  },
  tipoDeDaño:dañoTipo.Es[0],

  niveles:[
    {
      lv:5,
      etapa:2,
      ronda:5,
      roll:false, // debe rollear en ese lv con etapa y ronda?
      campeones:[{
        apiNameCampeon:"",
        estrella:1,
        apiNameItemsDelCampeon:[],
      }],
    },// opcion de añadir mas niveles
  ],
  itemsPrio:[], // apiNameItems
  // bestRadiants:[], // por ahora no se muestra radiante
  posicionamiento:[
    {
      nombre:"Compo Final Base",
      // lv:8, // por ahora no es necesario
      tablero:[ // todos los campeones del tablero
        {
          fila:1,
          col:1,
          apiNameCampeon:"",
          apiNameItemsDelCampeon:[],
          estrella:1,
          sinergiaExtraMissFortune:"",
        }
      ]
      
    }// opcion de añadir mas posicionamientos
  ],
  ordenPrioridadAumentos:[],//econ, items, combat, emblems // se puede colocar mas de 1
  tipSEO:"",
  urlSEO:"",
  campeonesEarly:[
    {
      apiNameCampeon:"",
      apiNameItemsDelCampeon:[],
    }
  ], // masterplan
  dioses:[], // 3 Fijos // masterplan
  bestBuild:[{
    apiNameCampeon: "",
    apiNameItemsDelCampeon: [],
  }],
  condiciones:[{
    apiNameGrande:"",
    apiNamePequeno:"",
  }], // masterplan
  aumentos:[
    {
      apiNameGrande:"",
      apiNamePequeno:"",
    }
  ],
  encuentros:[
    
  ], // intentar 3 o 4 o Texto como Tips // masterplan
  
}

// Función para obtener una copia limpia y profunda de los valores por defecto (evita mutación de referencias)
export const obtenerValoresPorDefecto = () => {
  return JSON.parse(JSON.stringify(defaultValuesComposicionTFT));
};

// Inicializamos el store atom con los valores por defecto clonados
export const composicionTFT = atom(obtenerValoresPorDefecto());

/**
 * Función para actualizar el estado del formulario.
 * Puede recibir un objeto con los nuevos campos a mezclar,
 * o una función callback para actualizaciones más complejas (similar a React setState).
 * 
 * @param {Object|Function} updater - Objeto con valores a mezclar o callback (prev) => nuevoEstado
 */
export const actualizarComposicionTFT = (updater) => {
  if (typeof updater === "function") {
    composicionTFT.set(updater(composicionTFT.get()));
  } else {
    composicionTFT.set({
      ...composicionTFT.get(),
      ...updater
    });
  }
};

// Función para reiniciar todos los valores al estado por defecto original
export const reiniciarComposicionTFT = () => {
  composicionTFT.set(obtenerValoresPorDefecto());
};

composicionTFT.listen((newValue, oldValue) => {
  console.log({newValue, oldValue})
})

