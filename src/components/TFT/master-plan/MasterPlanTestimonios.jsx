import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $user, $admin, $superAdmin } from '@stores/auth';
import styles from './css/MasterPlanTestimonios.module.css';

const API_TESTIMONIO_URL = 'https://api.guiadeparche.com/tft/master_plan/guardar_testimonio.php';
const MAX_CHAR_LIMIT = 400;

const MasterPlanTestimonios = () => {
  const user = useStore($user);
  const admin = useStore($admin);
  const superAdmin = useStore($superAdmin);

  const [isClient, setIsClient] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [existingTestimonio, setExistingTestimonio] = useState(null);

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [testimonio, setTestimonio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Verificación inicial en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 2. Prellenar nombre si el usuario tiene nombre en su perfil
  useEffect(() => {
    if (user && !nombre) {
      const defaultName = user.name + " " + user.surname || user.nombre || '';
      if (defaultName) setNombre(defaultName);
    }
  }, [user]);

  // 3. Comprobar si el usuario ya envió su testimonio anteriormente
  useEffect(() => {
    if (!isClient) return;

    if (!user) {
      setCheckingStatus(false);
      return;
    }

    const checkExistingSubmission = async () => {
      try {
        const url = `${API_TESTIMONIO_URL}?user_id=${user.id || ''}&email=${encodeURIComponent(user.email || '')}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.has_submitted) {
          setAlreadySubmitted(true);
          setExistingTestimonio(data.testimonio);
        }
      } catch (err) {
        console.error('Error al verificar estado del testimonio:', err);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkExistingSubmission();
  }, [isClient, user]);

  // Manejador para el texto del testimonio (limite 400 caracteres)
  const handleTestimonioChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHAR_LIMIT) {
      setTestimonio(text);
      setErrorMessage('');
    }
  };

  // Manejador para enviar el testimonio
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedTestimonio = testimonio.trim();
    if (!trimmedTestimonio) {
      setErrorMessage('Por favor escribe tu testimonio antes de enviarlo.');
      return;
    }

    if (trimmedTestimonio.length > MAX_CHAR_LIMIT) {
      setErrorMessage(`El testimonio no puede superar los ${MAX_CHAR_LIMIT} caracteres.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        user_id: user.id,
        email: user.email,
        nombre: nombre.trim() || user.name || user.nombre || 'Estratega',
        testimonio: trimmedTestimonio
      };

      const res = await fetch(API_TESTIMONIO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage('¡Muchas gracias! Tu testimonio ha sido guardado exitosamente.');
        setAlreadySubmitted(true);
        setExistingTestimonio({
          ...payload,
          created_at: new Date().toISOString()
        });
      } else {
        setErrorMessage(data.message || 'Ocurrió un error al guardar tu testimonio.');
      }
    } catch (err) {
      console.error('Error enviando testimonio:', err);
      setErrorMessage('Hubo un problema de conexión al enviar tu testimonio. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render condicional mientras carga la verificación en cliente
  if (!isClient || checkingStatus) {
    return (
      <div className={styles.container}>
        <div className={styles.statusCard}>
          <div className={styles.spinner} style={{ width: '32px', height: '32px', marginBottom: '15px' }} />
          <p className={styles.statusText}>Cargando información...</p>
        </div>
      </div>
    );
  }

  // CASO 1: No está logueado
  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.statusCard}>
          <div className={styles.statusIcon}>🔒</div>
          <h2 className={styles.statusTitle}>Inicia sesión para continuar</h2>
          <p className={styles.statusText}>
            Debes iniciar sesión con tu cuenta de Guía de Parche para dejar tu testimonio del Master Plan.
          </p>
          <a href="/login?redirect=/tft/master-plan/testimonios" className={styles.actionBtn}>
            Iniciar Sesión
          </a>
        </div>
      </div>
    );
  }

  // CASO 2: Logueado pero nunca tuvo Master Plan
  const tieneAcceso = !!(user.first_time_master_plan || admin || superAdmin);
  if (!tieneAcceso) {
    return (
      <div className={styles.container}>
        <div className={styles.statusCard}>
          <div className={styles.statusIcon}>👑</div>
          <h2 className={styles.statusTitle}>Acceso exclusivo para miembros del Master Plan</h2>
          <p className={styles.statusText}>
            Esta sección está reservada para jugadores que forman o han formado parte del Master Plan de TFT.
            ¡Suscríbete para acceder a la app interactiva y todas sus herramientas exclusivas!
          </p>
          <a href="/tft/master-plan" className={styles.actionBtn}>
            Conocer el Master Plan
          </a>
        </div>
      </div>
    );
  }

  // CASO 3: Ya envió su testimonio
  if (alreadySubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.statusCard}>
          <div className={styles.statusIcon}>✨</div>
          <h2 className={styles.statusTitle}>¡Ya enviaste tu testimonio!</h2>
          <p className={styles.statusText}>
            {successMessage || 'Muchas gracias por compartir tu experiencia con la comunidad de Guía de Parche. Valoramos mucho tu apoyo y dedicación al Master Plan.'}
          </p>
          {existingTestimonio && (
            <div className={styles.testimonioPreview}>
              <div className={styles.testimonioQuotes}>“</div>
              <p className={styles.testimonioTexto}>{existingTestimonio.testimonio}</p>
              <div className={styles.testimonioAutor}>
                <span>— {existingTestimonio.nombre || 'Estratega'}</span>
                <span className={styles.testimonioFecha}>
                  {existingTestimonio.created_at ? new Date(existingTestimonio.created_at).toLocaleDateString() : ''}
                </span>
              </div>
            </div>
          )}
          <div style={{ marginTop: '25px' }}>
            <a href="/tft/master-plan/app" className={styles.actionBtn}>
              Ir a la App del Master Plan
            </a>
          </div>
        </div>
      </div>
    );
  }

  // CASO 4: Formulario para redactar testimonio
  const remainingChars = MAX_CHAR_LIMIT - testimonio.length;
  const isNearLimit = remainingChars <= 50 && remainingChars > 0;
  const isAtLimit = remainingChars === 0;

  return (
    <div className={styles.container}>
      <header className={styles.headerCard}>
        <div className={styles.badge}>Testimonios Master Plan</div>
        <h1 className={styles.title}>Comparte tu experiencia</h1>
        <p className={styles.subtitle}>
          ¿Cómo te ha ayudado el Master Plan en tus partidas de TFT? Tu reseña inspirará a otros estrategas a mejorar su nivel de juego.
        </p>
      </header>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="nombre" className={styles.label}>
            <span>Nombre o Apodo de Invocador</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>(Visible públicamente)</span>
          </label>
          <input
            id="nombre"
            type="text"
            className={styles.input}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Jupeson, FakerTFT, etc."
            maxLength={100}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="testimonio" className={styles.label}>
            <span>Tu Testimonio</span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>Máx. 400 caracteres</span>
          </label>
          <textarea
            id="testimonio"
            className={styles.textarea}
            value={testimonio}
            onChange={handleTestimonioChange}
            placeholder="Cuéntanos cómo fue tu experiencia usando la app, qué rango lograste alcanzar o qué es lo que más te gusta del Master Plan de Guiadeparche..."
            rows={5}
            maxLength={MAX_CHAR_LIMIT}
            required
          />
          <div className={styles.charCountWrapper}>
            <span
              className={`${styles.charCount} ${isNearLimit ? styles.charCountWarning : ''} ${isAtLimit ? styles.charCountLimit : ''}`}
            >
              {testimonio.length} / {MAX_CHAR_LIMIT} caracteres
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className={styles.alertError}>
            ⚠️ {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting || testimonio.trim().length === 0}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner} />
              Guardando testimonio...
            </>
          ) : (
            'Enviar Testimonio'
          )}
        </button>
      </form>
    </div>
  );
};

export default MasterPlanTestimonios;
