import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { crearCompoMetaPHPTest, dataTFTChampions, nameOfSet, dataTFTAllItems, urlDragon } from "@stores/dataTFT"
import NuevoBuilderTFT from "./NuevoBuilderTFT";
// import ChampTierList from "./ChampTierList";
import style from "./css/FormularioCrearCompoTFT.module.css";
// import DynamicCarries from './DynamicCarries';
// import DynamicAumentos from './DynamicAumentos';
import ChampionsList from "@components/main/Admin/ChampionsList";
import ItemsList from "@components/main/Admin/Items";
import {
  composicionTFT as datosCompos,
  actualizarComposicionTFT,
  reiniciarComposicionTFT,
  dificultades,
  categorias,
  tiers,
  tiersExtras,
  dañoTipo,
  dioses as opcionesDiosesList
} from "@stores/tft/dataFormularioCrear.js";

// const allChampionsTFT = useStore(dataTFTChampions);
// const allItemsTFT = useStore(dataTFTAllItems);

const FormularioCrearCompoTFT = ({ compo = {} }) => {
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);

  const datosComposicionTFT = useStore(datosCompos);


  //const [composicionTFT, setComposicionTFT] = useState({});
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
          apiNameCampeon: compo.campeonTierList.apiName || "",
          apiNameItemsDelCampeon: compo.champItem?.map((item) => item.apiName) || [],
          estrellas: compo.estrellas || compo.champ3Stars ? 3 : 1,
          aumento: compo?.augmentTierList?.[0]?.apiName,
          emblema: compo?.champTrait?.[0]?.apiName,
        },
        tipoDeDano: compo.tipoDeDano,
        niveles: compo.niveles || [],
        itemsPrio: compo.itemsPrio || Object.values(compo?.carouselItems)?.map((item) => item.apiName) || [],
        posicionamiento: compo.posicionamiento,
        ordenPrioridadAumentos: compo.ordenPrioridadAumentos,
        tipSEO: compo.tipSEO || compo.tipSeo || "",
        urlSEO: compo.urlSEO || compo.urlSeo || compo.compUrl || "",
        campeonesEarly: compo.campeonesEarly || Object.values(compo?.boardInfo?.early?.data)?.map((champ) => { return { apiNameCampeon: JSON.parse(champ.dataCampeon.campeon).apiName, apiNameItemsDelCampeon: champ.dataItem || [] } }) || [],
        dioses: compo.dioses || [],
        bestBuild: compo.bestBuild?.map(b => ({
          apiNameCampeon: b.apiNameCampeon,
          apiNameItemsBisDelCampeon: b.apiNameItemsBisDelCampeon || (b.apiNameItemsDelCampeon ? [b.apiNameItemsDelCampeon.slice(0, 3)] : [["", "", ""]]),
          apiNameItemsSpecialBisDelCampeon: b.apiNameItemsSpecialBisDelCampeon || [["", "", ""]],
        })) || [],
        condiciones: compo.condiciones || [],
        aumentos: compo.aumentos.every(item => typeof item === 'object') ? compo.aumentos.map((aument) => { return { apiNameGrande: aument.apiName || aument.apiNameGrande, apiNamePequeno: aument.apiNamePequeno, early: aument.early, midLate: aument.midLate, op: aument.op } }) : compo.aumentos || [],
        encuentros: compo.encuentros || [],


      });
    }
  }, [compo.id])

  function generadorID() {
    const a = Date.now().toString(30);
    const b = Math.random().toString(30).substring(2);
    return a + b
  }

  const guardarComposicionTFT = async (resultado) => {
    const datos = { ...resultado, id: resultado?.id ? resultado.id : generadorID() }
    try {
      const token = import.meta.env.PUBLIC_TOKEN_META;
      fetch(crearCompoMetaPHPTest, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos),
      })
        .then(response => response.json())  // Analiza la respuesta JSON del servidor
        .then(data => {
          if (data.status === 'success') {
            alert('Composicion creada de forma exitosa:', data.message);
          } else {
            console.error('Error adding data:', data.message);
            alert('Error adding data:', data.message);
          }
        })
        .catch(error => {
          alert('Error adding data:', error.message);
          console.error('Error:', error);
        });

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={style.formContainer}>
      <p>Formulario Crear Compo TFT</p>
      <VersionComp />
      <Ocultar />
      <fieldset className={style.fieldsetCyan}>
        <legend className={style.legendCyan}>Datos Basicos</legend>
        <FieldUrlForComp />
        <FieldNameForComp />
        <Tier />
        <TierExtra />
        <PosicionTier />
        <Dificultades />
        <Categorias />
        <TipoDaño />
      </fieldset>
      <CampeonMeta />

      <fieldset className={style.fieldsetCyan}>
        <legend className={style.legendCyan}>Fundamentals</legend>
        <Dioses />
        <ItemsPrio />
        <CampeonesEarly />
      </fieldset>

      <Condiciones />
      <Aumentos />

      <DynamicChampionsPerLevel />
      <Posicionamiento />

      <BestBuild />

      <Textareas />

      <button type="button" onClick={() => guardarComposicionTFT(datosComposicionTFT)}>Guardar Compo</button>

      <datalist id="items">
        {allItemsTFT.map((option) => (
          <option key={option.apiName} value={option.name} data-value={JSON.stringify(option)}>
            {option.apiName}
          </option>
        ))}
      </datalist>

      {/* DATALISTS GLOBALES */}
      <datalist id="listaCampeonesApiName">
        {allChampionsTFT?.map((option) => (
          <option key={`global-champ-${option.apiName}`} value={option.apiName}>
            {option.name}
          </option>
        ))}
      </datalist>
      <datalist id="listaItemsApiName">
        {allItemsTFT?.map((option) => (
          <option key={`global-item-${option.apiName}`} value={option.apiName}>
            {option.name}
          </option>
        ))}
      </datalist>
    </div>
  )
}

export default FormularioCrearCompoTFT;

const FieldUrlForComp = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label htmlFor="url">Url de la Composición
      <input type="text" id="url" value={datosComposicionTFT.urlSEO} onChange={(e) => actualizarComposicionTFT({ urlSEO: e.target.value })} />
    </label>
  )
}

const FieldNameForComp = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label htmlFor="nombreEs">Nombre de la Composición
      <input type="text" id="nombreEs" value={datosComposicionTFT.nombre} onChange={(e) => actualizarComposicionTFT({ nombre: e.target.value })} />
    </label>
  )
}

