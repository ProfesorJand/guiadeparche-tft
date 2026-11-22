import React, { useState } from "react";
import style from "./css/AugmentsList.module.css";
import { dataTFTAllAugments, dataTFTAugmentsBySet, versionTFT, setNumberLatest, setNumberPBE } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import { getLocalTftImage } from "@utils/images";
import ImgAugment from "@components/TFT/ImgAugment";

const AugmentsList = ({ onSelectAugment, showName= false }) => {
    const [search, setSearch] = useState("");
    const allAugments = useStore(dataTFTAllAugments);
    const augmentsBySet = useStore(dataTFTAugmentsBySet);
    const currentVersion = useStore(versionTFT);
    const versionNumber = String(currentVersion === "latest" ? setNumberLatest : setNumberPBE);

    const handleDragStart = (e, augment) => {
        e.dataTransfer.setData("augment", JSON.stringify(augment));
        e.dataTransfer.setData("aumento", JSON.stringify(augment));
    };

    // Filtrar estrictamente por el set activo para no mezclar aumentos entre sets (Set 18 / 19 / futuros)
    const baseAugments =
        augmentsBySet?.[versionNumber] ||
        allAugments?.filter(a => String(a.tft_set) === versionNumber) ||
        [];

    const filteredAugments = baseAugments?.filter(aug => {
        if (!aug || (!aug.name && !aug.name_EN)) return false;
        const s = search.toLowerCase();
        return (
            (aug.name && aug.name.toLowerCase().includes(s)) || 
            (aug.name_EN && aug.name_EN.toLowerCase().includes(s)) ||
            (aug.apiName && aug.apiName.toLowerCase().includes(s))
        );
    }) || [];

    return (
        <div className={style.containerAugmentsMain}>
            <input 
                type="text" 
                placeholder="Buscar Aumento..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.containerAugmentsList}>
                {filteredAugments.map((augment, index) => {
                    const imgUrl = augment.icon ? (augment.icon.includes("http") ? augment.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(augment.icon, 'augments', versionNumber)) : "";
                    return (
                        <div 
                            key={index} 
                            className={style.containerAugment}
                            draggable
                            onDragStart={(e) => handleDragStart(e, augment)}
                            title={augment.name}
                            onClick={() => { if(onSelectAugment) onSelectAugment(augment); }}
                        >
                            {imgUrl ? <ImgAugment  augment={augment}/> : <span>{augment.name}</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AugmentsList;
