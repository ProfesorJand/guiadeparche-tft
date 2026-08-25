import React, {useEffect, useState, } from "react";
import Login from "./Login.jsx";
import CrearCompoTFT from "./CrearCompoTFT.jsx";
import { loadDataTFTFromAPI } from "src/stores/dataTFT.js";
import EditarCompoTFT from "./EditarCompoTFT.jsx";
import CreateItemsTierList from "./CreateItemsTierList.jsx";
import FormularioMetaLOL from "@components/leagueOfLegends/FormularioMetaLOL.jsx";
//import CrearTierListChampItem from "./crearTierListChampItem.jsx"
import CreateAugmentsTierList from "./CreateAugmentsTierList.jsx";
import AdminTFTAumentos from "./AdminTFTAumentos.jsx";
import style from "./css/Admin.module.css";
import StreamersManager from "@components/embed/StreamersManager.jsx";
import InfografiaTFT from "@components/Infografias/TopTFT/InfografiaTFT.jsx";
import FormularioTierListValorant from "@components/valorant/FormularioTierListValorant.jsx";
import FormularioMetaWildrift from "@components/wildrift/FormularioMetaWildrift.jsx";
import InfografiaTFTComps from "@components/TFT/InfografiaTFTComps.jsx";
import InfografiaTop5 from '@components/Infografias/Top5/InfografiaTop5.jsx';
import Formulario2XKO from "@components/2xko/Formulario2XKO.jsx";
import DeckBuilder from "@components/riftbound/DeckBuilder.jsx"
import { $admin, $superAdmin, logOut, $user, setUser } from "@stores/auth";
import {useStore} from "@nanostores/react";
import FormularioCrearCompoTFT from "@components/TFT/FormularioCrearCompoTFT.jsx";
import FormularioVisualTFT from "@components/TFT/FormularioVisualTFT.jsx";
import AdminPublicidad from "./AdminPublicidad.jsx";
import AdminTFTCampeonesEarly from "./AdminTFTCampeonesEarly.jsx";
import AdminCrearCampeonesTFT from "./AdminCrearCampeonesTFT.jsx";
import AdminMercadoPagoPlanes from "./AdminMercadoPagoPlanes.jsx";
import AdminMercadoPagoCupones from "./AdminMercadoPagoCupones.jsx";

