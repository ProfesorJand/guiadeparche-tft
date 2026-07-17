import React, { useState, useEffect } from "react";
import style from "./master-plan/css/InfografiaMPTFT.module.css";
import styleForm from "./css/FormularioCrearCompoTFT.module.css";
import { dataTFTAllAugments, dataTFTAllItems, dataTFTChampions } from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import ImgItem from "./ImgItem";
import CampeonesNivel from "./elementosInfografia/CampeonesNivel";
import Sinergias from "@components/main/Admin/Sinergias";
import NuevoBuilderTFT from "./NuevoBuilderTFT";
import ImgCampeon from "./ImgCampeon";
import ImgAugment from "./ImgAugment";
import ChampionsList from "@components/main/Admin/ChampionsList";
import { Items as ItemsList } from "@components/main/Admin/Items";
import AugmentsList from "@components/main/Admin/AugmentsList";
import { composicionTFT as datosCompos, actualizarComposicionTFT, reiniciarComposicionTFT, dificultades, categorias, tiers, tiersExtras, dañoTipo } from "@stores/tft/dataFormularioCrear.js";
import { getLocalTftImage } from "@utils/images";
import CardsMasterPlanCompos from "@components/TFT/master-plan/CardsMasterPlanCompos.jsx";

// -1. Datos Básicos
import localStyle from "./css/FormularioVisualTFT.module.css";
const DatosBasicosVisual = () => {
  const comp = useStore(datosCompos);
  return <div className={`${style.cBoxTitleInfo} ${localStyle.styleBox1}`}>
      <span className={style.tBox}>Datos Básicos</span>
      <div className={localStyle.styleBox2}>
        
        <label className={localStyle.styleBox3}>
          <span className={localStyle.styleBox4}>Nombre de la Composición:</span>
          <input type="text" value={comp.nombre || ""} onChange={e => actualizarComposicionTFT({
          nombre: e.target.value
        })} className={localStyle.styleBox5} />
        </label>
        
        <label className={localStyle.styleBox3}>
          <span className={localStyle.styleBox4}>Url de la Composición:</span>
          <input type="text" value={comp.urlSEO || ""} onChange={e => actualizarComposicionTFT({
          urlSEO: e.target.value
        })} className={localStyle.styleBox5} />
        </label>

        <label className={localStyle.styleBox3}>
          <span className={localStyle.styleBox4}>Tier:</span>
          <select value={comp.tier || ""} onChange={e => actualizarComposicionTFT({
          tier: e.target.value
        })} className={localStyle.styleBox5}>
            <option value="">Seleccionar Tier</option>
            {tiers.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label className={localStyle.styleBox3}>
          <span className={localStyle.styleBox4}>Tier Extra "H" o "X":</span>
          <select value={comp.tierExtra || ""} onChange={e => actualizarComposicionTFT({
          tierExtra: e.target.value
        })} className={localStyle.styleBox5}>
            <option value={comp.tierExtra || "N/A"}>{comp.tierExtra || "Seleccionar Tier Extra"}</option>
            {tiersExtras.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        
        <label className={localStyle.styleBox3}>
          <span className={localStyle.styleBox4}>Posición en el Tier:</span>
          <input type="number" min={1} max={15} value={comp.posicion || 0} onChange={e => actualizarComposicionTFT({
          posicion: e.target.value
        })} className={localStyle.styleBox5} />
        </label>
        
        <label className={localStyle.styleBox3}>
          <span className={localStyle.styleBox4}>Dificultad:</span>
          <select value={comp.dificultad || ""} onChange={e => actualizarComposicionTFT({
          dificultad: e.target.value
        })} className={localStyle.styleBox5}>
            <option value="">Seleccionar Dificultad</option>
            {dificultades.Es.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label className={localStyle.styleBox3}>
          <span className={localStyle.styleBox4}>Categoría:</span>
          <select value={comp.categoria || ""} onChange={e => actualizarComposicionTFT({
          categoria: e.target.value
        })} className={localStyle.styleBox5}>
            <option value="">Seleccionar Categoría</option>
            {categorias.Es.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label className={localStyle.styleBox3}>
          <span className={localStyle.styleBox4}>Tipo de Daño:</span>
          <select value={comp.tipoDeDano || ""} onChange={e => actualizarComposicionTFT({
          tipoDeDano: e.target.value
        })} className={localStyle.styleBox5}>
            <option value="">Seleccionar Daño</option>
            {dañoTipo.Es.map((option, idx) => <option key={idx} value={option}>{option}</option>)}
          </select>
        </label>

        <label className={localStyle.styleBox6}>
          <input type="checkbox" checked={comp.ocultar} onChange={e => actualizarComposicionTFT({
          ocultar: e.target.checked
        })} />
          <span className={localStyle.styleBox4}>¿Ocultar Composición?</span>
        </label>
        
      </div>
    </div>;
};

// 0. Campeón Meta
const CampeonMetaVisual = () => {
  const comp = useStore(datosCompos);
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);
  const AllAugments = useStore(dataTFTAllAugments);
  const updateField = (field, value) => {
    const newCampeonMeta = {
      ...(comp.campeonMeta || {})
    };
    if (field.startsWith("item")) {
      const idx = parseInt(field.replace("item", ""));
      if (!newCampeonMeta.apiNameItemsDelCampeon) newCampeonMeta.apiNameItemsDelCampeon = ["", "", ""];
      newCampeonMeta.apiNameItemsDelCampeon[idx] = value;
    } else {
      newCampeonMeta[field] = value;
    }
    actualizarComposicionTFT({
      campeonMeta: newCampeonMeta
    });
  };
  const champ = comp.campeonMeta?.apiNameCampeon;
  const items = comp.campeonMeta?.apiNameItemsDelCampeon || ["", "", ""];
  const emblema = comp.campeonMeta?.emblema;
  const aumento = comp.campeonMeta?.aumento;
  const estrellas = comp.campeonMeta?.estrellas === 3;
  const isChampValid = allChampionsTFT?.some(c => c.apiName === champ);
  const isAumentoValid = AllAugments?.some(a => a.apiName === aumento);
  const isEmblemaValid = allItemsTFT?.some(i => i.apiName === emblema);
  return <div className={`${style.cBoxTitleInfo} ${localStyle.styleBox7}`}>
      <span className={style.tBox}>Campeón Meta</span>
      <div className={localStyle.styleBox8}>
        
        {/* Campeón */}
        <div className={localStyle.styleBox9}>
          <span className={localStyle.styleBox4}>Campeón</span>
          <div onDragOver={e => e.preventDefault()} onDrop={e => {
          e.preventDefault();
          const c = e.dataTransfer.getData("campeon");
          if (c) updateField("apiNameCampeon", JSON.parse(c).apiName || JSON.parse(c).name);
        }} onDoubleClick={() => updateField("apiNameCampeon", "")} onContextMenu={e => {
          e.preventDefault();
          updateField("estrellas", estrellas ? 1 : 3);
        }} style={{
          border: !isChampValid ? '2px dashed #777' : 'none'
        }} title="Arrastra el campeón. Doble clic para borrar. Clic derecho para cambiar 3 estrellas" className={localStyle.styleBox10}>
            {isChampValid && <ImgCampeon championData={allChampionsTFT.find(c => c.apiName === champ)} imgType="tileIcon" showName={false} />}
            {estrellas && <img src="/tft/assets/3-estrellas.webp" alt="3 estrellas" className={localStyle.styleBox11} />}
            {!isChampValid && <span className={localStyle.styleBox12}>Champ</span>}
          </div>
        </div>

        {/* Ítems */}
        <div className={localStyle.styleBox3}>
          <span className={localStyle.styleBox13}>Ítems</span>
          <div className={localStyle.styleBox14}>
            {[0, 1, 2].map(idx => {
            const apiNameItem = items[idx];
            const isItemValid = allItemsTFT?.some(i => i.apiName === apiNameItem);
            return <div key={idx} onDragOver={e => e.preventDefault()} onDrop={e => {
              e.preventDefault();
              const i = e.dataTransfer.getData("item");
              if (i) updateField(`item${idx}`, JSON.parse(i).apiName);
            }} onDoubleClick={() => updateField(`item${idx}`, "")} style={{
              border: !isItemValid ? '2px dashed #777' : 'none'
            }} title="Arrastra el ítem. Doble clic para borrar." className={localStyle.styleBox15}>
                  {isItemValid && <ImgItem item={allItemsTFT.find(i => i.apiName === apiNameItem)} />}
                  {!isItemValid && <span className={localStyle.styleBox16}>{idx + 1}</span>}
                </div>;
          })}
          </div>
        </div>

        {/* Emblema */}
        <div className={localStyle.styleBox9}>
          <span className={localStyle.styleBox4}>Emblema</span>
          <div onDragOver={e => e.preventDefault()} onDrop={e => {
          e.preventDefault();
          const i = e.dataTransfer.getData("item");
          if (i) updateField("emblema", JSON.parse(i).apiName);
        }} onDoubleClick={() => updateField("emblema", "")} style={{
          border: !isEmblemaValid ? '2px dashed #777' : 'none'
        }} title="Arrastra el emblema. Doble clic para borrar." className={localStyle.styleBox15}>
            {isEmblemaValid && <ImgItem item={allItemsTFT.find(i => i.apiName === emblema)} />}
            {!isEmblemaValid && <span className={localStyle.styleBox16}>Emb</span>}
          </div>
        </div>

        {/* Aumento */}
        <div className={localStyle.styleBox9}>
          <span className={localStyle.styleBox4}>Aumento</span>
          <div onDragOver={e => e.preventDefault()} onDrop={e => {
          e.preventDefault();
          const a = e.dataTransfer.getData("augment");
          if (a) updateField("aumento", JSON.parse(a).apiName);
        }} onDoubleClick={() => updateField("aumento", "")} style={{
          border: !isAumentoValid ? '2px dashed #777' : 'none'
        }} title="Arrastra el aumento. Doble clic para borrar." className={localStyle.styleBox15}>
            {isAumentoValid && <ImgAugment augment={AllAugments.find(a => a.apiName === aumento)} />}
            {!isAumentoValid && <span className={localStyle.styleBox16}>Aug</span>}
          </div>
        </div>

      </div>
    </div>;
};

// 1. Preliminares OP (Condiciones)
const PreliminaresOPVisual = () => {
  const comp = useStore(datosCompos);
  const AllItems = useStore(dataTFTAllItems);
  const AllAugments = useStore(dataTFTAllAugments);
  const allChampionsTFT = useStore(dataTFTChampions);
  const addCondicion = (tipo, apiName, index = null) => {
    const newCondiciones = [...(comp.condiciones || [])];
    if (index === null) {
      const isEarly = true; // Por defecto lo metemos en early? No, esto es OP. Las OP son 'early' y 'op: true'.
      newCondiciones.push({
        apiNameGrande: tipo === 'grande' ? apiName : "",
        ApiNamePequeno: tipo === 'pequeno' ? apiName : "",
        op: true,
        early: true
      });
    } else {
      if (tipo === 'grande') newCondiciones[index].apiNameGrande = apiName;
      if (tipo === 'pequeno') newCondiciones[index].ApiNamePequeno = apiName;
    }
    actualizarComposicionTFT({
      condiciones: newCondiciones
    });
  };
  const removeCondicion = index => {
    const newCondiciones = [...(comp.condiciones || [])];
    newCondiciones.splice(index, 1);
    actualizarComposicionTFT({
      condiciones: newCondiciones
    });
  };
  return <div className={`${style.cBoxTitleInfo} ${style.cCondicionOpEarly} ${localStyle.styleBox17}`}>
      <span className={style.tBox}>Preliminares OP</span>
      <div className={`${style.cCondicionOpEarlyImg} ${localStyle.styleBox18}`}>
        {(comp.condiciones || []).map((condicion, index) => {
        if (condicion.early && condicion.op) {
          const condicionGrande = condicion.apiNameGrande;
          const condicionPequeno = condicion.ApiNamePequeno;
          const isCondicionGrandeAugment = AllAugments?.some(item => item.apiName === condicionGrande);
          const isCondicionPequenoAugment = AllAugments?.some(item => item.apiName === condicionPequeno);
          const isCondicionGrandeItem = AllItems?.some(item => item.apiName === condicionGrande);
          const isCondicionPequenoItem = AllItems?.some(item => item.apiName === condicionPequeno);
          const isCondicionGrandeChamp = allChampionsTFT?.some(champ => champ.apiName === condicionGrande);
          const isCondicionPequenoChamp = allChampionsTFT?.some(champ => champ.apiName === condicionPequeno);
          return <div key={index} className={`${style.cCondicionOP} ${localStyle.styleBox19}`}>
                <div className={`${style.cCondicionGrande} ${localStyle.styleBox20}`} onDragOver={e => e.preventDefault()} onDrop={e => {
              e.preventDefault();
              const aug = e.dataTransfer.getData("augment");
              const item = e.dataTransfer.getData("item");
              const champ = e.dataTransfer.getData("campeon");
              if (aug) addCondicion('grande', JSON.parse(aug).apiName, index);
              if (item) addCondicion('grande', JSON.parse(item).apiName, index);
              if (champ) addCondicion('grande', JSON.parse(champ).apiName || JSON.parse(champ).name, index);
            }} onDoubleClick={() => addCondicion('grande', "", index)} style={{
              border: !condicionGrande ? '1px dashed #777' : 'none'
            }}>
                  {isCondicionGrandeAugment && <ImgAugment augment={AllAugments.find(item => item.apiName === condicionGrande)} />}
                  {isCondicionGrandeItem && <ImgItem item={AllItems.find(item => item.apiName === condicionGrande)} />}
                  {isCondicionGrandeChamp && <ImgCampeon championData={allChampionsTFT.find(champ => champ.apiName === condicionGrande)} imgType="icon" />}
                  {!condicionGrande && <span className={localStyle.styleBox16}>Grande</span>}
                  <div className={style.opAumento}>
                    <span className={style.textOP}>OP</span>
                  </div>
                </div>
                
                <div className={`${style.cCondicionPequeno} ${localStyle.styleBox21}`} onDragOver={e => e.preventDefault()} onDrop={e => {
              e.preventDefault();
              const aug = e.dataTransfer.getData("augment");
              const item = e.dataTransfer.getData("item");
              const champ = e.dataTransfer.getData("campeon");
              if (aug) addCondicion('pequeno', JSON.parse(aug).apiName, index);
              if (item) addCondicion('pequeno', JSON.parse(item).apiName, index);
              if (champ) addCondicion('pequeno', JSON.parse(champ).apiName || JSON.parse(champ).name, index);
            }} onDoubleClick={() => addCondicion('pequeno', "", index)} style={{
              border: !condicionPequeno ? '1px dashed #777' : 'none'
            }}>
                  {isCondicionPequenoAugment && <ImgAugment augment={AllAugments.find(item => item.apiName === condicionPequeno)} />}
                  {isCondicionPequenoItem && <ImgItem item={AllItems.find(item => item.apiName === condicionPequeno)} />}
                  {isCondicionPequenoChamp && <ImgCampeon championData={allChampionsTFT.find(champ => champ.apiName === condicionPequeno)} imgType="tileIcon" showName={false} />}
                  {!condicionPequeno && <span className={localStyle.styleBox16}>Pequeño</span>}
                </div>
                
                <button onClick={() => removeCondicion(index)} className={localStyle.styleBox22}>X</button>
              </div>;
        }
        return null;
      })}

        {/* Zona para añadir una nueva Condición OP */}
        <div onDragOver={e => e.preventDefault()} onDrop={e => {
        e.preventDefault();
        const aug = e.dataTransfer.getData("augment");
        const item = e.dataTransfer.getData("item");
        if (aug) addCondicion('grande', JSON.parse(aug).apiName);
        if (item) addCondicion('grande', JSON.parse(item).apiName);
      }} className={localStyle.styleBox23}>
          <span className={localStyle.styleBox24}>Soltar aquí</span>
        </div>
      </div>
    </div>;
};
const FundamentalsVisual = () => {
  const comp = useStore(datosCompos);
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);
  const addCampeonEarly = apiName => {
    const newCampeonesEarly = [...(comp.campeonesEarly || [])];
    newCampeonesEarly.push({
      apiNameCampeon: apiName,
      apiNameItemsDelCampeon: []
    });
    actualizarComposicionTFT({
      campeonesEarly: newCampeonesEarly
    });
  };
  const removeCampeonEarly = index => {
    const newCampeonesEarly = [...(comp.campeonesEarly || [])];
    newCampeonesEarly.splice(index, 1);
    actualizarComposicionTFT({
      campeonesEarly: newCampeonesEarly
    });
  };
  const addItemPrio = apiName => {
    const newItemsPrio = [...(comp.itemsPrio || [])];
    newItemsPrio.push(apiName);
    actualizarComposicionTFT({
      itemsPrio: newItemsPrio
    });
  };
  const removeItemPrio = index => {
    const newItemsPrio = [...(comp.itemsPrio || [])];
    newItemsPrio.splice(index, 1);
    actualizarComposicionTFT({
      itemsPrio: newItemsPrio
    });
  };
  return <div className={`${style.cBoxTitleInfo} ${style.cFundamentals} ${localStyle.styleBox25}`}>
      <span className={style.tBox}>Fundamentals</span>
      <div className={style.cFundamentalsInfo}>
        <div className={`${style.cBoxTitleInfo} ${style.cCampeonesPrio}`}>
          <span className={style.tBox}>Campeones Prio en Early</span>
          <div className={style.cCampeonesPrioInfo}>
            <div className={`${style.cCampeonesEarly} ${localStyle.styleBox26}`}>
              {(comp.campeonesEarly || []).map((champ, index) => {
              const champData = allChampionsTFT?.find(c => c.apiName === champ.apiNameCampeon);
              const imgUrl = champData?.tileIcon ? champData.tileIcon.includes("http") ? champData.tileIcon.toLowerCase().replace(".tex", ".png") : getLocalTftImage(champData.tileIcon, 'champions/tileIcon') : null;
              if (imgUrl) {
                return <div key={index} className={localStyle.styleBox27}>
                    <ImgCampeon championData={champData} imgType="tileIcon" showName={false} />
                    <button onClick={() => removeCampeonEarly(index)} className={localStyle.styleBox22}>X</button>
                  </div>;
              }
            })}
              <div onDragOver={e => e.preventDefault()} onDrop={e => {
              e.preventDefault();
              const c = e.dataTransfer.getData("campeon");
              if (c) addCampeonEarly(JSON.parse(c).apiName || JSON.parse(c).name);
            }} className={localStyle.styleBox28}>
                <span className={localStyle.styleBox29}>+</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.cBoxTitleInfo} ${style.cPrioridadObjetos}`}>
          <span className={style.tBox}>Prioridad de Objetos</span>
          <div className={`${style.cPrioridadObjetosInfo} ${localStyle.styleBox30}`}>
            {(comp.itemsPrio || []).map((itemName, index) => {
            const itemData = allItemsTFT?.find(i => i.apiName === itemName);
            return itemData ? <React.Fragment key={index}>
                  <div className={`${style.carouselItem} ${localStyle.styleBox31}`}>
                    <ImgItem item={itemData} />
                    <button onClick={() => removeItemPrio(index)} className={localStyle.styleBox22}>X</button>
                  </div>
                  {index < (comp.itemsPrio || []).length - 1 && <span className={style.mayorQue}>{'>'}</span>}
                </React.Fragment> : null;
          })}
            <div onDragOver={e => e.preventDefault()} onDrop={e => {
            e.preventDefault();
            const item = e.dataTransfer.getData("item");
            if (item) addItemPrio(JSON.parse(item).apiName);
          }} className={localStyle.styleBox32}>
              <span className={localStyle.styleBox33}>+</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
const AumentosVisual = ({
  title,
  isEarly
}) => {
  const comp = useStore(datosCompos);
  const AllAugments = useStore(dataTFTAllAugments);
  const addAumento = apiName => {
    const newAumentos = [...(comp.aumentos || [])];
    newAumentos.push({
      apiNameGrande: apiName,
      op: false,
      early: isEarly
    });
    actualizarComposicionTFT({
      aumentos: newAumentos
    });
  };
  const removeAumento = index => {
    const newAumentos = [...(comp.aumentos || [])];
    newAumentos.splice(index, 1);
    actualizarComposicionTFT({
      aumentos: newAumentos
    });
  };
  const toggleOp = (index, e) => {
    e.preventDefault();
    const newAumentos = [...(comp.aumentos || [])];
    newAumentos[index].op = !newAumentos[index].op;
    actualizarComposicionTFT({
      aumentos: newAumentos
    });
  };
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("aumentoIndex", index);
  };
  const handleDrop = (e, targetIndex) => {
    const fromIndexRaw = e.dataTransfer.getData("aumentoIndex");
    if (fromIndexRaw !== "") {
      e.stopPropagation();
      const fromIndex = parseInt(fromIndexRaw, 10);
      if (fromIndex === targetIndex) return;
      const newAumentos = [...(comp.aumentos || [])];
      const itemToMove = newAumentos[fromIndex];
      newAumentos.splice(fromIndex, 1);
      const toIndex = targetIndex > fromIndex ? targetIndex - 1 : targetIndex;
      newAumentos.splice(toIndex, 0, itemToMove);
      actualizarComposicionTFT({
        aumentos: newAumentos
      });
    }
  };
  return <div className={`${style.cBoxTitleInfo} ${style.cAumentos} ${localStyle.styleBox17}`}>
      <span className={style.tBox}>{title}</span>
      <div className={`${style.cAumentosInfo} ${localStyle.styleBox18}`}>
        {(comp.aumentos || []).map((aumento, globalIndex) => {
        if (!!aumento.early === isEarly && aumento.apiNameGrande) {
          return <div key={globalIndex} className={`${style.cAumento} ${localStyle.styleBox34}`} draggable onDragStart={e => handleDragStart(e, globalIndex)} onDragOver={e => e.preventDefault()} onDrop={e => handleDrop(e, globalIndex)} onContextMenu={e => toggleOp(globalIndex, e)} title="Arrastra para reordenar. Click derecho para marcar como OP">
                <ImgAugment augment={AllAugments?.find(item => item.apiName === aumento.apiNameGrande)} />
                {aumento.op && <div className={style.opAumento}>
                    <span className={style.textOP}>OP</span>
                  </div>}
                <button onClick={() => removeAumento(globalIndex)} className={localStyle.styleBox22}>X</button>
              </div>;
        }
        return null;
      })}
        <div onDragOver={e => e.preventDefault()} onDrop={e => {
        e.preventDefault();
        const aug = e.dataTransfer.getData("augment");
        if (aug) addAumento(JSON.parse(aug).apiName);
      }} className={localStyle.styleBox35}>
          <span className={localStyle.styleBox36}>Soltar aquí</span>
        </div>
      </div>
    </div>;
};
const NivelesVisual = () => {
  const comp = useStore(datosCompos);
  const allChampionsTFT = useStore(dataTFTChampions);
  const addLevel = () => {
    const nuevosNiveles = [...(comp.niveles || [])];
    nuevosNiveles.push({
      lv: 1,
      etapa: 1,
      ronda: 1,
      roll: false,
      campeones: []
    });
    actualizarComposicionTFT({
      niveles: nuevosNiveles
    });
  };
  const removeLevel = index => {
    const nuevosNiveles = [...(comp.niveles || [])];
    nuevosNiveles.splice(index, 1);
    actualizarComposicionTFT({
      niveles: nuevosNiveles
    });
  };
  const updateLevel = (index, field, value) => {
    const nuevosNiveles = [...(comp.niveles || [])];
    nuevosNiveles[index][field] = value;
    actualizarComposicionTFT({
      niveles: nuevosNiveles
    });
  };
  const addChampion = (levelIndex, apiName) => {
    const nuevosNiveles = [...(comp.niveles || [])];
    if (!nuevosNiveles[levelIndex].campeones) nuevosNiveles[levelIndex].campeones = [];
    nuevosNiveles[levelIndex].campeones.push({
      apiNameCampeon: apiName,
      estrella: 1,
      apiNameItemsDelCampeon: []
    });
    actualizarComposicionTFT({
      niveles: nuevosNiveles
    });
  };
  const removeChampion = (levelIndex, champIndex) => {
    const nuevosNiveles = [...(comp.niveles || [])];
    nuevosNiveles[levelIndex].campeones.splice(champIndex, 1);
    actualizarComposicionTFT({
      niveles: nuevosNiveles
    });
  };
  return <div className={`${style.cBoxTitleInfo} ${style.cNiveles}`}>
      <span className={style.tBox}>Niveles</span>
      <div className={localStyle.styleBox37}>
        {(comp.niveles || []).map((nivel, levelIndex) => <div key={levelIndex} className={localStyle.styleBox38}>
            <div className={localStyle.styleBox39}>
              <label>Nivel: <input type="number" value={nivel.lv} onChange={e => updateLevel(levelIndex, 'lv', parseInt(e.target.value) || 0)} className={localStyle.styleBox40} /></label>
              <label>Etapa: <input type="number" value={nivel.etapa} onChange={e => updateLevel(levelIndex, 'etapa', parseInt(e.target.value) || 0)} className={localStyle.styleBox40} /></label>
              <label>Ronda: <input type="number" value={nivel.ronda} onChange={e => updateLevel(levelIndex, 'ronda', parseInt(e.target.value) || 0)} className={localStyle.styleBox40} /></label>
              <label className={localStyle.styleBox41}>
                <input type="checkbox" checked={nivel.roll} onChange={e => updateLevel(levelIndex, 'roll', e.target.checked)} />
                ¿Hacer Roll?
              </label>
              <button onClick={() => removeLevel(levelIndex)} className={localStyle.styleBox42}>X Nivel</button>
            </div>
            <div className={localStyle.styleBox43}>
              {(nivel.campeones || []).map((champ, champIndex) => {
            if (!champ.apiNameCampeon) return null;
            const champData = allChampionsTFT?.find(c => c.apiName === champ.apiNameCampeon);
            const imgUrl = champData?.tileIcon ? champData.tileIcon.includes("http") ? champData.tileIcon.toLowerCase().replace(".tex", ".png") : getLocalTftImage(champData.tileIcon, 'champions/tileIcon') : null;
            return <div key={champIndex} className={localStyle.styleBox44}>
                    {imgUrl ? <img src={imgUrl} alt={champ.apiNameCampeon} className={localStyle.styleBox45} /> : <span>?</span>}
                    <button onClick={() => removeChampion(levelIndex, champIndex)} className={localStyle.styleBox22}>X</button>
                  </div>;
          })}
              <div onDragOver={e => e.preventDefault()} onDrop={e => {
            e.preventDefault();
            const c = e.dataTransfer.getData("campeon");
            if (c) addChampion(levelIndex, JSON.parse(c).apiName || JSON.parse(c).name);
          }} className={localStyle.styleBox46}>
                <span className={localStyle.styleBox47}>+</span>
              </div>
            </div>
          </div>)}
        <button onClick={addLevel} className={localStyle.styleBox48}>+ Añadir Nivel</button>
      </div>
    </div>;
};
const PosicionamientoVisual = () => {
  const comp = useStore(datosCompos);
  const addTablero = () => {
    const nuevoPosicionamiento = [...(comp.posicionamiento || [])];
    nuevoPosicionamiento.push({
      tablero: Array(28).fill(null),
      info: ""
    });
    actualizarComposicionTFT({
      posicionamiento: nuevoPosicionamiento
    });
  };
  const removeTablero = index => {
    const nuevoPosicionamiento = [...(comp.posicionamiento || [])];
    nuevoPosicionamiento.splice(index, 1);
    actualizarComposicionTFT({
      posicionamiento: nuevoPosicionamiento
    });
  };
  return <div className={`${style.cBoxTitleInfo} ${style.cPosicionamiento}`}>
      <span className={style.tBox}>Posicionamiento</span>
      <div className={`${style.cPosicionamientoInfo} ${localStyle.styleBox49}`}>
        {(comp.posicionamiento || []).map((pos, index) => <div key={index} className={localStyle.styleBox50}>
            <div className={localStyle.styleBox51}>
              <strong>Tablero {index + 1}</strong>
              <button onClick={() => removeTablero(index)} className={localStyle.styleBox52}>X Tablero</button>
            </div>
            <div className={style.containerSinergiasActivas}>
              <Sinergias sinergias={pos.tablero} orientacion={"horizontal"} show={true} version={"latest" || comp?.version} />
            </div>
            <NuevoBuilderTFT posicionIndex={index} />
          </div>)}
        <button onClick={addTablero} className={localStyle.styleBox48}>+ Añadir Tablero</button>
      </div>
    </div>;
};
const BestBuildYMejoresItemsVisual = () => {
  const comp = useStore(datosCompos);
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);
  const bestBuild = comp.bestBuild || [];

  // En lugar de usar mejoresItems del store para Artefactos etc, los guardaremos en la DB, pero necesitamos el estado para el formulario
  // El store actual tiene mejoresItems { Artefactos: [], Radiantes: [], Emblemas: [], Especiales: [] }
  const mejoresItems = comp.mejoresItems || {
    Artefactos: [],
    Radiantes: [],
    Emblemas: [],
    Especiales: []
  };
  const handleMejoresItemsUpdate = newMejoresItems => {
    actualizarComposicionTFT({
      mejoresItems: newMejoresItems
    });
  };
  const addBestBuildRow = () => {
    const newBestBuild = [...bestBuild];
    newBestBuild.push({
      apiNameCampeon: "",
      apiNameItemsBisDelCampeon: [["", "", ""]],
      apiNameItemsSpecialBisDelCampeon: [["", "", ""]]
    });
    actualizarComposicionTFT({
      bestBuild: newBestBuild
    });
  };
  const removeBestBuildRow = index => {
    const newBestBuild = [...bestBuild];
    newBestBuild.splice(index, 1);
    actualizarComposicionTFT({
      bestBuild: newBestBuild
    });
  };
  const updateBestBuildChamp = (index, apiName) => {
    const newBestBuild = [...bestBuild];
    newBestBuild[index].apiNameCampeon = apiName;
    actualizarComposicionTFT({
      bestBuild: newBestBuild
    });

    // Si queremos sincronizar automáticamente el campeón a mejoresItems:
    if (apiName) {
      const newMejoresItems = {
        ...mejoresItems
      };
      ["Artefactos", "Radiantes", "Emblemas", "Especiales"].forEach(cat => {
        // Asegurar que exista el array
        if (!newMejoresItems[cat]) newMejoresItems[cat] = [];
        // Ver si ya existe este campeón en esta categoría
        if (!newMejoresItems[cat].find(c => c.apiNameCampeon === apiName)) {
          newMejoresItems[cat].push({
            apiNameCampeon: apiName,
            apiNameItemsDelCampeon: []
          });
        }
      });
      handleMejoresItemsUpdate(newMejoresItems);
    }
  };
  const updateBestBuildItem = (rowIndex, type, listIdx, itemIndex, itemApiName) => {
    const newBestBuild = [...bestBuild];
    if (!newBestBuild[rowIndex][type]) newBestBuild[rowIndex][type] = [["", "", ""]];
    const newItemsList = [...newBestBuild[rowIndex][type]];
    const newItems = [...newItemsList[listIdx]];
    newItems[itemIndex] = itemApiName;
    if (itemApiName === "") newItems.splice(itemIndex, 1, "");
    newItemsList[listIdx] = newItems;
    newBestBuild[rowIndex][type] = newItemsList;
    actualizarComposicionTFT({
      bestBuild: newBestBuild
    });
  };
  const addItemsRowToBestBuild = (rowIndex, type) => {
    const newBestBuild = [...bestBuild];
    if (!newBestBuild[rowIndex][type]) newBestBuild[rowIndex][type] = [["", "", ""]];
    newBestBuild[rowIndex][type].push(["", "", ""]);
    actualizarComposicionTFT({
      bestBuild: newBestBuild
    });
  };
  const removeItemsRowFromBestBuild = (rowIndex, type, listIdx) => {
    const newBestBuild = [...bestBuild];
    newBestBuild[rowIndex][type].splice(listIdx, 1);
    if (newBestBuild[rowIndex][type].length === 0) {
      newBestBuild[rowIndex][type].push(["", "", ""]);
    }
    actualizarComposicionTFT({
      bestBuild: newBestBuild
    });
  };
  const updateMejoresItems = (cat, champApiName, itemsArr) => {
    const newMejoresItems = {
      ...mejoresItems
    };
    const catArray = [...(newMejoresItems[cat] || [])];
    const idx = catArray.findIndex(c => c.apiNameCampeon === champApiName);
    if (idx !== -1) {
      catArray[idx] = {
        ...catArray[idx],
        apiNameItemsDelCampeon: itemsArr
      };
    } else {
      catArray.push({
        apiNameCampeon: champApiName,
        apiNameItemsDelCampeon: itemsArr
      });
    }
    newMejoresItems[cat] = catArray;
    handleMejoresItemsUpdate(newMejoresItems);
  };

  // const guardarMejoresItemsEnBD = async () => {
  //   try {
  //     const token = import.meta.env.PUBLIC_TOKEN_META || "dummy_token";

  //     const championsToSave = {};
  //     const categorias = ["Artefactos", "Radiantes", "Emblemas", "Especiales"];

  //     categorias.forEach(cat => {
  //       (mejoresItems[cat] || []).forEach(row => {
  //         if (!row.apiNameCampeon) return;
  //         if (!championsToSave[row.apiNameCampeon]) {
  //           championsToSave[row.apiNameCampeon] = { Artefactos: [], Radiantes: [], Emblemas: [], Especiales: [] };
  //         }
  //         championsToSave[row.apiNameCampeon][cat] = [
  //           ...(championsToSave[row.apiNameCampeon][cat] || []),
  //           ...(row.apiNameItemsDelCampeon || [])
  //         ];
  //       });
  //     });

  //     const campeonesArray = Object.keys(championsToSave).map(apiName => ({
  //       apiNameCampeon: apiName,
  //       itemsData: championsToSave[apiName]
  //     }));

  //     if (campeonesArray.length === 0) {
  //       alert("No hay campeones con ítems (Artefactos/Radiantes/Emblemas/Especiales) para guardar en la BD.");
  //       return;
  //     }

  //     const res = await fetch("https://api.guiadeparche.com/tft/mejoresItemsCampeon.php", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({ campeones: campeonesArray })
  //     });
  //     const data = await res.json();
  //     alert("Guardado Mejores Ítems en BD: " + (data.message || "Éxito"));
  //   } catch (err) {
  //     alert("Error al guardar Mejores Ítems: " + err.message);
  //   }
  // };

  return <div className={`${style.cBoxTitleInfo} ${style.cBestItems}`}>
      <span className={style.tBox}>Mejores Builds y Objetos Extra</span>
      <div className={`${style.cBestItemsInfo} ${localStyle.styleBox53}`}>
        
        {bestBuild.map((build, rowIndex) => {
        const champData = allChampionsTFT?.find(c => c.apiName === build.apiNameCampeon);
        const champImgUrl = champData?.tileIcon ? champData.tileIcon.includes("http") ? champData.tileIcon.toLowerCase().replace(".tex", ".png") : getLocalTftImage(champData.tileIcon, 'champions/tileIcon') : null;
        return <div key={rowIndex} className={localStyle.styleBox54}>
              <div className={localStyle.styleBox55}>
                
                {/* Campeón D&D */}
                <div style={{
              border: champImgUrl ? 'none' : '2px dashed #0af'
            }} onDragOver={e => e.preventDefault()} onDrop={e => {
              e.preventDefault();
              const c = e.dataTransfer.getData("campeon");
              if (c) updateBestBuildChamp(rowIndex, JSON.parse(c).apiName || JSON.parse(c).name);
            }} onDoubleClick={() => updateBestBuildChamp(rowIndex, "")} className={localStyle.styleBox56}>
                  {champImgUrl ? <img src={champImgUrl} alt={build.apiNameCampeon} className={localStyle.styleBox57} /> : <span className={localStyle.styleBox58}>Arrastrar Campeón</span>}
                </div>

                {/* BIS y Special BIS */}
                <div className={localStyle.styleBox59}>
                  {/* Item BIS */}
                  <div className={localStyle.styleBox25}>
                    <strong className={localStyle.styleBox60}>Item BIS (Principal)</strong>
                    {(build.apiNameItemsBisDelCampeon || [["", "", ""]]).map((itemList, listIdx) => <div key={listIdx} className={localStyle.styleBox61}>
                        {[0, 1, 2].map(itemIndex => {
                    const apiNameItem = itemList[itemIndex];
                    const itemData = allItemsTFT?.find(i => i.apiName === apiNameItem);
                    const itemImgUrl = itemData?.icon ? itemData.icon.includes("http") ? itemData.icon.toLowerCase().replace(".tex", ".png") : getLocalTftImage(itemData.icon, 'items') : null;
                    return <div key={itemIndex} draggable={!!itemImgUrl} onDragStart={e => {
                      e.dataTransfer.setData("text/plain", apiNameItem);
                    }} onDragEnd={e => {
                      if (e.dataTransfer.dropEffect === "none") {
                        updateBestBuildItem(rowIndex, "apiNameItemsBisDelCampeon", listIdx, itemIndex, "");
                      }
                    }} onDragOver={e => e.preventDefault()} onDrop={e => {
                      e.preventDefault();
                      const item = e.dataTransfer.getData("item");
                      if (item) updateBestBuildItem(rowIndex, "apiNameItemsBisDelCampeon", listIdx, itemIndex, JSON.parse(item).apiName);
                    }} onDoubleClick={() => updateBestBuildItem(rowIndex, "apiNameItemsBisDelCampeon", listIdx, itemIndex, "")} className={localStyle.styleBox62}>
                              {itemImgUrl && <img src={itemImgUrl} alt={apiNameItem} className={localStyle.styleBox45} />}
                            </div>;
                  })}
                        <button onClick={() => removeItemsRowFromBestBuild(rowIndex, "apiNameItemsBisDelCampeon", listIdx)} className={localStyle.styleBox63}>-</button>
                      </div>)}
                    <button onClick={() => addItemsRowToBestBuild(rowIndex, "apiNameItemsBisDelCampeon")} className={localStyle.styleBox64}>+ Fila BIS</button>
                  </div>
                  
                  <div className={localStyle.styleBox25}>
                    <strong className={localStyle.styleBox60}>Special BIS (Situacional)</strong>
                    {(build.apiNameItemsSpecialBisDelCampeon || [["", "", ""]]).map((itemList, listIdx) => <div key={listIdx} className={localStyle.styleBox65}>
                        {[0, 1, 2].map(itemIndex => {
                    const apiNameItem = itemList[itemIndex];
                    const itemData = allItemsTFT?.find(i => i.apiName === apiNameItem);
                    const itemImgUrl = itemData?.icon ? itemData.icon.includes("http") ? itemData.icon.toLowerCase().replace(".tex", ".png") : getLocalTftImage(itemData.icon, 'items') : null;
                    return <div key={itemIndex} draggable={!!itemImgUrl} onDragStart={e => {
                      e.dataTransfer.setData("text/plain", apiNameItem);
                    }} onDragEnd={e => {
                      if (e.dataTransfer.dropEffect === "none") {
                        updateBestBuildItem(rowIndex, "apiNameItemsSpecialBisDelCampeon", listIdx, itemIndex, "");
                      }
                    }} onDragOver={e => e.preventDefault()} onDrop={e => {
                      e.preventDefault();
                      const item = e.dataTransfer.getData("item");
                      if (item) updateBestBuildItem(rowIndex, "apiNameItemsSpecialBisDelCampeon", listIdx, itemIndex, JSON.parse(item).apiName);
                    }} onDoubleClick={() => updateBestBuildItem(rowIndex, "apiNameItemsSpecialBisDelCampeon", listIdx, itemIndex, "")} className={localStyle.styleBox62}>
                              {itemImgUrl && <img src={itemImgUrl} alt={apiNameItem} className={localStyle.styleBox45} />}
                            </div>;
                  })}
                        <button onClick={() => removeItemsRowFromBestBuild(rowIndex, "apiNameItemsSpecialBisDelCampeon", listIdx)} className={localStyle.styleBox63}>-</button>
                      </div>)}
                    <button onClick={() => addItemsRowToBestBuild(rowIndex, "apiNameItemsSpecialBisDelCampeon")} className={localStyle.styleBox64}>+ Fila Special</button>
                  </div>
                </div>

                <button onClick={() => removeBestBuildRow(rowIndex)} className={localStyle.styleBox66}>X</button>
              </div>

              {/* Extras (Artefactos, Radiantes, Emblemas, Especiales) para este campeón */}
              {build.apiNameCampeon && <div className={localStyle.styleBox67}>
                  <p className={localStyle.styleBox68}>Extra Items (se guardarán en BD independiente)</p>
                  <div className={localStyle.styleBox69}>
                    {["Artefactos", "Radiantes", "Emblemas", "Especiales"].map(cat => {
                const catData = mejoresItems[cat]?.find(c => c.apiNameCampeon === build.apiNameCampeon);
                const itemsArr = catData?.apiNameItemsDelCampeon || [];
                return <div key={cat} className={localStyle.styleBox70}>
                          <strong className={localStyle.styleBox71}>{cat}</strong>
                          <div onDragOver={e => e.preventDefault()} onDrop={e => {
                    e.preventDefault();
                    const itemRaw = e.dataTransfer.getData("item");
                    if (itemRaw) {
                      const itemObj = JSON.parse(itemRaw);
                      if (!itemsArr.includes(itemObj.apiName)) {
                        updateMejoresItems(cat, build.apiNameCampeon, [...itemsArr, itemObj.apiName]);
                      }
                    }
                  }} className={localStyle.styleBox72}>
                            {itemsArr.map((apiName, i) => {
                      const itemData = allItemsTFT?.find(it => it.apiName === apiName);
                      const itemImgUrl = itemData?.icon ? itemData.icon.includes("http") ? itemData.icon.toLowerCase().replace(".tex", ".png") : getLocalTftImage(itemData.icon, 'items') : null;
                      return <div key={i} draggable={!!itemImgUrl} onDragStart={e => {
                        e.dataTransfer.setData("text/plain", apiName);
                      }} onDragEnd={e => {
                        if (e.dataTransfer.dropEffect === "none") {
                          const copy = [...itemsArr];
                          copy.splice(i, 1);
                          updateMejoresItems(cat, build.apiNameCampeon, copy);
                        }
                      }} onDoubleClick={() => {
                        const copy = [...itemsArr];
                        copy.splice(i, 1);
                        updateMejoresItems(cat, build.apiNameCampeon, copy);
                      }} title="Doble clic o arrastrar fuera para quitar" className={localStyle.styleBox73}>
                                  {itemImgUrl && <img src={itemImgUrl} alt={apiName} className={localStyle.styleBox45} />}
                                </div>;
                    })}
                          </div>
                        </div>;
              })}
                  </div>
                </div>}
            </div>;
      })}
        <button onClick={addBestBuildRow} className={localStyle.styleBox48}>+ Añadir Campeón a Best Build</button>
        
        {/* {bestBuild.length > 0 && (
          <button onClick={guardarMejoresItemsEnBD} style={{ padding: '10px', background: '#e5c07b', color: '#000', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', marginTop: '20px' }}>
            Guardar Extras (Artefactos/Rad/Emb) en BD
          </button>
         )} */}
      </div>
    </div>;
};
export default function FormularioVisualTFT({
  compo = {}
}) {
  const comp = useStore(datosCompos);
  const [panelActivo, setPanelActivo] = useState("campeones"); // campeones, items, aumentos, datos basicos

  useEffect(() => {
    if (Object.keys(compo).length) {
      actualizarComposicionTFT({
        id: compo.id,
        version: compo.version,
        ocultar: compo.ocultar || compo.isHide,
        nombre: compo.nombre || compo.titulo,
        tier: compo.tier,
        tierExtra: compo.tierExtra,
        posicion: compo.posicion,
        dificultad: dificultades.Es.includes(compo.dificultad) ? compo.dificultad : compo.dificultad === "Easy" ? "Facil" : compo.dificultad === "Medium" ? "Medio" : "Dificil",
        categoria: compo.categoria || compo.shadowCategory,
        campeonMeta: compo.campeonMeta || {
          apiNameCampeon: compo.campeonTierList?.apiName || "",
          apiNameItemsDelCampeon: compo.champItem?.map(item => item.apiName) || [],
          estrellas: compo.estrellas || compo.champ3Stars ? 3 : 1,
          aumento: compo?.augmentTierList?.[0]?.apiName,
          emblema: compo?.champTrait?.[0]?.apiName
        },
        tipoDeDano: compo.tipoDeDano,
        niveles: compo.niveles || [],
        itemsPrio: compo.itemsPrio || (compo?.carouselItems ? Object.values(compo.carouselItems).map(item => item.apiName) : []),
        posicionamiento: compo.posicionamiento,
        tipSEO: compo.tipSEO || compo.tipSeo || "",
        urlSEO: compo.urlSEO || compo.urlSeo || compo.compUrl || "",
        campeonesEarly: compo.campeonesEarly || (compo?.boardInfo?.early?.data ? Object.values(compo.boardInfo.early.data).map(champ => {
          return {
            apiNameCampeon: JSON.parse(champ.dataCampeon.campeon).apiName,
            apiNameItemsDelCampeon: champ.dataItem || []
          };
        }) : []),
        dioses: compo.dioses || [],
        bestBuild: compo.bestBuild?.map(b => ({
          apiNameCampeon: b.apiNameCampeon,
          apiNameItemsBisDelCampeon: b.apiNameItemsBisDelCampeon || (b.apiNameItemsDelCampeon ? [b.apiNameItemsDelCampeon.slice(0, 3)] : [["", "", ""]]),
          apiNameItemsSpecialBisDelCampeon: b.apiNameItemsSpecialBisDelCampeon || [["", "", ""]]
        })) || [],
        condiciones: compo.condiciones || [],
        aumentos: compo.aumentos?.every(item => typeof item === 'object') ? compo.aumentos.map(aument => {
          return {
            apiNameGrande: aument.apiName || aument.apiNameGrande,
            apiNamePequeno: aument.apiNamePequeno,
            early: aument.early,
            midLate: aument.midLate,
            op: aument.op
          };
        }) : compo.aumentos || [],
        encuentros: compo.encuentros || [],
        mejoresItems: compo.mejoresItems,
        proTip: compo.proTip || {}
      });
    } else {
      reiniciarComposicionTFT();
    }
  }, [compo.id]);
  function generadorID() {
    const a = Date.now().toString(30);
    const b = Math.random().toString(30).substring(2);
    return a + b;
  }

  // Helper para guardar compo completa
  const guardarComposicion = async () => {
    // La logica para guardar la compo (simulando lo de FormularioCrearCompoTFT.jsx)
    try {
      const token = import.meta.env.PUBLIC_TOKEN_META || "dummy_token";
      const payload = {
        ...comp,
        id: comp?.id ? comp.id : generadorID()
      };
      const response = await fetch("https://api.guiadeparche.com/tft/composicionesBD.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      alert("Composición guardada exitosamente: " + (result.message || ""));
    } catch (error) {
      alert("Error al guardar la composición: " + error.message);
    }
  };
  return <div className={localStyle.styleBox74}>
      
      {/* Columna Izquierda: Formulario Visual imitando InfografiaMPTFT */}
      <div className={localStyle.styleBox75}>
        <div className={`${style.cardsMPCompContainer} ${localStyle.styleBox76}`}>
          <div className={style.cBoxRow}>
            <DatosBasicosVisual />
          </div>
          <div className={style.cBoxRow}>
            <CampeonMetaVisual />
          </div>
          <div className={style.cBoxRow}>
            <PreliminaresOPVisual />
            <FundamentalsVisual />
          </div>
          <AumentosVisual title="Aumentos Early (has click derecho para que sea OP)" isEarly={true} />
          <AumentosVisual title="Aumentos Mid/Late (has click derecho para que sea OP)" isEarly={false} />
          <div className={style.cBoxRow}>
            <NivelesVisual />
            <PosicionamientoVisual />
          </div>
          <div className={style.cBoxRow}>
            {/* Aquí combiné Mejores Items y Best Build en uno solo porque así lo diseñamos arriba, pero ocupa 100% */}
            <BestBuildYMejoresItemsVisual />
          </div>
        </div>

        {/* Footer info (SEO, Cuando jugar, Condicion victoria, etc) */}
        <div className={localStyle.styleBox77}>
          <h3 className={localStyle.styleBox78}>Datos Finales</h3>
          <label className={localStyle.styleBox3}>
            <span className={localStyle.styleBox4}>Tip SEO</span>
            <textarea value={comp.tipSEO || ""} onChange={e => actualizarComposicionTFT({
            tipSEO: e.target.value
          })} className={localStyle.styleBox79} />
          </label>
          <label className={localStyle.styleBox3}>
            <span className={localStyle.styleBox4}>Condición de Victoria</span>
            <textarea value={comp.condicionVictoria || ""} onChange={e => actualizarComposicionTFT({
            condicionVictoria: e.target.value
          })} className={localStyle.styleBox79} />
          </label>
          <label className={localStyle.styleBox3}>
            <span className={localStyle.styleBox4}>Pro Tip (General)</span>
            <textarea value={comp.proTip?.General || ""} onChange={e => actualizarComposicionTFT({
            proTip: {
              ...comp.proTip,
              general: e.target.value
            }
          })} className={localStyle.styleBox80} />
          </label>
          <label className={localStyle.styleBox3}>
            <span className={localStyle.styleBox4}>Pro Tip (niveles)</span>
            <textarea value={comp.proTip?.niveles || ""} onChange={e => actualizarComposicionTFT({
            proTip: {
              ...comp.proTip,
              niveles: e.target.value
            }
          })} className={localStyle.styleBox80} />
          </label>
          <label className={localStyle.styleBox3}>
            <span className={localStyle.styleBox4}>Pro Tip (posicionamiento)</span>
            <textarea value={comp.proTip?.posicionamiento || ""} onChange={e => actualizarComposicionTFT({
            proTip: {
              ...comp.proTip,
              posicionamiento: e.target.value
            }
          })} className={localStyle.styleBox80} />
          </label>
          <label className={localStyle.styleBox3}>
            <span className={localStyle.styleBox4}>Pro Tip (Preliminar OP)</span>
            <textarea value={comp.proTip?.preliminarOP || ""} onChange={e => actualizarComposicionTFT({
            proTip: {
              ...comp.proTip,
              preliminarOP: e.target.value
            }
          })} className={localStyle.styleBox80} />
          </label>
          <label className={localStyle.styleBox3}>
            <span className={localStyle.styleBox4}>Pro Tip (Aumentos)</span>
            <textarea value={comp.proTip?.aumentos || ""} onChange={e => actualizarComposicionTFT({
            proTip: {
              ...comp.proTip,
              aumentos: e.target.value
            }
          })} className={localStyle.styleBox80} />
          </label>
          <label className={localStyle.styleBox3}>
            <span className={localStyle.styleBox4}>Pro Tip (Items)</span>
            <textarea value={comp.proTip?.items || ""} onChange={e => actualizarComposicionTFT({
            proTip: {
              ...comp.proTip,
              items: e.target.value
            }
          })} className={localStyle.styleBox80} />
          </label>
        </div>

        <button onClick={guardarComposicion} className={localStyle.styleBox81}>
          Guardar Composición en BD
        </button>
        <CardsMasterPlanCompos compo={comp} />
      </div>

      {/* Columna Derecha: Panel de Herramientas Flotante / Sticky */}
      <div className={localStyle.styleBox82}>
        <div className={localStyle.styleBox83}>
          <button onClick={() => setPanelActivo("campeones")} style={{
          background: panelActivo === 'campeones' ? '#0af' : '#222'
        }} className={localStyle.styleBox84}>Campeones</button>
          <button onClick={() => setPanelActivo("items")} style={{
          background: panelActivo === 'items' ? '#0af' : '#222'
        }} className={localStyle.styleBox84}>Ítems</button>
          <button onClick={() => setPanelActivo("aumentos")} style={{
          background: panelActivo === 'aumentos' ? '#0af' : '#222'
        }} className={localStyle.styleBox84}>Aumentos</button>
        </div>

        <div className={localStyle.styleBox85}>
          {panelActivo === 'campeones' && <ChampionsList />}
          {panelActivo === 'items' && <ItemsList />}
          {panelActivo === 'aumentos' && <AugmentsList />}
        </div>
      </div>
    </div>;
}