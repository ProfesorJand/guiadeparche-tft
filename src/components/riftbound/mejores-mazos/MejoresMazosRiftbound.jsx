import styles from "./MejoresMazosRiftbound.module.css"
import { useState, useEffect, useRef } from "react";
import { getDeckFromCode } from "@piltoverarchive/riftbound-deck-codes";
import { getDataRiftboundCards } from "@stores/dataRiftbound";
import CrearEditarMazo from "./CrearEditarMazo";
import Mazo from "./Mazo.jsx"
const MejoresMazosRiftbound = ()=>{
  const admin = localStorage.getItem("user") || false;
  const [mazo, setMazo] = useState({tier:"S"});
  const [allCards, setAllCards] = useState([]);
  const [cartasNoEncontradas, setCartasNoEncontradas] = useState([]);
  const backgroundRefCrear = useRef(null);
  const [refrescar, setRefrescar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const urlCarta = (code) => {
    const b = code.slice(0, -1)
    const last = code.at(-1).toLowerCase();
    const url = `https://cdn.piltoverarchive.com/cards/${b+last}.webp`
    console.log({url})
    return url
  }

  useEffect(() => {
    console.log(mazo);
    const gettingDataRiftboundCards = async()=>{
      const data = await fetch("https://api.guiadeparche.com/riftbound/data_nov_2025.json",{cache: 'no-store'});
      const res = await data.json();
      const allCardsInJson = res.sets.flatMap(set => set.cards);
      console.log({allCardsInJson})
      setAllCards(allCardsInJson);
    }
    gettingDataRiftboundCards();
  }, [mazo, refrescar]);

  useEffect(()=>{
    // const gettingRiftboundMeta = async ()=>{
    //   const data = await fetch("https://api.guiadeparche.com/riftbound/data_nov_2025.json",{cache: 'no-store'})
    //   const res = await data.json()
    //   return res
    // }
  },[])


  return (
    <div className={styles.container}>
      {/* formulario admin */}
     

      {/* pagina web */}
      <div className={[styles.containerPaginaWeb].join(" ")}>
        {
          admin && 
          <div className={styles.containerAgregarNuevoMazo}>
            <CrearEditarMazo setRefrescar={setRefrescar} urlCarta={urlCarta} mazo={mazo} setMazo={setMazo} allCards={allCards} backgroundRefCrear={backgroundRefCrear} setCartasNoEncontradas={setCartasNoEncontradas} cartasNoEncontradas={cartasNoEncontradas}/>
            <Mazo urlCarta={urlCarta} mazo={mazo} backgroundRefCrear={backgroundRefCrear}/>
          </div>

        }
        <div className={styles.containerTitulo}>
          <h1 className={styles.titulo1}>Titulo 1</h1>
          <p className={styles.descripcion}>Descripcion1</p>
        </div>
      



      </div>

      

    </div>
  )
}

export default MejoresMazosRiftbound;
