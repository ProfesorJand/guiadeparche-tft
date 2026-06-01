import { useState, useEffect } from "react";
import { versionTFT, crearCompoMetaPHP } from "src/stores/dataTFT.js";
import { useStore } from "@nanostores/react";
import {AllCraftableItems, dataTFTChampions, nameOfSet, dataTFTAllItems} from "@stores/dataTFT"
import NuevoBuilderTFT from "./NuevoBuilderTFT";
import ChampTierList from "./ChampTierList";
import style from "./css/FormularioCrearCompoTFT.module.css";
import DynamicCarries from './DynamicCarries';
import DynamicAumentos from './DynamicAumentos';
import DynamicCarrusel from './DynamicCarrusel';
import ChampionsList from "@components/main/Admin/ChampionsList";
import ItemsList from "@components/main/Admin/Items";

const FormularioCrearCompoTFT = ({compo:[]}) =>{
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);

  const [composicionTFT, setComposicionTFT] = useState({});
  const [visibleBuilders, setVisibleBuilders] = useState({});
  const [visibleCampeonesItems, setVisibleCampeonesItems] = useState(true);


  const toggleBuilder = (builderName) => {
    setVisibleBuilders(prev => ({
      ...prev,
      [builderName]: !prev[builderName]
    }));
  };

  const renderBuilderToggle = (label, campoBuilder) => {
    return(
   
    <div style={{ marginBottom: '10px' }}>
      <button 
        type="button" 
        onClick={() => toggleBuilder(campoBuilder)} 
        style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}
      >
        <span>{label}</span>
        <span>{visibleBuilders[campoBuilder] ? '▲' : '▼'}</span>
      </button>
      {visibleBuilders[campoBuilder] && (
        <div style={{ padding: '10px', border: '1px solid #333', borderTop: 'none', borderRadius: '0 0 5px 5px' }}>
          <NuevoBuilderTFT composicionTFT={composicionTFT} setComposicionTFT={setComposicionTFT} campoBuilder={campoBuilder} />
        </div>
      )}
      {
      visibleBuilders[campoBuilder] && (
        <>
        <div style={{ display: "flex" }}>
        <button type="button" onClick={() => setVisibleCampeonesItems(true)}>Campeones</button>
        <button type="button" onClick={() => setVisibleCampeonesItems(false)}>Items</button>
        </div>
        { visibleCampeonesItems ? <ChampionsList/> :  <ItemsList/>}
        </>
      )
      }
      
    </div>
  )};

  const dificultades = {
    Es:["Facil", "Medio", "Dificil"],
    En:["Easy", "Medium", "Hard"]};
  const prioCostes = {
    Es:["Coste 1", "Coste 2", "Coste 3", "Coste 4", "Coste 5"],
    En:["Cost 1", "Cost 2", "Cost 3", "Cost 4", "Cost 5"]};
  const cuandoRolearas = {
    Es:["Roll Lv4 y Lv5", "Roll Lv5", "Roll Lv5 y Lv6", "Roll Lv6", "Roll Lv7", "Roll Lv8", "Roll Lv8 y Lv9", "Roll Lv9"],
    En:["Roll Lv4 & Lv5", "Roll Lv5", "Roll Lv5 & Lv6", "Roll Lv6", "Roll Lv7", "Roll Lv8", "Roll Lv8 & Lv9", "Roll Lv9"]};
  const rondaRolls = {
    Es:[
      "Rocas y Soft Roll Fase 3 del Coste 1", 
      "Fase 3 ronda 2 estabilizar 2 estrellas del Coste 2",
      "Fase 3 Ronda 5 estabilizar 2 estrellas del Coste 3",
      "Fase 4 ronda 2, estabilizar 2 estrellas del Coste 4"],
    En:[
      "2-5 neutrals & Soft Roll Stage 3 Cost 1",
      "Phase 3 round 2 stabilize w 2-star 2-cost",
      "Phase 3 Round 5 stabilize w 2-star 3-cost",
      "Phase 4 round 2, stabilize w 2-star 4-cost"
    ]};
  const rachaTipos = {
    Es:["Racha de Victorias","Racha de Derrotas"],
    En:["Win Streak","Loss Streak"]};
  const categorias = {
    Es:["Aumentos Especificos","Fast 8","3 Estrellas"],
    En:["Specific Augments","Fast 8","3 Stars"]};
  const dioses = ["Thresh","Yasuo","Ahri","Evelynn","Kayle","Aurelion Sol","Soraka", "Ekko", "Varus"]  
  const tempo = {
    Es:["Agresivo / Slam","Open fort / Salvar HP"],
    En:["Aggressive / Slam","Open fort / Save HP"]}
  const tiers = ["S","A","B","C","D"];
  const dañoTipo = {
    Es: ["AD","AP","Híbrido"],
    En: ["AD","AP","Hybrid"]
  }
  const aumentosTipo = {
    Es: ["Economía","Combate","Items","Emblemas"],
    En: ["Economy","Combat","Items","Emblems"]
  }

  function generadorID(){
      const a = Date.now().toString(30);
      const b = Math.random().toString(30).substring(2);
      return a+b
    }

  const guardarComposicionTFT = async (resultado)=>{
    const datos = {...resultado, id: resultado?.id ? resultado.id :  generadorID()}
    try{
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
        alert('Error adding data:', data.message);
          console.error('Error:', error);
      });

    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(composicionTFT)
  }, [composicionTFT]);

  return(
        <div className={style.formContainer}>
            <p>Formulario Crear Compo TFT</p>
            <label htmlFor="">Version

            <select id="version" value={composicionTFT.version} onChange={(e) => setComposicionTFT({...composicionTFT, version: e.target.value})}>
              {Object.keys(nameOfSet).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            </label>

            <label>Ocultar
            <select id="ocultar" value={composicionTFT.ocultar} onChange={(e) => setComposicionTFT({...composicionTFT, ocultar: e.target.value})}>
              <option value="false">No</option>
              <option value="true">Si</option>
            </select>
            </label>

            <label htmlFor="nombreEs">Nombre de la Composición
            <input type="text" id="nombreEs" value={composicionTFT.nombreEs} onChange={(e) => setComposicionTFT({...composicionTFT, nombreEs: e.target.value})} />
            </label>
            
            <label htmlFor="nombreEn">Name of Composition
            <input type="text" id="nombreEn" value={composicionTFT.nombreEn} onChange={(e) => setComposicionTFT({...composicionTFT, nombreEn: e.target.value})} />
            </label>
            
            <label htmlFor="tier">Tier
            <select id="tier" value={composicionTFT.tier} onChange={(e) => setComposicionTFT({...composicionTFT, tier: e.target.value})}>
              <option value="">Seleccionar Tier</option>
              {tiers.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            </label>
            
            <label htmlFor="posicion">Posición
            <input type="number" id="posicion" min={1} max={15} value={composicionTFT.posicion} onChange={(e) => setComposicionTFT({...composicionTFT, posicion: e.target.value})} />
            </label>
            
            <label htmlFor="dificultad">Dificultad
            <select id="dificultad" value={composicionTFT.dificultad} onChange={(e) => setComposicionTFT({...composicionTFT, dificultad: e.target.value})}>
              <option value="">Seleccionar Dificultad</option>
              {dificultades.Es.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            </label>
            
            <label htmlFor="categoria">Categorias
            <select id="categoria" value={composicionTFT.categoria} onChange={(e) => setComposicionTFT({...composicionTFT, categoriaEs: e.target.value, categoriaEn:categorias.En[categorias.Es.indexOf(e.target.value)]})}>
              <option value="">Seleccionar Categoria</option>
              {categorias.Es.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            </label>
            
            <label htmlFor="esParaGuias">¿Es para Guias?
            <select id="esParaGuias" value={composicionTFT.esParaGuias} onChange={(e) => setComposicionTFT({...composicionTFT, esParaGuias: e.target.value})}>
              <option value="false">No</option>
              <option value="true">Si</option>
            </select>
            </label>
            {
              composicionTFT?.esParaGuias === "true" && 
              (
                <>
                  <label htmlFor="dios">Prioriad de Dioses seleccionar 3
                  {/* dios sea un array de dioses */}
                  <select id="dios" value={composicionTFT?.dios?.[0] || ""} 
                   onChange={(e) => {
                    setComposicionTFT( (prev) => {
                      let newDioses = prev?.dios || [];
                      newDioses[0] = e.target.value;
                      if(newDioses[1] === e.target.value){
                        newDioses[1] = "";
                      }
                      if(newDioses[2] === e.target.value){
                        newDioses[2] = "";
                      }
                      return ({...prev, dios: newDioses})
                    }) 
                    }}>
                    <option value="">Seleccionar Dios</option>
                    {dioses.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select id="dios2" value={composicionTFT?.dios?.[1] || ""}  onChange={(e) => {
                    setComposicionTFT( (prev) => {
                      let newDioses = prev?.dios || [];
                      newDioses[1] = e.target.value;
                      if(newDioses[0] === e.target.value){
                        newDioses[0] = "";
                      }
                      if(newDioses[2] === e.target.value){
                        newDioses[2] = "";
                      }
                      return ({...prev, dios: newDioses})
                    }) 
                    }}>
                    <option value="">Seleccionar Dios</option>
                    {dioses.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select id="dios3" value={composicionTFT?.dios?.[2] || ""}  onChange={(e) => {
                    setComposicionTFT( (prev) => {
                      let newDioses = prev?.dios || [];
                      newDioses[2] = e.target.value;
                      if(newDioses[0] === e.target.value){
                        newDioses[0] = "";
                      }
                      if(newDioses[1] === e.target.value){
                        newDioses[1] = "";
                      }
                      return ({...prev, dios: newDioses})
                    }) 
                    }}>
                    <option value="">Seleccionar Dios</option>
                    {dioses.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  </label>

                  <label htmlFor="prioCoste">Prioridad de Costes
                  <select id="prioCoste" value={composicionTFT.prioCoste} onChange={(e) => setComposicionTFT({...composicionTFT, prioCoste: e.target.value})}>
                    <option value="">Seleccionar Prioridad de Coste</option>
                    {prioCostes.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  </label>

                  {/* <label htmlFor="cuandoRolearas">Cuando rolear</label>
                  <select id="cuandoRolearas" value={composicionTFT.cuandoRolearas} onChange={(e) => setComposicionTFT({...composicionTFT, cuandoRolearas: e.target.value})}>
                    {cuandoRolearas.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="rondaRolls">Ronda Rolls</label>
                  <select id="rondaRolls" value={composicionTFT.rondaRolls} onChange={(e) => setComposicionTFT({...composicionTFT, rondaRolls: e.target.value})}>
                    {rondaRolls.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select> */}
                  <label htmlFor="racha">Racha
                  <select id="racha" value={composicionTFT.racha} onChange={(e) => setComposicionTFT({...composicionTFT, racha: e.target.value})}>
                    <option value="">Seleccionar Racha</option>
                    {rachaTipos.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  </label>

                  <label htmlFor="tempo">Tempo
                  <select id="tempo" value={composicionTFT.tempo} onChange={(e) => setComposicionTFT({...composicionTFT, tempo: e.target.value})}>
                    <option value="">Seleccionar Tempo</option>
                    {tempo.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  </label>

                  {/* NUEVA SECCIÓN DINÁMICA CARRIES */}
                  <DynamicCarries 
                    composicionTFT={composicionTFT} 
                    setComposicionTFT={setComposicionTFT} 
                    allChampionsTFT={allChampionsTFT} 
                  />
                  {/* FIN NUEVA SECCIÓN DINÁMICA CARRIES */}

                  {/* NUEVA SECCIÓN DINÁMICA AUMENTOS */}
                  <DynamicAumentos 
                    composicionTFT={composicionTFT} 
                    setComposicionTFT={setComposicionTFT} 
                  />
                  {/* FIN NUEVA SECCIÓN DINÁMICA AUMENTOS */}

                  <label>¿Tiene Tanque Flexible?
                  <input type="checkbox" id="hasTanqueFlexible" checked={composicionTFT?.TanqueFlexible?.hasTanqueFlexible} onChange={(e) => setComposicionTFT({...composicionTFT, TanqueFlexible: {...composicionTFT?.TanqueFlexible, hasTanqueFlexible: e.target.value}})} />
                  </label>
                  {
                    composicionTFT?.TanqueFlexible?.hasTanqueFlexible && (
                      <>
                      <label htmlFor="TanqueFlexible">Tanque Flexible
                      <select id="TanqueFlexible" value={composicionTFT?.TanqueFlexible?.campeon} onChange={(e) => setComposicionTFT({...composicionTFT, TanqueFlexible: {...composicionTFT?.TanqueFlexible, campeon: e.target.value}})}>
                        <option value="">Seleccionar Campeón</option>
                        {allChampionsTFT.map((option) => (
                          <option key={option.apiName} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                      </label>
                    </>
                    )
                  }
                  <label>¿Contesteadores?
                  <input type="checkbox" id="esContesteado" checked={composicionTFT?.esContesteado} onChange={(e) => setComposicionTFT({...composicionTFT, esContesteado: e.target.checked})} />
                  </label>
                  {
                    composicionTFT?.esContesteado && (
                      <>
                      {/* Plan B  seleccion de composiciones ya creadas ARREGLAR FALTA*/}
                      <label htmlFor="pivotear">Pivotear a X Compo
                      <input type="text" id="pivotear1" value={composicionTFT?.pivotear1} onChange={(e) => setComposicionTFT({...composicionTFT, pivotear1: e.target.value})} />
                      </label>
                      </>
                    )
                  }

                  
                  <label>Daño de la Composición
                  <input type="text" id="damageType" list="damageTypeList" value={composicionTFT?.damageType} onChange={(e) => setComposicionTFT({...composicionTFT, damageType: e.target.value})} />
                  </label>
                  <datalist id="damageTypeList">
                    {dañoTipo.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </datalist>

                  <label>Componentes Iniciales
                  <input type="text" list="items" value={composicionTFT?.itemsPrio1} onChange={(e) => setComposicionTFT({...composicionTFT, itemsPrio1: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsPrio2} onChange={(e) => setComposicionTFT({...composicionTFT, itemsPrio2: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsPrio3} onChange={(e) => setComposicionTFT({...composicionTFT, itemsPrio3: e.target.value})} />
                  </label>
             
                  <label>Primer Aumento
                  <input type="text" list="items" value={composicionTFT?.itemsPrimerAumento1} onChange={(e) => setComposicionTFT({...composicionTFT, itemsPrimerAumento1: e.target.value})} />
                  </label>
                  <datalist id="tiposDeAumentos">
                    {aumentosTipo.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </datalist>

                </>
              )
            }

            {renderBuilderToggle("Juego Temprano Opcion A Lv4", "juegoTempranoALv4")}
            {renderBuilderToggle("Juego Temprano Opcion A Lv5", "juegoTempranoALv5")}
            {renderBuilderToggle("Juego Temprano Opcion A Lv6", "juegoTempranoALv6")}

            {composicionTFT?.esParaGuias === "true" && renderBuilderToggle("Juego Temprano Opcion B Lv4", "juegoTempranoBLv4")}
            {composicionTFT?.esParaGuias === "true" && renderBuilderToggle("Juego Temprano Opcion B Lv5", "juegoTempranoBLv5")}
            {composicionTFT?.esParaGuias === "true" && renderBuilderToggle("Juego Temprano Opcion B Lv6", "juegoTempranoBLv6")}          

            {renderBuilderToggle("Compo Final Base", "finalBase")}
            {renderBuilderToggle("Compo Final +level", "finalPlusLevel")}
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width:"100%"}}>
              <fieldset style={{width:"100%"}}>
                <legend>Carry en el Meta</legend>
              
              {/* Carry principal para mostrar en tier list */}

              {composicionTFT?.esParaGuias === "true" ? (
                <label htmlFor="campeonEnElMeta">Campeon en el Meta
                <select id="campeonEnElMeta" value={composicionTFT.campeonEnElMeta?.name || composicionTFT.campeonEnElMeta || ""} onChange={(e) => {
                  const champName = e.target.value;
                  const selectedCarry = composicionTFT.Carries?.find(c => c.campeon === champName);
                  const champObj = allChampionsTFT.find(opt => opt.name === champName);
                  
                  let newItem1 = "";
                  let newItem2 = "";
                  let newItem3 = "";

                  if (selectedCarry && selectedCarry.objetos) {
                    newItem1 = selectedCarry.objetos[0]?.principal ? (allItemsTFT.find(opt => opt.name === selectedCarry.objetos[0].principal) || selectedCarry.objetos[0].principal) : "";
                    newItem2 = selectedCarry.objetos[1]?.principal ? (allItemsTFT.find(opt => opt.name === selectedCarry.objetos[1].principal) || selectedCarry.objetos[1].principal) : "";
                    newItem3 = selectedCarry.objetos[2]?.principal ? (allItemsTFT.find(opt => opt.name === selectedCarry.objetos[2].principal) || selectedCarry.objetos[2].principal) : "";
                  }

                  setComposicionTFT({
                    ...composicionTFT, 
                    campeonEnElMeta: champObj || champName,
                    campeonEnElMetaItem1: newItem1,
                    campeonEnElMetaItem2: newItem2,
                    campeonEnElMetaItem3: newItem3
                  });
                }}>
                  <option value="">Seleccionar Campeón de la Compo</option>
                  {composicionTFT?.Carries?.filter(c => c.campeon).map((carry, idx) => (
                    <option key={idx} value={carry.campeon}>
                      {carry.campeon} (Rol: {carry.rol})
                    </option>
                  ))}
                </select>
                </label>
              ) : (
                <label htmlFor="campeonEnElMeta">Campeon en el Meta
                <select id="campeonEnElMeta" value={composicionTFT.campeonEnElMeta?.name || composicionTFT.campeonEnElMeta || ""} onChange={(e) => {
                  const selectedItem = allChampionsTFT.find(opt => opt.name === e.target.value);
                  setComposicionTFT({...composicionTFT, campeonEnElMeta: selectedItem || e.target.value});
                }}>
                  <option value="">Seleccionar Campeón</option>
                  {allChampionsTFT.map((option) => (
                    <option key={option.apiName} value={option.name} data-value={JSON.stringify(option)}>
                      {option.name}
                    </option>
                  ))}
                </select>
                </label>
              )}

              <label htmlFor="campeonEnElMeta3Stars">¿Es para campeon 3 estrellas?
              <select id="campeonEnElMeta3Stars" value={composicionTFT.campeonEnElMeta3Stars} onChange={(e) => setComposicionTFT({...composicionTFT, campeonEnElMeta3Stars: e.target.value})}>
                <option value="false">No</option>
                <option value="true">Si</option>
              </select>
              </label>
              
              {/* Aumentos para mostrar en tier list */}
              <label htmlFor="aumentos">Aumentos
              <input type="text" list="aumentos" id="aumento" value={composicionTFT.campeonEnElMetaAumento?.apiName || composicionTFT.campeonEnElMetaAumento || ""} onChange={(e) => {
                const selectedItem = allItemsTFT.find(opt => opt.apiName === e.target.value);
                setComposicionTFT({...composicionTFT, campeonEnElMetaAumento: selectedItem || e.target.value});
              }} />
              <datalist id="aumentos" value={composicionTFT.campeonEnElMetaAumento} onChange={(e) => setComposicionTFT({...composicionTFT, campeonEnElMetaAumento: e.target.value})}>
                {allItemsTFT.map((option) => (
                  <option key={option.apiName} value={option.apiName} data-value={JSON.stringify(option)}>
                    {option.name}
                  </option>
                ))}
              </datalist>
              </label>
              
              {composicionTFT?.esParaGuias !== "true" && (
                <>
                  {/* Items para mostrar en tier list */}
                  <label htmlFor="item1">Item 1
                  <input type="text" list="items" id="item1" value={composicionTFT.campeonEnElMetaItem1?.name || composicionTFT.campeonEnElMetaItem1 || ""} onChange={(e) => {
                    const selectedItem = allItemsTFT.find(opt => opt.name === e.target.value);
                    setComposicionTFT({...composicionTFT, campeonEnElMetaItem1: selectedItem || e.target.value});
                  }} />
                  </label>
                  <label htmlFor="item2">Item 2
                  <input type="text" list="items" id="item2" value={composicionTFT.campeonEnElMetaItem2?.name || composicionTFT.campeonEnElMetaItem2 || ""} onChange={(e) => {
                    const selectedItem = allItemsTFT.find(opt => opt.name === e.target.value);
                    setComposicionTFT({...composicionTFT, campeonEnElMetaItem2: selectedItem || e.target.value});
                  }} />
                  </label>
                  <label htmlFor="item3">Item 3
                  <input type="text" list="items" id="item3" value={composicionTFT.campeonEnElMetaItem3?.name || composicionTFT.campeonEnElMetaItem3 || ""} onChange={(e) => {
                    const selectedItem = allItemsTFT.find(opt => opt.name === e.target.value);
                    setComposicionTFT({...composicionTFT, campeonEnElMetaItem3: selectedItem || e.target.value});
                  }} />
                  </label>
                </>
              )}

              <datalist id="items">
                {allItemsTFT.map((option) => (
                  <option key={option.apiName} value={option.name} data-value={JSON.stringify(option)}>
                    {option.apiName}
                  </option>
                ))}
              </datalist>
              
              <label>Trait / Emblema:
              <input value={composicionTFT.campeonEnElMetaSinergias?.name || composicionTFT.campeonEnElMetaSinergias || ""} onChange={(e)=> {
                const selectedItem = allItemsTFT.find(opt => opt.name === e.target.value);
                setComposicionTFT({...composicionTFT, campeonEnElMetaSinergias: selectedItem || e.target.value});
              }} list="dataListChampsTraits" name="dataListChampsTraits" id="dataListChampsTraits1" placeholder="Select Trait to Show"></input>
              <datalist id="dataListChampsTraits">
                {allItemsTFT.map((option) => {
                  if(option.apiName.includes("EmblemItem"))
                  return (
                  <option key={option.apiName} value={option.name}>
                    {option.apiName}
                  </option>
                )})}
              </datalist>
              </label>
              </fieldset>

              <ChampTierList
                isSample={true}
                campeonTierList={composicionTFT.campeonEnElMeta}
                augmentTierList={composicionTFT.campeonEnElMetaAumento}
                champItem={[composicionTFT.campeonEnElMetaItem1,composicionTFT.campeonEnElMetaItem2,composicionTFT.campeonEnElMetaItem3]}
                champTrait={composicionTFT.campeonEnElMetaSinergias ? [composicionTFT.campeonEnElMetaSinergias] : []}
                champ3Stars={composicionTFT.campeonEnElMeta3Stars}
              />

            </div>


            {/* NUEVA SECCIÓN DINÁMICA CARRUSEL */}
            <DynamicCarrusel 
              composicionTFT={composicionTFT} 
              setComposicionTFT={setComposicionTFT} 
              allChampionsTFT={allChampionsTFT} 
              allItemsTFT={allItemsTFT} 
            />
            {/* FIN NUEVA SECCIÓN DINÁMICA CARRUSEL */}
            
            <label>
              <span>Tip Seo:</span>
              <textarea
                name="tipseo"
                type="text"
                defaultValue={composicionTFT?.tipSeo}
                onChange={(e)=>setComposicionTFT({...composicionTFT, tipSeo: e.target.value})}
                placeholder="Type Tip Seo"
                
              />
            </label>

            <label>
              <span>Cuando Jugar:</span>
              <textarea
                name="cuandojugar"
                type="text"
                defaultValue={composicionTFT?.cuandoJugar}
                onChange={(e)=>setComposicionTFT({...composicionTFT, cuandoJugar: e.target.value})}
                placeholder="Type Cuando Jugar"
                
              />
            </label>

            <label>
              <span>Condicion Victoria:</span>
              <textarea
                name="condicionvictoria"
                type="text"
                defaultValue={composicionTFT?.condicionVictoria}
                onChange={(e)=>setComposicionTFT({...composicionTFT, condicionVictoria: e.target.value})}
                placeholder="Type Condicion Victoria"
                
              />
            </label>

            <button type="button" onClick={() => guardarComposicionTFT(composicionTFT)}>Guardar Compo</button>
        </div>
    )
}

export default FormularioCrearCompoTFT;