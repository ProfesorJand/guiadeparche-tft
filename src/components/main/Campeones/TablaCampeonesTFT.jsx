import React,{useState, useEffect, lazy, Suspense} from "react";
import {championsTFT, version, setPBE} from "../../../json/updates/constantesPBE";
import styles from "./css/TablaCampeonesTFT.module.css"
import FantasmaCampeonesTFTHorizontalTabla from "./FantasmaCampeonesTFTHorizontalTabla";
const CampeonesTFTHorizontalTabla= lazy(()=> import("./CampeonesTFTHorizontalTabla"))

const TablaCampeonesTFT = () =>{
    const [champions , setChampionsTFT] = useState(null);
    useEffect(()=>{
        const filterChampeonsTFT = championsTFT.filter((campeon)=>{
            if(campeon.cost >=1 && campeon.cost < 6 && campeon.traits.length >0){
                return campeon
            }
        })
        setChampionsTFT(filterChampeonsTFT.sort(compare))
    },[]);
    function compare( a, b ) {
        if(a.cost < b.cost){
          return -1
        }
        if(a.cost > b.cost){
          return 1
        }
      if ( a.characterName < b.characterName){
        return -1;
      }
      if ( a.characterName > b.characterName ){
        return 1;
      }
      return 0;
    }

    return (
        <div className={styles.containerTablaCampeones}>
            <div className={styles.headerTabla}>
                <div>Campeon</div>
                <div>Coste</div>
                <div>Sinergia</div>
                <div className={styles.hideMobile}>Daño</div>
                <div className={styles.hideMobile}>Vel.</div>
                <div className={styles.hideMobile}>Vida</div>
                <div className={styles.hideMobile}>Arm.</div>
                <div className={styles.hideMobile}>Res. Mág.</div>
                <div>Mana</div>
                <div>Rango</div>
                <div>Habilidad</div>
            </div>

            {champions && 
            champions.map((campeon, index)=>{
                return (
                    <Suspense key={index} fallback={<FantasmaCampeonesTFTHorizontalTabla/>}>
                        <CampeonesTFTHorizontalTabla
                            nombreCampeon={campeon.characterName.replace(`TFT12_`,"").toLowerCase()}
                            coste={campeon.cost}
                            sinergia={campeon.traits}
                            dano={campeon.stats.damage}
                            velocidad={campeon.stats.attackSpeed}
                            armadura={campeon.stats.armor}
                            resistenciaMagica={campeon.stats.magicResist}
                            manaInicial={campeon.stats.initialMana}
                            manaFinal={campeon.stats.mana}
                            rango={campeon.stats.range}
                            habilidad={campeon.ability}
                            vida={campeon.stats.hp}
                            ></CampeonesTFTHorizontalTabla>
                    </Suspense>
                )
            })
            }

        </div>
    )
}

export default TablaCampeonesTFT;