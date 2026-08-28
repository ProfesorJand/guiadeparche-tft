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

  // Estado para el modal de pago
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState(null);
  const [cryptoLoading, setCryptoLoading] = useState(false);
  const [paypalLoading, setPayPalLoading] = useState(false);

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
    if (plan.tipo_plan === "pago_unico") {
      return `(Pago Único)`;
    }

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
    const paypal_token = params.get('token');
    const payer_id = params.get('PayerID');

    console.log("2. ID de la URL:", { preapproval_id, payment_id, status, paypal_token, payer_id });
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
           // Refrescar los datos reales desde la base de datos
           fetch("https://api.guiadeparche.com/verify-user.php", {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email: user.email })
           })
           .then(res => res.json())
           .then(verifyData => {
             if (verifyData.status === 'success' && verifyData.user) {
                setUser(verifyData.user); // Actualiza el localStorage y el estado
             }
             alert("¡Suscripción Exitosa! Tu acceso al Master Plan ha sido activado en tu cuenta.");
             window.history.replaceState({}, document.title, window.location.pathname);
             window.location.reload(); 
           });
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
           // Refrescar los datos reales desde la base de datos
           fetch("https://api.guiadeparche.com/verify-user.php", {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email: user.email })
           })
           .then(res => res.json())
           .then(verifyData => {
             if (verifyData.status === 'success' && verifyData.user) {
                setUser(verifyData.user); // Actualiza el localStorage y el estado
             }
             alert("¡Pago Exitoso! Los días de acceso al Master Plan han sido añadidos a tu cuenta.");
             window.history.replaceState({}, document.title, window.location.pathname);
             window.location.reload(); 
           });
        } else {
           alert("Hubo un error al activar el pago en la Base de Datos: " + data.message);
        }
      })
      .catch(e => console.error("Error fatal al vincular pago único:", e));
    }
    else if (paypal_token && payer_id && user && user.email) {
      console.log("4. Todo en orden, llamando a GoDaddy para capturar PAYPAL:", paypal_token);
      fetch("https://api.guiadeparche.com/tft/paypal/capturar_pago_paypal.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: paypal_token })
      })
      .then(async res => {
        const text = await res.text();
        return JSON.parse(text);
      })
      .then(data => {
        if (data.success) {
           // Refrescar los datos reales desde la base de datos
           fetch("https://api.guiadeparche.com/verify-user.php", {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email: user.email })
           })
           .then(res => res.json())
           .then(verifyData => {
             if (verifyData.status === 'success' && verifyData.user) {
                setUser(verifyData.user); // Actualiza el localStorage y el estado
             }
             alert("¡Pago con PayPal Exitoso! Tu Master Plan ha sido activado/extendido.");
             window.history.replaceState({}, document.title, window.location.pathname);
             window.location.reload(); 
           });
        } else {
           alert("Hubo un error al procesar el pago de PayPal: " + data.message);
        }
      })
      .catch(e => console.error("Error fatal al capturar pago PayPal:", e));
    }
    else if (preapproval_id || payment_id || paypal_token) {
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
      alert("⚠️ Este plan aún no tiene un ID válido.");
      return;
    }

    setSelectedPlanForPayment(plan);
    setShowPaymentModal(true);
  };

  const handleMercadoPagoPayment = async () => {
    const plan = selectedPlanForPayment;
    if (!plan) return;
    
    setLoadingPlanId(plan.id);
    try {
      console.log(`🚀 Redirigiendo a pago de Mercado Pago: ${plan.reason}`);
      
      let checkoutUrl = "";
      if (plan.tipo_plan === 'pago_unico') {
        const cState = couponStates[plan.id];
        const codigoCupon = (cState && cState.status === 'success') ? cState.code : "";
        
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
      console.error("❌ Error de red al procesar Mercado Pago:", error);
      alert("Hubo un error de conexión al iniciar la suscripción. Por favor intenta de nuevo.");
      setLoadingPlanId(null);
    }
  };

  const handleCryptoPayment = async () => {
    const plan = selectedPlanForPayment;
    if (!plan) return;

    setCryptoLoading(true);
    try {
      console.log(`🚀 Redirigiendo a pago Cripto (NOWPayments): ${plan.reason}`);
      
      const cState = couponStates[plan.id];
      const codigoCupon = (cState && cState.status === 'success') ? cState.code : "";
      
      const res = await fetch("https://api.guiadeparche.com/tft/cripto/generar_pago_cripto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          plan_id: plan.id,
          codigo: codigoCupon
        })
      });
      
      const data = await res.json();
      if (data.success && data.invoice_url) {
          window.location.href = data.invoice_url;
      } else {
          alert("Error al iniciar el pago con cripto: " + (data.message || "No se pudo generar la factura."));
      }
    } catch (error) {
      console.error("❌ Error de red al procesar Cripto:", error);
      alert("Hubo un error de conexión con la pasarela cripto. Por favor intenta de nuevo.");
    } finally {
      setCryptoLoading(false);
    }
  };

  const handlePayPalPayment = async () => {
    const plan = selectedPlanForPayment;
    if (!plan) return;

    setPayPalLoading(true);
    try {
      console.log(`🚀 Redirigiendo a pago PayPal: ${plan.reason}`);
      
      const cState = couponStates[plan.id];
      const codigoCupon = (cState && cState.status === 'success') ? cState.code : "";
      
      const res = await fetch("https://api.guiadeparche.com/tft/paypal/generar_pago_paypal.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          plan_id: plan.id,
          codigo: codigoCupon,
          return_url: window.location.href.split('?')[0]
        })
      });
      
      const data = await res.json();
      if (data.success && data.invoice_url) {
          window.location.href = data.invoice_url;
      } else {
          alert("Error al iniciar el pago con PayPal: " + (data.message || "No se pudo generar la orden."));
      }
    } catch (error) {
      console.error("❌ Error de red al procesar PayPal:", error);
      alert("Hubo un error de conexión con la pasarela de PayPal. Por favor intenta de nuevo.");
    } finally {
      setPayPalLoading(false);
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
        <h2 className={style.title}>Elige tu membresía del Master Plan</h2>
        <p className={style.subtitle}>Accede a las mejores herramientas, composiciones actualizadas en tiempo real y conviértete en un Challenger.</p>
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
          {/* <p className={style.emptySub}>
            Ve al panel de administración de Mercado Pago en tu servidor para crear tu primer plan de suscripción y aquí aparecerá automáticamente.
          </p> */}
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

            const isInternational = user && user.pais !== 'Argentina';

            return (
              <div
                key={plan.id}
                className={`${style.card} ${isFeatured ? style.cardFeatured : ''}`}
              >
                {badgeText && (
                  <span className={style.badge}>{badgeText}</span>
                )}

                <h3 className={style.planName}>{plan.reason}</h3>

                
                <div className={style.priceContainer} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                  
                  {!isInternational ? (
                    <>
                      {/* Old price ARS */}
                      {couponStates[plan.id]?.status === 'success' ? (
                        <span className={style.oldPrice} style={{ marginRight: 0, color: '#a0a6b8' }}>
                          ${oldPriceFormatted} ARS
                        </span>
                      ) : (
                        hasDiscount && (
                          <span className={style.oldPrice} style={{ marginRight: 0, color: '#a0a6b8' }}>
                            ${oldPriceFormatted} ARS
                          </span>
                        )
                      )}

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span className={style.price}>
                          {couponStates[plan.id]?.status === 'success' ? (
                             <>
                               ${parseFloat(couponStates[plan.id].discountData.newPrice).toLocaleString('es-AR', {minimumFractionDigits: 0, maximumFractionDigits: 2})} <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#a0a6b8' }}>ARS</span>
                             </>
                          ) : (
                             <>
                               ${priceFormatted} <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#a0a6b8' }}>ARS</span>
                             </>
                          )}
                        </span>
                        <span className={style.period} style={{ color: '#a0a6b8', fontSize: '0.95rem' }}>{getPeriodText(plan)}</span>
                      </div>

                      {/* Precio en USD dinámico si viene de la base de datos (amount_usd) */}
                      {plan.amount_usd && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(240, 185, 11, 0.1)', border: '1px solid rgba(240, 185, 11, 0.3)', padding: '4px 10px', borderRadius: '8px', color: '#f0b90b', fontWeight: 'bold', fontSize: '1rem', marginTop: '4px', gap: '6px' }}>
                           {couponStates[plan.id]?.status === 'success' ? (
                              <>
                                <span style={{ textDecoration: 'line-through', opacity: 0.6, fontSize: '0.85rem' }}>${parseFloat(plan.amount_usd_base || plan.amount_usd).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                                <span>≈ ${(parseFloat(plan.amount_usd) * (1 - (couponStates[plan.id].discountData.discountPct / 100))).toLocaleString('en-US', {minimumFractionDigits: 2})} USD</span>
                              </>
                           ) : (
                              <>
                                {plan.amount_usd_base && parseFloat(plan.amount_usd_base) > parseFloat(plan.amount_usd) && (
                                  <span style={{ textDecoration: 'line-through', opacity: 0.6, fontSize: '0.85rem' }}>${parseFloat(plan.amount_usd_base).toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                                )}
                                <span>≈ ${parseFloat(plan.amount_usd).toLocaleString('en-US', {minimumFractionDigits: 2})} USD</span>
                              </>
                           )}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {couponStates[plan.id]?.status === 'success' ? (
                        <span className={style.oldPrice} style={{ marginRight: 0, color: '#a0a6b8' }}>
                          ${parseFloat(plan.amount_usd_base || plan.amount_usd).toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                        </span>
                      ) : (
                        plan.amount_usd_base && parseFloat(plan.amount_usd_base) > parseFloat(plan.amount_usd) && (
                          <span className={style.oldPrice} style={{ marginRight: 0, color: '#a0a6b8' }}>
                            ${parseFloat(plan.amount_usd_base).toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                          </span>
                        )
                      )}

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span className={style.price} style={{ color: '#f0b90b' }}>
                          {couponStates[plan.id]?.status === 'success' ? (
                             <>
                               ${(parseFloat(plan.amount_usd) * (1 - (couponStates[plan.id].discountData.discountPct / 100))).toLocaleString('en-US', {minimumFractionDigits: 2})} <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#f0b90b' }}>USD</span>
                             </>
                          ) : (
                             <>
                               ${parseFloat(plan.amount_usd).toLocaleString('en-US', {minimumFractionDigits: 2})} <span style={{ fontSize: '1.2rem', fontWeight: '600', color: '#f0b90b' }}>USD</span>
                             </>
                          )}
                        </span>
                        <span className={style.period} style={{ color: '#a0a6b8', fontSize: '0.95rem' }}>{getPeriodText(plan)}</span>
                      </div>
                    </>
                  )}
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding:"10px" }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
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
                      </div>
                      {couponStates[plan.id]?.status === 'error' && (
                        <div style={{ color: '#ff5555', fontSize: '0.8rem', marginTop: '2px' }}>⚠️ {couponStates[plan.id]?.errorMsg}</div>
                      )}
                      {couponStates[plan.id]?.status === 'success' && (
                        <div style={{ color: '#00ff88', fontSize: '0.85rem', marginTop: '2px', background: 'rgba(0,255,136,0.1)', padding: '6px', borderRadius: '6px' }}>
                          ✅ ¡Cupón aplicado! El total ahora es {isInternational ? (
                            <strong>${(parseFloat(plan.amount_usd || 0) * (1 - (couponStates[plan.id].discountData.discountPct / 100))).toLocaleString('en-US', {minimumFractionDigits: 2})} USD</strong>
                          ) : (
                            <><strong>${parseFloat(couponStates[plan.id]?.discountData?.newPrice).toLocaleString('es-AR')} ARS</strong> o <strong>${(parseFloat(plan.amount_usd || 0) * (1 - (couponStates[plan.id].discountData.discountPct / 100))).toLocaleString('en-US', {minimumFractionDigits: 2})} USD</strong></>
                          )}
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
                    `Suscribirme ahora ${couponStates[plan.id]?.status === 'success' ? `(Dcto. Aplicado)` : ''}`
                  )}
                </button>
              </div>
            );
          })}
            {/* MODAL DE PAGO */}
            {showPaymentModal && selectedPlanForPayment && (
              <div className={style.modalOverlay} onClick={() => setShowPaymentModal(false)}>
                <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                  <button className={style.modalCloseBtn} onClick={() => setShowPaymentModal(false)}>×</button>
                  
                  <h3 className={style.modalTitle}>Método de Pago</h3>
                  <p className={style.modalSubtitle}>
                    Estás a punto de adquirir el <strong>{selectedPlanForPayment.reason}</strong>.
                    <br />
                    Elige cómo deseas pagar:
                  </p>

                  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    
                    {/* Botón de Mercado Pago (Solo si es de Argentina) */}
                    {user?.pais === 'Argentina' && (
                      <button 
                        className={style.btnMP} 
                        onClick={handleMercadoPagoPayment}
                        disabled={loadingPlanId === selectedPlanForPayment.id || cryptoLoading}
                      >
                        {loadingPlanId === selectedPlanForPayment.id ? (
                          <span className={style.loadingSpinner}></span>
                        ) : (
                          <>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.424 10.741L11.517 7.021C11.139 6.662 10.457 6.662 10.079 7.021L5.807 11.085C5.556 11.325 5.419 11.666 5.419 12.023C5.419 12.38 5.556 12.721 5.807 12.961L10.079 17.025C10.457 17.384 11.139 17.384 11.517 17.025L15.424 13.305V17.025C15.424 17.384 16.106 17.384 16.484 17.025C16.862 16.666 17 16.2 17 15.684V13.305C17 13.111 16.924 12.923 16.786 12.793L15.424 11.5V10.741ZM11.517 8.016L14.707 11.054L11.517 14.092V8.016Z" fill="white"/></svg>
                            Pagar con Mercado Pago (ARS)
                          </>
                        )}
                      </button>
                    )}

                    {/* Botón de PayPal (Internacional) */}
                    <button 
                      className={style.btnPayPal} 
                      onClick={handlePayPalPayment}
                      disabled={loadingPlanId === selectedPlanForPayment.id || paypalLoading}
                    >
                      {paypalLoading ? (
                        <span className={style.loadingSpinner}></span>
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 6.007 0h7.362c3.225 0 5.843 1.57 6.482 5.148.51 2.85-.013 5.394-1.437 7.236-1.503 1.942-3.87 2.766-6.425 2.766h-3.19c-.58 0-1.077.41-1.168.983l-1.555 5.204z" fill="#003087"/>
                            <path d="M12.915 15.15H9.725c-.58 0-1.077.41-1.168.983l-1.555 5.204H2.47a.641.641 0 0 1-.633-.74l2.124-7.11 1.637-6.07c.083-.518.53-1.05 1.063-1.05h7.362c3.225 0 5.843 1.57 6.482 5.148.51 2.85-.013 5.394-1.437 7.236-1.503 1.942-3.87 2.766-6.425 2.766z" fill="#009CDE"/>
                            <path d="M8.94 13.568h3.975c2.555 0 4.922-.824 6.425-2.766 1.107-1.431 1.64-3.328 1.438-5.59-1.025 3.31-3.692 4.417-6.842 4.417H9.96c-.58 0-1.077.41-1.168.983l-.707 2.37.855.586z" fill="#012169"/>
                          </svg>
                          Pagar con PayPal (USD)
                        </>
                      )}
                    </button>

                    {/* Botón de Criptomonedas (Internacional - NOWPayments) - OCULTO POR AHORA 
                    <button 
                      className={style.btnCriptoDark} 
                      onClick={handleCryptoPayment}
                      disabled={loadingPlanId === selectedPlanForPayment.id || cryptoLoading}
                    >
                      {cryptoLoading ? (
                        <span className={style.loadingSpinner}></span>
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#F0B90B"/><path d="M10.7424 16.262H13.6848L15.3408 12.631L13.6848 9H10.7424L9.08643 12.631L10.7424 16.262ZM12.2136 14.862V10.4H13.1328L14.1624 12.631L13.1328 14.862H12.2136Z" fill="#1E2329"/></svg>
                          Pagar con Criptomonedas (USD)
                        </>
                      )}
                    </button>
                    <p style={{ fontSize: '0.8rem', color: '#a0a6b8', textAlign: 'center', margin: 0, marginTop: '8px' }}>
                      Aceptamos USDT, BTC, ETH y más de 50 criptos mediante NOWPayments.
                    </p>
                    */}

                  </div>
                </div>
              </div>
            )}
        </div>
        </>
      )}
    </div>
  );
};

export default SuscripcionesMP;

