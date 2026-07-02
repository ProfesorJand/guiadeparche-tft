import style from "./css/InfografiaMPTFT.module.css";
import { dataTFTAllItems, dataTFTChampions } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import ImgItem from "@components/TFT/ImgItem";
import CampeonesNivel from "../elementosInfografia/CampeonesNivel";
const InfografiaMPTFT = ({comp}) => {
  const AllItems = useStore(dataTFTAllItems);
  const AllChampions = useStore(dataTFTChampions);
  console.log({comp})
  return (
    <div className={style.cardsMPCompContainer}>
      <div className={style.cCondicionOpEarly}>
        Preliminares OP
        <div className={style.cCondicionOpEarlyImg}>
          {
            comp.condiciones.map((condicion) => {
              if(condicion.early){
                const condicionGrande= condicion.apiNameGrande;
                const condicionPequeno = condicion.ApiNamePequeno;
                const extras = ["Win Streak","Loss Streak","Orbe","3 estrellas","4 estrellas"];
                console.log({condicionGrande, condicionPequeno})
               // aca debe de haber varias condiciones si es un aumento o item o emblema o encuentro
                return (
                  <div key={condicionGrande} className={style.cCondicionOP}>
                    <div className={style.cCondicionGrande}>
                      <ImgItem item={AllItems.find((item) => item.apiName === condicionGrande)}/>
                    </div>
                    <div className={style.cCondicionPequeno}>
                      <ImgItem item={AllItems.find((item) => item.apiName === condicionPequeno)}/>
                    </div>
                  </div>
                )
              } 
            })
          }
        </div>
      </div>
      <div className={style.cNiveles}>
        <CampeonesNivel comp={comp} isMP={true}/>
      </div>
      {/* <div className={style.cAumentosEarly}>
        Aumentos
        <div className={style.cAumentosEarlyImg}>
          {
            comp.aumentos.map((item) => {
              console.log({aumentos})
              // aca debe de haber varias condiciones si es un aumento o item o emblema o encuentro
              // return (
              //   <div key={champ.apiNameCampeon}>
              //     <ImgCampeon campeon={champ} />
              //   </div>
              // )
            })
          }
        </div>
      </div> */}
      <div></div>
      
    </div>
  )
}

export default InfografiaMPTFT;