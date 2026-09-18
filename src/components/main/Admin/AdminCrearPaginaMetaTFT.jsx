import React, { useState, useEffect } from "react";
import style from "./css/AdminCrearPaginaMetaTFT.module.css";
import { useStore } from "@nanostores/react";
import { dataTFTTraits, versionTFT, setNumberLatest, setNumberPBE, swapVersionTFT } from "@stores/dataTFT";

const ROLES = [
  "HFighter", "APTank", "APReaper", "APFighter", "APCaster", "APCarry", 
  "ADTank", "ADSpecialist", "ADReaper", "ADFighter", "ADCaster", "ADCarry"
];

const AdminCrearPaginaMetaTFT = () => {
  const currentVersion = useStore(versionTFT);
  const allTraits = useStore(dataTFTTraits) || [];
  
  const targetSet = currentVersion === "pbe" ? setNumberPBE : setNumberLatest;

  const [activeTab, setActiveTab] = useState("campeones"); // campeones, sinergias, items

  const getTableName = () => {
    if (activeTab === "campeones") return "campeones_tft";
    if (activeTab === "sinergias") return "traits_TFT_set_18";
    if (activeTab === "items") return "items_tft_set_18";
    return "campeones_tft";
  };

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    apiName: "",
    tileIcon: "",
    icon: "",
    squareIcon: "",
    cost: "",
    role: "",
    traits: [],
    titulo_seo: "",
    descripcion_seo: "",
    video_url: "",
    url_seo: "",
    secciones: [], // Array of { titulo: "", descripcion: "" }
    desc_trait: "",
    effects: {}, // Objeto mapeando minUnits a descripción { "2": "Daño mágico", "4": "..." }
    tft_set: ""
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  
  // Estado para búsqueda y edición
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedEntities, setLoadedEntities] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Cargar lista de entidades cada vez que cambias de pestaña
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch(`https://api.guiadeparche.com/tft/getMetaEntidades.php?table=${getTableName()}`);
        if (response.ok) {
          const result = await response.json();
          setLoadedEntities(result.data || result || []);
        }
      } catch (err) {
        console.error("Error cargando entidades:", err);
      }
    };
    fetchEntities();
  }, [activeTab]);

  const filteredEntities = loadedEntities.filter(ent => 
    ent.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ent.apiName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadEntityForEdit = (entity) => {
    // Parsear campos que vengan como string JSON desde la BD
    let parsedTraits = [];
    let parsedSecciones = [];
    let parsedEffects = [];
    
    try { parsedTraits = typeof entity.traits === 'string' ? JSON.parse(entity.traits) : (entity.traits || []); } catch(e) {}
    try { parsedSecciones = typeof entity.secciones === 'string' ? JSON.parse(entity.secciones) : (entity.secciones || []); } catch(e) {}
    try { 
      const effectsData = typeof entity.effects === 'string' ? JSON.parse(entity.effects) : (entity.effects || []); 
      if (Array.isArray(effectsData)) {
        if (effectsData.length > 0 && typeof effectsData[0].style !== 'undefined' && typeof effectsData[0].description === 'undefined') {
          // Si el usuario guardó el JSON original de Riot (Array de objetos, sin description)
          parsedEffects = [];
        } else {
          // Formato propio de descripciones: [{minUnits, style, description}]
          parsedEffects = effectsData;
        }
      } else {
        parsedEffects = [];
      }
    } catch(e) {
      parsedEffects = [];
    }

    setFormData({
      id: entity.id || null,
      name: entity.name || "",
      apiName: entity.apiName || "",
      tileIcon: entity.tileIcon || "",
      icon: entity.icon || "",
      squareIcon: entity.squareIcon || "",
      cost: entity.cost || "",
      role: entity.role || "",
      traits: parsedTraits,
      titulo_seo: entity.titulo_seo || "",
      descripcion_seo: entity.descripcion_seo || "",
      video_url: entity.video_url || "",
      url_seo: entity.url_seo || "",
      secciones: parsedSecciones,
      desc_trait: entity.desc_trait || "",
      effects: parsedEffects,
      tft_set: entity.tft_set || ""
    });
    setSearchQuery("");
    setIsSearching(false);
    setStatus({ type: "success", message: `Entidad '${entity.name}' cargada para editar.` });
  };

  // Generar URL SEO automáticamente cuando cambia el nombre
  useEffect(() => {
    if (formData.name) {
      const generatedUrl = formData.name.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');
      setFormData(prev => ({ ...prev, url_seo: generatedUrl }));
    }
  }, [formData.name]);

  const handleVersionChange = (e) => {
    swapVersionTFT(e.target.value);
  };

  const handleTraitChange = (traitApiName) => {
    setFormData(prev => {
      const currentTraits = [...prev.traits];
      if (currentTraits.includes(traitApiName)) {
        return { ...prev, traits: currentTraits.filter(t => t !== traitApiName) };
      } else {
        currentTraits.push(traitApiName);
        return { ...prev, traits: currentTraits };
      }
    });
  };

  const addSeccion = () => {
    setFormData(prev => ({
      ...prev,
      secciones: [...prev.secciones, { titulo: "", descripcion: "" }]
    }));
  };

  const removeSeccion = (index) => {
    setFormData(prev => {
      const newSecciones = [...prev.secciones];
      newSecciones.splice(index, 1);
      return { ...prev, secciones: newSecciones };
    });
  };

  const updateSeccion = (index, field, value) => {
    setFormData(prev => {
      const newSecciones = [...prev.secciones];
      newSecciones[index][field] = value;
      return { ...prev, secciones: newSecciones };
    });
  };

  const updateEffect = (index, minUnits, styleValue, value) => {
    setFormData(prev => {
      const newEffects = [...(prev.effects || [])];
      newEffects[index] = { minUnits, style: styleValue, description: value };
      return { ...prev, effects: newEffects };
    });
  };

  const currentTraitData = allTraits.find(t => t.apiName === formData.apiName);

  const resetForm = () => {
    setFormData({
      id: null,
      name: "", apiName: "", tileIcon: "", icon: "", squareIcon: "", cost: "", role: "", traits: [],
      titulo_seo: "", descripcion_seo: "", video_url: "", url_seo: "", secciones: [],
      desc_trait: "", effects: [], tft_set: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const token = import.meta.env.PUBLIC_TOKEN_META || "dummy_token";
      const payload = {
        ...formData,
        effects: formData.effects, // PHP ya lo convierte con json_encode, no necesitamos stringificar aquí
        cost: formData.cost ? Number(formData.cost) : null,
        tft_set: formData.tft_set ? formData.tft_set : targetSet,
        tableName: getTableName()
      };

      const res = await fetch("https://api.guiadeparche.com/tft/crearCampeonTFT.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      console.log("🚀 Respuesta del PHP:", result);
      
      if (result.status === "success") {
        setStatus({ type: "success", message: `Entidad guardada exitosamente en ${getTableName()}.` });
        resetForm();
      } else {
        setStatus({ type: "error", message: result.message || "Error al guardar entidad." });
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Error de red al conectar con el servidor." });
    }
    setLoading(false);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Gestor de Entidades Meta TFT</h2>
        <p>Set actual: <strong>{targetSet}</strong></p>
        <div style={{ marginTop: "10px", display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ marginRight: "10px" }}>Cambiar Versión/Set:</label>
          <select value={currentVersion} onChange={handleVersionChange} className={style.select} style={{ width: "auto" }}>
            <option value="latest">Set {setNumberLatest} (Latest)</option>
            <option value="pbe">Set {setNumberPBE} (PBE)</option>
          </select>
        </div>
        
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button 
            type="button" 
            onClick={() => { setActiveTab("campeones"); resetForm(); }}
            className={activeTab === "campeones" ? style.tabActive : style.tabInactive}
            style={{ padding: "8px 16px", background: activeTab === "campeones" ? "#7b61ff" : "#333", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Campeones
          </button>
          <button 
            type="button" 
            onClick={() => { setActiveTab("sinergias"); resetForm(); }}
            className={activeTab === "sinergias" ? style.tabActive : style.tabInactive}
            style={{ padding: "8px 16px", background: activeTab === "sinergias" ? "#7b61ff" : "#333", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Sinergias
          </button>
          <button 
            type="button" 
            onClick={() => { setActiveTab("items"); resetForm(); }}
            className={activeTab === "items" ? style.tabActive : style.tabInactive}
            style={{ padding: "8px 16px", background: activeTab === "items" ? "#7b61ff" : "#333", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Ítems
          </button>
        </div>
        <p style={{ marginTop: "10px", color: "#aaa", fontSize: "14px" }}>Guardando en la tabla: <strong>{getTableName()}</strong></p>
      </div>

      <div style={{ background: "rgba(0,0,0,0.3)", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "10px", fontSize: "16px" }}>Buscador para Editar</h3>
        <input 
          type="text" 
          className={style.input} 
          placeholder="Buscar entidad por nombre o apiName..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearching(true);
          }}
          style={{ marginBottom: "10px" }}
        />
        {searchQuery && isSearching && (
          <div style={{ maxHeight: "150px", overflowY: "auto", background: "#222", borderRadius: "4px", border: "1px solid #444" }}>
            {filteredEntities.length > 0 ? (
              filteredEntities.map((ent, idx) => (
                <div 
                  key={idx} 
                  onClick={() => loadEntityForEdit(ent)}
                  style={{ padding: "8px 12px", borderBottom: "1px solid #333", cursor: "pointer" }}
                  onMouseEnter={(e) => e.target.style.background = "#333"}
                  onMouseLeave={(e) => e.target.style.background = "transparent"}
                >
                  {ent.name} <span style={{ color: "#aaa", fontSize: "12px" }}>({ent.apiName})</span>
                </div>
              ))
            ) : (
              <div style={{ padding: "8px 12px", color: "#aaa", fontStyle: "italic" }}>No se encontraron resultados.</div>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label>Nombre</label>
          <input 
            type="text" 
            className={style.input} 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
            placeholder="Ej: Jinx"
          />
        </div>

        <div className={style.formGroup}>
          <label>apiName</label>
          <input 
            type="text" 
            className={style.input} 
            value={formData.apiName} 
            onChange={e => setFormData({...formData, apiName: e.target.value})} 
            required 
            placeholder="Ej: TFT18_Jinx"
          />
        </div>

        {activeTab === "campeones" && (
          <div className={style.formGroup}>
            <label>Coste</label>
            <input 
              type="number" 
              className={style.input} 
              value={formData.cost} 
              onChange={e => setFormData({...formData, cost: e.target.value})} 
              placeholder="Ej: 5"
              min="1"
              max="10"
            />
          </div>
        )}

        <div className={style.formGroup}>
          <label>URL Icono Principal (icon)</label>
          <input 
            type="text" 
            className={style.input} 
            value={formData.icon} 
            onChange={e => setFormData({...formData, icon: e.target.value})} 
            placeholder="https://..."
          />
        </div>

        {activeTab === "campeones" && (
          <>
            <div className={style.formGroup}>
              <label>URL tileIcon (Community Dragon)</label>
              <input 
                type="text" 
                className={style.input} 
                value={formData.tileIcon} 
                onChange={e => setFormData({...formData, tileIcon: e.target.value})} 
                placeholder="https://..."
              />
            </div>
            <div className={style.formGroup}>
              <label>URL squareIcon (Community Dragon)</label>
              <input 
                type="text" 
                className={style.input} 
                value={formData.squareIcon} 
                onChange={e => setFormData({...formData, squareIcon: e.target.value})} 
                placeholder="https://..."
              />
            </div>
            <div className={style.formGroup}>
              <label>Rol del Campeón (Opcional)</label>
              <select 
                className={style.select} 
                value={formData.role} 
                onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="">-- Seleccionar Rol --</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className={style.formGroup}>
              <label>Sinergias (Traits)</label>
              <div className={style.checkboxContainer}>
                {allTraits.map(trait => (
                  <label key={trait.apiName} className={style.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={formData.traits.includes(trait.apiName)}
                      onChange={() => handleTraitChange(trait.apiName)}
                    />
                    {trait.name || trait.apiName.replace(/TFT\d+_/g, '')}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "sinergias" && (
          <>
            <hr style={{ borderColor: "#444", margin: "30px 0" }} />
            <h3>Configuración de la Sinergia</h3>
            
            <div className={style.formGroup}>
              <label>Set de la Sinergia (tft_set)</label>
              <input 
                type="text"
                className={style.input} 
                value={formData.tft_set} 
                onChange={e => setFormData({...formData, tft_set: e.target.value})} 
                placeholder={`Ejemplo: ${targetSet}`}
              />
            </div>

            <div className={style.formGroup}>
              <label>Descripción de la Sinergia (desc_trait)</label>
              <textarea 
                className={style.input} 
                style={{ height: '80px', resize: 'vertical' }}
                value={formData.desc_trait} 
                onChange={e => setFormData({...formData, desc_trait: e.target.value})} 
                placeholder="Descripción principal de la sinergia. Permite saltos de línea."
              />
            </div>

            <div className={style.formGroup}>
              <label>Efectos por Nivel (effects)</label>
              {!currentTraitData ? (
                <p style={{ color: "#aaa", fontSize: "14px", fontStyle: "italic" }}>
                  Escribe un <strong>apiName</strong> válido para cargar los niveles de esta sinergia (ej: TFT18_Inferno).
                </p>
              ) : (
                <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "8px", marginTop: "10px" }}>
                  <p style={{ color: "#a78bfa", fontSize: "14px", marginBottom: "15px" }}>
                    Puedes verificar o modificar la cantidad de unidades y el color (Style). Escribe la descripción para cada nivel:
                  </p>
                  {Array.from({ length: Math.max(currentTraitData.effects?.length || 0, formData.effects?.length || 0) }).map((_, i) => {
                    const officialEffect = currentTraitData.effects?.[i] || {};
                    const savedEffect = formData.effects?.[i] || {};
                    const currentMinUnits = savedEffect.minUnits !== undefined ? savedEffect.minUnits : (officialEffect.minUnits !== undefined ? officialEffect.minUnits : 1);
                    const currentStyle = savedEffect.style !== undefined ? savedEffect.style : (officialEffect.style !== undefined ? officialEffect.style : 1);
                    const currentDesc = savedEffect.description || savedEffect.desc || (typeof savedEffect === 'string' ? savedEffect : "");
                    
                    return (
                      <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "15px", alignItems: "flex-start" }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <input 
                            type="number"
                            className={style.input}
                            style={{ width: '70px', padding: '10px', textAlign: 'center' }}
                            value={currentMinUnits}
                            onChange={e => updateEffect(i, Number(e.target.value), currentStyle, currentDesc)}
                            title="minUnits (Campeones requeridos)"
                          />
                          <select 
                            className={style.input} 
                            style={{ width: '90px', padding: '10px 5px', fontSize: '12px' }}
                            value={currentStyle}
                            onChange={e => updateEffect(i, currentMinUnits, Number(e.target.value), currentDesc)}
                            title="Style (Color)"
                          >
                            <option value={1}>Bronce (1)</option>
                            <option value={3}>Plata (3)</option>
                            <option value={5}>Oro (5)</option>
                            <option value={6}>Prismático (6)</option>
                          </select>
                        </div>
                        <textarea 
                          className={style.input} 
                          style={{ height: '80px', flex: 1, resize: 'vertical' }}
                          value={currentDesc} 
                          onChange={e => updateEffect(i, currentMinUnits, currentStyle, e.target.value)} 
                          placeholder={`Descripción del efecto al tener ${currentMinUnits} campeones...`}
                        />
                      </div>
                    );
                  })}
                  
                  <button 
                    type="button" 
                    onClick={() => {
                      const maxLen = Math.max(currentTraitData.effects?.length || 0, formData.effects?.length || 0);
                      updateEffect(maxLen, 1, 1, "");
                    }}
                    style={{ background: "#4caf50", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer", fontSize: "14px", marginTop: "10px" }}
                  >
                    + Agregar Nivel
                  </button>

                  {(!currentTraitData.effects || currentTraitData.effects.length === 0) && (!formData.effects || formData.effects.length === 0) && (
                    <p style={{ color: "#aaa", fontSize: "14px", marginTop: "15px" }}>Esta sinergia no tiene efectos oficiales. Puedes agregar uno manualmente.</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        <hr style={{ borderColor: "#444", margin: "30px 0" }} />
        <h3>Campos SEO y Contenido Dinámico</h3>
        
        <div className={style.formGroup}>
          <label>URL SEO</label>
          <input 
            type="text" 
            className={style.input} 
            value={formData.url_seo} 
            onChange={e => setFormData({...formData, url_seo: e.target.value})} 
            required 
            placeholder="Ej: jinx"
          />
        </div>

        <div className={style.formGroup}>
          <label>Título SEO</label>
          <input 
            type="text" 
            className={style.input} 
            value={formData.titulo_seo} 
            onChange={e => setFormData({...formData, titulo_seo: e.target.value})} 
            placeholder="Ej: Las mejores composiciones para Jinx"
          />
        </div>

        <div className={style.formGroup}>
          <label>Descripción SEO</label>
          <textarea 
            className={style.input} 
            style={{ height: '80px', resize: 'vertical' }}
            value={formData.descripcion_seo} 
            onChange={e => setFormData({...formData, descripcion_seo: e.target.value})} 
            placeholder="Ej: Aprende a jugar Jinx con los mejores objetos..."
          />
        </div>

        <div className={style.formGroup}>
          <label>URL de Video (YouTube)</label>
          <input 
            type="text" 
            className={style.input} 
            value={formData.video_url} 
            onChange={e => setFormData({...formData, video_url: e.target.value})} 
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div className={style.formGroup}>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Secciones de Contenido Dinámico
            <button type="button" onClick={addSeccion} style={{ padding: "4px 8px", background: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              + Añadir Sección
            </button>
          </label>
          
          {formData.secciones.length === 0 && (
            <p style={{ color: "#aaa", fontSize: "14px", fontStyle: "italic" }}>No hay secciones añadidas.</p>
          )}

          {formData.secciones.map((sec, index) => (
            <div key={index} style={{ border: "1px solid #444", padding: "15px", borderRadius: "8px", marginTop: "10px", position: "relative", background: "rgba(0,0,0,0.2)" }}>
              <button 
                type="button" 
                onClick={() => removeSeccion(index)} 
                style={{ position: "absolute", top: "10px", right: "10px", background: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", width: "30px", height: "30px" }}
              >
                X
              </button>
              
              <div style={{ marginBottom: "10px", width: "90%" }}>
                <label style={{ fontSize: "14px", color: "#ccc" }}>Título de la Sección</label>
                <input 
                  type="text" 
                  className={style.input} 
                  value={sec.titulo} 
                  onChange={e => updateSeccion(index, "titulo", e.target.value)} 
                  placeholder="Ej: Mejores ítems"
                />
              </div>

              <div style={{ width: "100%" }}>
                <label style={{ fontSize: "14px", color: "#ccc" }}>Descripción / Contenido</label>
                <textarea 
                  className={style.input} 
                  style={{ height: '100px', resize: 'vertical' }}
                  value={sec.descripcion} 
                  onChange={e => updateSeccion(index, "descripcion", e.target.value)} 
                  placeholder="Ej: Jinx necesita mucha velocidad de ataque..."
                />
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className={style.btnSubmit} disabled={loading} style={{ marginTop: "20px" }}>
          {loading ? "Guardando..." : (formData.id ? "Actualizar Entidad" : "Crear Entidad")}
        </button>
        {formData.id && (
          <button type="button" onClick={resetForm} style={{ marginLeft: "10px", padding: "12px", background: "#555", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
            Cancelar Edición
          </button>
        )}

        {status.message && (
          <div className={`${style.statusMessage} ${style[status.type]}`} style={{ marginTop: "15px" }}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminCrearPaginaMetaTFT;
