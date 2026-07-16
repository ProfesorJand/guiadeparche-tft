import React, { useState } from "react";
import style from "./css/AugmentsList.module.css";
import { dataTFTAllAugments, versionTFT, setNumberLatest, setNumberPBE } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import { getLocalTftImage } from "@utils/images";

const AugmentsList = () => {
    const [search, setSearch] = useState("");
    const allAugments = useStore(dataTFTAllAugments);
    const currentVersion = useStore(versionTFT);
    const versionNumber = currentVersion === "latest" ? setNumberLatest : setNumberPBE

    const handleDragStart = (e, augment) => {
        e.dataTransfer.setData("augment", JSON.stringify(augment));
        e.dataTransfer.setData("aumento", JSON.stringify(augment));
    };

    const filteredAugments = allAugments?.filter(aug => {
        if (!aug || !aug.name) return false;
        const s = search.toLowerCase();
        return aug.name.toLowerCase().includes(s) || aug.apiName.toLowerCase().includes(s);
    }) || [];
    console.log({filteredAugments})

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
                        >
                            {imgUrl ? <img src={imgUrl} alt={augment.name} /> : <span>{augment.name}</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AugmentsList;
