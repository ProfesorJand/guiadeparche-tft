import { useEffect, useState } from "react";
import styles from "./AddCard.module.css"
const AddCard = ({setRefrescar, cartasNoEncontradas, urlCarta, handleParseDeckText})=>{
  const [infoCarta, setInfoCarta] = useState({
    art:{}, 
    stats:{},
  });
  const typeCard=["Legend","Battlefield", "Unit", "Spell", "Gear"];
  const rarity = ["Showcase", "Common", "Uncommon", "Rare", "Epic", "Overnumber", "Alternate Art", "Signed"]
  const faction = ["Fury", "Calm", "Mind", "Body", "Chaos", "Order"];
  const setNames = {
    ogs:"Proving Grounds",
    ogn:"Origins",
    sfd:"Spiritforge"
  }
  
 const añadirCarta = async (infoCarta) => {
  try {
    
    const response = await fetch("https://api.guiadeparche.com/riftbound/addCard.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoCarta),
    });

    const data = await response.json();
    console.log({data})
    if (data.success) {
      alert("Carta guardada correctamente 🔥");
      setRefrescar((prev)=>!prev);
    } else {
      alert("Error: " + data.message);
    }

  } catch (error) {
    console.error("Error al guardar:", error);
    alert("Error de conexión con el servidor");
  }
};

  useEffect(()=>{
    console.log({infoCarta})
  },[infoCarta])

const handleChangeOption = ({ option, value }) => {
  setInfoCarta((prev) => {
    const keys = option.split(".");
    
    // Clonamos el objeto raíz
    const newState = { ...prev };
    
    // Referencia temporal para recorrer el objeto
    let current = newState;

    // Recorremos todas las keys excepto la última
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }

    // Asignamos el valor final
    current[keys[keys.length - 1]] = value;

    return newState;
  });
};
  return (
    <div className={styles.container}>
      {/* ID */}
      <p>Formulario Crear Carta</p>
      {cartasNoEncontradas.length > 0 && (
        <div className={styles.containerCartasNoEncontradas}>
          <p>Cartas no encontradas:</p>
          <ul>
            {cartasNoEncontradas.map((carta, i) => (
              <li key={i}>{carta}</li>
            ))}
          </ul>
        </div>
      )}
      <label>ID
        <input 
          type="text" 
          value={infoCarta?.id}
          placeholder="sfd-215-221"
          onChange={(e)=>{
            handleChangeOption({option:"id",value:e.target.value.toLowerCase()})
          }}
          />
      </label>
      {/* SET */}
      <label>SET
        <select 
          value={infoCarta?.set?.toUpperCase()}
          onChange={(e)=>{
            handleChangeOption({option:"set",value:e.target.value.toUpperCase()})
          }}
          >
          {
            Object.keys(setNames).map((set, i)=>{
              return(
                <option key={i} value={set?.toUpperCase()}>{`${set?.toUpperCase()} - ${setNames[set]}`}</option>
              )
            })
          }
        </select>
      </label>
      {/* NOMBRE */}
      <label>NOMBRE
        <input 
          type="text" 
          value={infoCarta?.name}
          placeholder="Añade coma (,) para saltos de lineas"
           onChange={(e)=>{
            handleChangeOption({option:"name",value:e.target.value})
          }}
          />
      </label>
      {/* TYPE */}
      <label>TIPO
        <select 
          value={infoCarta?.type}
          placeholder="Battlefield, Unit, Legend"
          onChange={(e)=>{
            handleChangeOption({option:"type",value:e.target.value})
          }}
          >
          {
            typeCard.map((type, i)=>{
              return(
                <option key={i} value={type}>{type}</option>
              )
            })
          }
        </select>
      </label>
      {/* Imagen URL */}
      <label>Url Imagen
        <input 
          type="text" 
          value={infoCarta?.art?.nuevoThumbnailURL} 
          placeholder="URL Imagen"
          onChange={(e)=>{
            handleChangeOption({option:"art.nuevoThumbnailURL",value:e.target.value})
          }}
          />
      </label>
      {/* FACTION */}
      <label>FACCIÓN
        <select 
          multiple={true}
          size={6}
          value={infoCarta?.faction}
          placeholder="Fury, Calm..."
          onChange={(e)=>{
            const selectedOptions = e.target.selectedOptions;
            const values = Array.from(selectedOptions, (option)=>option.value)
            handleChangeOption({option:"faction",value:values})
          }}
          >
          {
            faction.map((type, i)=>{
              return(
                <option key={i} value={type}>{type}</option>
              )
            })
          }
        </select>
      </label>
      {/* RARITY */}
      <label>RAREZA
        <select 
          value={infoCarta?.rarity}
          placeholder="Common, Rare,..."
          onChange={(e)=>{
            const selectedOptions = e.target.selectedOptions;
            const values = Array.from(selectedOptions, (option)=>option.value)
            handleChangeOption({option:"rarity",value:values})
          }}
          >
          {
            rarity.map((type, i)=>{
              return(
                <option key={i} value={type}>{type}</option>
              )
            })
          }
        </select>
      </label>
      {/*STATS */}

      <input type="text" value={infoCarta?.stats?.energy} onChange={(e)=>{handleChangeOption({option:"stats.energy",value:Number(e.target.value)})}} placeholder="Energy"/>
      <input type="text" value={infoCarta?.stats?.power} onChange={(e)=>{handleChangeOption({option:"stats.power",value:Number(e.target.value)})}} placeholder="Power"/>
      <input type="text" value={infoCarta?.stats?.might} onChange={(e)=>{handleChangeOption({option:"stats.might",value:Number(e.target.value)})}} placeholder="Might"/>
      <input type="text" value={infoCarta?.stats?.cost} onChange={(e)=>{handleChangeOption({option:"stats.cost",value:Number(e.target.value)})}} placeholder="Cost (Dinero)"/>
      
      


      <input 
        type="button" 
        value="Guardar Carta"
        onClick={async ()=>{
          await añadirCarta(infoCarta);
          await handleParseDeckText();
        }}
        className={styles.btnVerde}
        />
    </div>
  )
}

export default AddCard;