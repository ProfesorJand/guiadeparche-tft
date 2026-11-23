import React, { useState } from "react";
import style from "./css/AugmentsList.module.css";
import { dataTFTAllAugments, dataTFTAugmentsBySet, versionTFT, setNumberLatest, setNumberPBE } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import { getLocalTftImage } from "@utils/images";
import ImgAugment from "@components/TFT/ImgAugment";

const normalizeSearchText = (text = "") =>
    String(text)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/['’`]/g, "")
        .replace(/[^a-z0-9+]+/g, " ")
        .trim();

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

    const normalizedQuery = normalizeSearchText(search);
    const rawQuery = search.trim().toLowerCase();

    const filteredAugments = baseAugments?.filter(aug => {
        if (!aug || (!aug.name && !aug.name_EN && !aug.name_en && !aug.apiName)) return false;
        if (!normalizedQuery && !rawQuery) return true;

        const candidates = [
            aug.name,
            aug.nombre,
            aug.name_EN,
            aug.name_en,
            aug.apiName,
        ].filter(Boolean);

        return candidates.some((field) => {
            const lower = String(field).toLowerCase();
            if (rawQuery && lower.includes(rawQuery)) return true;
            if (normalizedQuery && normalizeSearchText(field).includes(normalizedQuery)) return true;
            return false;
        });
    }) || [];

    return (
        <div className={style.containerAugmentsMain}>
            <input 
                type="text" 
                placeholder="Buscar Aumento (ES / EN)..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className={style.searchInput}
            />
            <div className={style.containerAugmentsList}>
                {filteredAugments.map((augment, index) => {
                    const imgUrl = augment.icon ? (augment.icon.includes("http") ? augment.icon.replace(".tex", ".png").toLowerCase() : getLocalTftImage(augment.icon, 'augments', versionNumber)) : "";
                    const enName = augment.name_EN || augment.name_en || "";
                    const tooltipTitle = enName && enName !== augment.name ? `${augment.name} (${enName})` : (augment.name || enName);
                    return (
                        <div 
                            key={augment.apiName || index} 
                            className={style.containerAugment}
                            draggable
                            onDragStart={(e) => handleDragStart(e, augment)}
                            title={tooltipTitle}
                            onClick={() => { if(onSelectAugment) onSelectAugment(augment); }}
                        >
                            {imgUrl ? <ImgAugment augment={augment}/> : <span>{tooltipTitle}</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AugmentsList;
