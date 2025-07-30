import React, { useEffect } from "react";
import style from "./css/ContextMenuBuilder.module.css";
import styleBuilder from "./css/Builder.module.css"
const ContextMenuBuilder = ({hexId, setHexId, updateBoardInfo })=>{
  const hexagono = document.getElementById(hexId);
  const campeon = hexagono.getElementsByClassName(styleBuilder.containerImageChampion)[0];
  const extraOptions = ["Duelist","Executioner", "Juggernaut"];
  const OPTIONS_BASE  = ["★ 4 stars","★ 3 stars","★ 2 stars","Power Up","X Remove"];
  let OPTIONS = [...OPTIONS_BASE];
  const dataCampeon = campeon?.dataset?.campeon ? JSON.parse(campeon.dataset.campeon) : null;
  console.log({dataCampeonEnCONTEXT: dataCampeon})
  if(dataCampeon?.sinergia.find(({apiName}) => {
    return apiName === "TFT15_DragonFist"
  })){
    OPTIONS?.splice(4, 0 , ...extraOptions)
  }


  function handleMenu(opcion){
    switch (opcion) {
      case "★ 4 stars":
        campeon.classList.toggle(styleBuilder.estrellas4, true)
        campeon.classList.toggle(styleBuilder.estrellas3, false)
        campeon.classList.toggle(styleBuilder.estrellas2, false)
        updateBoardInfo()
        break;
      case "★ 3 stars":
        campeon.classList.toggle(styleBuilder.estrellas4, false)
        campeon.classList.toggle(styleBuilder.estrellas3, true)
        campeon.classList.toggle(styleBuilder.estrellas2, false)
        updateBoardInfo()
        break;
      case "★ 2 stars":
        campeon.classList.toggle(styleBuilder.estrellas4, false)
        campeon.classList.toggle(styleBuilder.estrellas3, false)
        campeon.classList.toggle(styleBuilder.estrellas2, true)
        updateBoardInfo()
        break;
      case "Power Up":
        campeon.classList.toggle(styleBuilder.powerUp, true)
        updateBoardInfo()
        break;
      case "Duelist": {
        const oldDataString = campeon?.dataset?.campeon;
        const oldData = JSON.parse(oldDataString);

        let sinergia = [...oldData.sinergia];

        if (sinergia.find(({apiName})=> apiName === duelist.apiName)) {
          // Si ya tiene Duelist, lo quitamos
          sinergia = sinergia.filter(s => {
            return s.apiName !== duelist.apiName});
        } else {
          // Si no lo tiene, lo agregamos
          sinergia.push(duelist);
        }
        const newCampeon = { ...oldData, sinergia };
        campeon.setAttribute("data-campeon", JSON.stringify(newCampeon));
        updateBoardInfo();
        break;
      }
      case "Executioner": {
        const oldDataString = campeon?.dataset?.campeon;
        const oldData = JSON.parse(oldDataString);

        let sinergia = [...oldData.sinergia];

        if (sinergia.find(({apiName})=> apiName === executioner.apiName)) {
          // Si ya tiene executioner, lo quitamos
          sinergia = sinergia.filter(s => {
            return s.apiName !== executioner.apiName});
        } else {
          // Si no lo tiene, lo agregamos
          sinergia.push(executioner);
        }

        const newCampeon = { ...oldData, sinergia };
        campeon.setAttribute("data-campeon", JSON.stringify(newCampeon));
        updateBoardInfo();
        break;
      }
      case "Juggernaut": {
        const oldDataString = campeon?.dataset?.campeon;
        const oldData = JSON.parse(oldDataString);

        let sinergia = [...oldData.sinergia];

        if (sinergia.find(({apiName})=> apiName === juggernaut.apiName)) {
          // Si ya tiene juggernaut, lo quitamos
          sinergia = sinergia.filter(s => {
            return s.apiName !== juggernaut.apiName});
        } else {
          // Si no lo tiene, lo agregamos
          sinergia.push(juggernaut);
        }

        const newCampeon = { ...oldData, sinergia };
        campeon.setAttribute("data-campeon", JSON.stringify(newCampeon));
        updateBoardInfo();
        break;
      }
      default:
        campeon.classList.toggle(styleBuilder.estrellas4, false)
        campeon.classList.toggle(styleBuilder.estrellas3, false)
        campeon.classList.toggle(styleBuilder.estrellas2, false)
        campeon.classList.toggle(styleBuilder.powerUp, false)
        updateBoardInfo()
        break;
    }
    
    setHexId(null);
  }
  return(
    <div className={style.contextMenuBuilder}>
      <ul>
        {OPTIONS.map((opcion,i)=>{
          return <li key={i} className={style.optionsMenu} onClick={(e)=>{ e.preventDefault(); handleMenu(opcion); return false}}>{opcion}</li>
        })}
      </ul>
    </div>
  ) 
}

