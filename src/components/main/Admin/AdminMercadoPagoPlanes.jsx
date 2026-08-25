import React, { useState, useEffect } from 'react';
import style from './css/AdminMercadoPago.module.css';

// URL de tu endpoint PHP en tu servidor GoDaddy
const API_URL = "https://api.guiadeparche.com/tft/mercado_pago_mp/planes.php";

/**
 * ============================================================================
 * COMPONENTE ADMIN PARA PLANES DE MERCADO PAGO (TODOS LOS PARÁMETROS OFICIALES)
 * ============================================================================
 * Permite al administrador configurar con precisión quirúrgica parámetros
 * Obligatorios y Opcionales de Mercado Pago y guardarlos en MySQL en GoDaddy.
 */
// Componente de Tooltip con icono '?' para guiar al administrador
const Tooltip = ({ text }) => {
  const [show, setShow] = useState(false);
  return (
    <span 
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '6px' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}
    >
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: '#00d4ff',
        color: '#0a0d14',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: '0 0 6px rgba(0, 212, 255, 0.5)'
      }}>?</span>
      {show && (
        <div style={{
          position: 'absolute',
          bottom: '125%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#131824',
          border: '1px solid #00d4ff',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '0.78rem',
          lineHeight: '1.4',
          width: '240px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
          zIndex: 1000,
          pointerEvents: 'none',
          textAlign: 'left'
        }}>
          {text}
        </div>
      )}
    </span>
  );
};

