import React, { useEffect, useState } from "react";
import MetaComps from "./MetaComps.jsx";
import TierListMetaComps from "@components/TFT/TierListMetaComps.jsx";
import { versionTFT, swapVersionTFT, constantesJSON, metaCompsTFTAdmin, constantesPHP, addConstantesTFT, constantesTFT } from "src/stores/dataTFT.js";
import { useStore } from "@nanostores/react";
import style from "./css/EditarCompoTFT.module.css"
import SelectVersion from "@components/versionTFT/SelectVersion.jsx";
import { $admin, $superAdmin } from "@stores/auth.js"
import Youtube from "@components/youtube/Youtube.jsx";
import CardsCompos from "@components/TFT/CardsCompos.jsx";
import DragDropTierListEditor from "./DragDropTierListEditor.jsx";
const EditarCompoTFT = () => {
  const currentVersion = useStore(versionTFT);
  //const [constantes, setConstantes] = useState({});
  const admin = useStore($admin);
  const superAdmin = useStore($superAdmin);
  const constantes = useStore(constantesTFT)
  const metaComps = useStore(metaCompsTFTAdmin) || [];
  // useEffect(() => {
  //   // Obtener las constantes actuales
  //   const fetchConstantes = async () => {
  //     try {
  //       const response = await fetch(constantesJSON,{cache:"reload"});
  //       const data = await response.json();
  //       setConstantes(data);
  //     } catch (error) {
  //       console.error("Error obteniendo constantes:", error);
  //     }
  //   };

  //   fetchConstantes();
  // }, []);

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
      if (result.success === true) {
        alert(keyToUpdate + " actualizado a: " + newValue + "\n\nData guardada: " + JSON.stringify(result.data).substring(0, 100) + "...");
      } else {
        alert("⚠️ Hubo un problema al actualizar: " + (result.message || JSON.stringify(result)));
      }
    } catch (error) {
      console.error("Error actualizando constantes:", error);
      alert("Error de red o del servidor: " + error.message)
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
          <span>Video Principal en TFT Meta Comps:</span>
          <Youtube src={constantes?.videoPrincipal} client:only="react"/>
          <input id="videoPrincipal" type="text" placeholder="https://www.youtube.com/watch?v=..." />
          <input
            type="button"
            value="Update"
            onClick={() => addConstantesTFT({key:"videoPrincipal", value:document.getElementById("videoPrincipal").value})}
            />
        </label>

        <label className={style.containerConstanteUpdate}>
          
          <SelectVersion></SelectVersion>
        </label>

        {/* CONTENEDOR PARA TEXTOS DE SEO Y ENCABEZADOS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0", padding: "15px", border: "1px solid #333", borderRadius: "8px" }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#fff" }}>Textos SEO y Encabezados ({currentVersion === "pbe" ? "PBE" : "Latest"})</h3>
          <p style={{ margin: "0 0 15px 0", fontSize: "0.9rem", color: "#aaa" }}>
            <strong>Etiquetas dinámicas que puedes usar:</strong><br />
            <code>[numeroDelSet]</code> - Se reemplaza por el ID del set actual (ej. 17 o 18)<br />
            <code>[numeroDelParche]</code> - Se reemplaza por la versión actual del parche (ej. 18.3b)
          </p>
          
          {[
            { id: "h1Title", label: "H1 Título Principal" },
            { id: "h1Intro", label: "H1 Texto Introductorio" },
            { id: "h2TierListTitle", label: "H2 Tier List Título" },
            { id: "h2TierListIntro", label: "H2 Tier List Intro" },
            { id: "h2MejoresCompsTitle", label: "H2 Mejores Compos Título" },
            { id: "h2MejoresCompsIntro", label: "H2 Mejores Compos Intro" },
            { id: "h3Fast8Title", label: "H3 Fast 8 Título" },
            { id: "h3Fast8Intro", label: "H3 Fast 8 Intro" },
            { id: "h3RerollsTitle", label: "H3 Rerolls Título" },
            { id: "h3RerollsIntro", label: "H3 Rerolls Intro" },
            { id: "h3Fast9Title", label: "H3 Fast 9 Título" },
            { id: "h3Fast9Intro", label: "H3 Fast 9 Intro" },
            { id: "h3SituacionalesTitle", label: "H3 Situacionales Título" },
            { id: "h3SituacionalesIntro", label: "H3 Situacionales Intro" },
          ].map(field => {
            const keyToRead = currentVersion === "pbe" ? field.id + "PBE" : field.id;
            return (
              <label key={field.id} className={style.containerConstanteUpdate} style={{ marginBottom: "5px", display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ minWidth: "200px" }}>{field.label}:</span>
                <textarea 
                  id={`input${field.id}`} 
                  placeholder={constantes?.[keyToRead] || ""} 
                  style={{ flex: 1, padding: "8px", borderRadius: "4px", minHeight: "40px" }}
                />
                <input
                  type="button"
                  value="Update"
                  onClick={() => actualizarConstantes(`input${field.id}`)}
                />
              </label>
            );
          })}
        </div>
        {metaComps && metaComps.length > 0 && (
          <DragDropTierListEditor 
            comps={metaComps.filter(comp => comp.version === currentVersion || (currentVersion === "latest" && !comp.version))} 
          />
        )}
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

      {
        metaComps.length > 0 && metaComps
        .filter(comp => comp.version === currentVersion || (currentVersion === "latest" && !comp.version)) // Asumimos latest si no tiene version para retrocompatibilidad
        .map((comp, index)=>{
          return (
            <div key={comp.id || index} id={`comp-card-${comp.id}`} data-comp-id={comp.id} style={{ opacity: comp.ocultar ? 0.5 : 1 }}>
              <CardsCompos 
                comp={comp}
                numeracion={index + 1}
                isActive={false}
                edit={true}
                client:load
              />
            </div>
        )
        })
      }

      {/* <MetaComps showHide={true} admin={admin} /> */}
    </>
  );
};

export default EditarCompoTFT;
