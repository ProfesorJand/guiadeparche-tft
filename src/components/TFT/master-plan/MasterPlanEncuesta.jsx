import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $user, $admin, $superAdmin } from '@stores/auth';
import styles from './css/MasterPlanEncuesta.module.css';

const API_REVIEW_URL = 'https://api.guiadeparche.com/tft/master_plan/guardar_review.php';

// Definición de las 5 preguntas enfocadas en el uso de app.astro (Master Plan en partida)
const PREGUNTAS = [
  {
    id: 'p1_facilidad',
    num: 1,
    texto: '¿Qué tan rápida, intuitiva y cómoda te resulta la app mientras juegas una partida en vivo de TFT?',
    minLabel: 'Muy incómoda',
    maxLabel: 'Excelente y ágil'
  },
  {
    id: 'p2_filtros',
    num: 2,
    texto: '¿Qué tan útiles te resultan los filtros interactivos (aumentos, campeones tempranos, emblemas y estilos de juego)?',
    minLabel: 'Poco útiles',
    maxLabel: 'Imprescindibles'
  },
  {
    id: 'p3_calidad',
    num: 3,
    texto: '¿Cómo evalúas la precisión, nivel de actualización y efectividad de las composiciones recomendadas en el meta actual?',
    minLabel: 'Desactualizadas',
    maxLabel: 'Súper precisas'
  },
  {
    id: 'p4_impacto',
    num: 4,
    texto: '¿Sientes que el Master Plan te ayuda a tomar mejores decisiones en juego y asegurar más victorias / Top 4?',
    minLabel: 'Poco impacto',
    maxLabel: 'Mejora notable'
  },
  {
    id: 'p5_general',
    num: 5,
    texto: '¿Cuál es tu nivel de satisfacción general con la herramienta y qué tanto la recomendarías a otro estratega?',
    minLabel: 'Insatisfecho',
    maxLabel: '100% satisfecho'
  }
];

