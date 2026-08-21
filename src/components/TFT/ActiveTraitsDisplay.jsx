import React from 'react';
import { useStore } from '@nanostores/react';
import { dataTFTChampions, dataTFTTraits, findTraitsStyles } from '@stores/dataTFT';
import { traitsColors } from '@functions/campeonestft.js';
import { getLocalTftImage } from '@utils/images';
import style from '../main/Admin/css/Builder.module.css';

const doubleTraitChampions = {
  "tft18_lux_coven": ["DA_18_Coven"],
  "tft18_lux_inferno":["DA_18_Inferno"],
  "tft18_lux_blackthorn":["DA_18_Blackthorn"],
  "tft18_lux_blossom":["DA_18_Blossom"],
  "tft18_lux_elderwood":["DA_18_Elderwood"],
  "tft18_lux_fae":["DA_18_Fae"],
  "tft18_lux_lunar":["DA_18_Lunar"],
  "tft18_lux_primal":["DA_Primal18"],
  "tft18_lux_solar":["DA_18_Solar"],
  "tft18_elderdragon":["DA_Riftbeast18"],
};

const colorHex = {
  bronze: "#a16f44",
  silver: "#909090",
  gold: "gold",
  prismatic: { backgroundImage: "url(/hexagonos/hex-prismatic.webp)", backgroundSize: "125%", backgroundPosition: "center" },
  default: "grey"
};

function checkColor(hexColor) {
  if (!hexColor) return { backgroundColor: colorHex.default };
  if (hexColor === "hex-prismatic.webp") {
    return colorHex.prismatic;
  }
  const colorKey = hexColor.replace("hex-", "").replace(".webp", "");
  return { backgroundColor: colorHex[colorKey] || colorHex.default };
}

function findClosestTraitImage(traitType, traitLevel) {
  const dynamicStyles = findTraitsStyles(traitType);
  if (Object.keys(dynamicStyles).length > 0) {
    const thresholds = Object.keys(dynamicStyles).map(Number).sort((a, b) => b - a);
    for (const threshold of thresholds) {
      if (traitLevel >= threshold) {
        return dynamicStyles[threshold];
      }
    }
  }

  if (traitType === "BlackRose") traitType = "Black Rose";
  if (traitType === "FormSwapper") traitType = "Form Swapper";
  if (traitType === "HighRoller") traitType = "High Roller";
  if (traitType === "JunkerKing") traitType = "Junker King";
  if (traitType === "PitFighter") traitType = "Pit Fighter";

  if (traitsColors[traitType]) {
    const traitLevels = Object.keys(traitsColors[traitType]).map(Number).sort((a, b) => a - b);
    for (let i = traitLevels.length - 1; i >= 0; i--) {
      if (traitLevel >= traitLevels[i]) {
        return traitsColors[traitType][traitLevels[i]];
      }
    }
  }
  return "hex-default.webp";
}

export default function ActiveTraitsDisplay({ championApiNames = [], versionNumber }) {
  const allChampions = useStore(dataTFTChampions) || [];
  const allTraits = useStore(dataTFTTraits) || [];

  const synergiesCount = {};
  
  const uniqueChampionNames = [...new Set(championApiNames)];

  uniqueChampionNames.forEach(apiName => {
    const champData = allChampions.find(c => c.apiName === apiName);
    if (!champData || !champData.traits) return;

    champData.traits.forEach(traitName => {
      const traitObj = allTraits.find(t => t.name === traitName || t.apiName === traitName);
      if (!traitObj) return;

      const isDouble = doubleTraitChampions[apiName]?.includes(traitObj.apiName);
      const countToAdd = isDouble ? 2 : 1;

      const currentCount = synergiesCount[traitObj.apiName]?.count || 0;
      synergiesCount[traitObj.apiName] = { count: currentCount + countToAdd, icon: traitObj.icon };
    });
  });

  const activeTraits = Object.keys(synergiesCount).map((trait) => {
    const count = synergiesCount[trait].count || 1;
    const traitSVG = findClosestTraitImage(trait.replace(" ", ""), count);
    if (traitSVG === "hex-default.webp") return null; 

    const iconUrl = synergiesCount[trait]?.icon?.startsWith("http")
      ? synergiesCount[trait]?.icon.toLowerCase().replace(".tex", ".png")
      : getLocalTftImage(synergiesCount[trait]?.icon, 'traits', versionNumber);

    return {
      name: trait,
      count,
      traitSVG,
      iconUrl
    };
  }).filter(Boolean);

  if (activeTraits.length === 0) return null;

  return (
    <div className={style.containerTraitsShow} style={{ margin: 0, paddingBottom: '4px', minHeight: '35px', justifyContent: 'center', transform: 'scale(1.15)', transformOrigin: 'bottom center' }}>
      {activeTraits.map((t, idx) => (
        <div key={idx} className={style.containerSinergiaHexShow} title={`${t.name} (${t.count})`}>
          <span className={style.borderHexShow} style={checkColor(t.traitSVG)}></span>
          <img className={style.imgSinergiaShow} src={t.iconUrl} alt={t.name} />
          <div className={style.infoSinergiaShow}>{t.count}</div>
        </div>
      ))}
    </div>
  );
}
