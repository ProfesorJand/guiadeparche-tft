import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $user, setUser } from '../../stores/auth'; // Asegúrate de que esta ruta es correcta respecto a la ubicación del archivo
import styles from './VincularMercadopago.module.css';

const API_VINCULAR_URL = "https://api.guiadeparche.com/tft/mercado_pago_mp/vincular_suscripcion.php";

const VincularMercadopago = () => {
  const user = useStore($user);
  const [status, setStatus] = useState('loading'); // 'loading', 'redirecting', 'processing', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [preapprovalId, setPreapprovalId] = useState('');

  useEffect(() => {
    // 1. Obtener el preapproval_id de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('preapproval_id');
    
    if (!id) {
      setStatus('error');
      setErrorMessage('No se encontró el ID de la suscripción en la URL.');
      return;
    }
    
    setPreapprovalId(id);

    // 2. Verificar estado de autenticación
    if (user === undefined) {
      // Sigue cargando el estado de autenticación de nanostores
      return;
    }

    if (user === null) {
      // No está logueado -> Redirigir al login guardando la ruta actual para que regrese
      setStatus('redirecting');
      const currentUrl = window.location.pathname + window.location.search;
      window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
      return;
    }

    // 3. Está logueado y tenemos ID, procedemos a vincular
    if (user && user.email && status === 'loading') {
      vincularSuscripcion(user.email, id);
    }

  }, [user]);

  const vincularSuscripcion = async (email, id) => {
    setStatus('processing');
    try {
      const response = await fetch(API_VINCULAR_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: email,
          preapproval_id: id
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        
        // Actualizamos el estado local (nanostore y localStorage) 
        // para que la interfaz sepa INMEDIATAMENTE que ya tiene el plan activo
        if (user) {
          const updatedUser = { 
            ...user, 
            master_plan: 1, 
            rol: 'suscriptor' 
          };
          setUser(updatedUser);
        }
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Error al vincular la suscripción en el servidor.');
      }
    } catch (error) {
      console.error("Error al vincular:", error);
      setStatus('error');
      setErrorMessage('Error de conexión al intentar vincular la suscripción.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Vinculación de Suscripción</h2>
        </div>
        
        <div className={styles.content}>
          {status === 'loading' && (
            <p>Cargando información de tu cuenta...</p>
          )}

          {status === 'redirecting' && (
            <p>Serás redirigido al inicio de sesión. Por favor, identifícate para vincular tu plan...</p>
          )}

          {status === 'processing' && (
            <div className={styles.processing}>
              <div className={styles.spinner}></div>
              <p>Vinculando tu Master Plan a la cuenta <strong>{user?.email}</strong>...</p>
            </div>
          )}

          {status === 'success' && (
            <div className={styles.success}>
              <h3 style={{ color: '#00d4ff', marginBottom: '10px' }}>¡Suscripción Vinculada con Éxito!</h3>
              <p>Tu cuenta <strong>{user?.email}</strong> ahora tiene el Master Plan activo.</p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  className={styles.button}
                  onClick={() => window.location.href = '/perfil?tab=master-plan'}
                >
                  Ir a mi perfil
                </button>
                <button 
                  className={styles.button}
                  onClick={() => window.location.href = '/tft/master-plan'}
                  style={{ background: 'linear-gradient(135deg, #ff0055 0%, #cc0044 100%)' }}
                >
                  Usar el Master Plan
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className={styles.error}>
              <h3 style={{ color: '#ff4d4d', marginBottom: '10px' }}>Ocurrió un problema</h3>
              <p>{errorMessage}</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px', opacity: 0.8 }}>
                Si crees que esto es un error, por favor contacta a soporte indicando tu ID de transacción: <br/>
                <strong>{preapprovalId}</strong>
              </p>
              <button 
                className={styles.button}
                onClick={() => window.location.href = '/tft/master-plan'}
                style={{ marginTop: '20px' }}
              >
                Volver
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VincularMercadopago;