const MasterPlanEncuesta = () => {
  const user = useStore($user);
  const admin = useStore($admin);
  const superAdmin = useStore($superAdmin);

  const [isClient, setIsClient] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [existingReview, setExistingReview] = useState(null);

  // Estados del formulario
  const [respuestas, setRespuestas] = useState({
    p1_facilidad: 0,
    p2_filtros: 0,
    p3_calidad: 0,
    p4_impacto: 0,
    p5_general: 0
  });
  const [sugerencia, setSugerencia] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Verificación en cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 2. Comprobar si el usuario ya envió su review previamente
  useEffect(() => {
    if (!isClient) return;

    if (!user) {
      setCheckingStatus(false);
      return;
    }

    const checkExistingSubmission = async () => {
      try {
        const url = `${API_REVIEW_URL}?user_id=${user.id || ''}&email=${encodeURIComponent(user.email || '')}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.has_submitted) {
          setAlreadySubmitted(true);
          setExistingReview(data.review);
        }
      } catch (err) {
        console.error('Error al verificar estado de la encuesta:', err);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkExistingSubmission();
  }, [isClient, user]);

  // Manejador para seleccionar puntaje del 1 al 5
  const handleSelectScore = (preguntaId, score) => {
    setRespuestas(prev => ({
      ...prev,
      [preguntaId]: score
    }));
    setErrorMessage('');
  };

  // Manejador para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validar que todas las preguntas tengan calificación asignada
    const sinResponder = PREGUNTAS.find(p => !respuestas[p.id] || respuestas[p.id] < 1 || respuestas[p.id] > 5);
    if (sinResponder) {
      setErrorMessage(`Por favor responde la pregunta #${sinResponder.num} antes de enviar.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        user_id: user.id,
        email: user.email,
        ...respuestas,
        sugerencia: sugerencia.trim()
      };

      const res = await fetch(API_REVIEW_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage('¡Muchas gracias! Tu opinión ha sido guardada exitosamente.');
        setAlreadySubmitted(true);
        setExistingReview({
          ...payload,
          rating_promedio: data.rating_promedio || 5.0,
          created_at: new Date().toISOString()
        });
      } else {
        setErrorMessage(data.message || 'Ocurrió un error al guardar tu encuesta.');
      }
    } catch (err) {
      console.error('Error enviando encuesta:', err);
      setErrorMessage('Hubo un problema de conexión al enviar tus respuestas. Intenta nuevamente.');
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
          <p className={styles.statusText}>Cargando encuesta...</p>
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
            Debes iniciar sesión con tu cuenta de Guía de Parche para acceder a la encuesta del Master Plan.
          </p>
          <a href="/login?redirect=/tft/master-plan/encuesta" className={styles.actionBtn}>
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
          <div className={styles.statusIcon}>⭐</div>
          <h2 className={styles.statusTitle}>Acceso exclusivo para miembros del Master Plan</h2>
          <p className={styles.statusText}>
            Esta encuesta está reservada para estrategas que tienen o alguna vez tuvieron acceso al Master Plan de TFT.
            ¡Si quieres llevar tu juego al siguiente nivel y probar todas las herramientas, únete hoy!
          </p>
          <a href="/tft/master-plan" className={styles.actionBtn}>
            Conocer el Master Plan
          </a>
        </div>
      </div>
    );
  }

  // CASO 3: Ya completó la encuesta
  if (alreadySubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.statusCard}>
          <div className={styles.statusIcon}>🎉</div>
          <h2 className={styles.statusTitle}>¡Ya completaste tu encuesta!</h2>
          <p className={styles.statusText}>
            {successMessage || 'Muchas gracias por brindarnos tu opinión. Tus respuestas nos ayudan enormemente a seguir perfeccionando las herramientas del Master Plan de TFT.'}
          </p>
          {existingReview && (
            <div className={styles.summaryBox}>
              <div className={styles.summaryItem}>
                <span>Calificación promedio:</span>
                <span className={styles.summaryRating}>⭐ {existingReview.rating_promedio || '5.0'} / 5.0</span>
              </div>
              {existingReview.sugerencia && (
                <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#94a3b8' }}>
                  <strong>Tu sugerencia registrada:</strong>
                  <p style={{ margin: '5px 0 0', fontStyle: 'italic', color: '#e2e8f0' }}>"{existingReview.sugerencia}"</p>
                </div>
              )}
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

  // CASO 4: Formulario de encuesta activo
  return (
    <div className={styles.container}>
      <header className={styles.headerCard}>
        <div className={styles.badge}>Encuesta de Satisfacción</div>
        <h1 className={styles.title}>¿Cómo ha sido tu experiencia con el Master Plan?</h1>
        <p className={styles.subtitle}>
          Tu opinión es fundamental para seguir puliendo los filtros, las composiciones y el rendimiento de la aplicación en cada parche.
        </p>
      </header>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        {PREGUNTAS.map(pregunta => {
          const valorActual = respuestas[pregunta.id];

          return (
            <div key={pregunta.id} className={styles.questionBlock}>
              <div className={styles.questionHeader}>
                <div className={styles.questionNumber}>{pregunta.num}</div>
                <h3 className={styles.questionText}>{pregunta.texto}</h3>
              </div>

              <div className={styles.scaleContainer}>
                <div className={styles.scaleButtons}>
                  {[1, 2, 3, 4, 5].map(score => {
                    const isSelected = valorActual === score;
                    return (
                      <button
                        key={score}
                        type="button"
                        className={`${styles.scaleBtn} ${isSelected ? styles.scaleBtnActive : ''}`}
                        onClick={() => handleSelectScore(pregunta.id, score)}
                        aria-label={`Calificar con ${score} de 5`}
                      >
                        <span className={styles.starIcon}>{isSelected ? '★' : '☆'}</span>
                        <span>{score}</span>
                      </button>
                    );
                  })}
                </div>

                <div className={styles.scaleLabels}>
                  <span>{pregunta.minLabel}</span>
                  <span>{pregunta.maxLabel}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Sugerencias finales opcionales */}
        <div className={styles.textareaGroup}>
          <label htmlFor="sugerencia" className={styles.textareaLabel}>
            ¿Tienes alguna sugerencia o nueva función que te gustaría ver en la app? (Opcional)
          </label>
          <textarea
            id="sugerencia"
            className={styles.textarea}
            value={sugerencia}
            onChange={(e) => setSugerencia(e.target.value)}
            placeholder="Escribe tus ideas, sugerencias sobre filtros, composiciones o cualquier detalle que nos ayude a mejorar..."
            rows={4}
          />
        </div>

        {errorMessage && (
          <div className={styles.alertError}>
            ⚠️ {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner} />
              Enviando tus respuestas...
            </>
          ) : (
            'Enviar Encuesta'
          )}
        </button>
      </form>
    </div>
  );
};

export default MasterPlanEncuesta;
