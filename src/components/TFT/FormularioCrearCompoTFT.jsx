import { useState, useEffect } from "react";
import { versionTFT, crearCompoMetaPHP } from "src/stores/dataTFT.js";
import { useStore } from "@nanostores/react";
import {AllCraftableItems, dataTFTChampions, nameOfSet, dataTFTAllItems} from "@stores/dataTFT"

const FormularioCrearCompoTFT = ({props}) =>{
  const allChampionsTFT = useStore(dataTFTChampions);
  const allItemsTFT = useStore(dataTFTAllItems);

  const [composicionTFT, setComposicionTFT] = useState({});

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

  const guardarComposicionTFT = async ()=>{
    try{
      const token = import.meta.env.PUBLIC_TOKEN_META;
      fetch(crearCompoMetaPHP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(resultado),
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


  return(
        <div class="form-container">
            <p>Formulario Crear Compo TFT</p>
            <label htmlFor="">Version</label>
            <select id="version" value={composicionTFT.version} onChange={(e) => setComposicionTFT({...composicionTFT, version: e.target.value})}>
              {Object.keys(nameOfSet).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="nombreEs">Nombre de la Composición</label>
            <input type="text" id="nombreEs" value={composicionTFT.nombreEs} onChange={(e) => setComposicionTFT({...composicionTFT, nombreEs: e.target.value})} />
            
            <label htmlFor="nombreEn">Name of Composition</label>
            <input type="text" id="nombreEn" value={composicionTFT.nombreEn} onChange={(e) => setComposicionTFT({...composicionTFT, nombreEn: e.target.value})} />
            
            <label htmlFor="tier">Tier</label>
            <select id="tier" value={composicionTFT.tier} onChange={(e) => setComposicionTFT({...composicionTFT, tier: e.target.value})}>
              {tiers.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
            <label htmlFor="posicion">Posicion</label>
            <input type="number" id="posicion" min={1} max={15} value={composicionTFT.posicion} onChange={(e) => setComposicionTFT({...composicionTFT, posicion: e.target.value})} />
            
            <label htmlFor="dificultad">Dificultad</label>
            <select id="dificultad" value={composicionTFT.dificultad} onChange={(e) => setComposicionTFT({...composicionTFT, dificultad: e.target.value})}>
              {dificultades.Es.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
            <label htmlFor="categoria">Categorias</label>
            <select id="categoria" value={composicionTFT.categoria} onChange={(e) => setComposicionTFT({...composicionTFT, categoriaEs: e.target.value, categoriaEn:categorias.En[categorias.Es.indexOf(e.target.value)]})}>
              {categorias.Es.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
            {/* Carry principal para mostrar en tier list */}
            <label htmlFor="campeonEnElMeta">Campeon en el Meta</label>
            <select id="campeonEnElMeta" value={composicionTFT.campeonEnElMeta} onChange={(e) => setComposicionTFT({...composicionTFT, campeonEnElMeta: e.target.value})}>
              {allChampionsTFT.map((option) => (
                <option key={option.apiName} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            
            {/* Aumentos para mostrar en tier list */}
            <label htmlFor="aumentos">Aumentos</label>
            <input type="text" list="aumentos" id="aumento" value={composicionTFT.campeonEnElMetaAumento} onChange={(e) => setComposicionTFT({...composicionTFT, campeonEnElMetaAumento: e.target.value})} />
            <datalist id="aumentos" value={composicionTFT.campeonEnElMetaAumento} onChange={(e) => setComposicionTFT({...composicionTFT, campeonEnElMetaAumento: e.target.value})}>
              {allItemsTFT.map((option) => (
                <option key={option.apiName} value={option.name}>
                  {option.apiName}
                </option>
              ))}
            </datalist>
            
            {/* Items para mostrar en tier list */}
            <label htmlFor="item1">Item 1</label>
            <input type="text" list="items" id="item1" value={composicionTFT.campeonEnElMetaItem1} onChange={(e) => setComposicionTFT({...composicionTFT, campeonEnElMetaItem1: e.target.value})} />
            <label htmlFor="item2">Item 2</label>
            <input type="text" list="items" id="item2" value={composicionTFT.campeonEnElMetaItem2} onChange={(e) => setComposicionTFT({...composicionTFT, campeonEnElMetaItem2: e.target.value})} />
            <label htmlFor="item3">Item 3</label>
            <input type="text" list="items" id="item3" value={composicionTFT.campeonEnElMetaItem3} onChange={(e) => setComposicionTFT({...composicionTFT, campeonEnElMetaItem3: e.target.value})} />
            <datalist id="items">
              {allItemsTFT.map((option) => (
                <option key={option.apiName} value={option.name}>
                  {option.apiName}
                </option>
              ))}
            </datalist>
            
            <label>Trait / Emblema:
            <input onChange={(e)=>setComposicionTFT({...composicionTFT, campeonEnElMetaSinergias: e.target.value})} list="dataListChampsTraits" name="dataListChampsTraits" id="dataListChampsTraits1" placeholder="Select Trait to Show"></input>
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
            

            <label htmlFor="esParaGuias">¿Es para Guias?</label>
            <select id="esParaGuias" value={composicionTFT.esParaGuias} onChange={(e) => setComposicionTFT({...composicionTFT, esParaGuias: e.target.value})}>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
            {
              composicionTFT.esParaGuias && 
              (
                <>
                  <label htmlFor="dios">Prioriad de Dioses seleccionar 3</label>
                  <select id="dios" value={composicionTFT.dios} onChange={(e) => setComposicionTFT({...composicionTFT, dios: e.target.value})}>
                    {dioses.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select id="dios2" value={composicionTFT.dios} onChange={(e) => setComposicionTFT({...composicionTFT, dios: e.target.value})}>
                    {dioses.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select id="dios3" value={composicionTFT.dios} onChange={(e) => setComposicionTFT({...composicionTFT, dios: e.target.value})}>
                    {dioses.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="prioCoste">Prioridad de Costes</label>
                  <select id="prioCoste" value={composicionTFT.prioCoste} onChange={(e) => setComposicionTFT({...composicionTFT, prioCoste: e.target.value})}>
                    {prioCostes.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

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
                  <label htmlFor="racha">Racha</label>
                  <select id="racha" value={composicionTFT.racha} onChange={(e) => setComposicionTFT({...composicionTFT, racha: e.target.value})}>
                    {rachaTipos.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="tempo">Tempo</label>
                  <select id="tempo" value={composicionTFT.tempo} onChange={(e) => setComposicionTFT({...composicionTFT, tempo: e.target.value})}>
                    {tempo.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="Carry1">Carry 1</label>
                  <select id="Carry1" value={composicionTFT?.Carry1.campeon} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, campeon: e.target.value}})}>
                    {allChampionsTFT.map((option) => (
                      <option key={option.apiName} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="itemsBisCarry1">Items Bis Carry 1</label>
                  <input type="text" list="items" id="itemsBis1" value={composicionTFT?.Carry1?.itemsBis1} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsBis1: e.target.value}})} />
                  <input type="text" list="items" id="itemsBis2" value={composicionTFT?.Carry1?.itemsBis2} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsBis2: e.target.value}})} />
                  <input type="text" list="items" id="itemsBis3" value={composicionTFT?.Carry1?.itemsBis3} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsBis3: e.target.value}})} />
                  <label htmlFor="itemsPlanBCarry1">Items Plan B Carry 1</label>
                  <input type="text" list="items" id="itemsPlanB1" value={composicionTFT?.Carry1?.itemsPlanB1} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsPlanB1: e.target.value}})} />
                  <input type="text" list="items" id="itemsPlanB2" value={composicionTFT?.Carry1?.itemsPlanB2} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsPlanB2: e.target.value}})} />
                  <input type="text" list="items" id="itemsPlanB3" value={composicionTFT?.Carry1?.itemsPlanB3} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsPlanB3: e.target.value}})} />
                  <label htmlFor="itemsArtefactosCarry1">Items Artefactos + 2 BIS</label>
                  <input type="text" list="items" id="itemsArtefactos1" value={composicionTFT?.Carry1?.itemsArtefactos1} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsArtefactos1: e.target.value}})} />
                  <input type="text" list="items" id="itemsArtefactos2" value={composicionTFT?.Carry1?.itemsArtefactos2} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsArtefactos2: e.target.value}})} />
                  <input type="text" list="items" id="itemsArtefactos3" value={composicionTFT?.Carry1?.itemsArtefactos3} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsArtefactos3: e.target.value}})} />
                  <label htmlFor="itemsEmblemasCarry1">Items Emblemas + 2 BIS</label>
                  <input type="text" list="items" id="itemsEmblemas1" value={composicionTFT?.Carry1?.itemsEmblemas1} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsEmblemas1: e.target.value}})} />
                  <input type="text" list="items" id="itemsEmblemas2" value={composicionTFT?.Carry1?.itemsEmblemas2} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsEmblemas2: e.target.value}})} />
                  <input type="text" list="items" id="itemsEmblemas3" value={composicionTFT?.Carry1?.itemsEmblemas3} onChange={(e) => setComposicionTFT({...composicionTFT, Carry1: {...composicionTFT?.Carry1, itemsEmblemas3: e.target.value}})} />

                  <label htmlFor="Carry2">Carry 2</label>
                  <select id="Carry2" value={composicionTFT?.Carry2?.campeon} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, campeon: e.target.value}})}>
                    {allChampionsTFT.map((option) => (
                      <option key={option.apiName} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="itemsBisCarry2">Items Bis Carry 2</label>
                  <input type="text" list="items" id="itemsBis1" value={composicionTFT?.Carry2?.itemsBis1} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsBis1: e.target.value}})} />
                  <input type="text" list="items" id="itemsBis2" value={composicionTFT?.Carry2?.itemsBis2} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsBis2: e.target.value}})} />
                  <input type="text" list="items" id="itemsBis3" value={composicionTFT?.Carry2?.itemsBis3} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsBis3: e.target.value}})} />
                  <label htmlFor="itemsPlanBCarry2">Items Plan B Carry 2</label>
                  <input type="text" list="items" id="itemsPlanB1" value={composicionTFT?.Carry2?.itemsPlanB1} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsPlanB1: e.target.value}})} />
                  <input type="text" list="items" id="itemsPlanB2" value={composicionTFT?.Carry2?.itemsPlanB2} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsPlanB2: e.target.value}})} />
                  <input type="text" list="items" id="itemsPlanB3" value={composicionTFT?.Carry2?.itemsPlanB3} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsPlanB3: e.target.value}})} />
                  <label htmlFor="itemsArtefactosCarry2">Items Artefactos + 2 BIS</label>
                  <input type="text" list="items" id="itemsArtefactos1" value={composicionTFT?.Carry2?.itemsArtefactos1} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsArtefactos1: e.target.value}})} />
                  <input type="text" list="items" id="itemsArtefactos2" value={composicionTFT?.Carry2?.itemsArtefactos2} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsArtefactos2: e.target.value}})} />
                  <input type="text" list="items" id="itemsArtefactos3" value={composicionTFT?.Carry2?.itemsArtefactos3} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsArtefactos3: e.target.value}})} />
                  <label htmlFor="itemsEmblemasCarry2">Items Emblemas + 2 BIS</label>
                  <input type="text" list="items" id="itemsEmblemas1" value={composicionTFT?.Carry2?.itemsEmblemas1} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsEmblemas1: e.target.value}})} />
                  <input type="text" list="items" id="itemsEmblemas2" value={composicionTFT?.Carry2?.itemsEmblemas2} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsEmblemas2: e.target.value}})} />
                  <input type="text" list="items" id="itemsEmblemas3" value={composicionTFT?.Carry2?.itemsEmblemas3} onChange={(e) => setComposicionTFT({...composicionTFT, Carry2: {...composicionTFT?.Carry2, itemsEmblemas3: e.target.value}})} />

                  <label htmlFor="Tanque1">Tanque 1</label>
                  <select id="Tanque1" value={composicionTFT?.Tanque1.campeon} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, campeon: e.target.value}})}>
                    {allChampionsTFT.map((option) => (
                      <option key={option.apiName} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="itemsBisTanque1">Items Bis Tanque 1</label>
                  <input type="text" list="items" id="itemsBis1" value={composicionTFT?.Tanque1?.itemsBis1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsBis1: e.target.value}})} />
                  <input type="text" list="items" id="itemsBis2" value={composicionTFT?.Tanque1?.itemsBis2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsBis2: e.target.value}})} />
                  <input type="text" list="items" id="itemsBis3" value={composicionTFT?.Tanque1?.itemsBis3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsBis3: e.target.value}})} />
                  <label htmlFor="itemsPlanBTanque1">Items Plan B Tanque 1</label>
                  <input type="text" list="items" id="itemsPlanB1" value={composicionTFT?.Tanque1?.itemsPlanB1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsPlanB1: e.target.value}})} />
                  <input type="text" list="items" id="itemsPlanB2" value={composicionTFT?.Tanque1?.itemsPlanB2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsPlanB2: e.target.value}})} />
                  <input type="text" list="items" id="itemsPlanB3" value={composicionTFT?.Tanque1?.itemsPlanB3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsPlanB3: e.target.value}})} />
                  <label htmlFor="itemsArtefactosTanque1">Items Artefactos + 2 BIS</label>
                  <input type="text" list="items" id="itemsArtefactos1" value={composicionTFT?.Tanque1?.itemsArtefactos1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsArtefactos1: e.target.value}})} />
                  <input type="text" list="items" id="itemsArtefactos2" value={composicionTFT?.Tanque1?.itemsArtefactos2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsArtefactos2: e.target.value}})} />
                  <input type="text" list="items" id="itemsArtefactos3" value={composicionTFT?.Tanque1?.itemsArtefactos3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsArtefactos3: e.target.value}})} />
                  <label htmlFor="itemsEmblemasTanque1">Items Emblemas + 2 BIS</label>
                  <input type="text" list="items" id="itemsEmblemas1" value={composicionTFT?.Tanque1?.itemsEmblemas1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsEmblemas1: e.target.value}})} />
                  <input type="text" list="items" id="itemsEmblemas2" value={composicionTFT?.Tanque1?.itemsEmblemas2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsEmblemas2: e.target.value}})} />
                  <input type="text" list="items" id="itemsEmblemas3" value={composicionTFT?.Tanque1?.itemsEmblemas3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque1: {...composicionTFT?.Tanque1, itemsEmblemas3: e.target.value}})} />

                  <label htmlFor="Tanque2">Tanque 2</label>
                  <select id="Tanque2" value={composicionTFT?.Tanque2?.campeon} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, campeon: e.target.value}})}>
                    {allChampionsTFT.map((option) => (
                      <option key={option.apiName} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="itemsBisTanque2">Items Bis Tanque 2</label>
                  <input type="text" list="items" id="itemsBis1" value={composicionTFT?.Tanque2?.itemsBis1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsBis1: e.target.value}})} />
                  <input type="text" list="items" id="itemsBis2" value={composicionTFT?.Tanque2?.itemsBis2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsBis2: e.target.value}})} />
                  <input type="text" list="items" id="itemsBis3" value={composicionTFT?.Tanque2?.itemsBis3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsBis3: e.target.value}})} />
                  <label htmlFor="itemsPlanBTanque2">Items Plan B Tanque 2</label>
                  <input type="text" list="items" id="itemsPlanB1" value={composicionTFT?.Tanque2?.itemsPlanB1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsPlanB1: e.target.value}})} />
                  <input type="text" list="items" id="itemsPlanB2" value={composicionTFT?.Tanque2?.itemsPlanB2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsPlanB2: e.target.value}})} />
                  <input type="text" list="items" id="itemsPlanB3" value={composicionTFT?.Tanque2?.itemsPlanB3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsPlanB3: e.target.value}})} />
                  <label htmlFor="itemsArtefactosTanque2">Items Artefactos + 2 BIS</label>
                  <input type="text" list="items" id="itemsArtefactos1" value={composicionTFT?.Tanque2?.itemsArtefactos1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsArtefactos1: e.target.value}})} />
                  <input type="text" list="items" id="itemsArtefactos2" value={composicionTFT?.Tanque2?.itemsArtefactos2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsArtefactos2: e.target.value}})} />
                  <input type="text" list="items" id="itemsArtefactos3" value={composicionTFT?.Tanque2?.itemsArtefactos3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsArtefactos3: e.target.value}})} />
                  <label htmlFor="itemsEmblemasTanque2">Items Emblemas + 2 BIS</label>
                  <input type="text" list="items" id="itemsEmblemas1" value={composicionTFT?.Tanque2?.itemsEmblemas1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsEmblemas1: e.target.value}})} />
                  <input type="text" list="items" id="itemsEmblemas2" value={composicionTFT?.Tanque2?.itemsEmblemas2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsEmblemas2: e.target.value}})} />
                  <input type="text" list="items" id="itemsEmblemas3" value={composicionTFT?.Tanque2?.itemsEmblemas3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque2: {...composicionTFT?.Tanque2, itemsEmblemas3: e.target.value}})} />
                
                  <label>¿Tiene Tanque Flexible?</label>
                  <input type="checkbox" id="hasTanqueFlexible" checked={composicionTFT?.TanqueFlexible?.hasTanqueFlexible} onChange={(e) => setComposicionTFT({...composicionTFT, TanqueFlexible: {...composicionTFT?.TanqueFlexible, hasTanqueFlexible: e.target.value}})} />
                  {
                    composicionTFT?.TanqueFlexible?.hasTanqueFlexible && (
                    <>
                      <label htmlFor="TanqueFlexible">Tanque Flexible</label>
                      <select id="TanqueFlexible" value={composicionTFT?.TanqueFlexible?.campeon} onChange={(e) => setComposicionTFT({...composicionTFT, TanqueFlexible: {...composicionTFT?.TanqueFlexible, campeon: e.target.value}})}>
                        {allChampionsTFT.map((option) => (
                          <option key={option.apiName} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>

                      {/* <label htmlFor="itemsBisTanque3">Items Bis Tanque 3</label>
                      <input type="text" list="items" id="itemsBis1" value={composicionTFT?.Tanque3?.itemsBis1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsBis1: e.target.value}})} />
                      <input type="text" list="items" id="itemsBis2" value={composicionTFT?.Tanque3?.itemsBis2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsBis2: e.target.value}})} />
                      <input type="text" list="items" id="itemsBis3" value={composicionTFT?.Tanque3?.itemsBis3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsBis3: e.target.value}})} />
                      <label htmlFor="itemsPlanBTanque3">Items Plan B Tanque 3</label>
                      <input type="text" list="items" id="itemsPlanB1" value={composicionTFT?.Tanque3?.itemsPlanB1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsPlanB1: e.target.value}})} />
                      <input type="text" list="items" id="itemsPlanB2" value={composicionTFT?.Tanque3?.itemsPlanB2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsPlanB2: e.target.value}})} />
                      <input type="text" list="items" id="itemsPlanB3" value={composicionTFT?.Tanque3?.itemsPlanB3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsPlanB3: e.target.value}})} />
                      <label htmlFor="itemsArtefactosTanque3">Items Artefactos + 2 BIS</label>
                      <input type="text" list="items" id="itemsArtefactos1" value={composicionTFT?.Tanque3?.itemsArtefactos1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsArtefactos1: e.target.value}})} />
                      <input type="text" list="items" id="itemsArtefactos2" value={composicionTFT?.Tanque3?.itemsArtefactos2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsArtefactos2: e.target.value}})} />
                      <input type="text" list="items" id="itemsArtefactos3" value={composicionTFT?.Tanque3?.itemsArtefactos3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsArtefactos3: e.target.value}})} />
                      <label htmlFor="itemsEmblemasTanque3">Items Emblemas + 2 BIS</label>
                      <input type="text" list="items" id="itemsEmblemas1" value={composicionTFT?.Tanque3?.itemsEmblemas1} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsEmblemas1: e.target.value}})} />
                      <input type="text" list="items" id="itemsEmblemas2" value={composicionTFT?.Tanque3?.itemsEmblemas2} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsEmblemas2: e.target.value}})} />
                      <input type="text" list="items" id="itemsEmblemas3" value={composicionTFT?.Tanque3?.itemsEmblemas3} onChange={(e) => setComposicionTFT({...composicionTFT, Tanque3: {...composicionTFT?.Tanque3, itemsEmblemas3: e.target.value}})} /> */}
                    </>
                    )
                  }
                  <label>¿Contesteadores?</label>
                  <input type="checkbox" id="esContesteado" checked={composicionTFT?.esContesteado} onChange={(e) => setComposicionTFT({...composicionTFT, esContesteado: e.target.value})} />
                  {
                    composicionTFT?.esContesteado && (
                      <>
                      {/* Plan B  seleccion de composiciones ya creadas ARREGLAR*/}
                      <label htmlFor="pivotear">Pivotear a X Compo</label>
                      <input type="text" id="pivotear1" value={composicionTFT?.pivotear1} onChange={(e) => setComposicionTFT({...composicionTFT, pivotear1: e.target.value})} />
                      <input type="text" id="pivotear2" value={composicionTFT?.pivotear2} onChange={(e) => setComposicionTFT({...composicionTFT, pivotear2: e.target.value})} />
                      </>
                    )
                  }

                  
                  <label>Daño de la Composición</label>
                  <input type="text" id="damageType" value={composicionTFT?.damageType} onChange={(e) => setComposicionTFT({...composicionTFT, damageType: e.target.value})} />
                  <datalist id="damageType">
                    {dañoTipo.Es.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </datalist>

                  <label>Componentes Iniciales</label>
                  <label>Juego Temprano Opcion A</label>
                  <input type="text" list="items" value={composicionTFT?.itemsJuegoTempranoA1} onChange={(e) => setComposicionTFT({...composicionTFT, itemsJuegoTempranoA1: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsJuegoTempranoA2} onChange={(e) => setComposicionTFT({...composicionTFT, itemsJuegoTempranoA2: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsJuegoTempranoA3} onChange={(e) => setComposicionTFT({...composicionTFT, itemsJuegoTempranoA3: e.target.value})} />

                  <label>Juego Temprano Opcion B</label>
                  <input type="text" list="items" value={composicionTFT?.itemsJuegoTempranoB1} onChange={(e) => setComposicionTFT({...composicionTFT, itemsJuegoTempranoB1: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsJuegoTempranoB2} onChange={(e) => setComposicionTFT({...composicionTFT, itemsJuegoTempranoB2: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsJuegoTempranoB3} onChange={(e) => setComposicionTFT({...composicionTFT, itemsJuegoTempranoB3: e.target.value})} />

                  {/* <label>Carry Holder Opcion A</label>
                  <input type="text" list="items" value={composicionTFT?.itemsCarryA1} onChange={(e) => setComposicionTFT({...composicionTFT, itemsCarryA1: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsCarryA2} onChange={(e) => setComposicionTFT({...composicionTFT, itemsCarryA2: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsCarryA3} onChange={(e) => setComposicionTFT({...composicionTFT, itemsCarryA3: e.target.value})} />

                  <label>Carry Holder Opcion B</label>
                  <input type="text" list="items" value={composicionTFT?.itemsCarryB1} onChange={(e) => setComposicionTFT({...composicionTFT, itemsCarryB1: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsCarryB2} onChange={(e) => setComposicionTFT({...composicionTFT, itemsCarryB2: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsCarryB3} onChange={(e) => setComposicionTFT({...composicionTFT, itemsCarryB3: e.target.value})} />

                  <label>Tanque Holder Opcion A</label>
                  <input type="text" list="items" value={composicionTFT?.itemsTanqueA1} onChange={(e) => setComposicionTFT({...composicionTFT, itemsTanqueA1: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsTanqueA2} onChange={(e) => setComposicionTFT({...composicionTFT, itemsTanqueA2: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsTanqueA3} onChange={(e) => setComposicionTFT({...composicionTFT, itemsTanqueA3: e.target.value})} />

                  <label>Tanque Holder Opcion B</label>
                  <input type="text" list="items" value={composicionTFT?.itemsTanqueB1} onChange={(e) => setComposicionTFT({...composicionTFT, itemsTanqueB1: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsTanqueB2} onChange={(e) => setComposicionTFT({...composicionTFT, itemsTanqueB2: e.target.value})} />
                  <input type="text" list="items" value={composicionTFT?.itemsTanqueB3} onChange={(e) => setComposicionTFT({...composicionTFT, itemsTanqueB3: e.target.value})} /> */}
              
                  <label>Primer Aumento</label>
                  <input type="text" list="items" value={composicionTFT?.itemsPrimerAumento1} onChange={(e) => setComposicionTFT({...composicionTFT, itemsPrimerAumento1: e.target.value})} />
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
           

            <label>Compo Final Base</label>
            <NuevoBuilderTFT composicionTFT={composicionTFT} setComposicionTFT={setComposicionTFT} campoBuilder="finalBase" ></NuevoBuilderTFT>
            <label>Compo Final +level</label>
            <NuevoBuilderTFT composicionTFT={composicionTFT} setComposicionTFT={setComposicionTFT} campoBuilder="finalPlusLevel" ></NuevoBuilderTFT>

            <button type="button" onClick={() => guardarComposicionTFT(composicionTFT)}>Guardar Compo</button>
        </div>
    )
}

export default FormularioCrearCompoTFT;