import React, { useEffect,useState } from "react";
import style from "./FormularioMetaLOL.module.css";
import ImgChampSquare from "./ImgChampSquare";
import ImgItemSquare from "./ImgItemSquare";
import ImgRune from "./ImgRune";
import ImgSlotRune from "./ImgSlotRune";
import { useStore } from "@nanostores/react";
import { lanersChampionsMeta } from "@stores/dataLeagueOfLegends";
import VisualizadorMetaLOL from "./VisualizadorMetaLOL";
import { fetchChampionsMeta } from "@stores/dataLeagueOfLegends";
const FormularioMetaLOL = () =>{
  const numberOfChampions = 5; // Number of champions per laner
  const numberOfItems = 3; // Number of items per champion
  const numberOfRunes = 2; // Number of runes per champion
  const numberOfSlotsRunes = 2 // Number of slotsRunes per champion
  const [champions, setChampions] = useState([]);
  const [items, setItems] = useState([]);
  const [runes, setRunes] = useState([]);
  const [localMeta, setLocalMeta] = useState({});
  const lanersChampionsMetaStore = useStore(lanersChampionsMeta);

  const urlChampionsData = "https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/champion.json";
  const championImgUrlPortrait = (championName) => {
    return `https://cdn.communitydragon.org/latest/champion/${championName}/portrait` 
  }
  const championImgUrlSquare = (championName) => {
    return `https://cdn.communitydragon.org/latest/champion/${championName}/square`
  }
  const urlItemsData = "https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/item.json";
  const itemImgUrl = (itemId) => {
    return `https://ddragon.leagueoflegends.com/cdn/15.10.1/img/item/${itemId}`
  }
  // dame una constantes donde pueda obtener las sub runas de las runas

  // dame una constante donde pueda obtener las runas de la pagina de runas 
  const urlRunesData = "https://ddragon.leagueoflegends.com/cdn/15.10.1/data/en_US/runesReforged.json";
  const runeImgUrl = (runePath) => {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/${runePath}`
  }
  const fetchChampions = async () => {
    const response = await fetch(urlChampionsData);
    const data = await response.json();
    const champions = Object.keys(data.data).map((key) => {
      return {
        id: data.data[key].key,
        name: data.data[key].name,
        title: data.data[key].title,
        imagePortrait: championImgUrlPortrait(data.data[key].id),
        imageSquare: championImgUrlSquare(data.data[key].id),
      };
    }
    );
    return champions;
  }
  const fetchItems = async () => {
    const response = await fetch(urlItemsData);
    const data = await response.json();
    const items = Object.keys(data.data).map((key) => {
      return {
        id: key,
        name: data.data[key].name,
        description: data.data[key].description,
        image: itemImgUrl(data.data[key].image.full),
      };
    }
    );
    return items;
  }
  const fetchRunes = async () => {
    const response = await fetch(urlRunesData);
    const data = await response.json();
    const runes = data.map((rune) => {
      return {
        id: rune.id,
        name: rune.name,
        icon: runeImgUrl(rune.icon.toLowerCase()),
        slotsRunes: rune.slots[0].runes.map((slotRune) => ({
          ...slotRune,
          icon: runeImgUrl(slotRune.icon.toLowerCase()),
        })),
      };
    });
    return runes;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setChampions(await fetchChampions());
        setItems(await fetchItems());
        setRunes(await fetchRunes());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

 //quiero que retorne un formulario donde debe tener en cuenta que se van a seleccionar 5 campeones por cada laner y que se le debe añadir 3 items y 2 runas a cada campeon
 //actualizar el handleChampionSelect para que se le añada el campeon al laner correspondiente y que se guarde la informacion de ese campeon 
const handleChampionSelect = ({ laner, index, champion, item, indexItem, rune, indexRune, slotRune, indexSlotRune }) => {
  setLocalMeta((prev) => {
    const updatedLane = [...(prev[laner] || Array.from({ length: numberOfChampions }, () => ({})))];

    updatedLane[index] = {
      ...updatedLane[index],
      champion: updatedLane[index]?.champion,
      items: updatedLane[index]?.items || [],
      runes: updatedLane[index]?.runes || [],
      slotsRunes: updatedLane[index]?.slotsRunes || [],
    };

    if (champion !== undefined) {
      updatedLane[index].champion = champion === null ? undefined : champion;
    }
    if (item !== undefined) {
      if (item === null) {
        updatedLane[index].items.splice(indexItem, 1);
      } else {
        updatedLane[index].items[indexItem] = item;
      }
    }
    if (rune !== undefined) {
      if (rune === null) {
        updatedLane[index].runes.splice(indexRune, 1);
      } else {
        updatedLane[index].runes[indexRune] = rune;
      }
    }

    if(slotRune !== undefined) {
      if ( slotRune === null) {
        console.log({slotRune})
        updatedLane[index].slotsRunes.splice(indexSlotRune, 1);
      } else {
        console.log({slotRune, indexSlotRune})
        updatedLane[index].slotsRunes[indexSlotRune] = slotRune;
      }
    }

    console.log("updatedLane", {
      ...prev,
      [laner]: updatedLane,
    });
    return {
      ...prev,
      [laner]: updatedLane,
    };
  });
};

useEffect(()=>{
  console.log({runes})
},[runes])


// Guardar los cambios en el nanostore
const saveChanges = async () => {
  try {
    const response = await fetch("https://guiadeparche.com/lol/saveMetaLOL.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`,
      },
      body: JSON.stringify(localMeta),
    });

    if (!response.ok) {
      throw new Error("Error saving MetaLOL");
    }

    console.log("%cMetaLOL saved successfully", "background:green;color:white");

    // 🔄 Actualizar el store con la versión más reciente desde el servidor
    const updatedMeta = await fetchChampionsMeta();
    lanersChampionsMeta.set(updatedMeta);

    console.log("%cMetaLOL updated from server", "background:blue;color:white");

  } catch (error) {
    console.error("Error saving or updating MetaLOL:", error);
  }
};


