import React, { useState, useRef, useEffect } from "react";
import style from "./css/CampeonOriginal.module.css";
import TooltipItem from "@components/tooltips/items";
import { versionTFT } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";

const CampeonOriginal = ({ dataCampeon, dataItem, estrellas, show, forInfografia, infoChampHeight }) => {
  const dataCampeonParseado = JSON.parse(dataCampeon);
  const itemsCampeon = dataItem.map(({ item }) => JSON.parse(item));
  const [tooltipData, setTooltipData] = useState(null);

  const containerChampRef = useRef(null); // referencia a la imagen
  const containerChampDivRef = useRef(null); // referencia al div padre

  const currentVersion = useStore(versionTFT);
  const [champHeight, setChampHeight] = useState(0);
  const [champHeightDiv, setChampHeightDiv] = useState(0);

  useEffect(() => {
    if (!containerChampRef.current || !containerChampDivRef.current) return;

    const resizeObserverImg = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setChampHeight(entry.contentRect.height); // altura de la imagen
      }
    });

    const resizeObserverDiv = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setChampHeightDiv(entry.contentRect.height); // altura del div contenedor
      }
    });

    resizeObserverImg.observe(containerChampRef.current);
    resizeObserverDiv.observe(containerChampDivRef.current);

    return () => {
      resizeObserverImg.disconnect();
      resizeObserverDiv.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerChampDivRef}
      className={style.containerCampeon}
      style={{ order: dataCampeonParseado.coste }}
    >
      <div
        ref={containerChampRef}
        className={[
          style.containerCampeonImg,
          estrellas === 3 ? style.estrellas3 : estrellas === 4 ? style.estrellas4 : "",
        ].join(" ")}
      >
        <img
          className={style.imgCampeon}
          src={dataCampeonParseado.img}
          style={{
            border: `2px solid var(--color-hex-cost-${dataCampeonParseado.coste})`,
          }}
          loading="lazy"
        />
      </div>

      {itemsCampeon.length > 0 && (
        <div
          className={style.containerItems}
          style={{
            bottom:
              champHeight > 0 && champHeightDiv > 0
                ? `${champHeightDiv - champHeight}px` // 👈 se coloca arriba de la imagen
                : "0px",
          }}
        >
          {itemsCampeon.map(({ nombre, img, icon, name, desc, effects }, index) => (
            <div
              className={style.containerItem}
              key={"itemsCampeon" + index}
              onMouseEnter={() => desc && setTooltipData(index)}
              onMouseLeave={() => setTooltipData(null)}
            >
              <TooltipItem
                desc={desc}
                effects={effects}
                name={name}
                nombre={nombre}
                isVisible={tooltipData === index}
              />
              <img
                className={style.imgItem}
                src={
                  img
                    ? img
                    : `https://raw.communitydragon.org/${
                        currentVersion
                      }/game/` + icon.toLowerCase().replace(".tex", ".png")
                }
                alt={nombre}
              />
            </div>
          ))}
        </div>
      )}
      {
        true && 
        <span
          className={show ? style.nombreCampeon : style.nombreCampeonOculto}
          // style={{
          //   top:`${infoChampHeight - 13}px`, // 8 + 5 de padding
          // }}
        >
          {dataCampeonParseado.nombre === "The Mighty Mech" ? "Mech" : dataCampeonParseado.nombre}
        </span>
      }
    </div>
  );
};

export default CampeonOriginal;
