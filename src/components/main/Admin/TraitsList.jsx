import React, { useState } from "react";
import style from "./css/TraitsList.module.css";
import { dataTFTTraits, versionTFT, setNumberLatest, setNumberPBE } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import { getLocalTftImage } from "@utils/images";

export const getTraitDisplayName = (trait) => {
    if (!trait) return "";
    // mostrar nombre de la sinergia aleatoria
    if (trait.apiName && trait.apiName.toLowerCase().includes("stargazer")) {
        const parts = trait.apiName.split("_");
        if (parts.length >= 3) {
            return parts.slice(2).join(" ");
        }
    }
    return trait.name;
};

const TraitsList = ({ onSelectTrait }) => {
    const [search, setSearch] = useState("");
    const allTraits = useStore(dataTFTTraits);
    const currentVersion = useStore(versionTFT);
    const versionNumber = currentVersion === "latest" ? setNumberLatest : setNumberPBE;

    const filteredTraits = allTraits?.filter(trait => {
        if (!trait || !trait.name) return false;
        const s = search.toLowerCase();
        const displayName = getTraitDisplayName(trait);
        return displayName.toLowerCase().includes(s) || trait.name.toLowerCase().includes(s) || trait.apiName.toLowerCase().includes(s);
    }) || [];

    return (
        <div className={style.containerTraitsMain}>
            <input 
                type="text" 
                placeholder="Buscar Sinergia..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.containerTraitsList}>
                {filteredTraits.map((trait, index) => {
                    const imgUrl = trait.icon ? (trait.icon.includes("http") ? trait.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(trait.icon, 'traits', versionNumber)) : "";
                    const displayName = getTraitDisplayName(trait);
                    return (
                        <div 
                            key={index} 
                            className={style.containerTrait}
                            title={displayName}
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData("sinergia", JSON.stringify(trait));
                                e.dataTransfer.setData("trait", JSON.stringify(trait));
                                e.dataTransfer.setData("text/plain", trait.apiName);
                            }}
                            onClick={() => { if(onSelectTrait) onSelectTrait(trait); }}
                        >
                            {imgUrl ? <img src={imgUrl} alt={displayName} /> : null}
                            <span>{displayName}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TraitsList;
