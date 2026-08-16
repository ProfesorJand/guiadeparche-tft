import React, { useState } from "react";
import style from "./css/AdminCrearCampeonesTFT.module.css";
import { useStore } from "@nanostores/react";
import { dataTFTTraits, versionTFT, setNumberLatest, setNumberPBE, swapVersionTFT } from "@stores/dataTFT";

const ROLES = [
  "HFighter", "APTank", "APReaper", "APFighter", "APCaster", "APCarry", 
  "ADTank", "ADSpecialist", "ADReaper", "ADFighter", "ADCaster", "ADCarry"
];

const AdminCrearCampeonesTFT = () => {
  const currentVersion = useStore(versionTFT);
  const allTraits = useStore(dataTFTTraits) || [];
  
  const targetSet = currentVersion === "pbe" ? setNumberPBE : setNumberLatest;
  // Ahora usamos siempre la misma tabla e insertamos la versión/set
  const tableName = "campeones_tft";

  const [formData, setFormData] = useState({
    name: "",
    apiName: "",
    tileIcon: "",
    icon: "",
    squareIcon: "",
    cost: "",
    role: "",
    traits: []
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const token = import.meta.env.PUBLIC_TOKEN_META || "dummy_token";
      const payload = {
        ...formData,
        cost: formData.cost ? Number(formData.cost) : null,
        tft_set: targetSet,
        tableName: tableName
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
      if (result.status === "success") {
        setStatus({ type: "success", message: result.message || "Campeón creado exitosamente." });
        setFormData({
          name: "", apiName: "", tileIcon: "", icon: "", squareIcon: "", cost: "", role: "", traits: []
        });
      } else {
        setStatus({ type: "error", message: result.message || "Error al crear campeón." });
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Error de red al conectar con el servidor." });
    }
    setLoading(false);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Crear Nuevo Campeón TFT</h2>
        <p>Set actual: <strong>{targetSet}</strong> (Se guardará con la versión {targetSet} en la tabla {tableName})</p>
        <div style={{ marginTop: "10px" }}>
          <label style={{ marginRight: "10px" }}>Cambiar Versión/Set:</label>
          <select value={currentVersion} onChange={handleVersionChange} className={style.select} style={{ width: "auto", display: "inline-block" }}>
            <option value="latest">Set {setNumberLatest} (Latest)</option>
            <option value="pbe">Set {setNumberPBE} (PBE)</option>
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label>Nombre del Campeón</label>
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
          <label>apiName del Campeón</label>
          <input 
            type="text" 
            className={style.input} 
            value={formData.apiName} 
            onChange={e => setFormData({...formData, apiName: e.target.value})} 
            required 
            placeholder="Ej: TFT18_Jinx"
          />
        </div>

        <div className={style.formGroup}>
          <label>Coste</label>
          <input 
            type="number" 
            className={style.input} 
            value={formData.cost} 
            onChange={e => setFormData({...formData, cost: e.target.value})} 
            required 
            placeholder="Ej: 5"
            min="1"
            max="10"
          />
        </div>

        <div className={style.formGroup}>
          <label>URL tileIcon (Community Dragon)</label>
          <input 
            type="url" 
            className={style.input} 
            value={formData.tileIcon} 
            onChange={e => setFormData({...formData, tileIcon: e.target.value})} 
            placeholder="https://..."
          />
        </div>

        <div className={style.formGroup}>
          <label>URL icon (Community Dragon)</label>
          <input 
            type="url" 
            className={style.input} 
            value={formData.icon} 
            onChange={e => setFormData({...formData, icon: e.target.value})} 
            placeholder="https://..."
          />
        </div>

        <div className={style.formGroup}>
          <label>URL squareIcon (Community Dragon)</label>
          <input 
            type="url" 
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

        <button type="submit" className={style.btnSubmit} disabled={loading}>
          {loading ? "Guardando..." : "Crear Campeón"}
        </button>

        {status.message && (
          <div className={`${style.statusMessage} ${style[status.type]}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminCrearCampeonesTFT;
