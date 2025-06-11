import style from "./css/InfografiaTFT.module.css";
import { MetaComps } from "@stores/menuFiltradoAdmin";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import {dataTFTAllItems, versionTFT} from "@stores/dataTFT";
import ChampTierList from "@components/TFT/ChampTierList"

const InfografiaTFT = ()=>{
  const pestanas = [
    {key:"guinsoo", value:"Guinsoo"},
    {key:"rachaVictoria", value:"Racha Victoria"},
    {key:"rachaDerrota", value:"Racha Derrota"},
    {key:"economia", value:"Economia"},
    {key:"comodin", value:"Comodin"},
  ]
  const allItems = useStore(dataTFTAllItems)

  const [localMetaTFTInfo, setLocalMetaTFTInfo] = useState({});
  const [pestanaSelected, setPestanaSelected] = useState(pestanas[0]);
  const [numberOfItemsInInfo, setNumberOfItemsInInfo] = useState({})
  const ChampOrItem = ["Champion","Item"]
  const composMeta = useStore(MetaComps);
  const numberOfInfoInPestana = 4
  const [champOrItemMeta, setChampOrItemMeta] = useState(
    {
      guinsoo:["Champion","Champion","Champion","Champion"],
      rachaVictoria:["Champion","Champion","Champion","Champion"],
      rachaDerrota:["Champion","Champion","Champion","Champion"],
      economia:["Item","Champion","Item","Champion"],
      comodin:["Item","Champion","Item","Champion"],
    }
  )
  const handleMeta = ({
    pestana,
    indexInfoPestana,
    campeonTierList,
    augmentTierList,
    champ3Stars,
    champItem,
    champTrait,
    champOrItem,
    item,
    indexItem,
  }) =>{
    setLocalMetaTFTInfo((prev)=>{
      const updatedMetaByPestana = [
        ...(prev[pestana] || Array.from({length: numberOfInfoInPestana}, ()=> ({}) ))
      ]
      // Asegurarse de que el índice tenga un objeto inicial
      if (!updatedMetaByPestana[indexInfoPestana]) {
        updatedMetaByPestana[indexInfoPestana] = {}
      }

      // Preparar `items` actual
      const existingItems = updatedMetaByPestana[indexInfoPestana]?.items || [];
      const updatedItems = [...existingItems];
      if (item === null) {
        // Borrar item en esa posición
        updatedItems[indexItem] = null;
      } else {
        // Agregar/modificar item
        updatedItems[indexItem] = item;
      }

      // Recortar items si han sido reducidos en el formulario
      const currentNumberOfItems = numberOfItemsInInfo?.[pestana]?.[indexInfoPestana] || 0;
      const trimmedItems = updatedItems.slice(0, currentNumberOfItems);

      updatedMetaByPestana[indexInfoPestana] = {
        ...updatedMetaByPestana[indexInfoPestana],
          championMeta: updatedMetaByPestana[indexInfoPestana]?.championMeta || {
            campeonTierList: campeonTierList || {},
            champ3Stars: champ3Stars || false,
            champItem: champItem || [{}],
            champTriat: champTrait || [{}],
            augmentTierList: augmentTierList || {}
          },
          items: trimmedItems,
          champOrItem: champOrItem || champOrItemMeta[pestana][indexInfoPestana],
      }
      return {
        ...prev,
        [pestana]: updatedMetaByPestana
      }

    })
  }

  useEffect(()=>{
    console.log({localMetaTFTInfo})
  },[localMetaTFTInfo])
  const handleChampOrItem = ({indexChampOrItem, pestana, champOrItem})=>{
    const copia = { ...champOrItemMeta }
    copia[pestana] = [...champOrItemMeta[pestana]]
    copia[pestana][indexChampOrItem] = champOrItem
    setChampOrItemMeta(copia)
  }

  const handlerNumberOfItems = ({pestana, indexInfoPestana, numberOfItems})=>{
    setNumberOfItemsInInfo((prev) => {
      const prevArray = prev[pestana] ? [...prev[pestana]] : [1]
      prevArray[indexInfoPestana] = numberOfItems
      console.log({...prev,[pestana]:prevArray})
      return {
        ...prev,
        [pestana]: prevArray,
      }
    })
    console.log({numberOfItems, pestana, indexInfoPestana, })
    console.log({numberOfItemsInInfo})
    setLocalMetaTFTInfo(prev => {
      const updated = [...(prev[pestana] || [])];
      if (!updated[indexInfoPestana]) {
        updated[indexInfoPestana] = {};
      }

      const existingItems = updated[indexInfoPestana].items || [];
      const trimmedItems = existingItems.slice(0, numberOfItems);

      updated[indexInfoPestana] = {
        ...updated[indexInfoPestana],
        items: trimmedItems,
      };

      return {
        ...prev,
        [pestana]: updated,
      };
    });
  }


  return (
    <div className={style.container}>
      <div>
        <select>
          <option value="latest">latest</option>
          <option value="15.10">pbe</option>
        </select>
      </div>
      <div className={style.containerBtnPestana}>
      {pestanas.map((pestana, indexPestana)=>{
        return (
            <button 
              key={`containerMetaInfografia${indexPestana}`}
              className={[
                style.btnPestana,
                (pestana.key === pestanaSelected.key) ? style.btnPestanaSelected : ""
                ].join(" ")
              }
              onClick={()=>setPestanaSelected(pestana)}
            >
              {pestana.value}
            </button>
        )
      })}
      </div>
      {
        pestanas.map((pestana, indexPestana)=>{
          return([...Array(numberOfInfoInPestana)].map((_, indexInfoPestana) =>{
              if(pestana.key === pestanaSelected.key){
                return (
                <div 
                  key={`ContainerInfoPestana${indexInfoPestana}`}
                  className={style.containerInfoPestana}>
                  <select 
                    defaultValue={champOrItemMeta[pestana.key][indexInfoPestana]}
                    onChange={(e)=>{
                      handleChampOrItem({
                        indexChampOrItem:indexInfoPestana,
                        pestana:pestana.key,
                        champOrItem:e.target.value
                      })
                    }}
                  >
                    {ChampOrItem.map((selection, i)=>{
                      return (
                        <option key={`selectionChampOrItem${i}`} value={selection}>{selection}</option>
                      )
                    })}
                  </select>
                  {
                    // "Items"
                    champOrItemMeta[pestana.key][indexInfoPestana] === ChampOrItem[1] &&
                    <input
                      type="number"
                      max={4}
                      min={1}
                      defaultValue={1}
                      onChange={(e)=>{
                        handlerNumberOfItems({
                          pestana:pestana.key,
                          indexInfoPestana,
                          numberOfItems:Number(e.target.value)
                        })
                      }}
                    />
                  }
                  {
                    
                    numberOfItemsInInfo?.[pestana.key] && numberOfItemsInInfo[pestana.key].map((numberOfInputs,indexItem)=>{
                      if(pestana.key === pestanaSelected.key && indexInfoPestana === indexItem){
                        return ([...Array(numberOfInputs)].map((number,indexInput)=>{
                          return (
                            <div key={`InputItems${indexInput}`}>
                            <input
                              list={"listAllItems"}
                              placeholder={"Select Item"}
                              onChange={(e)=>{
                                const value = e.target.value;
                                if (value === "") {
                                  // Eliminar el item cuando el input está vacío
                                  handleMeta({
                                      pestana:pestana.key,
                                      indexInfoPestana,
                                      indexItem:indexInput,
                                      item:null
                                    })
                                    return;
                                  }
                                  const selectedMetaItem = allItems.find(obj => obj.apiName === value)
                                  if (selectedMetaItem) {
                                    console.log({selectedMetaItem})
                                      handleMeta({
                                          pestana:pestana.key,
                                          indexInfoPestana,
                                          indexItem:indexInput,
                                          item:selectedMetaItem
                                        });
                                      }
                                    }}
                            />
                            <datalist id="listAllItems">
                              {allItems?.map(({name, apiName}, indexInputsItems)=>{
                                return (
                                  <option
                                    key={`options${indexInfoPestana}${indexInputsItems}`}
                                    value={apiName}
                                  >
                                    {name}
                                  </option>)
                              })}
                            </datalist>
                            </div>
                          )
                        }))
                      }
                    })
                  }
                  {
                    // "Champion" 
                    champOrItemMeta[pestana.key][indexInfoPestana] === ChampOrItem[0] &&
                    <div>
                      <input 
                        list="composMetaTFT"
                        defaultValue={localMetaTFTInfo?.[pestana]?.titulo || ""}
                        placeholder="Select Champ"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            // Eliminar el item cuando el input está vacío
                            handleMeta({
                              pestana:pestana.key,
                              indexInfoPestana,
                              campeonTierList:null,
                              champ3Stars:null,
                              champItem:null,
                              champTrait:null,
                              augmentTierList:null
                            })
                            return;
                          }
                          const selectedMetaComp = composMeta.flat().find(obj => obj.titulo === value)
                          if (selectedMetaComp) {
                            handleMeta({
                              pestana:pestana.key,
                              indexInfoPestana,
                              campeonTierList:selectedMetaComp.campeonTierList,
                              champ3Stars:selectedMetaComp.champ3Stars,
                              champItem:selectedMetaComp.champItem,
                              champTrait:selectedMetaComp.champTrait,
                              augmentTierList:selectedMetaComp.augmentTierList
                            });
                          }
                        }}
                      >
                      </input>
                      <datalist id="composMetaTFT">
                        {
                          composMeta.map((tier)=>{
                            return tier.map((comp)=>{
                              return (
                              <option key={comp.id} value={comp.titulo} data-compmeta={comp}>
                                {`Tier: ${comp.tier} ${comp.shadowCategory}`}
                              </option>
                              )
                            })
                          
                          })
                        }
                        
                      </datalist>
                    </div>
                  }
                </div>
                )
              }
            }))
        })
      }
      <ShowMeta localMetaTFTInfo={localMetaTFTInfo} ></ShowMeta>
    </div>
  )
}

const ShowMeta = ({localMetaTFTInfo})=>{
  console.log({ShowMeta:localMetaTFTInfo})
  const urlChampion = `https://raw.communitydragon.org/latest/game/`;
    const version = useStore(versionTFT)
  return (
    <div>
      {Object.keys(localMetaTFTInfo).map((pestana, index)=>{
        return (
          <div key={`localMetaTFTInfo${index}`}>
            {localMetaTFTInfo[pestana].map(({championMeta, champOrItem},indexInfoPestana)=>{
              if(champOrItem === "Champion"){
                console.log({championMeta})
                return (
                  <div key={`indexInfoPestanaMeta${indexInfoPestana}`}>
                    <ChampTierList
                      campeonTierList={championMeta.campeonTierList} 
                      augmentTierList={championMeta.augmentTierList}
                      champItem={championMeta.champItem}
                      champTrait={championMeta.champTrait}
                      champ3Stars={championMeta.champ3Stars}
                      version={version}
                    />
                  </div>
                )
              }
              
            })}
          </div>
        )
      })}
    </div>
  )
}

export default InfografiaTFT