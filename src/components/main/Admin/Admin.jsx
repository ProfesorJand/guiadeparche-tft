import React, {useEffect, useState, } from "react";
import Login from "./Login.jsx";
import CrearCompoTFT from "./CrearCompoTFT.jsx";
import { loadDataTFTFromAPI, constantesTFT, versionTFT } from "src/stores/dataTFT.js";
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
import AdminCrearPaginaMetaTFT from "./AdminCrearPaginaMetaTFT.jsx";
import AdminMercadoPagoPlanes from "./AdminMercadoPagoPlanes.jsx";
import AdminMercadoPagoCupones from "./AdminMercadoPagoCupones.jsx";
import AdminCorreos from "./AdminCorreos.jsx";
const AdminPanel = ()=>{
    const admin = useStore($admin);
    const superAdmin = useStore($superAdmin);
    const user = useStore($user);
    const currentVersion = useStore(versionTFT);
    const constantes = useStore(constantesTFT);
    const [discordMessage, setDiscordMessage] = useState(null);
    const pestanas = [
      {
        primario:"TFT",
        secundario:[
          { nombre: "Crear", admin: true, superAdmin: true },
          { nombre: "Editar", admin: true, superAdmin: true },
          { nombre: "Páginas Meta TFT", admin: true, superAdmin: true },
          { nombre: "Infografia Comps", admin: false, superAdmin: true },
          { nombre: "Tier List Items", admin: false, superAdmin: true },
          { nombre: "Tier List Augments", admin: false, superAdmin: true },
          { nombre: "Aumentos", admin: true, superAdmin: true },
          { nombre: "Campeones Early", admin: true, superAdmin: true },
          { nombre: "Deploy", admin: false, superAdmin: true },
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
      },
      {
        primario:"Correos",
        secundario:[
          { nombre: "Newsletters", admin: false, superAdmin: true }
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
                  ¿Qué quieres hacer en {primario}?
                  <div className={style.titlePestanaSecundario}>
                  {
                    secundario
                      .filter(s => (superAdmin && s.superAdmin) || (admin && s.admin))
                      .map((s,j)=>{
                        const value = s.nombre;
                        return (
                         
                              <button 
                              key={j} 
                                className={pestana === primario.concat(value) ? style.btnActive: ""} 
                                onClick={()=>{
                                  setAction(`${primario}-${value}`);
                                  setPestana(primario.concat(value))
                                }}
                                style={{padding:"4px 8px", maxWidth: "100px"}}
                              >
                                {value}
                              </button>
                        )
                      })
                  }
                  </div>
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
                {action === "TFT-Páginas Meta TFT" && <AdminCrearPaginaMetaTFT />}
                {action === "TFT-Deploy" && (() => {
                  const versionLabel = currentVersion === "pbe" ? (constantes?.MetaCompVersionPBE || "") : (constantes?.MetaCompVersion || "");
                  const defaultMsg = `@Guiadeparche Actualización Meta TFT ${versionLabel} :Jupe_Vuamoo:\n\nhttps://guiadeparche.com/tft/meta-comps-tier-list-teamfight-tactics/`;
                  const currentMsg = discordMessage !== null ? discordMessage : defaultMsg;

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', marginTop:"20px" }}>
                      <button 
                        onClick={() => handleDeploy("Añadí compos nuevas de TFT")}
                        style={{
                            backgroundColor: '#5865F2',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginTop: '10px'
                          }}
                      >
                          Desplegar Cambios
                          
                        </button>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>Mensaje para Discord</h3>
                        <p style={{ margin: 0, color: '#aaa', fontSize: '0.85rem' }}>
                          Puedes editar el mensaje aquí abajo. Para añadir saltos de línea simplemente presiona la tecla "Enter" mientras escribes.
                        </p>
                        <textarea 
                          value={currentMsg}
                          onChange={(e) => setDiscordMessage(e.target.value)}
                          rows={4}
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #444',
                            background: '#1e1f22',
                            color: '#fff',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                          }}
                        />
                        <button 
                          onClick={async () => {
                            if (!confirm(`¿Estás seguro de enviar este mensaje a Discord?\n\n${currentMsg}`)) return;
                            try {
                              const response = await fetch('https://api.guiadeparche.com/discord/notify_update_tft_meta.php', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ message: currentMsg })
                              });
                              const result = await response.json();
                              if (result.status === 'success') {
                                alert("¡Mensaje enviado a Discord correctamente!");
                              } else {
                                alert("Hubo un problema al enviar el mensaje a Discord: " + (result.message || 'Error desconocido'));
                              }
                            } catch (e) {
                              alert("Error de red al intentar notificar a Discord.");
                            }
                          }}
                          style={{
                            backgroundColor: '#5865F2',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginTop: '10px'
                          }}
                        >
                          Notificar actualización por Discord
                        </button>
                      </div>
                    </div>
                  );
                })()}
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
                {action === "Correos-Newsletters" && <AdminCorreos />}
                {/* {action === "champsItemsTierList" && <CrearTierListChampItem />} */}
            </div>
            <button className={style.btnCerrarSesion} onClick={()=>cerrarSesion()}>cerrar sesión</button>
            </>
        )
    }
}

export default AdminPanel;