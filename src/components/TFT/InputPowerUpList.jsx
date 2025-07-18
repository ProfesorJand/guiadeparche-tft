import { dataTFTTraits, versionTFT } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
const InputPowerUpList = ({addClickFn, deleteClickFn, champPowerUp, styles, defaultValue})=>{
  const traitsList = useStore(dataTFTTraits);
  const version = useStore(versionTFT)
  const powerUpList = traitsList.filter((traitData)=>{
    return traitData?.apiName?.includes("MechanicTrait")
  })
  const url = `https://raw.communitydragon.org/${version}/game/`;
  return (
    <>
      <label>
        Power Up:
        <input className={styles.input} list="dataListPowerUp" name="dataListPowerUp" id="powerUpInput" defaultValue={defaultValue } placeholder="Select Power Up to Show"></input>
        <datalist id="dataListPowerUp">
          {powerUpList.map((dataTrait, i )=>{
            return (
              <option key={"ListaDePowerUp"+dataTrait.name+i} id={`datalist-${dataTrait.apiName}`} value={dataTrait.apiName} data-value={JSON.stringify(dataTrait)}>
                {dataTrait.name}
              </option>
            )
          })}
        </datalist>
      </label>
      <div className={styles.btnAgregar} onClick={(e)=>addClickFn(e)}>Agregar Power Up</div>
      <div className={styles.containerAumentos}>    
        {champPowerUp.map(({icon, apiName, name})=>{
          if(icon){
            return (
              <div key={"ImgAumentos"+apiName} className={styles.horizontalWrapper}>
              <button className={styles.btnClose} onClick={()=>deleteClickFn(apiName)}>X</button>
              <p style={{fontSize:"12px"}}>{name}</p>
              <img src={url+icon.toLowerCase().replace(".tex",".png")} className={styles.imgAumento} loading="lazy"></img>
            </div>
        )
      }
      })}
      </div>
    </>
  )
}

export default InputPowerUpList;