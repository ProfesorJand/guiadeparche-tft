import React, { useState, useEffect } from 'react';
import { useStore } from "@nanostores/react";
import { $user, setUser } from "../../../stores/auth";
import style from './css/SuscripcionesMP.module.css';

// URL de la API PHP que conecta con MySQL en el servidor GoDaddy
const API_URL = "https://api.guiadeparche.com/tft/mercado_pago_mp/planes.php";

/**
 * ============================================================================
 * COMPONENTE FRONTEND: SUSCRIPCIONES DE MERCADO PAGO DESDE BASE DE DATOS
 * ============================================================================
 * Carga los planes configurados por el Admin desde MySQL (GoDaddy) y permite
 * a los usuarios suscribirse al Master Plan a través de Mercado Pago.
 */
const SuscripcionesMP = () => {
  const user = useStore($user);
  const [planes, setPlanes] = useState([]);
  const [loadingPlanes, setLoadingPlanes] = useState(true);
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Estado para los cupones por plan (map de planId -> data)
  const [couponStates, setCouponStates] = useState({});

  useEffect(() => {
    fetchPlanes();
  }, []);

  const fetchPlanes = async () => {
    setLoadingPlanes(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}?action=list`);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.planes)) {
        setPlanes(data.planes);
      } else {
        throw new Error(data?.message || "No se pudo obtener la lista de planes.");
      }
    } catch (err) {
      console.error("❌ Error cargando planes de suscripción desde MySQL:", err);
      setErrorMsg("No se pudieron cargar las suscripciones en este momento. Intenta de nuevo más tarde.");
    } finally {
      setLoadingPlanes(false);
    }
  };

  /**
   * Genera texto de periodicidad natural a partir de los datos de MySQL
   */
  const getPeriodText = (plan) => {
    const freq = parseInt(plan.frequency || 1, 10);
    const type = (plan.frequency_type || "months").toLowerCase();
    if (type === "months") {
      if (freq === 1) return "/ mes";
      if (freq === 12) return "/ año";
      return `/ cada ${freq} meses`;
    }
    if (type === "days") {
      if (freq === 1) return "/ día";
      return `/ cada ${freq} días`;
    }
    return `/ ${type}`;
  };

  /**
   * Genera el texto del Badge (Etiqueta superior)
   * Prioriza el badge_text guardado en tu base de datos MySQL si fue ingresado por el Admin.
   */
  const getBadgeText = (plan) => {
    if (plan.badge_text && plan.badge_text.trim() !== '') {
      return plan.badge_text.trim();
    }
    const trial = parseInt(plan.free_trial_days || 0, 10);
    if (trial > 0) return `🎁 ${trial} DÍAS GRATIS`;
    const freq = parseInt(plan.frequency || 1, 10);
    const type = (plan.frequency_type || "months").toLowerCase();
    if (type === "months" && freq === 12) return "💎 AHORRO ANUAL";
    return null;
  };

  /**
   * Lista dinámica y completa de características para cada plan
   */
  const getFeaturesForPlan = (plan) => {
    const features = [];

    // Feature dinámico: Días de prueba
    if (plan.free_trial_days && parseInt(plan.free_trial_days, 10) > 0) {
      features.push({
        text: `🎁 ${plan.free_trial_days} días de prueba totalmente gratis`,
        enabled: true
      });
    }

    // Features personalizados de la base de datos
    if (plan.features) {
      try {
        const parsedFeatures = JSON.parse(plan.features);
        if (Array.isArray(parsedFeatures)) {
          parsedFeatures.forEach(feat => {
            if (typeof feat === 'string' && feat.trim() !== "") {
              features.push({ text: feat, enabled: true });
            } else if (typeof feat === 'object' && feat !== null && feat.text && feat.text.trim() !== "") {
              if (feat.enabled !== false) {
                features.push({ text: feat.text, enabled: true });
              }
            }
          });
        }
      } catch (e) {
        console.error("Error parseando features del plan", e);
      }
    } else {
      // Fallback si la columna está vacía o el JSON falla (compatibilidad)
      features.push(
        { text: "Acceso ilimitado al Master Plan TFT", enabled: true },
        { text: "Filtros Soft/Hard aditivos avanzados", enabled: true }
      );
    }

    // Feature dinámico: Métodos de pago permitidos
    if (plan.payment_types_allowed && plan.payment_types_allowed.trim() !== '') {
      features.push({
        text: `Métodos de pago habilitados: ${plan.payment_types_allowed === 'credit_card' ? 'Solo Crédito' : 'Solo Débito'}`,
        enabled: true
      });
    }

    return features;
  };

  useEffect(() => {
    console.log("1. useEffect ejecutado.");
    
    // Corregir el bug de Mercado Pago que pone doble "?" en la URL
    let fixSearch = window.location.search.replace("?preapproval_id=", "&preapproval_id=");
    
    const params = new URLSearchParams(fixSearch);
    const preapproval_id = params.get('preapproval_id');
    const payment_id = params.get('payment_id');
    const status = params.get('status');

    console.log("2. ID de la URL:", { preapproval_id, payment_id, status });
    console.log("3. Datos del usuario en este momento:", user);

    if (preapproval_id && user && user.email) {
      console.log("4. Todo en orden, llamando a GoDaddy para vincular SUSCRIPCIÓN:", preapproval_id);
      fetch("https://api.guiadeparche.com/tft/mercado_pago_mp/vincular_suscripcion.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.email,
          preapproval_id: preapproval_id
        })
      })
      .then(async res => {
        const text = await res.text();
        return JSON.parse(text);
      })
      .then(data => {
        if (data.success) {
           if (user) {
             const updatedUser = { ...user, master_plan: 1, rol: 'suscriptor' };
             setUser(updatedUser);
           }
           alert("¡Suscripción Exitosa! Tu acceso al Master Plan ha sido activado en tu cuenta.");
           window.history.replaceState({}, document.title, window.location.pathname + "?tab=master-plan");
           window.location.reload(); 
        } else {
           alert("Hubo un error al activar en la Base de Datos: " + data.message);
        }
      })
      .catch(e => console.error("Error fatal al vincular suscripción:", e));
    } 
    else if (payment_id && status === 'approved' && user && user.email) {
      console.log("4. Todo en orden, llamando a GoDaddy para vincular PAGO ÚNICO:", payment_id);
      fetch("https://api.guiadeparche.com/tft/mercado_pago_mp/vincular_pago_unico.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.email,
          payment_id: payment_id
        })
      })
      .then(async res => {
        const text = await res.text();
        return JSON.parse(text);
      })
      .then(data => {
        if (data.success) {
           if (user) {
             const updatedUser = { ...user, master_plan: 1, rol: 'suscriptor' };
             setUser(updatedUser);
           }
           alert("¡Pago Exitoso! Los días de acceso al Master Plan han sido añadidos a tu cuenta.");
           window.history.replaceState({}, document.title, window.location.pathname + "?tab=master-plan");
           window.location.reload(); 
        } else {
           alert("Hubo un error al activar el pago en la Base de Datos: " + data.message);
        }
      })
      .catch(e => console.error("Error fatal al vincular pago único:", e));
    }
    else if (preapproval_id || payment_id) {
       console.log("⚠️ Hay un ID en la URL pero el usuario aún no tiene sesión cargada.");
    }
  }, [user]);


  const handleSubscribe = async (plan) => {
    if (!user) {
      alert("⚠️ Debes iniciar sesión en la página antes de poder suscribirte.");
      const currentPath = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?redirect=${currentPath}`;
      return;
    }

    if (!plan.mp_plan_id) {
      alert("⚠️ Este plan aún no tiene un ID de suscripción de Mercado Pago válido.");
      return;
    }

    setLoadingPlanId(plan.id);

    try {
      console.log(`🚀 Redirigiendo a pago de Mercado Pago: ${plan.reason}`);
      
      let checkoutUrl = "";
      if (plan.tipo_plan === 'pago_unico') {
        const cState = couponStates[plan.id];
        const codigoCupon = (cState && cState.status === 'success') ? cState.code : "";
        
        // Llamar al backend para generar la preferencia con el email y plan_id EXACTOS
        const res = await fetch("https://api.guiadeparche.com/tft/mercado_pago_mp/generar_pago_unico.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_email: user.email,
            plan_id: plan.id,
            codigo: codigoCupon
          })
        });
        
        const data = await res.json();
        if (data.success && data.pref_id) {
            checkoutUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.pref_id}`;
        } else {
            alert("Error al iniciar el pago: " + (data.message || "No se pudo generar el link."));
            setLoadingPlanId(null);
            return;
        }
      } else {
        checkoutUrl = `https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=${plan.mp_plan_id}`;
      }

      const finalUrl = checkoutUrl.includes('?') 
        ? `${checkoutUrl}&payer_email=${encodeURIComponent(user.email)}`
        : `${checkoutUrl}?payer_email=${encodeURIComponent(user.email)}`;
      
      window.location.href = finalUrl;
    } catch (error) {
      console.error("❌ Error de red al procesar la suscripción:", error);
      alert("Hubo un error de conexión al iniciar la suscripción. Por favor intenta de nuevo.");
      setLoadingPlanId(null);
    }
  };

  const handleCouponCodeChange = (planId, code) => {
    setCouponStates(prev => ({
      ...prev,
      [planId]: {
        ...(prev[planId] || { status: 'idle', discountData: null, errorMsg: '' }),
        code: code.toUpperCase(),
        status: 'idle', // reset status on typing
        errorMsg: ''
      }
    }));
  };

  const handleApplyCoupon = async (plan) => {
    const cState = couponStates[plan.id];
    if (!cState || !cState.code || !cState.code.trim()) return;
    
    setCouponStates(prev => ({
      ...prev,
      [plan.id]: { ...prev[plan.id], status: 'loading', errorMsg: '' }
    }));
    
    try {
      const res = await fetch("https://api.guiadeparche.com/tft/mercado_pago_mp/aplicar_cupon.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: cState.code.trim(),
          plan_id: plan.id
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setCouponStates(prev => ({
          ...prev,
          [plan.id]: {
            ...prev[plan.id],
            status: 'success',
            discountData: {
              originalPrice: plan.amount,
              newPrice: data.nuevo_precio,
              discountPct: data.porcentaje_descuento,
              newPrefId: data.nuevo_pref_id
            }
          }
        }));
      } else {
        setCouponStates(prev => ({
          ...prev,
          [plan.id]: {
            ...prev[plan.id],
            status: 'error',
            errorMsg: data.message || "Cupón inválido o expirado"
          }
        }));
      }
    } catch (err) {
      setCouponStates(prev => ({
        ...prev,
        [plan.id]: {
          ...prev[plan.id],
          status: 'error',
          errorMsg: "Error de conexión al validar cupón"
        }
      }));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Elige tu membresía del Master Plan con Mercado Pago (Argentina)</h2>
        <p className={style.subtitle}>
          Mejora tu toma de decisiones en el parche actual con acceso a filtros competitivos avanzados y herramientas del Master Plan.
        </p>
      </div>

      {loadingPlanes ? (
        <div className={style.loadingContainer}>
          <div className={style.loadingSpinner}></div>
          <span>Cargando planes de suscripción desde tu servidor...</span>
        </div>
      ) : errorMsg ? (
        <div className={style.emptyState}>
          <h3>⚠️ No pudimos cargar los planes</h3>
          <p className={style.emptySub}>{errorMsg}</p>
        </div>
      ) : planes.length === 0 ? (
        <div className={style.emptyState}>
          <h3>Aún no hay planes publicados</h3>
          <p className={style.emptySub}>
            Ve al panel de administración de Mercado Pago en tu servidor para crear tu primer plan de suscripción y aquí aparecerá automáticamente.
          </p>
        </div>
      ) : (
        <>
          {user?.master_plan == 1 && (
            <div style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)', border: '1px solid #00ff88', color: '#00ff88', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
              <strong>¡Ya tienes una suscripción activa al Master Plan!</strong><br />
              Puedes gestionar tu suscripción desde tu panel de perfil.
            </div>
          )}
          <div className={style.grid}>
            {planes.filter(plan => {
              const mesesAcumulados = user?.acumulativo_mercadopago_meses || 0;
              // Si ya alcanzó o superó los 4 meses, ocultar planes promocionales (meses para que solo muestre planes ó subscripciones sin descuentos de meses)
              if (mesesAcumulados >= 4 && parseInt(plan.promo_months || 0, 10) > 0) {
                return false;
              }
              return true;
            }).map((plan, index) => {
              const isFeatured = !!(plan.badge_text && plan.badge_text.trim() !== '');
            const isLoading = loadingPlanId === plan.id;
            const badgeText = getBadgeText(plan);
            const features = getFeaturesForPlan(plan);
            const priceFormatted = parseFloat(plan.amount || 0).toLocaleString('es-AR', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            });

            // Cálculo para precio regular anterior (tachado) y porcentaje de descuento automático
            const basePrice = plan.amount_base;
            const hasDiscount = basePrice && parseFloat(basePrice) > parseFloat(plan.amount);
            const oldPriceFormatted = hasDiscount
              ? parseFloat(basePrice).toLocaleString('es-AR', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                })
              : null;
            const discountPct = hasDiscount
              ? Math.round(((parseFloat(basePrice) - parseFloat(plan.amount)) / parseFloat(basePrice)) * 100)
              : 0;

            return (
              <div
                key={plan.id}
                className={`${style.card} ${isFeatured ? style.cardFeatured : ''}`}
              >
                {badgeText && (
                  <span className={style.badge}>{badgeText}</span>
                )}

                <h3 className={style.planName}>{plan.reason}</h3>

                
                <div className={style.priceContainer} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                  {hasDiscount && (
                    <span className={style.oldPrice} style={{ marginRight: 0 }}>
                      Antes: ${oldPriceFormatted} ARS
                    </span>
                  )}
                  <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                    <span className={style.price}>
                      ${priceFormatted} <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#a0a6b8' }}>ARS</span>
                    </span>
                    <span className={style.period}>{getPeriodText(plan)}</span>
                  </div>
                </div>
                {hasDiscount && (
                  <div className={style.discountLabel}>
                    🏷️ Descuento especial: -{discountPct}% OFF
                  </div>
                )}

                <ul className={style.featuresList}>
                  {features.map((feature, i) => (
                    <li key={i} className={style.featureItem} style={!feature.enabled ? { opacity: 0.5 } : {}}>
                      <span className={style.featureIcon} style={!feature.enabled ? { color: '#ff5555' } : {}}>
                        {feature.enabled ? '✓' : '✕'}
                      </span>
                      <span style={!feature.enabled ? { textDecoration: 'line-through' } : {}}>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {plan.tipo_plan === 'pago_unico' && (
                    <div style={{ display: 'flex', gap: '8px', padding:"10px" }}>
                      <input 
                        type="text" 
                        placeholder="CUPÓN" 
                        value={couponStates[plan.id]?.code || ''}
                        onChange={(e) => handleCouponCodeChange(plan.id, e.target.value)}
                        style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 12px', borderRadius: '8px', textTransform: 'uppercase', outline: 'none' }}
                        disabled={couponStates[plan.id]?.status === 'loading' || couponStates[plan.id]?.status === 'success'}
                      />
                      <button 
                        onClick={() => handleApplyCoupon(plan)}
                        style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0 12px', borderRadius: '8px', cursor: (couponStates[plan.id]?.status === 'loading' || couponStates[plan.id]?.status === 'success' || !couponStates[plan.id]?.code) ? 'not-allowed' : 'pointer', opacity: (couponStates[plan.id]?.status === 'loading' || couponStates[plan.id]?.status === 'success' || !couponStates[plan.id]?.code) ? 0.6 : 1 }}
                        disabled={couponStates[plan.id]?.status === 'loading' || couponStates[plan.id]?.status === 'success' || !couponStates[plan.id]?.code}
                      >
                        {couponStates[plan.id]?.status === 'loading' ? '⏳' : 'Aplicar'}
                      </button>
                      {couponStates[plan.id]?.status === 'error' && (
                        <div style={{ color: '#ff5555', fontSize: '0.8rem', marginTop: '6px' }}>⚠️ {couponStates[plan.id]?.errorMsg}</div>
                      )}
                      {couponStates[plan.id]?.status === 'success' && (
                        <div style={{ color: '#00ff88', fontSize: '0.85rem', marginTop: '8px', background: 'rgba(0,255,136,0.1)', padding: '6px', borderRadius: '6px' }}>
                          ✅ ¡Cupón aplicado! El total ahora es <strong>${parseFloat(couponStates[plan.id]?.discountData?.newPrice).toLocaleString('es-AR')} ARS</strong>
                        </div>
                      )}
                    </div>
                )}

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSubscribe(plan)}
                  className={`${style.button} ${
                    isFeatured ? style.buttonPrimary : style.buttonSecondary
                  }`}
                >
                  {isLoading ? (
                    <span className={style.loadingSpinner}></span>
                  ) : (
                    `Suscribirme ahora ${couponStates[plan.id]?.status === 'success' ? `($${parseFloat(couponStates[plan.id]?.discountData?.newPrice).toLocaleString('es-AR')})` : ''}`
                  )}
                </button>
              </div>
            );
          })}
        </div>
        </>
      )}
    </div>
  );
};

export default SuscripcionesMP;

