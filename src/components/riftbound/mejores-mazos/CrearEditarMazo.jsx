import styles from "./CrearEditarMazo.module.css"
import { CapturarImagen } from "@functions/CapturarImagen";
import AddCard from "./AddCard";
const CrearEditarMazo = ({setRefrescar, urlCarta, mazo, setMazo, allCards, backgroundRefCrear, setCartasNoEncontradas, cartasNoEncontradas})=>{



  const guardarMazo = async (mazo)=>{
    try{
      await fetch("https://api.guiadeparche.com/riftbound/guardarMazo.php",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mazo),
      });
    }catch(error){
      console.log(error);
    }
  
  }

  const handleParseDeckText = async () => {
    const element = document.getElementById("codigo");
    
    const text = element.value
    if (!text) return;

    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    console.log({lines})

    const result = {
      legend: null,
      champion: null,
      mainDeck: [],
      sideboard: [],
      battlefields: [],
      runes: [],
      code: text
    };

    let currentSection = null;
    const noEncontradas = [];

    for (let line of lines) {

      if (line.endsWith(":")) {
        currentSection = line.replace(":", "").toLowerCase();
        continue;
      }

      const match = line.match(/^(\d+)\s+(.+)$/);
      if (!match) continue;

      const quantity = parseInt(match[1]);
      let fullName = match[2];
      let name = fullName;

      // Si contiene coma → quitar tag
      if (fullName.includes(",")) {
        const parts = fullName.split(",");
        name = parts[1].trim();
      }
      const findCard = allCards.find(card => card.name === name || card.name === fullName);

      if(findCard){
          const cardCopy = {
            ...findCard,
            art: {
              ...findCard.art,
              nuevaThumbnailURL: urlCarta(findCard.id.toUpperCase().replace(/-[^-]*$/, ""))
            },
            quantity
          };
  
        switch (currentSection) {
          case "legend":
            result.legend = cardCopy;
            break;
  
          case "champion":
            result.champion = cardCopy;
            break;
  
          case "maindeck":
            result.mainDeck.push(cardCopy);
            break;
  
          case "sideboard":
            result.sideboard.push(cardCopy);
            break;
  
          case "battlefields":
            result.battlefields.push(cardCopy);
            break;
  
          case "runes":
            result.runes.push(cardCopy);
            break;
  
          default:
            break;
        }
      }else{
        console.log("Carta no encontrada en la base de datos")
        console.log({name, fullName})
        if (!noEncontradas.includes(fullName)) {
          noEncontradas.push(fullName);
        }
      }
    }
    setCartasNoEncontradas(noEncontradas);
    setMazo(()=>({...result, tier: mazo.tier}));
  };

  return (
    <div className={styles.formulario}>
      <textarea
        placeholder="Pega aquí el Export Text"
        rows={12}
        
        id="codigo"
        value={mazo.value}
      />
      <input 
        type={"button"} 
        value="Actualizar Cartas Del Mazo"
        onClick={() => handleParseDeckText()}
        className={styles.btnVerde}
        />
      <select
        name="tiers" 
        id="tiers"
        onChange={(e)=>{
          setMazo((oldData)=>{return {...oldData, tier: e.target.value }})
        }}
        >
        <option value="S">S</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
      <input 
        type="text" 
        placeholder="Nombre del mazo" 
        value={mazo?.nombre || ""}
        onChange={(e)=>{
          setMazo((oldData)=>{return {...oldData, nombre: e.target.value }})
        }}
        />
      <input 
        type="text" 
        placeholder="Coste del mazo" 
        value={mazo?.coste || ""}
        onChange={(e)=>{
          setMazo((oldData)=>{return {...oldData, coste: e.target.value }})
        }}
        />
      <input 
        type="button" 
        onClick={(e) => {
          guardarMazo(mazo);
        }}
        value="Guardar mazo"
        className={styles.btnVerde}
      />
       <input 
        type="button" 
        onClick={(e) => {
          CapturarImagen({backgroundRef: backgroundRefCrear, nombre:"Riftbound"});
        }}
        value="Capturar Imagen"
        className={styles.btnAmarillo}
      />
      <AddCard setRefrescar={setRefrescar}cartasNoEncontradas={cartasNoEncontradas} urlCarta={urlCarta} handleParseDeckText={handleParseDeckText}></AddCard>
    </div>
  )
}

export default CrearEditarMazo