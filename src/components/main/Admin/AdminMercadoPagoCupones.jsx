import React, { useState, useEffect } from 'react';
import style from './css/AdminMercadoPago.module.css';

const API_URL = "https://api.guiadeparche.com/tft/mercado_pago_mp/cupones_admin.php";

const AdminMercadoPagoCupones = () => {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    codigo: '',
    porcentaje_descuento: '',
    fecha_expiracion: '',
    activo: 1
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCupones();
  }, []);

  const fetchCupones = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}?action=list`);
      const data = await res.json();
      if (data && data.success) {
        setCupones(data.cupones || []);
      } else {
        throw new Error(data?.message || "Error al obtener cupones.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'codigo' ? value.toUpperCase() : value
    }));
  };

  const handleOpenForm = (cupon = null) => {
    if (cupon) {
      // Date format for input datetime-local requires YYYY-MM-DDThh:mm
      let formattedDate = "";
      if (cupon.fecha_expiracion) {
        formattedDate = cupon.fecha_expiracion.replace(" ", "T");
        if (formattedDate.length > 16) formattedDate = formattedDate.substring(0, 16);
      }

      setFormData({
        id: cupon.id,
        codigo: cupon.codigo,
        porcentaje_descuento: cupon.porcentaje_descuento,
        fecha_expiracion: formattedDate,
        activo: cupon.activo
      });
    } else {
      setFormData({
        id: null,
        codigo: '',
        porcentaje_descuento: '',
        fecha_expiracion: '',
        activo: 1
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        action: formData.id ? 'update' : 'create'
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setIsFormOpen(false);
        fetchCupones();
      } else {
        alert("Error: " + (data.message || "No se pudo guardar el cupón"));
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión al guardar el cupón.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este cupón? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: 'delete', id })
      });
      const data = await res.json();
      
      if (data.success) {
        fetchCupones();
      } else {
        alert("Error: " + (data.message || "No se pudo eliminar el cupón"));
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión al eliminar el cupón.");
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Gestión de Cupones de Descuento</h2>
      <p className={style.subtitle}>Crea y administra los códigos de descuento para los pagos únicos.</p>

      {!isFormOpen && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px 0', width: '100%' }}>
          <button 
            className={`${style.button} ${style.buttonPrimary}`} 
            style={{ width: 'auto', padding: '10px 20px' }}
            onClick={() => handleOpenForm()}
          >
            + Crear Nuevo Cupón
          </button>
        </div>
      )}

      {isFormOpen && (
        <div className={style.card} style={{ maxWidth: '600px', margin: '0 auto 30px', width: '100%' }}>
          <h3 className={style.planName}>{formData.id ? 'Editar Cupón' : 'Nuevo Cupón'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#a0a6b8' }}>Código del Cupón (Ej: TFT20)</label>
              <input 
                type="text" 
                name="codigo"
                value={formData.codigo}
                onChange={handleInputChange}
                required
                placeholder="TFT20"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff', textTransform: 'uppercase' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#a0a6b8' }}>Porcentaje de Descuento (1 al 100)</label>
              <input 
                type="number" 
                name="porcentaje_descuento"
                value={formData.porcentaje_descuento}
                onChange={handleInputChange}
                required
                min="1"
                max="100"
                placeholder="20"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#a0a6b8' }}>Fecha de Expiración (Opcional)</label>
              <input 
                type="datetime-local" 
                name="fecha_expiracion"
                value={formData.fecha_expiracion}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a0a6b8', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  name="activo"
                  checked={formData.activo == 1}
                  onChange={(e) => setFormData(prev => ({ ...prev, activo: e.target.checked ? 1 : 0 }))}
                  style={{ width: '20px', height: '20px' }}
                />
                Cupón Activo
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                type="button" 
                className={`${style.button} ${style.buttonSecondary}`} 
                onClick={() => setIsFormOpen(false)}
                disabled={saving}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className={`${style.button} ${style.buttonPrimary}`}
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Guardar Cupón'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#a0a6b8' }}>Cargando cupones...</div>
      ) : errorMsg ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#ff5555' }}>Error: {errorMsg}</div>
      ) : cupones.length === 0 ? (
        <div className={style.emptyState} style={{ margin: '0 auto', width: '100%' }}>
          <h3>Aún no hay cupones creados</h3>
          <p className={style.emptySub}>Usa el botón de arriba para crear el primer cupón de descuento.</p>
        </div>
      ) : (
        <div style={{ width: '100%', overflowX: 'auto', background: 'rgba(18, 18, 28, 0.75)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.3)', color: '#a0a6b8', fontSize: '0.9rem' }}>
                <th style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Código</th>
                <th style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Descuento</th>
                <th style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Expiración</th>
                <th style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Estado</th>
                <th style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cupones.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '15px 20px', fontWeight: 'bold', color: '#fff' }}>{c.codigo}</td>
                  <td style={{ padding: '15px 20px', color: '#00ff88', fontWeight: 'bold' }}>{c.porcentaje_descuento}% OFF</td>
                  <td style={{ padding: '15px 20px', color: '#a0a6b8' }}>
                    {c.fecha_expiracion ? new Date(c.fecha_expiracion).toLocaleString('es-AR') : 'Sin expiración'}
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    {c.activo == 1 
                      ? <span style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem' }}>Activo</span> 
                      : <span style={{ background: 'rgba(255,85,85,0.15)', color: '#ff5555', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem' }}>Inactivo</span>
                    }
                  </td>
                  <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleOpenForm(c)}
                      style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '6px', marginRight: '8px', cursor: 'pointer' }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(c.id)}
                      style={{ background: 'rgba(255,85,85,0.2)', border: 'none', color: '#ff5555', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMercadoPagoCupones;