const VersionComp = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label htmlFor="">Version
      <select id="version" value={datosComposicionTFT.version} onChange={(e) => actualizarComposicionTFT({ version: e.target.value })}>
        {Object.keys(nameOfSet).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

const Ocultar = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label>Ocultar
      <select id="ocultar" value={datosComposicionTFT.ocultar} onChange={(e) => actualizarComposicionTFT({ ocultar: e.target.value })}>
        <option value="false">No</option>
        <option value="true">Si</option>
      </select>
    </label>
  )
}

const Tier = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label htmlFor="tier">Tier
      <select id="tier" value={datosComposicionTFT.tier} onChange={(e) => actualizarComposicionTFT({ tier: e.target.value })}>
        <option value="">Seleccionar Tier</option>
        {tiers.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

const TierExtra = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label htmlFor="tierExtra">Tier Extra "H" o "X"
      <select id="tierExtra" value={datosComposicionTFT.tierExtra} onChange={(e) => actualizarComposicionTFT({ tierExtra: e.target.value })}>
        <option value={datosComposicionTFT.tierExtra || "N/A"}>{datosComposicionTFT.tierExtra || "Seleccionar Tier Extra"}</option>
        {tiersExtras.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

const PosicionTier = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label htmlFor="posicion">Posición en el Tier
      <input type="number" id="posicion" min={1} max={15} value={datosComposicionTFT.posicion} onChange={(e) => actualizarComposicionTFT({ posicion: e.target.value })} />
    </label>
  )
}

