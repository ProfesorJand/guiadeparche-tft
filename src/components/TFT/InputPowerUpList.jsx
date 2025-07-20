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
  function replaceVariables(desc, effects) {
  return desc.replace(/@([^@]+?)@/g, (_, fullKey) => {
    // Extraer la parte después del ":" si existe
    const keyParts = fullKey.split(":");
    const rawKey = keyParts.length > 1 ? keyParts[1] : keyParts[0];

    // Soportar multiplicador *100
    const match = rawKey.match(/^(\w+)(\*100)?$/);
    if (!match) return `@${fullKey}@`;

    const [ , key, multiplier ] = match;
    let value = effects[key];

    if (value !== undefined) {
      if (multiplier) {
        value = Math.round(value * 100);
      }
      return value;
    }

    return `@${fullKey}@`; // Dejar como está si no se encuentra
  });
}
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
        {champPowerUp.map(({icon, apiName, name, desc, effects})=>{
          if(icon){
            return (
              <div key={"ImgAumentos"+apiName} className={styles.horizontalWrapper}>
              <button className={styles.btnClose} onClick={()=>deleteClickFn(apiName)}>X</button>
              <p style={{fontSize:"12px"}}>{name}</p>
              <p style={{fontSize:"12px"}}>{replaceVariables(desc, {...effects, ...effects[0]?.variables})}</p>
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