export default ContextMenuBuilder;

const duelist = {
  apiName: "TFT15_Duelist",
  name: "Duelist",
  icon: "ASSETS/UX/TraitIcons/Trait_Icon_8_Duelist.tex",
  desc: "Duelists gain Attack&nbsp;Speed on each attack, stacking up to @MaxStacks@&nbsp;times.<br><br><row>(@MinUnits@) @AttackSpeedPercent*100@%&nbsp;%i:scaleAS%</row><br><row>(@MinUnits@) @AttackSpeedPercent*100@%&nbsp;%i:scaleAS%</row><br><row>(@MinUnits@) @AttackSpeedPercent*100@%&nbsp;%i:scaleAS%; Duelists gain @DamageReduction@%&nbsp;%i:scaleDR%</row>",
  effects: [
    {
      minUnits: 2,
      maxUnits: 3,
      style: 1,
      variables: {
        AttackSpeedPercent: 0.03999999910593033,
        DamageReduction: null,
        MaxStacks: 12
      }
    },
    {
      minUnits: 4,
      maxUnits: 5,
      style: 3,
      variables: {
        AttackSpeedPercent: 0.07000000029802322,
        DamageReduction: null,
        MaxStacks: 12
      }
    },
    {
      minUnits: 6,
      maxUnits: 25000,
      style: 5,
      variables: {
        AttackSpeedPercent: 0.10000000149011612,
        DamageReduction: 12,
        MaxStacks: 12
      }
    }
  ]
}

const executioner = {
  "apiName": "TFT15_Destroyer",
  "name": "Executioner",
  "desc": "Executioners gain Critical Strike Chance and Critical Strike Damage. Their Ability can critically strike.<br><br><expandRow>(@MinUnits@) @CritChanceAmpPercent@% %i:scaleCrit%; @CritAmpPercent@% %i:scaleCritMult%</expandRow>",
  "icon": "ASSETS/UX/TraitIcons/Trait_Icon_15_Destroyer.TFT_Set15.tex",
  "effects": [
    {
      "minUnits": 2,
      "maxUnits": 2,
      "style": 1,
      "variables": {
        "CritAmpPercent": 10,
        "CritChanceAmpPercent": 25
      }
    },
    {
      "minUnits": 3,
      "maxUnits": 3,
      "style": 3,
      "variables": {
        "CritAmpPercent": 12,
        "CritChanceAmpPercent": 35
      }
    },
    {
      "minUnits": 4,
      "maxUnits": 4,
      "style": 3,
      "variables": {
        "CritAmpPercent": 18,
        "CritChanceAmpPercent": 50
      }
    },
    {
      "minUnits": 5,
      "maxUnits": 25000,
      "style": 5,
      "variables": {
        "CritAmpPercent": 28,
        "CritChanceAmpPercent": 55
      }
    }
  ]
}

const juggernaut = {
  apiName: "TFT15_Juggernaut",
  name: "Juggernaut",
  icon: "ASSETS/UX/TraitIcons/Trait_Icon_9_Juggernaut.tex",
  desc: "Juggernauts gain Durability, increased above @HealthBreakpoint*100@% health. When a Juggernaut dies, other Juggernauts heal for @HealRatio*100@% of their max Health.<br><br><expandRow>(@MinUnits@) @BaseDR*100@% or @IncreasedDR*100@%&nbsp;%i:scaleDR%</expandRow>",
  effects: [
    {
      minUnits: 2,
      maxUnits: 3,
      style: 1,
      variables: {
        BaseDR: 0.15,
        HealRatio: 0.1,
        HealthBreakpoint: 0.5,
        IncreasedDR: 0.25
      }
    },
    {
      minUnits: 4,
      maxUnits: 5,
      style: 3,
      variables: {
        BaseDR: 0.2,
        HealRatio: 0.1,
        HealthBreakpoint: 0.5,
        IncreasedDR: 0.35
      }
    },
    {
      minUnits: 6,
      maxUnits: 25000,
      style: 5,
      variables: {
        BaseDR: 0.25,
        HealRatio: 0.1,
        HealthBreakpoint: 0.5,
        IncreasedDR: 0.4
      }
    }
  ]
}