const AdminPanel = ()=>{
    const admin = useStore($admin);
    const superAdmin = useStore($superAdmin);
    const user = useStore($user);
    const pestanas = [
      {
        primario:"TFT",
        secundario:[
          { nombre: "Crear", admin: true, superAdmin: true },
          { nombre: "Editar", admin: true, superAdmin: true },
          { nombre: "Creacion de campeones", admin: true, superAdmin: true },
          { nombre: "Infografia Comps", admin: false, superAdmin: true },
          { nombre: "Tier List Items", admin: false, superAdmin: true },
          { nombre: "Tier List Augments", admin: false, superAdmin: true },
          { nombre: "Deploy", admin: false, superAdmin: true },
          { nombre: "Aumentos", admin: true, superAdmin: true },
          { nombre: "Campeones Early", admin: true, superAdmin: true }
        ],
        admin: true,
        superAdmin: true
      },{
        primario:"LOL",
        secundario:[
          { nombre: "Meta", admin: true, superAdmin: true }
        ],
        admin: true,
        superAdmin: true
      },{
        primario:"VALORANT",
        secundario:[
          { nombre: "Meta", admin: true, superAdmin: true }
        ],
        admin: true,
        superAdmin: true
      },{
        primario:"Wild Rift",
        secundario:[
          { nombre: "Meta", admin: true, superAdmin: true }
        ],
        admin: true,
        superAdmin: true
      },{
        primario:"2XKO",
        secundario:[
          { nombre: "Meta", admin: true, superAdmin: true }
        ],
        admin: true,
        superAdmin: true
      },{
        primario:"Infografia Zero",
        secundario:[
          { nombre: "Crear", admin: true, superAdmin: true }
        ],
        admin: true,
        superAdmin: true
      },{
        primario:"Streamer",
        secundario:[
          { nombre: "Editar", admin: true, superAdmin: true }
        ],
        admin: false,
        superAdmin: true
      },{
        primario:"Riftbound",
        secundario:[
          { nombre: "Redes Deck", admin: true, superAdmin: true }
        ],
        admin: true,
        superAdmin: true
      },
      {
        primario:"Mercado Pago",
        secundario:[
          { nombre: "Planes Suscripción / Pago único", admin: true, superAdmin: true },
          { nombre: "Cupones de descuentos", admin: true, superAdmin: true }
        ],
        admin: false,
        superAdmin: true
      },
      {
        primario:"Publicidad GP",
        secundario:[
          { nombre: "Gestionar", admin: true, superAdmin: true }
        ],
        admin: false,
        superAdmin: true
      }
    ]

    const pestanasVisibles = pestanas.filter(p => (superAdmin && p.superAdmin) || (admin && p.admin));
    const [pestana, setPestana] = useState(null);
    const [action, setAction] = useState(null);
    const [action2, setAction2] = useState(null);

    useEffect(() => {
      if (user?.email && (admin || superAdmin)) {
        const verifySilent = async () => {
          try {
            const response = await fetch('https://api.guiadeparche.com/verify-user.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email })
            });
            const result = await response.json();
            if (result.status === 'success' && result.user) {
              const datosUsuario = result.user;
              setUser({
                ...user,
                isAdmin: result.isAdmin || datosUsuario.admin == 1 || datosUsuario.superAdmin == 1,
                isSuperAdmin: result.isSuperAdmin || datosUsuario.superAdmin == 1,
              });
            } else if (result.status === 'error') {
              logOut();
            }
          } catch(e) {
            console.error("Error validando admin silenciosamente", e);
          }
        };
        verifySilent();
      }
    }, [user?.email, admin, superAdmin]);

    function cerrarSesion(){
        logOut()
    }

    const handleDeploy = async (mensaje) => {
      const message = prompt("Mensaje del despliegue:", mensaje);
      if (!message) return;
      try {
        const response = await fetch('https://api.guiadeparche.com/tft/trigger-deploy.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        alert("¡Despliegue iniciado! En 2-3 minutos los cambios serán visibles para el SEO.");
      } catch (e) {
        alert("Error al solicitar el despliegue.");
      }
    };

    if(admin || superAdmin){
        return (
            <>
            <div className={style.navegador}>
                {
                  pestanasVisibles.map(({primario,secundario},index)=>{
                    return (
                      <div key={index} className={style.container}>
                        <input 
                          type="button"
                          value={primario}
                          onClick={()=>{
                            if(primario !== "Infografia Zero" && primario !== "Riftbound"){
                              setPestana(primario)
                            }
                            else if(primario === "Infografia Zero"){
                              window.location.href = "/crearInfografia"
                            }
                             else if(primario === "Riftbound"){
                              window.location.href = "/riftbound/create-deck"
                            }
                          }}
                          className={pestana?.includes(primario) ? style.btnActive: ""}
                          ></input>
                        
                      </div>
                    )
                  })
                }     
            </div>

            { pestanasVisibles.map(({primario,secundario},index)=>{
              if(pestana?.includes(primario))
              return (
                <div key={index} className={style.containerPestanaSecundario}>
                  <div className={style.titlePestanaSecundario}>¿Qué quieres hacer en {primario}?</div>
                  {
                    secundario
                      .filter(s => (superAdmin && s.superAdmin) || (admin && s.admin))
                      .map((s,j)=>{
                        const value = s.nombre;
                        return (
                          <div key={j} className={style.compos}>
                              <button 
                                className={pestana === primario.concat(value) ? style.btnActive: ""} 
                                onClick={()=>{
                                  setAction(`${primario}-${value}`);
                                  setPestana(primario.concat(value))
                                }}
                              >
                                {value}
                              </button>
                          </div>
                        )
                      })
                  }
                </div>
              )
            })}
            
            <div>
                {/* {action === "TFT-Crear" && <CrearCompoTFT />} */}
                {action === "TFT-Crear" && <FormularioVisualTFT />}
                {action === "TFT-Editar" && <EditarCompoTFT />}
                {action === "TFT-Infografia Comps" && <InfografiaTFT/>}
                {/* {action === "InfografiaTFTCompo" && <InfografiaTFTComps/>} */}
                {action === "TFT-Tier List Items" && <CreateItemsTierList />}
                {action === "TFT-Tier List Augments" && <CreateAugmentsTierList admin={admin || superAdmin}/>}
                {action === "TFT-Aumentos" && <AdminTFTAumentos />}
                {action === "TFT-Campeones Early" && <AdminTFTCampeonesEarly />}
                {action === "TFT-Creacion de campeones" && <AdminCrearCampeonesTFT />}
                {action === "TFT-Deploy" && <button onClick={() => handleDeploy("Añadí compos nuevas de TFT")}>Desplegar Cambios</button>}
                {action?.includes(pestanas[1].primario) && <FormularioMetaLOL />}
                {action?.includes(pestanas[2].primario) && <FormularioTierListValorant />}
                {action?.includes(pestanas[3].primario) && <FormularioMetaWildrift/>}
                {action?.includes(pestanas[4].primario) && <Formulario2XKO/>}
                {action?.includes(pestanas[5].primario) && <InfografiaTop5/>}
                {action?.includes(pestanas[6].primario) && <StreamersManager/>}
                {action?.includes(pestanas[7].primario) && <DeckBuilder/>}
                {action === "Mercado Pago-Planes Suscripción / Pago único" && <AdminMercadoPagoPlanes />}
                {action === "Mercado Pago-Cupones de descuentos" && <AdminMercadoPagoCupones />}
                {action?.includes("Publicidad GP") && <AdminPublicidad />}
                {/* {action === "champsItemsTierList" && <CrearTierListChampItem />} */}
            </div>
            <button className={style.btnCerrarSesion} onClick={()=>cerrarSesion()}>cerrar sesión</button>
            </>
        )
    }
}

export default AdminPanel;