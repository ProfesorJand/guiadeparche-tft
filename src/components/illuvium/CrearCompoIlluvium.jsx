import { useEffect, useState } from "react";
import style from "./CrearCompoIlluvium.module.css";
import ImagenElemento from "./imagenes/ImagenElemento";
import ImagenClase from "./imagenes/ImagenClase";
import { 
  getAugmentsList,
  getSuitAmplifiersList,
  getElements,
  getClases,
  getDronesAugmentsList,
  getWeaponsAmplifiers,
  getWeapons,
  carpetaAumentos,
  aumentosBasicos,
  aumentosLegendarios,
  suitsAmplifiers,
  elementos,
  clases,
  weapons,
  weaponsAmplifiers,
  dronesAugments,
  guardarCompo,
  loading
 } from "@stores/dataIlluvium";
import { useStore } from "@nanostores/react";

const CrearCompoIlluvium = ({edit=false, data})=>{
  const isLoading = useStore(loading)
  const tiers = ["S","A","B","C"];
  const dificultades = ["Hard", "Medium", "Easy"];
  const elementsList = useStore(elementos)
  const classList = useStore(clases) 
  const listaAumentosBasicos = useStore(aumentosBasicos);
  const listaAumentosLegendarios = useStore(aumentosLegendarios);
  const listaSuitsAmplifiers = useStore(suitsAmplifiers);
  const weaponsList = useStore(weapons)
  const weaponsAmplifiersList = useStore(weaponsAmplifiers);
  const dronesAugmentsList = useStore(dronesAugments)
  const [selectedTier, setSelectedTier] = useState(edit ?  data.selectedTier : tiers[0] );
  const [nombreCompo, setNombreCompo] = useState(edit ?  data.nombreCompo :"");
  const [nombreBondPartner, setNombreBondPartner] = useState(edit ?  data.nombreBondPartner : "")
  const [selectedDificultad, setSelectedDificultad] = useState(edit ?  data.selectedDificultad :dificultades[0])
  const [rollInLv, setRollInLv] = useState(edit ?  data.rollInLv : 5);
  const [elementoPartner, setElementoPartner] = useState(edit ?  data.elementoPartner :"");
  const [classPartner, setClassPartner] = useState(edit ? data.classPartner : "")
  const [bondPartnerImg, setBondPartnerImg] = useState(edit ?  data.bondPartnerImg : null);
  const [classWeapon, setClassWeapon] = useState(edit ?  data.classWeapon :"");
  const [elementWeapon, setElementWeapon] = useState(edit ?  data.elementWeapon :"");
  const [imgPosicionamiento, setImgPosicionamiento] = useState(edit ?  data.imgPosicionamiento :null);
  const [earlyGame, setEarlyGame] = useState(edit ?  data.earlyGame :"");
  const [midGame, setMidGame] = useState(edit ?  data.midGame :"");
  const [lateGame, setLateGame] = useState(edit ?  data.lateGame :"");
  const [carriesItemization, setCarriesItemization] = useState(edit ?  data.carriesItemization :[]);
  const [basicsAugments, setBasicsAugments] = useState(edit ?  data.basicsAugments :[]);
  const [legendsAugments, setLegendsAugments] = useState(edit ?  data.legendsAugments :[])
  const [weapon, setWeapon] = useState(edit ?  data.weapon :"");
  const [weaponAmplifier, setWeaponAmplifier] = useState(edit ?  data.weaponAmplifier :"")
  const [suitAmplifier, setSuitAmplifier] = useState(edit ?  data.suitAmplifier :[])
  const [droneAugment, setDroneAugment] = useState(edit ?  data.droneAugment :[])
  const [id, setId] = useState( edit ? data.id : "")
  useEffect(()=>{
    /*cargando lista de aumentos */
    const cargandoLista = async()=>{

      await getAugmentsList({aumento:carpetaAumentos[0]});
      await getAugmentsList({aumento:carpetaAumentos[1]});
      await getSuitAmplifiersList();
      await getElements();
      await getClases();
      await getDronesAugmentsList();
      await getWeaponsAmplifiers();
      await getWeapons();
    }
    cargandoLista()
  },[])

  return (
    <div className={style.container}>
      {/* Encabezado */}
      <label>
        Seleccionar Tier:
        <select onChange={(e)=>{setSelectedTier(e.target.value)}} value={selectedTier}>
          {
            tiers.map((tier, i)=>{
              return (
                <option key={`optionTier-${i}`} value={tier}>{tier}</option>
              )
            })
          }
        </select>
      </label>

      <label>
        Nombre de la Compo:
        <input 
          type="text" 
          onChange={(e)=>{setNombreCompo(e.target.value)}}
          value={nombreCompo}
        ></input>
      </label>

      <label>
        Seleccionar Dificultad:
        <select onChange={(e)=>{setSelectedDificultad(e.target.value)}} value={selectedDificultad}>
          {
            dificultades.map((dificultad, i )=>{
              return (
                <option key={`optionDificultad-${i}`} value={dificultad}>{dificultad}</option>
              )
            })
          }
        </select>
      </label>

      <label>
        Seleccionar Lv Roll:
        <input 
          type="number" 
          min={3}
          max={10}
          value={rollInLv}
          onChange={(e)=>{setRollInLv(e.target.value)}}>
        </input>
      </label>

      {/* Bonded Partner */}
      <fieldset>
      <legend>Bond Partner:</legend>
        <label>
        Imagen del Bond Partner: <br></br>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onloadend = () => {
                setBondPartnerImg(reader.result);
              };
              reader.readAsDataURL(file);
            }} 
            />
        </label>

        <label>
          Nombre del Bond Partner:
          <input 
            type="text" 
            onChange={(e)=>{setNombreBondPartner(e.target.value)}}
            value={nombreBondPartner}
            ></input>
        </label>

        <label>
          Elemento Bond Partner:
          <select onChange={(e)=>{setElementoPartner(e.target.value)}} value={elementoPartner}>
          {
            elementsList.map((elemento, i )=>{
              return (
                <option key={`optionElementoPartner-${i}`} value={elemento}>{elemento}</option>
              )
            })
          }
        </select>
        </label>
        <label>
          Clase Bond Partner:
          <select onChange={(e)=>{setClassPartner(e.target.value)}} value={classPartner}>
          {
            classList.map((clase, i )=>{
              return (
                <option key={`optionClasePartner-${i}`} value={clase}>{clase}</option>
              )
            })
          }
        </select>
        
        </label>
          { bondPartnerImg &&
            <img className={style.bondPartnerImg} src={bondPartnerImg.includes("data:image") ? bondPartnerImg : "https://api.guiadeparche.com"+bondPartnerImg} alt={""}></img>
          }
        {
          elementoPartner && 
          <ImagenElemento elemento={elementoPartner}/>
        }
        {
          classPartner && 
          <img className={style.bondPartnerImg} src={"https://api.guiadeparche.com/illuvium/assets/clases/"+classPartner} alt={""}></img>
        }

      </fieldset>
      <fieldset>
        <legend>Weapon</legend>
          <label htmlFor="inputWeapon">Weapon:
            <input 
              list="weapons" 
              id="inputWeapon" 
              name="inputWeapon" 
              value={weapon}
                onChange={(e)=>{
                setWeapon(e.target.value);
              }}
            />
            <datalist id={"weapons"} >
              {weaponsList.map((nombreImg, k)=>{
                return (
                  <option
                    key={`opcionesWeapons-${k}`}
                    value={nombreImg}  
                  ></option>
                )
              })}
            </datalist>
          </label>
          <label htmlFor="inputWeaponAmplifier">Weapon Amplifier:
            <input 
              list="weaponsAmplifiers" 
              id="inputWeaponAmplifier" 
              name="inputWeaponAmplifier" 
              value={weaponAmplifier}
                onChange={(e)=>{
                setWeaponAmplifier(e.target.value);
              }}
            />
            <datalist id={"weaponsAmplifiers"} >
              {weaponsAmplifiersList.map((nombreImg, k)=>{
                return (
                  <option
                    key={`opcionesWeapons-${k}`}
                    value={nombreImg}  
                  ></option>
                )
              })}
            </datalist>
          </label>
        <label>
          Select Class:
          <select onChange={(e)=>{setClassWeapon(e.target.value)}} value={classWeapon}>
            {
              classList.map((clase, i)=>{
                return (
                  <option  key={`optionClassWapon-${i}`} value={clase}>{clase.replace(".png","")}</option>
                )

              })
            }
          </select>
        </label>
        <label>
          Select Element:
          <select onChange={(e)=>{setElementWeapon(e.target.value)}} value={elementWeapon}>
            {
              elementsList.map((elemento, i)=>{
                return (
                  <option  key={`optionElementWapon-${i}`} value={elemento}>{elemento}</option>
                )

              })
            }
          </select>
          </label>
           {
            weapon &&
            <img 
              src={`https://api.guiadeparche.com/illuvium/assets/weapons/${weapon}`}
              style={{width:"50px",height:"50px"}}
            ></img>
          }
          {
            weapon &&
            <img 
              src={`https://api.guiadeparche.com/illuvium/assets/weapons_amplifiers/${weaponAmplifier}`}
              style={{width:"50px",height:"50px"}}
            ></img>
          }
          {
            classWeapon && 
            <ImagenClase clase={classWeapon}/>
          }
          {
            elementWeapon && 
            <ImagenElemento elemento={elementWeapon}/>
          }

      </fieldset>

      <fieldset>
        <legend>Posicionamiento</legend>
        <label>
        Imagen Posicionamiento: <br></br>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onloadend = () => {
                setImgPosicionamiento({
                  dataURL: reader.result,
                  name: file.name
                });
              };
              reader.readAsDataURL(file);
            }} 
            />
        </label>
        { imgPosicionamiento &&
            <img 
              className={style.bondPartnerImg} 
              src={
                (typeof imgPosicionamiento?.dataURL === "string" && imgPosicionamiento?.dataURL.startsWith("data:image")) ?
                imgPosicionamiento?.dataURL : 
                "https://api.guiadeparche.com"+imgPosicionamiento} 
                alt={""}>
            </img>
        }

      </fieldset>

      <fieldset>
        <legend>Suits Amplifiers</legend>
        {
          Array.from({length: 2}, (_null, i)=>{
            return (
              <label key={`suitsAplifiers${i}`} htmlFor="inputSuitsAplifiers">Augment Basico #{i+1}:
                <input 
                  list="suitsAplifiers" 
                  id="inputSuitsAplifiers" 
                  name="inputSuitsAplifiers" 
                  value={suitAmplifier[i]}
                  onChange={(e)=>{
                    setSuitAmplifier((oldArray)=>{
                      const nuevoArray = [...oldArray];
                      nuevoArray[i]= e.target.value;
                      return nuevoArray;
                    });
                  }}
                />
                <datalist id={"suitsAplifiers"} >
                  {listaSuitsAmplifiers.map((nombreImg, k)=>{
                    return (
                      <option
                        key={`opcionesSuitsAplifiers-${i}-${k}`}
                        value={nombreImg}  
                      ></option>
                    )
                  })}
                </datalist>
              </label>
            )
          })
        }
        {
          suitAmplifier[0] &&
          <img 
            src={`https://api.guiadeparche.com/illuvium/assets/suits_amplifiers/${suitAmplifier[0]}`}
            style={{width:"50px",height:"50px"}}
          ></img>
        }
        {
          suitAmplifier[1] &&
          <img 
            src={`https://api.guiadeparche.com/illuvium/assets/suits_amplifiers/${suitAmplifier[1]}`}
            style={{width:"50px",height:"50px"}}
          ></img>
        }
      </fieldset>

      <fieldset>
        <legend>Drones Augments</legend>
        {
          Array.from({length: 4}, (_null, i)=>{
            return (
              <label key={`droneAugment${i}`} htmlFor="inputDronesAugments">Drone #{i+1}:
                <input 
                  list="dronesAugments" 
                  id="inputDronesAugments" 
                  name="inputDronesAugments" 
                  value={droneAugment[i]}
                  onChange={(e)=>{
                    const value = e.target.value;

                    setDroneAugment((oldArray)=>{
                      const nuevoArray = [...oldArray];
                      nuevoArray[i] =  value;
                      return nuevoArray;
                    });
                  }}
                />
                <datalist id={"dronesAugments"} >
                  {dronesAugmentsList.map((nombreImg, k)=>{
                    return (
                      <option
                        key={`opcionesDroneAugment-${i}-${k}`}
                        value={nombreImg}  
                      ></option>
                    )
                  })}
                </datalist>
              </label>
            )
          })
        }
        {
          droneAugment?.length > 0 && droneAugment.map((drone)=>{
            return (
              <img 
                src={`https://api.guiadeparche.com/illuvium/assets/drones_augments/${drone}`}
                style={{width:"50px",height:"50px"}}
              ></img>
            )
          })
        }
      </fieldset>

      <fieldset>
        <legend>Early / Mid / Late Game</legend>
        <label>
          Early Game
          <textarea 
            rows="3"
            placeholder="Early Game"
            value={earlyGame}
            onChange={(e)=>{
            setEarlyGame(e.target.value)  
          }}>
          </textarea>
        </label>
        <label>
          Mid Game
          <textarea 
            rows="3"
            placeholder="Mid Game"
            value={midGame}
            onChange={(e)=>{
            setMidGame(e.target.value)  
          }}>
          </textarea>
        </label>
        <label>
          Late Game
          <textarea 
            rows="3"
            placeholder="Late Game"
            value={lateGame}
            onChange={(e)=>{
            setLateGame(e.target.value)  
          }}>
          </textarea>
        </label>
      </fieldset>

      

      <fieldset>
        <legend>Carries & Augments Itemization</legend>
        {
           Array.from({ length: 4 }, (_null,i)=>{
            return (
              <fieldset key={`Carriesfieldset${i}`}>
                <legend>#{i+1}</legend>
                <label>
                  Imagen Illuvial:
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setCarriesItemization((oldArray) => {
                          const nuevoArray = [...oldArray];
                          // guardamos tanto el dataURL como el nombre
                          nuevoArray[i] = {
                            dataURL: reader.result,
                            name: file.name
                          };
                          return nuevoArray;
                        });
                      };
                      reader.readAsDataURL(file);
                    }} 
                  />
                </label>
                {/* Botón para limpiar */}
                <input
                  type="button"
                  value="Limpiar imagen"
                  onClick={() => {
                    setCarriesItemization((oldArray) => {
                      const nuevoArray = [...oldArray];
                      if (nuevoArray[i]) {
                        nuevoArray[i] = {};
                      }
                      return nuevoArray;
                    });
                  }}
                >
                </input>

                {/* Vista previa */}
                {carriesItemization[i] && (
                  <img
                    src={
                      // Caso 1: nuevo formato con objeto { dataURL, name }
                      typeof carriesItemization[i] === "object" && carriesItemization[i]?.dataURL
                        ? carriesItemization[i].dataURL
                        // Caso 2: viejo formato, string base64
                        : typeof carriesItemization[i] === "string" && carriesItemization[i].startsWith("data:image")
                        ? carriesItemization[i]
                        // Caso 3: URL del backend
                        : typeof carriesItemization[i] === "string"
                        ? "https://api.guiadeparche.com" + carriesItemization[i]
                        : ""
                    }
                    alt={`Illuvial #${i + 1}`}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                )}

                {
                  Array.from({length: 3}, (_null, j)=>{
                    return (
                      <label key={`aumentosBasicos${i}-${j}`} htmlFor="inputAumentoBasico">Augment Basico #{j+1}:
                        <input 
                          list="aumentosBasicos" 
                          id="inputAumentoBasico" 
                          name="inputAumentoBasico" 
                          value={basicsAugments?.[i]?.[j] || ""}
                           onChange={(e)=>{
                            setBasicsAugments((oldArray)=>{
                              const nuevoArray = [...oldArray];
                              nuevoArray[i] = nuevoArray[i] || [];
                              nuevoArray[i][j] = e.target.value
                              return nuevoArray;
                            });
                          }}
                        />
                        <datalist id={"aumentosBasicos"} >
                          {listaAumentosBasicos.map((nombreImg, k)=>{
                            return (
                              <option
                                key={`opcionesAumentosBasicos-${i}-${j}-${k}`}
                                value={nombreImg}  
                              ></option>
                            )
                          })}
                        </datalist>
                      </label>
                    )
                  })
                }

                {
                  Array.from({length: 3}, (_null, j)=>{
                    return (
                      <label key={`aumentosLegendarios${i}-${j}`} htmlFor="inputAumentosLegendarios">Augment Legendario #{j+1}:
                        <input
                          list="aumentosLegendarios" 
                          id="inputAumentosLegendarios" 
                          name="inputAumentosLegendarios" 
                          value={legendsAugments?.[i]?.[j] || ""}
                          onChange={(e)=>{
                            setLegendsAugments((oldArray)=>{
                              const nuevoArray = [...oldArray];
                              nuevoArray[i] = nuevoArray[i] || [];
                              nuevoArray[i][j] = e.target.value
                              return nuevoArray;
                            });
                          }}
                        />
                        <datalist id={"aumentosLegendarios"}>
                          {listaAumentosLegendarios.map((nombreImg, k)=>{
                            return (
                              <option
                                key={`opcionesAumentosLegendarios-${i}-${j}-${k}`}
                                value={nombreImg}  
                              ></option>
                            )
                          })}
                        </datalist>
                      </label>
                    )
                  })
                }

                {
                  basicsAugments?.[i]?.length > 0 && 
                  basicsAugments?.[i].map((aumento, j)=>{
                    return (
                      <img 
                        key={`imgAumentosBasicos${i}-${j}`} 
                        src={`https://api.guiadeparche.com/illuvium/assets/aumentos/basicos/`+aumento} 
                        alt={aumento}
                        style={{
                          width:"50px",
                          height:"auto"
                        }}
                        >
                      </img>
                    )
                  })
                }

                {
                  legendsAugments?.[i]?.length > 0 && 
                  legendsAugments?.[i].map((aumento, j)=>{
                    return (
                      <img 
                        key={`imgAumentosLegendarios${i}-${j}`} 
                        src={`https://api.guiadeparche.com/illuvium/assets/aumentos/legendarios/`+aumento} 
                        alt={aumento}
                        style={{
                          width:"50px",
                          height:"auto"
                        }}
                        >
                      </img>
                    )
                  })
                }

              </fieldset>
          )
          })
        }

        
      </fieldset>

      
      <input 
        type="button" 
        value="Crear Compo"
        disabled={isLoading}
        onClick={()=>{

          guardarCompo({
            selectedTier,
            nombreCompo,
            selectedDificultad,
            rollInLv,
            classWeapon,
            elementWeapon,
            bondPartnerImg,
            elementoPartner,
            classPartner,
            nombreBondPartner,
            imgPosicionamiento,
            earlyGame,
            midGame,
            lateGame,
            carriesItemization,
            basicsAugments,
            legendsAugments,
            weapon,
            weaponAmplifier,
            suitAmplifier,
            droneAugment,
            edit,
            id,
          })
        }}></input>
    </div>
  )
}

export default CrearCompoIlluvium