useEffect(() => {
  setLocalMeta(JSON.parse(JSON.stringify(lanersChampionsMetaStore)));
}, [lanersChampionsMetaStore]);

return (
  <div>
    <h1>League of Legends Meta</h1>
    {Object.keys(localMeta).map((laner, indexLaner) => {
      return (
        <div key={`laner ${indexLaner}`} className={style.containerLaners}>

          <datalist id="championsList">
            {champions.map((champion) => {
              return (
                <option key={champion.id} value={champion.name}>
                  {champion.name}
                </option>
              );
            })} 
          </datalist>
          <datalist id="itemsList">
            {items.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })} 
          </datalist>
          <datalist id="runesList">
            {runes.map((rune) => {
              return (
                <option key={rune.id} value={rune.name}>
                  {rune.name}
                </option>
              );
            })}
          </datalist>
          <datalist id="slotsRunesList">
            {runes.map((rune) => {
              return rune.slotsRunes.map((subRune, indexSlot) => {
                return (
                  <option key={`${rune.id}-${indexSlot}-${subRune.id}`} value={subRune.name}>
                    {`${rune.name}`}
                  </option>
                );
              });
            })}
          </datalist>
          
          <div className={style.containerChampionsSelect}>
            <p>{laner}</p>
            {[...Array(numberOfChampions)].map((_, index) => (
              <div key={`champion ${laner} ${index}`} className={style.containerChampions}>
                <div className={style.containerChampionsData}>
                  <input
                  list={"championsList"}
                  defaultValue={localMeta[laner]?.[index]?.champion?.name || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      // Eliminar el item cuando el input está vacío
                      handleChampionSelect({
                        laner,
                        index,
                        champion: null,
                      });
                      return;
                    }
                    const selectedChampion = champions.find(
                      (champion) => champion.name === e.target.value
                    );
                    if (selectedChampion) {
                      handleChampionSelect({laner, index, champion:selectedChampion});
                    }
                  }}
                  placeholder={`Select ${laner} Champion`}
                  />
                  <div className={style.containerItems}>
                  {[...Array(numberOfItems)].map((_, indexItem) => (
                      <input
                        key={`Item ${laner} ${indexItem}`}
                        list={"itemsList"}
                        defaultValue={localMeta[laner]?.[index]?.items?.[indexItem]?.name || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            // Eliminar el item cuando el input está vacío
                            handleChampionSelect({
                              laner,
                              index,
                              item: null,
                              indexItem,
                            });
                            return;
                          }
                          const selectedItem = items.find(
                            (item) => item.name === e.target.value
                          );
                          if (selectedItem) {
                            handleChampionSelect({laner, index, item:selectedItem, indexItem});
                          }
                        }}
                        placeholder={`Select ${laner} Item`}
                        />
                      ))}
                      </div>
                    <div className={style.containerRunes}>
                      {/* {[...Array(numberOfRunes)].map((_, indexRune) => (
                        <input
                        key={`Rune ${laner} ${indexRune}`}
                          list={"runesList"}
                          defaultValue={localMeta[laner]?.[index]?.runes?.[indexRune]?.name || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "") {
                              // Eliminar el item cuando el input está vacío
                              handleChampionSelect({
                                laner,
                                index,
                                rune: null,
                                indexRune,
                              });
                              return;
                            }
                            const selectedRune = runes.find(
                              (rune) => rune.name === e.target.value
                            );
                            if (selectedRune) {
                              handleChampionSelect({laner, index, rune:selectedRune, indexRune});
                            }
                          }}
                          placeholder={`Select ${laner} Rune`}
                          />
                      ))} */}
                      {
                        [...Array(numberOfSlotsRunes)].map((_, indexSlotRune) => (
                          <input 
                            key={`SlotRune ${laner} ${indexSlotRune}`}
                            list={"slotsRunesList"}
                            defaultValue={localMeta[laner]?.[index]?.slotsRunes?.[indexSlotRune]?.name || ""}
                            placeholder={`Select ${laner} Rune`}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "") {
                                // Eliminar el item cuando el input está vacío
                                handleChampionSelect({
                                  laner,
                                  index,
                                  rune: null,
                                  indexSlotRune,
                                  slotRune: null,
                                  indexRune:indexSlotRune
                                });
                                return;
                              }
                              const selected = runes.reduce((acc, rune) => {
                                const slotRune = rune.slotsRunes.find(({ name }) => name === e.target.value);
                                return slotRune ? { rune, slotRune } : acc;
                              }, null);
                              const selectedRune = selected?.rune;
                              const selectedSlotRune = selected?.slotRune;
                              if (selectedRune || selectedSlotRune) {
                                handleChampionSelect({laner, index, slotRune:selectedSlotRune, indexSlotRune, indexRune: indexSlotRune, rune:selectedRune});
                              }
                            }}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
            ))}
          </div>
          <div className={style.containerChampionsImgData}>
          {localMeta[laner].map((championData, index) => {
            return (
              <div key={`championsImgData ${laner} ${index}`} className={style.containerChampionData}>
                <div className={style.containerChampionImg}>
                  {
                    championData?.champion?.imageSquare && 
                    <ImgChampSquare 
                      src={championData.champion.imageSquare}
                      alt={championData.champion.name}
                    />
                  }
                  <div className={style.containerImgItems}>
                    {localMeta[laner][index]?.items && localMeta[laner][index]?.items.map((item, indexItem) => {
                      if(item){
                        return (
                          <div key={`item ${indexItem}`} className={style.containerImgItem}>
                            <ImgItemSquare indexItem={indexItem} item={item} />
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div className={style.containerImgRunes}>
                    {localMeta[laner][index]?.runes && localMeta[laner][index]?.runes.map((rune, indexRune) => {
                      if(rune){
                        return (
                          <ImgRune key={`rune ${indexRune}`} indexRune={indexRune} rune={rune} />
                        )
                      }
                    })}
                  </div>
                  <div className={style.containerSlotsRunes}>
                    {localMeta[laner][index]?.slotsRunes && localMeta[laner][index]?.slotsRunes.map((slotRune, indexSlotRune) => {
                      if(slotRune){
                        return (
                          <ImgSlotRune key={`rune ${indexSlotRune}`} indexSlotRune={indexSlotRune} slotRune={slotRune} />
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      )}
    )}
    <input type="button" value="Guardar Cambios" onClick={()=>{saveChanges()}}/>
    <VisualizadorMetaLOL />
  </div>
)
}

export default FormularioMetaLOL;