const AdminMercadoPagoPlanes = () => {
  const [accessToken, setAccessToken] = useState(() => {
    return sessionStorage.getItem('mp_admin_access_token') || '';
  });

  const [planes, setPlanes] = useState([]);
  const [loadingPlanes, setLoadingPlanes] = useState(false);

  // Formulario con TODOS los campos de la API oficial (Obligatorios y Opcionales)
  const [formData, setFormData] = useState({
    // --- OBLIGATORIOS ---
    reason: "",
    amount: "", // Monto base por defecto
    amountBase: "", // Precio base regular del servicio (al que se sube tras promo)
    amountPromo: "", // Precio promocional inicial
    promoMonths: "0", // Meses que dura el precio promocional (0 = indefinido)
    currency: "ARS",
    frequency: "1",
    frequencyType: "months",
    backUrl: "https://guiadeparche.com/tft/master-plan",

    // --- OPCIONALES ---
    freeTrialDays: "0",
    repetitions: "",
    billingDay: "",
    billingDayProportional: false,
    paymentTypesAllowed: "", // "" = todos, "credit_card" = solo crédito, "debit_card" = solo débito

    // --- OPCIONALES VISUALES PARA TARJETA WEB ---
    badgeText: "",
    features: [
      { text: "Acceso ilimitado al Master Plan TFT", enabled: true },
      { text: "Filtros Soft/Hard aditivos avanzados", enabled: true },
      { text: "Códigos de tablero exportables", enabled: true },
      { text: "Análisis y Tier List de Meta por parche", enabled: true }
    ],

    // --- NUEVO: TIPO DE PLAN ---
    tipo_plan: "suscripcion",
    dias_acceso: 7
  });

  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({
    reason: "",
    amount: "",
    amount_base: "",
    amount_promo: "",
    promo_months: 0,
    free_trial_days: 0,
    repetitions: 0,
    badge_text: "",
    back_url: "",
    features: [],
    tipo_plan: "suscripcion",
    dias_acceso: 7
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    sessionStorage.setItem('mp_admin_access_token', accessToken);
  }, [accessToken]);

  useEffect(() => {
    fetchPlanes();
  }, []);

  const fetchPlanes = async () => {
    setLoadingPlanes(true);
    try {
      const res = await fetch(`${API_URL}?action=list`);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.planes)) {
        setPlanes(data.planes);
      }
    } catch (err) {
      console.error("Error cargando planes desde MySQL:", err);
    } finally {
      setLoadingPlanes(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Cálculo automático del porcentaje de descuento en vivo
  const calcDiscountPct = () => {
    const base = parseFloat(formData.amountBase || formData.amount || 0);
    const promo = parseFloat(formData.amountPromo || 0);
    if (base > 0 && promo > 0 && promo < base) {
      return Math.round(((base - promo) / base) * 100);
    }
    return 0;
  };

  /**
   * Enviar petición de creación con todos los parámetros oficiales
   */
  const handleCrearPlan = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const baseAmount = formData.amountBase || formData.amount;
    if (!formData.reason.trim() || !baseAmount || !formData.backUrl.trim()) {
      setErrorMsg("⚠️ Por favor completa los campos OBLIGATORIOS: Título, Precio Base Regular y URL de retorno.");
      return;
    }

    if (!accessToken.trim()) {
      setErrorMsg("⚠️ Por favor ingresa tu Access Token arriba para autenticar la petición.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        reason: formData.reason,
        amount: parseFloat(formData.amountBase || formData.amount || 0),
        currency: formData.currency,
        frequency: parseInt(formData.frequency, 10),
        frequency_type: formData.frequencyType,
        back_url: formData.backUrl,
        amount_base: parseFloat(formData.amountBase || formData.amount),
        amount_promo: parseFloat(formData.amountPromo || 0),
        promo_months: parseInt(formData.promoMonths || 0, 10),
        badge_text: formData.badgeText,
        tipo_plan: formData.tipo_plan,
        dias_acceso: parseInt(formData.dias_acceso || 0, 10),
        features: formData.features.filter(f => f.text.trim() !== ""),
        
        // Opcionales
        free_trial_days: parseInt(formData.freeTrialDays || 0, 10),
        repetitions: parseInt(formData.repetitions || 0, 10),
        billing_day: formData.billingDay ? parseInt(formData.billingDay, 10) : null,
        billing_day_proportional: formData.billingDayProportional,
        payment_types_allowed: formData.paymentTypesAllowed
      };

      console.log("📤 Creando plan oficial en Mercado Pago con parámetros:", payload);

      const response = await fetch(`${API_URL}?action=create`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken.trim()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "No se pudo crear el plan en el servidor.");
      }

      alert(`✅ ¡Plan creado exitosamente en Mercado Pago y guardado en tu base de datos!\n\nID: ${data.plan.mp_plan_id}`);
      
      // Limpiar formulario y refrescar tabla
      setFormData({
        reason: "",
        amount: "",
        amountBase: "",
        amountPromo: "",
        promoMonths: "0",
        currency: "ARS",
        frequency: "1",
        frequencyType: "months",
        backUrl: "https://guiadeparche.com/perfil?tab=master-plan",
        freeTrialDays: "0",
        repetitions: "",
        billingDay: "",
        billingDayProportional: false,
        paymentTypesAllowed: "",
        badgeText: "",
        features: [
          { text: "Acceso ilimitado al Master Plan TFT", enabled: true },
          { text: "Filtros Soft/Hard aditivos avanzados", enabled: true },
          { text: "Códigos de tablero exportables", enabled: true },
          { text: "Análisis y Tier List de Meta por parche", enabled: true }
        ],
        tipo_plan: "suscripcion",
        dias_acceso: 7
      });

      fetchPlanes();

    } catch (error) {
      console.error("❌ Error al crear plan:", error);
      setErrorMsg(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarPlan = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este plan de tu base de datos?")) return;

    try {
      const res = await fetch(`${API_URL}?action=delete&id=${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken.trim()}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setPlanes(prev => prev.filter(p => p.id !== id));
      } else {
        alert(`Error al eliminar: ${data.message}`);
      }
    } catch (err) {
      console.error("Error en eliminación:", err);
    }
  };

  const handleMover = async (index, direccion) => {
    if (direccion === -1 && index === 0) return;
    if (direccion === 1 && index === planes.length - 1) return;

    const nuevosPlanes = [...planes];
    const planMovido = nuevosPlanes[index];
    nuevosPlanes[index] = nuevosPlanes[index + direccion];
    nuevosPlanes[index + direccion] = planMovido;
    
    setPlanes(nuevosPlanes);

    try {
      const res = await fetch(`${API_URL}?action=reorder`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken.trim()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          order: nuevosPlanes.map(p => p.id)
        })
      });
      const data = await res.json();
      if (!data.success) {
        alert("Error guardando el nuevo orden: " + data.message);
        fetchPlanes(); 
      }
    } catch (e) {
      console.error(e);
      alert("Error de conexión al guardar el orden.");
      fetchPlanes();
    }
  };

  const handleGuardarEdicion = async (id) => {
    try {
      const res = await fetch(`${API_URL}?action=update`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${accessToken.trim()}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ id, ...editData })
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Plan actualizado.");
        setEditandoId(null);
        fetchPlanes();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  const iniciarEdicion = (plan) => {
    setEditandoId(plan.id);
    setEditData({
      reason: plan.reason,
      amount: plan.amount,
      amount_base: plan.amount_base || plan.amount || "",
      amount_promo: plan.amount_promo || "",
      promo_months: plan.promo_months || 0,
      free_trial_days: plan.free_trial_days || 0,
      repetitions: plan.repetitions || 0,
      badge_text: plan.badge_text || "",
      back_url: plan.back_url || "",
      features: plan.features ? JSON.parse(plan.features) : [],
      tipo_plan: plan.tipo_plan || "suscripcion",
      dias_acceso: plan.dias_acceso || 7
    });
  };

  const copiarID = (mpId) => {
    navigator.clipboard.writeText(mpId);
    alert(`📋 ID copiado al portapapeles:\n\n${mpId}\n\nPégalo en SuscripcionesMP.jsx para activar el checkout.`);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>
          <h2 className={style.title}>🛠️ Creador Oficial de Planes - Mercado Pago</h2>
          <p className={style.subtitle}>
            Configura todos los parámetros obligatorios y opcionales de la API y guárdalos en MySQL.
          </p>
        </div>
      </div>

      {/* SECCIÓN ACCESS TOKEN PRIVADO */}
      <div className={style.tokenSection}>
        <span className={style.tokenLabel}>🔑 Access Token de Mercado Pago (Obligatorio en Header)</span>
        <div className={style.tokenInputWrapper}>
          <input
            type="password"
            className={style.tokenInput}
            placeholder="Pega tu Access Token (TEST-xxx en prueba o APP_USR-xxx en producción)"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
          />
        </div>
        <span className={style.helpText}>
          Se envía automáticamente en el encabezado `Authorization: Bearer [TOKEN]` al crear el plan.
        </span>
      </div>

      <div className={style.gridLayout}>
        {/* FORMULARIO DE CREACIÓN CON SEPARACIÓN OBLIGATORIO VS OPCIONAL */}
        <div className={style.card}>
          <h3 className={style.cardTitle}>➕ Crear Plan de Suscripción</h3>

          <form onSubmit={handleCrearPlan}>
            {/* --- PARÁMETROS OBLIGATORIOS --- */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', marginBottom: '18px', borderLeft: '3px solid #00d4ff' }}>
              <div style={{ color: '#00d4ff', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '10px' }}>
                🔴 Parámetros Obligatorios (Requeridos por MP)
              </div>

              <div className={style.formGroup}>
                <label className={style.label}>
                  reason (Nombre visible del plan) *
                  <Tooltip text="Título oficial de la suscripción que verá el usuario en Mercado Pago y en tu web (ej: Master Plan Pro Mensual)." />
                </label>
                <input
                  type="text"
                  name="reason"
                  className={style.input}
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Master Plan Pro Mensual"
                />
              </div>

              {/* GESTIÓN AVANZADA DE PRECIO BASE, PRECIO PROMO Y DESCUENTO */}
              <div style={{ background: 'rgba(0, 212, 255, 0.07)', padding: '12px', borderRadius: '8px', marginBottom: '12px', border: '1px solid rgba(0, 212, 255, 0.2)' }}>
                <h3 className={style.sectionTitle}>
                  2. Montos y Tipo de Plan
                </h3>
                
                <div className={style.row} style={{ marginBottom: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px' }}>
                  <div className={style.formGroup}>
                    <label className={style.label}>Tipo de Plan</label>
                    <select 
                      name="tipo_plan" 
                      className={style.select} 
                      value={formData.tipo_plan} 
                      onChange={handleChange}
                    >
                      <option value="suscripcion">Suscripción Recurrente (Preapproval)</option>
                      <option value="pago_unico">Pago Único (Checkout Pro)</option>
                    </select>
                  </div>
                  {formData.tipo_plan === 'pago_unico' && (
                    <div className={style.formGroup}>
                      <label className={style.label}>Días de acceso que otorga <Tooltip text="Cantidad de días de Master Plan que recibirá el usuario al pagar." /></label>
                      <input 
                        type="number" 
                        name="dias_acceso" 
                        className={style.input} 
                        value={formData.dias_acceso} 
                        onChange={handleChange} 
                        min="1"
                      />
                    </div>
                  )}
                </div>

                <div className={style.row}>
                  <div className={style.formGroup}>
                    <label className={style.label}>
                      Precio Base Regular ($) *
                      <Tooltip text="Precio real o normal del servicio (ej: 4990). Cuando expire la promoción o si no hay promo, este será el precio a cobrar." />
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="amountBase"
                      className={style.input}
                      value={formData.amountBase || formData.amount}
                      onChange={handleChange}
                      required
                      placeholder="Ej: 4990"
                    />
                  </div>

                  <div className={style.formGroup}>
                    <label className={style.label}>
                      Precio Promocional / Descuento ($)
                      <Tooltip text="Precio reducido especial para los primeros meses (ej: 2990). Será el monto inicial cobrado en Mercado Pago al registrarse." />
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="amountPromo"
                      className={style.input}
                      value={formData.amountPromo}
                      onChange={handleChange}
                      placeholder="Ej: 2990 (Vacío = Sin promo)"
                    />
                  </div>
                </div>

                <div className={style.row} style={{ marginTop: '10px' }}>
                  <div className={style.formGroup}>
                    <label className={style.label}>
                      Duración de la Promoción (Meses)
                      <Tooltip text="Cantidad de meses que durará el Precio Promocional (ej: 3). Tras cumplir estos meses, tu backend (Método 1) cobrará el Precio Base. Pon 0 para promo indefinida." />
                    </label>
                    <input
                      type="number"
                      name="promoMonths"
                      className={style.input}
                      value={formData.promoMonths}
                      onChange={handleChange}
                      min="0"
                      placeholder="Ej: 3 (0 = indefinido)"
                    />
                  </div>

                  <div className={style.formGroup}>
                    <label className={style.label}>
                      currency_id (Moneda) *
                      <Tooltip text="Moneda oficial en la que se cobrará la suscripción (ej: ARS para Pesos Argentinos o USD para Dólares)." />
                    </label>
                    <select
                      name="currency"
                      className={style.select}
                      value={formData.currency}
                      onChange={handleChange}
                    >
                      <option value="ARS">ARS - Pesos</option>
                      <option value="USD">USD - Dólares</option>
                    </select>
                  </div>
                </div>

                {calcDiscountPct() > 0 && (
                  <div style={{
                    background: 'rgba(0, 255, 136, 0.15)',
                    border: '1px solid #00ff88',
                    color: '#00ff88',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    marginTop: '12px'
                  }}>
                    🏷️ Descuento calculado automáticamente: -{calcDiscountPct()}% OFF (Ahorras ${(parseFloat(formData.amountBase || formData.amount) - parseFloat(formData.amountPromo)).toFixed(2)} por cobro)
                  </div>
                )}
              </div>

              {formData.tipo_plan === 'suscripcion' && (
                <div className={style.row}>
                  <div className={style.formGroup}>
                    <label className={style.label}>
                      frequency (Frecuencia) *
                      <Tooltip text="Número que indica cada cuánto se cobra (ej: 1 con unidad meses = cada 1 mes; 12 con unidad meses = cada 12 meses)." />
                    </label>
                    <input
                      type="number"
                      name="frequency"
                      className={style.input}
                      value={formData.frequency}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>

                  <div className={style.formGroup}>
                    <label className={style.label}>
                      frequency_type (Unidad) *
                      <Tooltip text="Unidad de tiempo de la frecuencia (meses o días)." />
                    </label>
                    <select
                      name="frequencyType"
                      className={style.select}
                      value={formData.frequencyType}
                      onChange={handleChange}
                    >
                      <option value="months">months (Meses)</option>
                      <option value="days">days (Días)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className={style.formGroup}>
                <label className={style.label}>
                  back_url (URL de retorno) *
                  <Tooltip text="Página web a donde Mercado Pago redirige a tu suscriptor apenas termina de pagar exitosamente." />
                </label>
                <input
                  type="url"
                  name="backUrl"
                  className={style.input}
                  value={formData.backUrl}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* --- PARÁMETROS OPCIONALES --- */}
            <div style={{ background: 'rgba(255,184,0,0.05)', padding: '14px', borderRadius: '10px', marginBottom: '18px', borderLeft: '3px solid #ffb800' }}>
              <div style={{ color: '#ffb800', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '10px' }}>
                🟡 Parámetros Opcionales (Avanzados)
              </div>

              {formData.tipo_plan === 'suscripcion' && (
                  <div className={style.sectionOptional}>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#00ff88', display: 'flex', alignItems: 'center' }}>
                      Configuraciones de Suscripción Opcionales (Mercado Pago)
                    </h4>
                    <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#a0a6b8' }}>
                      Estos valores aplican reglas especiales de cobro a tu suscripción recurrente en MP. Si los dejas vacíos o en 0, no se aplicarán.
                    </p>
                    
                    <div className={style.row}>
                      <div className={style.formGroup}>
                        <label className={style.label}>Días de Prueba Gratis <Tooltip text="Otorga X días donde MP no cobrará nada. El primer cobro se hará al finalizar la prueba."/></label>
                        <input type="number" name="freeTrialDays" className={style.input} placeholder="0 = Sin prueba" value={formData.freeTrialDays} onChange={handleChange} min="0" />
                      </div>
                      <div className={style.formGroup}>
                        <label className={style.label}>Límite de Cobros Totales <Tooltip text="Ej: Si pones 12, la suscripción se cancelará automáticamente tras 12 cobros. Si dejas 0, será indefinida."/></label>
                        <input type="number" name="repetitions" className={style.input} placeholder="0 = Indefinido" value={formData.repetitions} onChange={handleChange} min="0" />
                      </div>
                    </div>
                    
                    <div className={style.row}>
                      <div className={style.formGroup}>
                        <label className={style.label}>Día exacto de facturación <Tooltip text="Ej: '1' para cobrar los días 1 de cada mes. 0 o vacío para cobrar el día en que se suscriben."/></label>
                        <input type="number" name="billingDay" className={style.input} placeholder="1-28" value={formData.billingDay} onChange={handleChange} min="1" max="28" />
                      </div>
                      <div className={style.formGroup} style={{ justifyContent: 'center' }}>
                        <label className={style.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input type="checkbox" name="billingDayProportional" checked={formData.billingDayProportional} onChange={handleChange} style={{ width: '18px', height: '18px', accentColor: '#00ff88' }} />
                          Cobro proporcional <Tooltip text="Si definiste un día exacto de facturación, el primer cobro será proporcional a los días restantes hasta esa fecha." />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

              <div className={style.formGroup}>
                <label className={style.label}>
                  payment_types (Restricción tarjetas)
                  <Tooltip text="Permite restringir para que solo paguen con Tarjetas de Crédito, solo Débito, o ambas." />
                </label>
                <select
                  name="paymentTypesAllowed"
                  className={style.select}
                  value={formData.paymentTypesAllowed}
                  onChange={handleChange}
                >
                  <option value="">Todas permitidas (Crédito y Débito)</option>
                  <option value="credit_card">Solo Tarjetas de Crédito</option>
                  <option value="debit_card">Solo Tarjetas de Débito</option>
                </select>
              </div>

              {/* Opcional Visual para Tarjetas Web (Control de Badge) */}
              <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.9rem', color: '#ffb800', fontWeight: 'bold', marginBottom: '10px' }}>
                  ✨ Opcional Visual para tu Tarjeta Web (Badge Superior)
                </div>

                <div className={style.formGroup}>
                  <label className={style.label}>
                    badge_text (Etiqueta superior)
                    <Tooltip text="Etiqueta llamativa en la parte superior de la tarjeta en tu web (ej: 🔥 MÁS POPULAR / 💎 3 MESES PROMO)." />
                  </label>
                  <input
                    type="text"
                    name="badgeText"
                    className={style.input}
                    value={formData.badgeText}
                    onChange={handleChange}
                    placeholder="Ej: 🔥 MÁS POPULAR / 💎 AHORRA 20%"
                  />
                  <span className={style.helpText}>Etiqueta o Badge que destaca el plan</span>
                </div>
                
                <div className={style.formGroup} style={{ marginTop: '16px' }}>
                  <label className={style.label}>
                    features (Características del Plan)
                    <Tooltip text="Lista de beneficios que se mostrarán en la tarjeta de este plan." />
                  </label>
                  {formData.features.map((feature, idx) => {
                    const featObj = typeof feature === 'string' ? { text: feature, enabled: true } : feature;
                    return (
                    <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={featObj.enabled !== false}
                        onChange={(e) => {
                          const newFeatures = [...formData.features];
                          newFeatures[idx] = { ...featObj, enabled: e.target.checked };
                          setFormData({ ...formData, features: newFeatures });
                        }}
                        style={{ width: '18px', height: '18px', accentColor: '#00ff88', cursor: 'pointer' }}
                        title="Activar/Desactivar beneficio"
                      />
                      <input
                        type="text"
                        className={style.input}
                        value={featObj.text || ""}
                        onChange={(e) => {
                          const newFeatures = [...formData.features];
                          newFeatures[idx] = { ...featObj, text: e.target.value };
                          setFormData({ ...formData, features: newFeatures });
                        }}
                        placeholder="Ej: Acceso ilimitado..."
                        style={{ opacity: featObj.enabled === false ? 0.5 : 1, textDecoration: featObj.enabled === false ? 'line-through' : 'none' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newFeatures = formData.features.filter((_, i) => i !== idx);
                          setFormData({ ...formData, features: newFeatures });
                        }}
                        style={{ padding: '0 12px', background: 'rgba(255, 85, 85, 0.2)', border: '1px solid #ff5555', color: '#ff5555', borderRadius: '8px', cursor: 'pointer', height: '100%' }}
                      >
                        ✕
                      </button>
                    </div>
                  )})}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, features: [...formData.features, { text: "", enabled: true }] })}
                    style={{ marginTop: '8px', padding: '8px', background: 'rgba(0, 212, 255, 0.1)', border: '1px dashed #00d4ff', color: '#00d4ff', borderRadius: '8px', cursor: 'pointer', width: '100%' }}
                  >
                    + Añadir nueva característica
                  </button>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div style={{ color: '#ff5555', fontSize: '0.85rem', margin: '10px 0' }}>
                {errorMsg}
              </div>
            )}

            <button type="submit" className={style.btnSubmit} disabled={loading}>
              {loading ? "⏳ Creando en Mercado Pago y GoDaddy..." : "🚀 Crear Plan Oficial y Guardar"}
            </button>
          </form>
        </div>

        {/* TABLA DE PLANES EN LA BD GODADDY */}
        <div className={style.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className={style.cardTitle} style={{ margin: 0, border: 'none' }}>
              📋 Planes Registrados en tu Base de Datos MySQL
            </h3>
            <button
              type="button"
              className={style.btnCopy}
              onClick={fetchPlanes}
              title="Refrescar desde tu servidor GoDaddy"
            >
              🔄 Refrescar
            </button>
          </div>

          <div className={style.tableContainer}>
            {loadingPlanes ? (
              <div className={style.emptyState}>⏳ Cargando planes desde GoDaddy...</div>
            ) : planes.length === 0 ? (
              <div className={style.emptyState}>
                No hay planes guardados en tu base de datos.<br />
                Utiliza el formulario con todos los controles a la izquierda para crear tu primer plan.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {planes.map((plan, index) => {
                  const isEditing = editandoId === plan.id;
                  const esIndefinido = !plan.repetitions || parseInt(plan.repetitions, 10) === 0;
                  const sinPrueba = !plan.free_trial_days || parseInt(plan.free_trial_days, 10) === 0;

                  return (
                    <div key={plan.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', transition: 'all 0.2s' }}>
                      {isEditing ? (
                        /* MODO EDICIÓN */
                        <div>
                          <h4 style={{ margin: '0 0 16px 0', color: '#00d4ff', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                            <span>✏️ Editando: {plan.reason}</span>
                            <span style={{ fontSize: '0.8rem', color: '#a5acb8', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '6px' }}>ID: {plan.mp_plan_id}</span>
                          </h4>
                          
                          {/* Fila 1: Nombres y Precios */}
                          <div className={style.row} style={{ marginBottom: '12px' }}>
                            <div className={style.formGroup}>
                              <label className={style.label}>Nombre (reason)</label>
                              <input type="text" className={style.input} value={editData.reason} onChange={(e) => setEditData({ ...editData, reason: e.target.value })} />
                            </div>
                            <div className={style.formGroup}>
                              <label className={style.label}>Monto Oficial (amount)</label>
                              <input type="number" step="0.01" className={style.input} value={editData.amount} onChange={(e) => setEditData({ ...editData, amount: e.target.value })} />
                            </div>
                            <div className={style.formGroup}>
                              <label className={style.label}>Tipo de Plan</label>
                              <select className={style.select} value={editData.tipo_plan} onChange={(e) => setEditData({ ...editData, tipo_plan: e.target.value })}>
                                <option value="suscripcion">Suscripción</option>
                                <option value="pago_unico">Pago Único</option>
                              </select>
                            </div>
                            {editData.tipo_plan === 'pago_unico' && (
                              <div className={style.formGroup}>
                                <label className={style.label}>Días Acceso</label>
                                <input type="number" className={style.input} value={editData.dias_acceso} onChange={(e) => setEditData({ ...editData, dias_acceso: e.target.value })} />
                              </div>
                            )}
                          </div>
                          
                          {/* Fila 2: Display de precios web */}
                          <div className={style.row} style={{ marginBottom: '12px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className={style.formGroup}>
                              <label className={style.label}>Precio Base Web (Tachado)</label>
                              <input type="number" step="0.01" className={style.input} value={editData.amount_base} onChange={(e) => setEditData({ ...editData, amount_base: e.target.value })} />
                            </div>
                            <div className={style.formGroup}>
                              <label className={style.label}>Precio Promo Web</label>
                              <input type="number" step="0.01" className={style.input} value={editData.amount_promo} onChange={(e) => setEditData({ ...editData, amount_promo: e.target.value })} />
                            </div>
                            <div className={style.formGroup}>
                              <label className={style.label}>Meses Promo (0=indef)</label>
                              <input type="number" className={style.input} value={editData.promo_months} onChange={(e) => setEditData({ ...editData, promo_months: e.target.value })} />
                            </div>
                            <div className={style.formGroup}>
                              <label className={style.label}>Badge Web (ej: MÁS POPULAR)</label>
                              <input type="text" className={style.input} value={editData.badge_text} onChange={(e) => setEditData({ ...editData, badge_text: e.target.value })} />
                            </div>
                          </div>

                          {/* Fila 3: Features y Config adicional */}
                          <div className={style.row} style={{ marginBottom: '16px', alignItems: 'start' }}>
                            <div className={style.formGroup}>
                              <label className={style.label}>URL de retorno (back_url)</label>
                              <input type="text" className={style.input} value={editData.back_url} onChange={(e) => setEditData({ ...editData, back_url: e.target.value })} />
                            </div>
                            
                            <div className={style.formGroup} style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px' }}>
                              <label className={style.label} style={{ marginBottom: '12px', fontSize: '0.9rem', color: '#fff' }}>📋 Features del Plan (Beneficios)</label>
                              {editData.features.map((feat, fidx) => {
                                const featObj = typeof feat === 'string' ? { text: feat, enabled: true } : feat;
                                return (
                                <div key={fidx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                                  <input
                                    type="checkbox"
                                    checked={featObj.enabled !== false}
                                    onChange={(e) => {
                                      const nf = [...editData.features];
                                      nf[fidx] = { ...featObj, enabled: e.target.checked };
                                      setEditData({ ...editData, features: nf });
                                    }}
                                    style={{ width: '20px', height: '20px', accentColor: '#00ff88', cursor: 'pointer' }}
                                  />
                                  <input 
                                    type="text" 
                                    className={style.input} 
                                    style={{ opacity: featObj.enabled === false ? 0.5 : 1, textDecoration: featObj.enabled === false ? 'line-through' : 'none' }}
                                    value={featObj.text || ""} 
                                    onChange={(e) => {
                                      const nf = [...editData.features];
                                      nf[fidx] = { ...featObj, text: e.target.value };
                                      setEditData({ ...editData, features: nf });
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const nf = editData.features.filter((_, i) => i !== fidx);
                                      setEditData({ ...editData, features: nf });
                                    }}
                                    style={{ background: 'rgba(255, 85, 85, 0.2)', border: 'none', color: '#ff5555', borderRadius: '6px', cursor: 'pointer', padding: '0 12px', height: '100%' }}
                                  >✕</button>
                                </div>
                              )})}
                              <button
                                type="button"
                                onClick={() => setEditData({ ...editData, features: [...editData.features, { text: "", enabled: true }] })}
                                style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px dashed #00d4ff', color: '#00d4ff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', padding: '10px', width: '100%', marginTop: '4px' }}
                              >+ Añadir Feature</button>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                            <button type="button" className={style.btnSubmit} style={{ margin: 0, width: 'auto', padding: '10px 24px' }} onClick={() => handleGuardarEdicion(plan.id)}>
                              💾 Guardar Cambios
                            </button>
                            <button type="button" className={style.btnCopy} style={{ margin: 0, padding: '10px 24px', fontSize: '1rem' }} onClick={() => setEditandoId(null)}>
                              ✕ Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* MODO LECTURA */
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                          <div style={{ flex: '1 1 300px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                              <h4 style={{ margin: 0, fontSize: '1.3rem', color: '#fff', fontWeight: 'bold' }}>{plan.reason}</h4>
                              {plan.badge_text && <span style={{ background: 'rgba(255,184,0,0.15)', color: '#ffb800', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid rgba(255,184,0,0.3)' }}>🏷️ {plan.badge_text}</span>}
                            </div>
                            
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.95rem', color: '#a5acb8', marginBottom: '16px' }}>
                              <span style={{ color: '#00d4ff', fontWeight: 'bold' }}>💰 ${plan.amount} {plan.currency || 'ARS'}</span>
                              {plan.tipo_plan === 'pago_unico' ? (
                                <span style={{ color: '#ffb800' }}>⚡ Pago Único ({plan.dias_acceso} días)</span>
                              ) : (
                                <>
                                  <span>🔄 {esIndefinido ? 'Cobro Indefinido' : `${plan.repetitions} cobros`}</span>
                                  {!sinPrueba && <span className={style.badgeFree} style={{ padding: '0 6px', display: 'flex', alignItems: 'center' }}>🎁 {plan.free_trial_days}d gratis</span>}
                                  <span>⏱️ Frec: {plan.frequency} {plan.frequency_type === 'months' ? 'mes(es)' : 'día(s)'}</span>
                                </>
                              )}
                            </div>

                            {plan.amount_base && parseFloat(plan.amount_base) > parseFloat(plan.amount) && (
                              <div style={{ fontSize: '0.9rem', marginBottom: '16px', background: 'rgba(0,255,136,0.05)', padding: '10px 14px', borderRadius: '8px', display: 'inline-block', border: '1px dashed rgba(0,255,136,0.2)' }}>
                                <span style={{ color: '#ff5555', textDecoration: 'line-through', marginRight: '10px' }}>Antes: ${plan.amount_base}</span>
                                <span style={{ color: '#00ff88', fontWeight: '600' }}>
                                  ⚡ -{Math.round(((parseFloat(plan.amount_base) - parseFloat(plan.amount)) / parseFloat(plan.amount_base)) * 100)}% OFF ({plan.promo_months > 0 ? `${plan.promo_months} mes(es)` : 'Promo Indefinida'})
                                </span>
                              </div>
                            )}

                            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#6e7687', flexWrap: 'wrap', alignItems: 'center' }}>
                              <span>ID MP: <span className={style.idCode} style={{ background: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: '6px' }}>{plan.mp_plan_id}</span></span>
                              <span>📅 Creado: {plan.created_at_formatted || plan.created_at || 'Reciente'}</span>
                              <a href={plan.back_url} target="_blank" rel="noreferrer" style={{color: '#00d4ff', textDecoration: 'none'}}>🔗 Ver BackUrl</a>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginRight: '8px' }}>
                                <button type="button" onClick={() => handleMover(index, -1)} disabled={index === 0} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '4px', cursor: index === 0 ? 'not-allowed' : 'pointer', padding: '2px 8px', opacity: index === 0 ? 0.3 : 1 }} title="Mover Arriba">▲</button>
                                <button type="button" onClick={() => handleMover(index, 1)} disabled={index === planes.length - 1} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '4px', cursor: index === planes.length - 1 ? 'not-allowed' : 'pointer', padding: '2px 8px', opacity: index === planes.length - 1 ? 0.3 : 1 }} title="Mover Abajo">▼</button>
                            </div>
                            <button type="button" className={style.btnCopy} onClick={() => copiarID(plan.mp_plan_id)} title="Copiar ID MP">
                              📋 Copiar ID
                            </button>
                            <button type="button" className={style.btnCopy} onClick={() => iniciarEdicion(plan)} style={{ borderColor: '#00d4ff', color: '#00d4ff' }}>
                              ✏️ Editar
                            </button>
                            <button type="button" className={style.btnDelete} onClick={() => handleEliminarPlan(plan.id)} title="Eliminar definitivamente">
                              ✕ Eliminar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMercadoPagoPlanes;