const Dificultades = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label htmlFor="dificultad">Dificultad
      <select id="dificultad" value={datosComposicionTFT.dificultad} onChange={(e) => actualizarComposicionTFT({ dificultad: e.target.value })}>
        <option value="">Seleccionar Dificultad</option>
        {dificultades.Es.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

const Categorias = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label htmlFor="categoria">Categorias
      <select id="categoria" value={datosComposicionTFT.categoria} onChange={(e) => actualizarComposicionTFT({ categoria: e.target.value })}>
        <option value="">Seleccionar Categoria</option>
        {categorias.Es.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

const CampeonMeta = () => {
  const datosComposicionTFT = useStore(datosCompos);
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);
  console.log(allChampionsTFT.find((champion) => champion.apiName === datosComposicionTFT?.campeonMeta?.apiNameCampeon)?.tileIcon)
  return (
    <div className={style.toggleContent}>
      <fieldset className={style.fieldsetCyan}>
        <legend className={style.legendCyan}>Carry en el Meta</legend>

        {/* Carry principal para mostrar en tier list */}
        <label htmlFor="campeonEnElMeta">Campeon en el Meta
          <select id="campeonEnElMeta" value={datosComposicionTFT.campeonMeta?.apiNameCampeon} onChange={(e) => {
            actualizarComposicionTFT({
              campeonMeta: {
                ...datosComposicionTFT.campeonMeta,
                apiNameCampeon: e.target.value
              }
            });
          }}>
            <option value="">Seleccionar Campeón de la Compo</option>
            {allChampionsTFT.map((champion, idx) => (
              <option key={idx} value={champion.apiName}>
                {champion.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="campeonEnElMeta3Stars">¿Es Campeon 3 estrellas?
          <select id="campeonEnElMeta3Stars" value={datosComposicionTFT.campeonMeta?.estrellas || ""} onChange={(e) => actualizarComposicionTFT({ campeonMeta: { ...datosComposicionTFT.campeonMeta, estrellas: e.target.value === "true" } })}>
            <option value="false">No</option>
            <option value="true">Si</option>
          </select>
        </label>



        <label htmlFor="item1">Item 1
          <input type="text" list="items" id="item1" value={datosComposicionTFT.campeonMeta?.apiNameItemsDelCampeon?.[0]} onChange={(e) => {
            actualizarComposicionTFT({
              campeonMeta: {
                ...datosComposicionTFT.campeonMeta,
                apiNameItemsDelCampeon: [e.target.value, datosComposicionTFT.campeonMeta.apiNameItemsDelCampeon?.[1], datosComposicionTFT.campeonMeta.apiNameItemsDelCampeon?.[2]]
              }
            });
          }} />
        </label>
        <label htmlFor="item2">Item 2
          <input type="text" list="items" id="item2" value={datosComposicionTFT.campeonMeta?.apiNameItemsDelCampeon?.[1]} onChange={(e) => {
            actualizarComposicionTFT({
              campeonMeta: {
                ...datosComposicionTFT.campeonMeta,
                apiNameItemsDelCampeon: [datosComposicionTFT.campeonMeta.apiNameItemsDelCampeon?.[0], e.target.value, datosComposicionTFT.campeonMeta.apiNameItemsDelCampeon?.[2]]
              }
            });
          }} />
        </label>
        <label htmlFor="item3">Item 3
          <input type="text" list="items" id="item3" value={datosComposicionTFT.campeonMeta?.apiNameItemsDelCampeon?.[2]} onChange={(e) => {
            actualizarComposicionTFT({
              campeonMeta: {
                ...datosComposicionTFT.campeonMeta,
                apiNameItemsDelCampeon: [datosComposicionTFT.campeonMeta.apiNameItemsDelCampeon[0], datosComposicionTFT.campeonMeta.apiNameItemsDelCampeon[1], e.target.value]
              }
            });
          }} />
        </label>



        <datalist id="items">
          {allItemsTFT.map((option) => (
            <option key={option.apiName} value={option.apiName}>
              {option.name}
            </option>
          ))}
        </datalist>

        {/* Aumentos para mostrar en tier list */}
        <label htmlFor="aumentos">Aumento Principal
          <input type="text" list="aumentos" id="aumento" value={datosComposicionTFT.campeonMeta?.aumento} onChange={(e) => {
            actualizarComposicionTFT({
              campeonMeta: {
                ...datosComposicionTFT.campeonMeta,
                aumento: e.target.value
              }
            });
          }} />
          <datalist id="aumentos">
            {allItemsTFT.map((option) => (
              <option key={option.apiName} value={option.apiName}>
                {option.name}
              </option>
            ))}
          </datalist>
        </label>

        <label>Trait / Emblema:
          <input value={datosComposicionTFT.campeonMeta?.emblema} onChange={(e) => {
            actualizarComposicionTFT({
              campeonMeta: {
                ...datosComposicionTFT.campeonMeta,
                emblema: e.target.value
              }
            });
          }} list="dataListChampsTraits" name="dataListChampsTraits" id="dataListChampsTraits1" placeholder="Select Trait to Show"></input>
          <datalist id="dataListChampsTraits">
            {allItemsTFT.map((option) => {
              if (option.apiName.includes("EmblemItem"))
                return (
                  <option key={option.apiName} value={option.apiName}>
                    {option.name}
                  </option>
                )
            })}
          </datalist>
        </label>
      </fieldset>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <img
          className={style.metaImage}
          alt={allChampionsTFT.find((champion) => champion.apiName === datosComposicionTFT?.campeonMeta?.apiNameCampeon)?.name}
          src={`${urlDragon()}${allChampionsTFT.find((champion) => champion.apiName === datosComposicionTFT?.campeonMeta?.apiNameCampeon)?.tileIcon.toLowerCase().replace(".tex", ".png")}`}
        />
        <img
          className={style.metaImage}
          src={`${urlDragon()}${allItemsTFT.find((item) => item.apiName === datosComposicionTFT?.campeonMeta?.apiNameItemsDelCampeon?.[0])?.icon.toLowerCase().replace(".tex", ".png")}`}
          alt="item1"
        />
        <img
          className={style.metaImage}
          src={`${urlDragon()}${allItemsTFT.find((item) => item.apiName === datosComposicionTFT?.campeonMeta?.apiNameItemsDelCampeon?.[1])?.icon.toLowerCase().replace(".tex", ".png")}`}
          alt="item2"
        />
        <img
          className={style.metaImage}
          src={`${urlDragon()}${allItemsTFT.find((item) => item.apiName === datosComposicionTFT?.campeonMeta?.apiNameItemsDelCampeon?.[2])?.icon.toLowerCase().replace(".tex", ".png")}`}
          alt="item3"
        />
        <img
          className={style.metaImage}
          alt="aumento"
          src={`${urlDragon()}${allItemsTFT.find((item) => item.apiName === datosComposicionTFT?.campeonMeta?.aumento)?.icon.toLowerCase().replace(".tex", ".png")}`}
        />
        <img
          className={style.metaImage}
          alt="emblema"
          src={`${urlDragon()}${allItemsTFT.find((item) => item.apiName === datosComposicionTFT?.campeonMeta?.emblema)?.icon.toLowerCase().replace(".tex", ".png")}`}
        />
      </div>



    </div>
  )
}

const TipoDaño = () => {
  const datosComposicionTFT = useStore(datosCompos);
  return (
    <label htmlFor="tipoDaño">Tipo de Daño de la Compo AD / AP / Hibrido
      <select id="tipoDaño" value={datosComposicionTFT.tipoDeDano} onChange={(e) => {
        actualizarComposicionTFT({ tipoDeDano: e.target.value });
      }}>
        <option value="">Selecciona el tipo de daño</option>
        {dañoTipo.Es.map((daño, idx) => (
          <option key={idx} value={daño}>
            {daño}
          </option>
        ))}
      </select>
    </label>
  )
}

const DynamicChampionsPerLevel = () => {
  const compo = useStore(datosCompos);
  const niveles = compo.niveles || [];
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);

  const addLevel = () => {
    actualizarComposicionTFT(prev => ({
      ...prev,
      niveles: [
        ...(prev.niveles || []),
        {
          lv: 5,
          etapa: 2,
          ronda: 5,
          roll: false,
          campeones: Array.from({ length: 5 }, () => ({ apiNameCampeon: "", estrella: 1, apiNameItemsDelCampeon: [] }))
        }
      ]
    }));
  };

  const removeLevel = (index) => {
    actualizarComposicionTFT(prev => {
      const newNiveles = [...(prev.niveles || [])];
      newNiveles.splice(index, 1);
      return { ...prev, niveles: newNiveles };
    });
  };

  const updateLevel = (index, field, value) => {
    actualizarComposicionTFT(prev => {
      const newNiveles = [...(prev.niveles || [])];
      const currentLevel = { ...newNiveles[index], [field]: value };

      if (field === 'lv') {
        const newLv = parseInt(value) || 0;
        let campeones = [...(currentLevel.campeones || [])];
        if (campeones.length < newLv) {
          while (campeones.length < newLv) {
            campeones.push({ apiNameCampeon: "", estrella: 1, apiNameItemsDelCampeon: [] });
          }
        } else if (campeones.length > newLv) {
          campeones = campeones.slice(0, newLv);
        }
        currentLevel.campeones = campeones;
      }

      newNiveles[index] = currentLevel;
      return { ...prev, niveles: newNiveles };
    });
  };

  const updateChampion = (levelIndex, champIndex, field, value) => {
    actualizarComposicionTFT(prev => {
      const newNiveles = [...(prev.niveles || [])];
      const newCampeones = [...(newNiveles[levelIndex].campeones || [])];

      // Ensure the array is long enough (in case it wasn't populated properly)
      while (newCampeones.length <= champIndex) {
        newCampeones.push({ apiNameCampeon: "", estrella: 1, apiNameItemsDelCampeon: [] });
      }

      newCampeones[champIndex] = { ...newCampeones[champIndex], [field]: value };
      newNiveles[levelIndex] = { ...newNiveles[levelIndex], campeones: newCampeones };
      return { ...prev, niveles: newNiveles };
    });
  };

  const updateChampionItem = (levelIndex, champIndex, itemIndex, value) => {
    actualizarComposicionTFT(prev => {
      const newNiveles = [...(prev.niveles || [])];
      const newCampeones = [...(newNiveles[levelIndex].campeones || [])];

      while (newCampeones.length <= champIndex) {
        newCampeones.push({ apiNameCampeon: "", estrella: 1, apiNameItemsDelCampeon: [] });
      }

      const items = [...(newCampeones[champIndex].apiNameItemsDelCampeon || [])];

      while (items.length <= itemIndex) {
        items.push("");
      }
      items[itemIndex] = value;

      newCampeones[champIndex] = { ...newCampeones[champIndex], apiNameItemsDelCampeon: items };
      newNiveles[levelIndex] = { ...newNiveles[levelIndex], campeones: newCampeones };
      return { ...prev, niveles: newNiveles };
    });
  };

  const addChampion = (levelIndex) => {
    actualizarComposicionTFT(prev => {
      const newNiveles = [...(prev.niveles || [])];
      const newCampeones = [...(newNiveles[levelIndex].campeones || [])];

      newCampeones.push({ apiNameCampeon: "", estrella: 1, apiNameItemsDelCampeon: [] });
      newNiveles[levelIndex] = { ...newNiveles[levelIndex], campeones: newCampeones };
      return { ...prev, niveles: newNiveles };
    });
  };

  const removeChampion = (levelIndex, champIndex) => {
    actualizarComposicionTFT(prev => {
      const newNiveles = [...(prev.niveles || [])];
      const newCampeones = [...(newNiveles[levelIndex].campeones || [])];

      newCampeones.splice(champIndex, 1);
      newNiveles[levelIndex] = { ...newNiveles[levelIndex], campeones: newCampeones };
      return { ...prev, niveles: newNiveles };
    });
  };

  return (
    <fieldset className={style.fieldsetCyan}>
      <legend className={style.legendCyan}>Niveles</legend>


      {niveles.map((nivel, levelIndex) => (
        <div key={levelIndex} className={style.levelContainer}>
          <div className={style.levelHeader}>
            <label>Configuración Nivel {nivel.lv}</label>
            <button type="button" onClick={() => removeLevel(levelIndex)} className={style.btnDanger}>
              Eliminar Nivel
            </button>
          </div>

          <div className={style.levelInputs}>
            <label className={style.flexCol}>
              <span>Nivel (lv)</span>
              <input type="number" min="1" max="10" value={nivel.lv} onChange={(e) => updateLevel(levelIndex, 'lv', parseInt(e.target.value) || 0)} className={style.inputTiny} />
            </label>
            <label className={style.flexCol}>
              <span>Etapa</span>
              <input type="number" min="1" max="9" value={nivel.etapa} onChange={(e) => updateLevel(levelIndex, 'etapa', parseInt(e.target.value) || 0)} className={style.inputTiny} />
            </label>
            <label className={style.flexCol}>
              <span>Ronda</span>
              <input type="number" min="1" max="7" value={nivel.ronda} onChange={(e) => updateLevel(levelIndex, 'ronda', parseInt(e.target.value) || 0)} className={style.inputTiny} />
            </label>
            <label className={style.flexColEnd}>
              <div className={style.checkboxRow}>
                <input type="checkbox" checked={nivel.roll} onChange={(e) => updateLevel(levelIndex, 'roll', e.target.checked)} />
                <span>¿Hacer Roll?</span>
              </div>
            </label>
          </div>

          <div className={style.championsContainer}>
            <div className={style.champsHeader}>
              <strong>Campeones en este Nivel ({nivel.campeones?.length || nivel.lv || 0})</strong>
              <button
                type="button"
                onClick={() => addChampion(levelIndex)}
                className={style.btnSuccessSm}
              >
                + Añadir Campeón
              </button>
            </div>

            {(nivel.campeones || Array.from({ length: nivel.lv || 0 })).map((_, champIndex) => {
              const champ = nivel.campeones?.[champIndex] || { apiNameCampeon: "", estrella: 1, apiNameItemsDelCampeon: [] };

              const champData = allChampionsTFT?.find(c => c.apiName === champ.apiNameCampeon);
              const champImgUrl = champData?.tileIcon ? (champData.tileIcon.includes("http") ? champData.tileIcon.toLowerCase().replace(".tex", ".png") : urlDragon() + champData.tileIcon.toLowerCase().replace(".tex", ".png")) : null;

              return (
                <div key={champIndex} className={style.rowGap15Border}>

                  {/* Visualizador del Campeón */}
                  <div className={style.champIconContainer}>
                    {champImgUrl ? <img src={champImgUrl} alt={champ.apiNameCampeon} className={style.champIcon} /> : <span className={style.emptyChamp}>?</span>}

                    {/* Estrellas */}
                    <div className={style.starContainer}>
                      {Array.from({ length: champ.estrella }).map((_, i) => (
                        <span key={i} style={{ color: `${champ.estrella > 3 ? '#07a14cff' : 'gold'}`, fontSize: '12px', textShadow: '1px 1px 0 #000' }}>★</span>
                      ))}
                    </div>

                    {/* Items */}
                    <div className={style.itemContainer}>
                      {[0, 1, 2].map((itemIndex) => {
                        const apiNameItem = champ.apiNameItemsDelCampeon?.[itemIndex];
                        if (!apiNameItem) return null;
                        const itemData = allItemsTFT?.find(i => i.apiName === apiNameItem);
                        const itemImgUrl = itemData?.icon ? (itemData.icon.includes("http") ? itemData.icon.toLowerCase().replace(".tex", ".png") : urlDragon() + itemData.icon.toLowerCase().replace(".tex", ".png")) : null;
                        return itemImgUrl ? (
                          <img key={itemIndex} src={itemImgUrl} alt={apiNameItem} className={style.itemIconSmall} />
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className={style.flex1Gap15}>
                    <label style={{ flex: 1, minWidth: '150px' }}>
                      <input
                        type="text"
                        list="listaCampeonesApiName"
                        value={champ.apiNameCampeon}
                        onChange={(e) => updateChampion(levelIndex, champIndex, 'apiNameCampeon', e.target.value)}
                        placeholder="Seleccionar Campeón"
                        className={style.inputFull}
                      />
                    </label>

                    <label className={style.width100}>
                      <select value={champ.estrella} onChange={(e) => updateChampion(levelIndex, champIndex, 'estrella', parseInt(e.target.value) || 1)} className={style.width100Pad5}>
                        <option value={1}>1 Estrella</option>
                        <option value={2}>2 Estrellas</option>
                        <option value={3}>3 Estrellas</option>
                        <option value={4}>4 Estrellas</option>
                      </select>
                    </label>

                    <div className={style.flexGap5}>
                      {[0, 1, 2].map((itemIndex) => (
                        <input
                          key={itemIndex}
                          type="text"
                          list="listaItemsApiName"
                          value={champ?.apiNameItemsDelCampeon?.[itemIndex] || ""}
                          onChange={(e) => updateChampionItem(levelIndex, champIndex, itemIndex, e.target.value)}
                          placeholder={`Item ${itemIndex + 1}`}
                          className={style.inputSmall}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeChampion(levelIndex, champIndex)}
                      className={style.btnDangerFit}
                    >
                      X
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
      <button type="button" onClick={addLevel} className={style.btnPrimaryNoWidth}>
        + Añadir Nivel
      </button>
    </fieldset>
  );
};

const ItemsPrio = () => {
  const itemsPrio = useStore(datosCompos).itemsPrio;
  const allItemsTFT = useStore(dataTFTAllItems);
  const addItemPrio = () => {
    //max 4 items
    if (itemsPrio.length >= 4) {
      alert("Maximo 4 items");
      return;
    }
    actualizarComposicionTFT(prev => {
      return {
        ...prev,
        itemsPrio: [...prev.itemsPrio, ""]
      }
    })
  }
  return (
    <fieldset className={style.fieldsetRed}>
      <legend>Items Prioritarios</legend>
      <div className={style.rowGap15}>
        {itemsPrio.map((item, index) => (
          <div key={index} className={style.rowGap5Norm}>
            <input
              type="text"
              list="listaItemsApiName"
              value={item}
              onChange={(e) => actualizarComposicionTFT(prev => ({ ...prev, itemsPrio: prev.itemsPrio.map((item, i) => i === index ? e.target.value : item) }))}
              placeholder={`Item ${index + 1}`}
              className={style.inputSmall}
            />
            <button type="button" onClick={() => actualizarComposicionTFT(prev => ({ ...prev, itemsPrio: prev.itemsPrio.filter((_, i) => i !== index) }))} className={style.btnDanger}>
              X
            </button>
          </div>
        ))}
        <button type="button" onClick={addItemPrio} className={style.btnRedSm}>
          + Añadir Item
        </button>
      </div>
      <div>
        {itemsPrio.map((itemPrio, index) => (
          <img key={index} src={urlDragon() + allItemsTFT.find(item => item.apiName === itemPrio)?.icon.toLowerCase().replace(".tex", ".png")} alt={itemPrio} className={style.itemIconLg} />
        ))}
      </div>
    </fieldset>
  )
}

const Condiciones = () => {
  const condiciones = useStore(datosCompos).condiciones || [];
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);

  const addCondicion = () => {
    actualizarComposicionTFT(prev => ({
      ...prev,
      condiciones: [...(prev.condiciones || []), { apiNameGrande: "", apiNamePequeno: "" }]
    }));
  };

  const removeCondicion = (index) => {
    actualizarComposicionTFT(prev => {
      const newCondiciones = [...(prev.condiciones || [])];
      newCondiciones.splice(index, 1);
      return { ...prev, condiciones: newCondiciones };
    });
  };

  const updateCondicion = (index, field, value, isCheckbox = false) => {
    actualizarComposicionTFT(prev => {
      const newCondiciones = [...(prev.condiciones || [])];
      const condicion = { ...newCondiciones[index] };

      if (isCheckbox) {
        if (value) {
          condicion[field] = true;
        } else {
          delete condicion[field];
        }
      } else {
        condicion[field] = value;
      }

      newCondiciones[index] = condicion;
      return { ...prev, condiciones: newCondiciones };
    });
  };

  return (
    <fieldset className={style.fieldsetRed}>
      <legend>Condiciones</legend>
      {
        condiciones.map((condicion, index) => {
          return (
            <div key={index} className={style.rowGap10}>
              <input
                type="text"
                list="opcionesCondiciones"
                placeholder="Cuadro Grande"
                value={condicion.apiNameGrande || ""}
                onChange={(e) => updateCondicion(index, 'apiNameGrande', e.target.value)}
                className={style.inputBase}
              />
              <input
                type="text"
                list="opcionesCondiciones"
                placeholder="Cuadro pequeño"
                value={condicion.apiNamePequeno || ""}
                onChange={(e) => updateCondicion(index, 'apiNamePequeno', e.target.value)}
                className={style.inputBase}
              />
              <label className={style.rowGap5}>
                <input
                  type="checkbox"
                  checked={!!condicion.early}
                  onChange={(e) => updateCondicion(index, 'early', e.target.checked, true)}
                />
                Early
              </label>
              <label className={style.rowGap5}>
                <input
                  type="checkbox"
                  checked={!!condicion.midLate}
                  onChange={(e) => updateCondicion(index, 'midLate', e.target.checked, true)}
                />
                Mid / Late
              </label>
              <label className={style.rowGap5}>
                <input
                  type="checkbox"
                  checked={!!condicion.op}
                  onChange={(e) => updateCondicion(index, 'op', e.target.checked, true)}
                />
                OP
              </label>

              <button
                type="button"
                onClick={() => removeCondicion(index)}
                className={style.btnDangerAuto}
              >
                X
              </button>
            </div>
          )
        })
      }

      <button
        type="button"
        onClick={addCondicion}
        className={style.btnRedSm}
      >
        + Añadir Condición
      </button>

      <datalist id="opcionesCondiciones">
        <option value="Win Streak">Racha de Victorias Win Streaks</option>
        <option value="Loss Streak">Racha de Derrotas - Loss Streaks</option>
        <option value="Orbe">Orbe</option>

        {allChampionsTFT?.map(champ => (
          <option key={`cond-champ-${champ.apiName}`} value={champ.apiName}>{champ.name}</option>
        ))}

        {allItemsTFT?.map(item => (
          <option key={`cond-item-${item.apiName}`} value={item.apiName}>{item.name}</option>
        ))}
      </datalist>
    </fieldset>
  )
}

const Aumentos = () => {
  const aumentos = useStore(datosCompos).aumentos || [];

  const addAumento = () => {
    actualizarComposicionTFT(prev => ({
      ...prev,
      aumentos: [...(prev.aumentos || []), { apiNameGrande: "", apiNamePequeno: "" }]
    }));
  };

  const removeAumento = (index) => {
    actualizarComposicionTFT(prev => {
      const newAumentos = [...(prev.aumentos || [])];
      newAumentos.splice(index, 1);
      return { ...prev, aumentos: newAumentos };
    });
  };

  const updateAumento = (index, field, value, isCheckbox = false) => {
    actualizarComposicionTFT(prev => {
      const newAumentos = [...(prev.aumentos || [])];
      const aumento = { ...newAumentos[index] };

      if (isCheckbox) {
        if (value) {
          aumento[field] = true;
        } else {
          delete aumento[field];
        }
      } else {
        aumento[field] = value;
      }

      newAumentos[index] = aumento;
      return { ...prev, aumentos: newAumentos };
    });
  };

  return (
    <fieldset className={style.fieldsetPurple}>
      <legend>Aumentos</legend>
      {
        aumentos.map((aumento, index) => {
          return (
            <div key={index} className={style.rowGap10}>
              <input
                type="text"
                list="opcionesCondiciones"
                placeholder="Cuadro Grande"
                value={aumento.apiNameGrande || ""}
                onChange={(e) => updateAumento(index, 'apiNameGrande', e.target.value)}
                className={style.inputBase}
              />
              <input
                type="text"
                list="opcionesCondiciones"
                placeholder="Cuadro pequeño"
                value={aumento.apiNamePequeno || ""}
                onChange={(e) => updateAumento(index, 'apiNamePequeno', e.target.value)}
                className={style.inputBase}
              />
              <label className={style.rowGap5}>
                <input
                  type="checkbox"
                  checked={!!aumento.early}
                  onChange={(e) => updateAumento(index, 'early', e.target.checked, true)}
                />
                Early
              </label>
              <label className={style.rowGap5}>
                <input
                  type="checkbox"
                  checked={!!aumento.midLate}
                  onChange={(e) => updateAumento(index, 'midLate', e.target.checked, true)}
                />
                Mid / Late
              </label>
              <label className={style.rowGap5}>
                <input
                  type="checkbox"
                  checked={!!aumento.op}
                  onChange={(e) => updateAumento(index, 'op', e.target.checked, true)}
                />
                OP
              </label>

              <button
                type="button"
                onClick={() => removeAumento(index)}
                className={style.btnDangerAuto}
              >
                X
              </button>
            </div>
          )
        })
      }

      <button
        type="button"
        onClick={addAumento}
        className={style.btnPurple}
      >
        + Añadir Aumento
      </button>
    </fieldset>
  )
}

const Dioses = () => {
  const diosesSeleccionados = useStore(datosCompos).dioses || [];

  const addDios = () => {
    actualizarComposicionTFT(prev => ({
      ...prev,
      dioses: [...(prev.dioses || []), ""]
    }));
  };

  const removeDios = (index) => {
    actualizarComposicionTFT(prev => {
      const newDioses = [...(prev.dioses || [])];
      newDioses.splice(index, 1);
      return { ...prev, dioses: newDioses };
    });
  };

  const updateDios = (index, value) => {
    actualizarComposicionTFT(prev => {
      const newDioses = [...(prev.dioses || [])];
      newDioses[index] = value;
      return { ...prev, dioses: newDioses };
    });
  };

  return (
    <fieldset className={style.fieldsetGold}>
      <legend>Dioses - Master plan</legend>
      <div className={style.rowGap15}>
        {diosesSeleccionados.map((dios, index) => (
          <div key={index} className={style.rowGap5Norm}>
            <input
              type="text"
              list="opcionesDioses"
              value={dios}
              onChange={(e) => updateDios(index, e.target.value)}
              placeholder={`Dios ${index + 1}`}
              className={style.inputMedium}
            />
            <button type="button" onClick={() => removeDios(index)} className={style.btnDanger}>
              X
            </button>
          </div>
        ))}
        <button type="button" onClick={addDios} className={style.btnGold}>
          + Añadir Dios
        </button>
      </div>

      <datalist id="opcionesDioses">
        {opcionesDiosesList?.map(opcion => (
          <option key={`opcion-dios-${opcion}`} value={opcion}>{opcion}</option>
        ))}
      </datalist>
    </fieldset>
  );
};

const BestBuild = () => {
  const bestBuilds = useStore(datosCompos).bestBuild || [];
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);

  const addBestBuildRow = () => {
    actualizarComposicionTFT(prev => ({
      ...prev,
      bestBuild: [...(prev.bestBuild || []), { apiNameCampeon: "", apiNameItemsBisDelCampeon: [["", "", ""]], apiNameItemsSpecialBisDelCampeon: [["", "", ""]] }]
    }));
  };

  const removeBestBuildRow = (index) => {
    actualizarComposicionTFT(prev => {
      const newBestBuilds = [...(prev.bestBuild || [])];
      newBestBuilds.splice(index, 1);
      return { ...prev, bestBuild: newBestBuilds };
    });
  };

  const updateBestBuildChamp = (index, value) => {
    actualizarComposicionTFT(prev => {
      const newBestBuilds = [...(prev.bestBuild || [])];
      newBestBuilds[index] = { ...newBestBuilds[index], apiNameCampeon: value };
      return { ...prev, bestBuild: newBestBuilds };
    });
  };

  const updateBestBuildItem = (rowIndex, listType, listIndex, itemIndex, value) => {
    actualizarComposicionTFT(prev => {
      const newBestBuilds = [...(prev.bestBuild || [])];
      const lists = [...(newBestBuilds[rowIndex][listType] || [["", "", ""]])];
      const items = [...lists[listIndex]];
      items[itemIndex] = value;
      lists[listIndex] = items;
      newBestBuilds[rowIndex] = { ...newBestBuilds[rowIndex], [listType]: lists };
      return { ...prev, bestBuild: newBestBuilds };
    });
  };

  const addItemsRowToBestBuild = (rowIndex, listType) => {
    actualizarComposicionTFT(prev => {
      const newBestBuilds = [...(prev.bestBuild || [])];
      const lists = [...(newBestBuilds[rowIndex][listType] || [])];
      lists.push(["", "", ""]);
      newBestBuilds[rowIndex] = { ...newBestBuilds[rowIndex], [listType]: lists };
      return { ...prev, bestBuild: newBestBuilds };
    });
  };

  const removeItemsRowFromBestBuild = (rowIndex, listType, listIndex) => {
    actualizarComposicionTFT(prev => {
      const newBestBuilds = [...(prev.bestBuild || [])];
      const lists = [...(newBestBuilds[rowIndex][listType] || [])];
      lists.splice(listIndex, 1);
      newBestBuilds[rowIndex] = { ...newBestBuilds[rowIndex], [listType]: lists };
      return { ...prev, bestBuild: newBestBuilds };
    });
  };

  return (
    <fieldset className={style.fieldsetGreen}>
      <legend>Best Build</legend>
      {bestBuilds.map((build, rowIndex) => {
        const champData = allChampionsTFT?.find(c => c.apiName === build.apiNameCampeon);
        const champImgUrl = champData?.tileIcon ? (champData.tileIcon.includes("http") ? champData.tileIcon.toLowerCase().replace(".tex", ".png") : urlDragon() + champData.tileIcon.toLowerCase().replace(".tex", ".png")) : null;

        return (
          <div key={rowIndex} className={style.rowGap15Border}>
            <div className={style.champIconContainer}>
              {champImgUrl ? <img src={champImgUrl} alt={build.apiNameCampeon} className={style.champIcon} /> : <span className={style.emptyChamp}>?</span>}
            </div>

            <div className={style.flex1Gap15}>
              <input
                type="text"
                list="listaCampeonesApiName"
                value={build.apiNameCampeon || ""}
                onChange={(e) => updateBestBuildChamp(rowIndex, e.target.value)}
                placeholder="Seleccionar Campeón"
                className={style.inputFlex1}
                style={{ alignSelf: 'flex-start', marginTop: '5px' }}
              />

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1', minWidth: '300px' }}>
                  <strong>Item BIS</strong>
                  {(build.apiNameItemsBisDelCampeon || [["", "", ""]]).map((itemList, listIdx) => (
                    <div key={listIdx} className={style.flexGap5} style={{ alignItems: 'center' }}>
                      {[0, 1, 2].map(itemIndex => {
                        const apiNameItem = itemList[itemIndex];
                        const itemData = allItemsTFT?.find(i => i.apiName === apiNameItem);
                        const itemImgUrl = itemData?.icon ? (itemData.icon.includes("http") ? itemData.icon.toLowerCase().replace(".tex", ".png") : urlDragon() + itemData.icon.toLowerCase().replace(".tex", ".png")) : null;

                        return (
                          <div key={itemIndex} className={style.colCenterGap5}>
                            <input
                              type="text"
                              list="listaItemsApiName"
                              value={apiNameItem || ""}
                              onChange={(e) => updateBestBuildItem(rowIndex, "apiNameItemsBisDelCampeon", listIdx, itemIndex, e.target.value)}
                              placeholder={`Item ${itemIndex + 1}`}
                              className={style.inputFull}
                            />
                            {itemImgUrl && <img src={itemImgUrl} alt={apiNameItem} className={style.itemIconMed} />}
                          </div>
                        );
                      })}
                      {listIdx > 0 && (
                        <button
                          type="button"
                          onClick={() => removeItemsRowFromBestBuild(rowIndex, "apiNameItemsBisDelCampeon", listIdx)}
                          className={style.btnDangerFit}
                          style={{ marginLeft: '5px' }}
                          title="Eliminar esta fila de items BIS"
                        >
                          - Fila
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItemsRowToBestBuild(rowIndex, "apiNameItemsBisDelCampeon")}
                    className={style.btnCyanSm}
                    style={{ width: 'fit-content' }}
                  >
                    + Añadir Fila Alternativa BIS
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1', minWidth: '300px' }}>
                  <strong>Special BIS</strong>
                  {(build.apiNameItemsSpecialBisDelCampeon || [["", "", ""]]).map((itemList, listIdx) => (
                    <div key={listIdx} className={style.flexGap5} style={{ alignItems: 'center' }}>
                      {[0, 1, 2].map(itemIndex => {
                        const apiNameItem = itemList[itemIndex];
                        const itemData = allItemsTFT?.find(i => i.apiName === apiNameItem);
                        const itemImgUrl = itemData?.icon ? (itemData.icon.includes("http") ? itemData.icon.toLowerCase().replace(".tex", ".png") : urlDragon() + itemData.icon.toLowerCase().replace(".tex", ".png")) : null;

                        return (
                          <div key={itemIndex} className={style.colCenterGap5}>
                            <input
                              type="text"
                              list="listaItemsApiName"
                              value={apiNameItem || ""}
                              onChange={(e) => updateBestBuildItem(rowIndex, "apiNameItemsSpecialBisDelCampeon", listIdx, itemIndex, e.target.value)}
                              placeholder={`Item ${itemIndex + 1}`}
                              className={style.inputFull}
                            />
                            {itemImgUrl && <img src={itemImgUrl} alt={apiNameItem} className={style.itemIconMed} />}
                          </div>
                        );
                      })}
                      {listIdx > 0 && (
                        <button
                          type="button"
                          onClick={() => removeItemsRowFromBestBuild(rowIndex, "apiNameItemsSpecialBisDelCampeon", listIdx)}
                          className={style.btnDangerFit}
                          style={{ marginLeft: '5px' }}
                          title="Eliminar esta fila de items Special BIS"
                        >
                          - Fila
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItemsRowToBestBuild(rowIndex, "apiNameItemsSpecialBisDelCampeon")}
                    className={style.btnCyanSm}
                    style={{ width: 'fit-content' }}
                  >
                    + Añadir Fila Alternativa Special BIS
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeBestBuildRow(rowIndex)}
                className={style.btnDangerFit}
                style={{ marginLeft: 'auto', marginTop: '10px' }}
                title="Eliminar este Campeón"
              >
                X Campeón
              </button>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={addBestBuildRow}
        className={style.btnSuccess}
      >
        + Añadir Best Build
      </button>
    </fieldset>
  );
};

const CampeonesEarly = () => {
  const campeonesEarly = useStore(datosCompos).campeonesEarly || [];
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);

  const addCampeonEarlyRow = () => {
    actualizarComposicionTFT(prev => ({
      ...prev,
      campeonesEarly: [...(prev.campeonesEarly || []), { apiNameCampeon: "", apiNameItemsDelCampeon: ["", "", ""] }]
    }));
  };

  const removeCampeonEarlyRow = (index) => {
    actualizarComposicionTFT(prev => {
      const newCampeonesEarly = [...(prev.campeonesEarly || [])];
      newCampeonesEarly.splice(index, 1);
      return { ...prev, campeonesEarly: newCampeonesEarly };
    });
  };

  const updateCampeonEarlyChamp = (index, value) => {
    actualizarComposicionTFT(prev => {
      const newCampeonesEarly = [...(prev.campeonesEarly || [])];
      newCampeonesEarly[index] = { ...newCampeonesEarly[index], apiNameCampeon: value };
      return { ...prev, campeonesEarly: newCampeonesEarly };
    });
  };

  const updateCampeonEarlyItem = (rowIndex, itemIndex, value) => {
    actualizarComposicionTFT(prev => {
      const newCampeonesEarly = [...(prev.campeonesEarly || [])];
      const items = [...(newCampeonesEarly[rowIndex].apiNameItemsDelCampeon || ["", "", ""])];
      items[itemIndex] = value;
      newCampeonesEarly[rowIndex] = { ...newCampeonesEarly[rowIndex], apiNameItemsDelCampeon: items };
      return { ...prev, campeonesEarly: newCampeonesEarly };
    });
  };

  return (
    <fieldset className={style.fieldsetOrange}>
      <legend>Campeones Early - Master plan</legend>
      {campeonesEarly.map((champEarly, rowIndex) => {
        const champData = allChampionsTFT?.find(c => c.apiName === champEarly.apiNameCampeon);
        const champImgUrl = champData?.tileIcon ? (champData.tileIcon.includes("http") ? champData.tileIcon.toLowerCase().replace(".tex", ".png") : urlDragon() + champData.tileIcon.toLowerCase().replace(".tex", ".png")) : null;

        return (
          <div key={rowIndex} className={style.rowGap15Border}>
            <div className={style.champIconContainer}>
              {champImgUrl ? <img src={champImgUrl} alt={champEarly.apiNameCampeon} className={style.champIcon} /> : <span className={style.emptyChamp}>?</span>}
            </div>

            <div className={style.flex1Gap15}>
              <input
                type="text"
                list="listaCampeonesApiName"
                value={champEarly.apiNameCampeon || ""}
                onChange={(e) => updateCampeonEarlyChamp(rowIndex, e.target.value)}
                placeholder="Seleccionar Campeón"
                className={style.inputFlex1}
              />

              <div className={style.flexGap5}>
                {[0, 1, 2].map(itemIndex => {
                  const apiNameItem = champEarly.apiNameItemsDelCampeon?.[itemIndex];
                  const itemData = allItemsTFT?.find(i => i.apiName === apiNameItem);
                  const itemImgUrl = itemData?.icon ? (itemData.icon.includes("http") ? itemData.icon.toLowerCase().replace(".tex", ".png") : urlDragon() + itemData.icon.toLowerCase().replace(".tex", ".png")) : null;

                  return (
                    <div key={itemIndex} className={style.colCenterGap5}>
                      <input
                        type="text"
                        list="listaItemsApiName"
                        value={apiNameItem || ""}
                        onChange={(e) => updateCampeonEarlyItem(rowIndex, itemIndex, e.target.value)}
                        placeholder={`Item ${itemIndex + 1}`}
                        className={style.inputFull}
                      />
                      {itemImgUrl && <img src={itemImgUrl} alt={apiNameItem} className={style.itemIconMed} />}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => removeCampeonEarlyRow(rowIndex)}
                className={style.btnDangerFit}
              >
                X
              </button>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={addCampeonEarlyRow}
        className={style.btnWarning}
      >
        + Añadir Campeón Early
      </button>
    </fieldset>
  );
};

const Posicionamiento = () => {
  const datosComposicionTFT = useStore(datosCompos);
  const [visibleBuilders, setVisibleBuilders] = useState({});
  const [visibleCampeonesItems, setVisibleCampeonesItems] = useState(true);

  const renderPosicionamientoToggle = (posicion, index) => {
    const key = `posicionamiento_${index}`;
    return (
      <div key={key} className={style.toggleBuilder}>
        <div className={style.toggleHeader}>
          <input
            type="text"
            value={posicion.nombre}
            onChange={(e) => {
              actualizarComposicionTFT(prev => {
                const newPosicionamiento = [...(prev.posicionamiento || [])];
                newPosicionamiento[index] = { ...newPosicionamiento[index], nombre: e.target.value };
                return { ...prev, posicionamiento: newPosicionamiento };
              });
            }}
            className={style.inputDark}
          />
          <button
            type="button"
            onClick={() => setVisibleBuilders(prev => ({ ...prev, [key]: !prev[key] }))}
            className={style.btnDark}
          >
            {!visibleBuilders[key] ? '▲' : '▼'}
          </button>
          <button
            type="button"
            onClick={() => {
              actualizarComposicionTFT(prev => {
                const newPosicionamiento = [...(prev.posicionamiento || [])];
                newPosicionamiento.splice(index, 1);
                return { ...prev, posicionamiento: newPosicionamiento };
              });
            }}
            className={style.btnDarkDanger}
          >
            X
          </button>
        </div>

        <div className={style.toggleContent}>

          {!visibleBuilders[key] && (
            <div className={style.toggleLeft}>
              <NuevoBuilderTFT posicionIndex={index} />
            </div>
          )}
          {
            !visibleBuilders[key] && (
              <div className={style.toggleRight}>
                <div className={style.flexOnly}>
                  <button type="button" onClick={() => setVisibleCampeonesItems(true)}>Campeones</button>
                  <button type="button" onClick={() => setVisibleCampeonesItems(false)}>Items</button>
                </div>
                {visibleCampeonesItems ? <ChampionsList /> : <ItemsList />}
              </div>
            )
          }
        </div>

      </div>
    )
  };

  return (
    <fieldset className={style.fieldsetCyan}>
      <legend className={style.legendCyan}>
        Posicionamiento
      </legend>
      <img style={{ width: "60%", filter: "grayscale(100%)" }} src={"https://api.guiadeparche.com/tft/composiciones/" + datosComposicionTFT.id + "-" + datosComposicionTFT.originalComp + "-" + datosComposicionTFT.version + ".webp"}></img>

      {datosComposicionTFT?.posicionamiento?.map((pos, index) => renderPosicionamientoToggle(pos, index))}
      <button type="button" onClick={() => {
        actualizarComposicionTFT(prev => ({
          ...prev,
          posicionamiento: [
            ...(prev.posicionamiento || []),
            { nombre: `Compo Final ${prev.posicionamiento?.length || 0}`, tablero: [] }
          ]
        }));
      }} className={style.btnPrimaryNoWidth}>
        + Añadir Tablero
      </button>
    </fieldset>
  );
};

const Textareas = () => {
  const datosComposicionTFT = useStore(datosCompos);

  return (
    <div className={style.flexRowGap10Width100}>
      <label>
        <span>Tip Seo:</span>
        <textarea
          name="tipseo"
          type="text"
          value={datosComposicionTFT?.tipSEO}
          onChange={(e) => actualizarComposicionTFT({ ...datosComposicionTFT, tipSEO: e.target.value })}
          placeholder="Type Tip Seo"
        />
      </label>

      <label>
        <span>Cuando Jugar:</span>
        <textarea
          name="cuandojugar"
          type="text"
          defaultValue={datosComposicionTFT?.cuandoJugar}
          onChange={(e) => actualizarComposicionTFT({ ...datosComposicionTFT, cuandoJugar: e.target.value })}
          placeholder="Type Cuando Jugar"
        />
      </label>

      <label>
        <span>Condicion Victoria:</span>
        <textarea
          name="condicionvictoria"
          type="text"
          defaultValue={datosComposicionTFT?.condicionVictoria}
          onChange={(e) => actualizarComposicionTFT({ ...datosComposicionTFT, condicionVictoria: e.target.value })}
          placeholder="Type Condicion Victoria"
        />
      </label>
    </div>
  );
};