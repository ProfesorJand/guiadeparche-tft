import React, { useEffect, useState } from "react";
import style from "./css/ItemsTierList.module.css";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const ItemTierList = () => {
  const urlDataDragon = "https://raw.communitydragon.org/latest/game/";
  const [itemsTierList, setItemsTierList] = useState({});
  const category = ["Craftable", "Radiants", "Emblems", "Artefacts", "Supports", "Chembaron", "Others"]; // Categorías a incluir

  useEffect(() => {
    (async function traerDatos() {
      const url = "https://guiadeparche.com/tftdata/Set12/tierListItem.json";
      const datos = await fetch(url, { cache: "no-cache" });
      const resp = await datos.json();
      setItemsTierList(resp);
    })();
  }, []);

  function SanitizedComponent({ htmlContent }) {
    console.log({ htmlContent });
    const sanitizedContent = DOMPurify.sanitize(htmlContent);
    console.log({ sanitizedContent });
    return <div className={style.tooltipDesc}>{parse(sanitizedContent)}</div>; // Usa `parse` para renderizar el HTML sanitizado
  }

  function replaceVariables(desc, effects) {
    return desc.replace(/@(\w+)(\*100)?@/g, (_, key, multiplier) => {
      let value = effects[key];
      if (value !== undefined) {
        // Si existe el multiplicador (*100), realiza la operación y redondea
        if (multiplier) {
          value = Math.round(value * 100);
        }
        return value; // Devuelve el valor final
      }
  
      return `@${key}${multiplier || ""}@`; // Si no encuentra el valor, deja el marcador.
    });
  }

  return (
    <>
      <h2>Items</h2>
      <div className={style.container}>
        {Object.keys(itemsTierList).map((categoryItemName, index) => {
          if (category.includes(categoryItemName) && itemsTierList?.[categoryItemName]?.["S"].length) {
            return (
              <div key={categoryItemName + index} className={style.containerTierList}>
                <div className={style.containerTierListItems}>
                  <div className={style.containerTierListTiers}>
                    <img className={style.tierImg} src="/tiers/Tier-S.webp" alt="Tier S" />
                  </div>
                  {itemsTierList?.[categoryItemName]?.["S"].map((dataItem, i) => {
                    return (
                      <div key={"S" + i} className={style.containerItem}>
                        {dataItem.desc && (
                          <div className={style.tooltip}>
                            <div className={style.tooltipTitle}>
                              {dataItem?.name || dataItem?.nombre}
                            </div>
                            <SanitizedComponent
                              htmlContent={replaceVariables(dataItem?.desc, dataItem?.effects)}
                            />
                            {Object.keys(dataItem?.effects).length > 0 &&
                              Object.keys(dataItem?.effects).map((variable, i) => {
                                return (
                                  <div key={i} className={style.effects}>
                                    <span className={style.variableName}>{variable}</span> :{" "}
                                    <span>{dataItem?.effects[variable]}</span>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                        <img
                          className={style.imgItem}
                          src={
                            dataItem?.img ||
                            urlDataDragon + dataItem?.icon.replace(".tex", ".png").toLowerCase()
                          }
                          alt={dataItem.nombre}
                          data-from="itemBoard"
                          data-tier="S"
                          data-item={JSON.stringify(dataItem)}
                          onDrop={(e) => handleDrop(e)}
                          onDragStart={(e) => handleDragStart(e)}
                          onDragEnd={(e) => handleDropOutside(e, "item")}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ItemTierList;
