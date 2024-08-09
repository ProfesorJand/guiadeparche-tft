import React from "react";
import style from "./css/HabilidadTFT.module.css"

const HabilidadTFT = ({habilidad})=>{
    const url = "https://raw.communitydragon.org/latest/game/"
    const { icon, name, variables} = habilidad;
    var {desc} = habilidad;
    function changeVariables(descripcion){
        desc = desc.replaceAll("%i:scaleAP%",`<div style="display:inline-flex;position:relative;heigth:1rem;width:1rem;"><img src="/icon_ap.webp" alt="icono AP Riot" style="object-fit: none;height: 1rem; position:absolute; bottom:-20%;scale: 0.8;" loading="lazy"/></div>`)
        desc = desc.replaceAll("%i:scaleAD%",`<div style="display:inline-flex;position:relative;heigth:1rem;width:1rem;"><img src="/icon_attack.webp" alt="icono AP Riot" style="object-fit: none;height: 1rem; position:absolute; bottom:-20%;scale: 0.8; loading="lazy""/></div>`)
        desc = desc.replaceAll("%i:scaleArmor%",`<div style="display:inline-flex;position:relative;heigth:1rem;width:1rem;"><img src="/icon_armor.webp" alt="icono AP Riot" style="object-fit: none;height: 1rem; position:absolute; bottom:-20%;scale: 0.8; loading="lazy""/></div>`)
        desc = desc.replaceAll("%i:scaleMR%",`<div style="display:inline-flex;position:relative;heigth:1rem;width:1rem;"><img src="/icon_magic_resist.webp" alt="icono AP Riot" style="object-fit: none;height: 1rem; position:absolute; bottom:-20%;scale: 0.8; loading="lazy""/></div>`)
        desc = desc.replaceAll("%i:scaleHealth%",`<div style="display:inline-flex;position:relative;heigth:1rem;width:1rem;"><img src="/icon_health.webp" alt="icono AP Riot" style="object-fit: none;height: 1rem; position:absolute; bottom:-20%;scale: 0.8;" loading="lazy"/></div>`)
        desc = desc.replaceAll("%i:scaleAS%",`<div style="display:inline-flex;position:relative;heigth:1rem;width:1rem;"><img src="/icon_attack_speed.webp" alt="icono AP Riot" style="object-fit: none;height: 1rem; position:absolute; bottom:-20%;scale: 0.8;" loading="lazy"/></div>`)
        //veigar
        desc = desc.replaceAll("@TFTUnitProperty.:TFT12_VeigarZapsPurchased@",`<div style="display:inline-flex;position:relative;heigth:1rem;width:1rem;"><img src="/icon_charm.webp" alt="icono AP Riot" style="object-fit: cover;height: 1rem; position:absolute; bottom:-20%;scale: 0.8;" loading="lazy"/></div>`)
        desc = desc.replaceAll("@TFTUnitProperty.:TFT12_VeigarAbilityPowerGainPerZap@","@APPerZap@")
        //warwick
        desc = desc.replaceAll("@TFTUnitProperty.:TFT12_WarwickASAmountToGain@","@MultiplierBelowThreshold@")
        desc = desc.replaceAll("@TFTUnitProperty.:TFT12_WarwickBonusAS@","@VelAcumulada@")

        
    }
    changeVariables(desc)
    const urlIcon =  url + icon.replace(".tex",".png").toLowerCase();
    return (
        <div className={style.containerTooltip}>
            <img src={urlIcon} alt={name +" TFT"} className={style.imgHabilidad}/>
            <div className={style.tooltip}>
                <h2 className={style.titulo}>{name}</h2>
                <p dangerouslySetInnerHTML={{__html: desc}}>
                </p>
                {variables.length > 0 && variables.map((variable, index)=>{
                    return (
                    <div className={style.variables} key={index}>
                    {variable.name}: {variable.value.slice(1,4).map((valor, index)=>{
                            if(valor%1 !== 0){

                                return (Math.ceil(valor))
                            }else{
                                return valor

                        };
                    }).join("/")}</div>)
                })}
            </div>
        </div>
    )
}

export default HabilidadTFT;