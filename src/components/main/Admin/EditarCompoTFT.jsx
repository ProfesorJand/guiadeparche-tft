import React, { useEffect, useState } from "react";
import MetaComps from "./MetaComps.jsx";
import TierListMetaComps from "@components/TFT/TierListMetaComps.jsx";
import { versionTFT, swapVersionTFT, constantesJSON, constantesPHP } from "src/stores/dataTFT.js";
import { useStore } from "@nanostores/react";
import style from "./css/EditarCompoTFT.module.css"
import SelectVersion from "@components/versionTFT/SelectVersion.jsx";

const EditarCompoTFT = () => {
  const currentVersion = useStore(versionTFT);
  const [constantes, setConstantes] = useState({});
  const admin = localStorage.getItem("superAdmin") || false;
  useEffect(() => {
    // Obtener las constantes actuales
    const fetchConstantes = async () => {
      try {
        const response = await fetch(constantesJSON,{cache:"reload"});
        const data = await response.json();
        setConstantes(data);
      } catch (error) {
        console.error("Error obteniendo constantes:", error);
      }
    };

    fetchConstantes();
  }, []);

  const actualizarConstantes = async (inputId) => {
    const element = document.getElementById(inputId);
    if (!element) return; // Evita errores si el elemento no existe

    const newValue = element.value.trim(); // Obtiene el valor del input
    var keyToUpdate = inputId.replace("input", ""); // Extrae la clave a actualizar
    keyToUpdate = currentVersion === "pbe" ? keyToUpdate.concat("PBE") : keyToUpdate
    const url = constantesPHP;
    const token = import.meta.env.PUBLIC_TOKEN_META;
    const bodyData = {
      key: keyToUpdate,
      value: newValue, // Si está vacío, se enviará como ""
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();
      alert(keyToUpdate + " actualizado a: " + newValue)
    } catch (error) {
      console.error("Error actualizando constantes:", error);
      alert(error)
    }
  };

  return (
    <>
        <label className={style.containerConstanteUpdate}>
          <span>Label Meta Comps Version:</span>
          <input id="inputMetaCompVersion" type="text" placeholder={currentVersion === "pbe" ? (constantes?.MetaCompVersionPBE || "") : (constantes?.MetaCompVersion || "")} />
          <input
            type="button"
            value="Update"
            onClick={() => actualizarConstantes("inputMetaCompVersion")}
            />
        </label>

        <label className={style.containerConstanteUpdate}>
          
          <SelectVersion></SelectVersion>
        </label>
      {/* <TierListMetaComps /> */}

      {/* <label>
        <span>Última Versión Live</span>
        <input id="inputUltimaVersionLive" type="text" placeholder={constantes.ultimaVersionLive || ""} />
        <input
          type="button"
          value="Update"
          onClick={() => actualizarConstantes("inputUltimaVersionLive", "ultimaVersionLive")}
        />
      </label>

      <label>
        <span>Última Versión PBE</span>
        <input id="inputUltimaVersionPBE" type="text" placeholder={constantes.ultimaVersionPBE || ""} />
        <input
          type="button"
          value="Update"
          onClick={() => actualizarConstantes("inputUltimaVersionPBE", "ultimaVersionPBE")}
        />
      </label> */}

      <MetaComps showHide={true} admin={admin} />
    </>
  );
};

export default EditarCompoTFT;
