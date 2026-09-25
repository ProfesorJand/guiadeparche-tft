import React from 'react';
import { useStore } from '@nanostores/react';
import { $user, $superAdmin, $hasMasterPlan } from '../../../stores/auth';
import SuscripcionesMP from '../suscripciones/SuscripcionesMP';
import styles from './css/MasterPlanContent.module.css';

const MasterPlanContent = () => {
  const user = useStore($user);
  const hasMasterPlan = useStore($hasMasterPlan);
  const superAdmin = useStore($superAdmin);

  const [activePlanFeatures, setActivePlanFeatures] = React.useState([]);

  React.useEffect(() => {
    if (hasMasterPlan) {
      fetch("https://api.guiadeparche.com/tft/mercado_pago_mp/planes.php?action=list")
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.planes)) {
            let userPlan = data.planes.find(p => p.id == user?.plan_id || p.id == user?.master_plan_id || p.mp_plan_id == user?.mp_plan_id);
            if (!userPlan && data.planes.length > 0) {
              userPlan = data.planes[0]; // Fallback if user object lacks the specific ID
            }
            
            if (userPlan) {
              const featuresList = [];
              if (userPlan.features) {
                try {
                  const parsed = JSON.parse(userPlan.features);
                  if (Array.isArray(parsed)) {
                    parsed.forEach(f => {
                      if (typeof f === 'string') featuresList.push({ text: f, enabled: true });
                      else if (f?.text && f?.enabled !== false) featuresList.push({ text: f.text, enabled: true });
                    });
                  }
                } catch(e) {}
              }
              if (featuresList.length === 0) {
                featuresList.push(
                  { text: "Acceso ilimitado al Master Plan TFT", enabled: true }
                );
              }
              setActivePlanFeatures(featuresList);
            }
          }
        })
        .catch(err => console.error("Error cargando plan features:", err));
    }
  }, [hasMasterPlan, user]);

  return (
    <div className="bodyContainerMid">
      <video controls preload="auto" playsInline style={{ width: '100%', height: 'auto', maxWidth: '640px', margin: '0 auto', display: 'block', alignSelf: 'center' }}>
        <source 
          aria-label="Video explicativo sobre el TFT Master Plan de GUIADEPARCHE"
          src="https://api.guiadeparche.com/tft/videos/VSL_Master_Plan_2026.mp4" 
          type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

            {/* Si TIENE el plan activo */}
      {hasMasterPlan && (
        <div className={styles.activePlanContainer}>
          <div className={styles.successBadge}>
            <h2>¡Master Plan Activo!</h2>
            <p>Disfruta de todos tus beneficios exclusivos.</p>
          </div>
          
          <div className={styles.benefitsList}>
            <h3>Tus Beneficios:</h3>
            <ul>
              {activePlanFeatures.length > 0 ? (
                activePlanFeatures.map((feat, i) => (
                  <li key={i}>✅ {feat.text}</li>
                ))
              ) : (
                <>
                  <li>✅ Acceso ilimitado a las herramientas del Master Plan TFT</li>
                  <li>✅ Filtros Soft/Hard aditivos avanzados para composiciones</li>
                  <li>✅ Actualizaciones en tiempo real del meta actual</li>
                </>
              )}
            </ul>
          </div>
          
          <a href="/tft/master-plan/app" className={styles.button} style={{ 
            display: 'block', 
            textAlign: 'center', 
            marginTop: '30px',
            padding: '18px 30px',
            fontSize: '1.4rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
            color: '#000',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0, 201, 255, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: 'none',
            textDecoration: 'none',
            justifySelf: "center",
            alignSelf: "center"
          }}>
            🔥 Accede al Master Plan 🔥
          </a>
        </div>
      ) }

      {!hasMasterPlan  && <SuscripcionesMP />}
      
      <section className={styles.containerSection}>
        <h2 className={styles.tituloCentrado}>Mejorar en TFT requiere conocimiento. El problema es cuánto tiempo tienes para conseguirlo.</h2>
        <p>
          Los mejores jugadores estudian el juego constantemente: analizan el meta, composiciones, objetos, aumentos, condiciones de victoria, posicionamiento y cientos de situaciones posibles.
        </p>
        <p>
          Esa dedicación es una de las mejores formas de mejorar.
        </p>
        <p>
          Pero no todos tenemos el tiempo, el grupo de estudio o las horas necesarias para hacer todo ese análisis por nuestra cuenta.
        </p>
        <p>
          TFT Master Plan reduce ese umbral de conocimiento y concentra ese trabajo en un solo lugar, para que puedas acceder rápidamente a información que de otra forma te llevaría muchas horas encontrar y analizar.
        </p>
      </section>
        
      <section className={styles.containerSection}>
        <h2>Nosotros hacemos el trabajo de análisis. Tú decides cómo utilizarlo.</h2>
        <p>
          Master Plan no pretende enseñarte una única forma de jugar TFT ni sustituir el proceso de aprendizaje.
          Te da un punto de partida mucho más rápido.
          La herramienta reúne y organiza información sobre las composiciones del meta para que puedas entender rápidamente qué necesitas para jugarlas y cómo adaptarte cuando la partida no sale según lo planeado.
        </p>
        <p style={{fontStyle: "italic", fontWeight: "bold", marginTop: "10px", marginBottom: "10px"}}>
          Menos tiempo buscando información. Más tiempo aplicándola en tus partidas.
        </p>
      </section>
      
      <section className={styles.containerSection}>
      <h2>Todo el análisis que necesitas, organizado para usarlo durante tus partidas</h2>
      <ul>
        <li><p><strong>Encuentra qué jugar:</strong> Explora las mejores líneas disponibles para cada composición y filtra según tus preferencias y el spot de partida.</p></li>
        <li><p><strong>Entiende cuándo una composición es realmente buena:</strong> Identifica las condiciones que hacen que una composición sea especialmente poderosa: aumentos, artefactos, emblemas, objetos y otras condiciones.</p></li>
        <li><p><strong>Aprende cuándo subir y cuándo rolear:</strong> Ten una referencia clara de los momentos importantes de cada composición para saber cuándo invertir tus recursos.</p></li>
        <li><p><strong>Ten alternativas cuando el plan falla:</strong> Si estás contestado, no encuentras tus unidades o tus objetos no encajan, descubre qué alternativas tienes.</p></li>
        <li><p><strong>Optimiza tu tablero:</strong> Builds, objetos, posicionamiento y variaciones para adaptar la composición a tu partida.</p></li>
      </ul>
      </section>




      {/* Detalles desplegables */}
      {hasMasterPlan && (
        <>
          <details open style={{ marginTop: '30px' }}>
            <summary>¿Para quién es?</summary>
            <ol>
              <li><p>Jugadores que quieren subir de rango</p></li>
              <li><p>No importa si eres Bronce o Challenger.</p></li>
              <li><p>El objetivo es ayudarte a tomar mejores decisiones durante la partida.</p></li>
            </ol>
          </details>
          
          <details open>
            <summary>¿Por qué lo estamos creando?</summary>
            <ol>
              <li><p>Porque las composiciones son solo una parte de TFT.</p></li>
              <li><p>La mayoría de jugadores pierde partidas por:</p>
                <ul>
                  <li><p>Elegir mal su composición</p></li>
                  <li><p>No adaptar su plan</p></li>
                  <li><p>Jugar una composición en el spot equivocado</p></li>
                  <li><p>No entender cuándo pivotar</p></li>
                </ul>
              </li>
            </ol>
          </details>

          <details>
            <summary>¿Qué es exactamente el TFT Master Plan?</summary>
            <p style={{ margin: '10px 0', lineHeight: '1.5' }}>
              Es una herramienta prémium de filtrado en tiempo real diseñada para usarse <em>antes</em> (de estudio) y <em>durante</em> tus partidas. A diferencia de las Tier Lists estáticas tradicionales, el Master Plan adapta el meta actual a lo que el juego te da en tus primeras rondas, guiándote paso a paso hacia la composición correcta.
            </p>
          </details>

          <details>
            <summary>¿Las composiciones están siempre actualizadas?</summary>
            <p style={{ margin: '10px 0', lineHeight: '1.5' }}>
              Sí. Nuestro equipo analiza el meta en cada parche para asegurar que las composiciones sugeridas por los filtros sean fuertes y precisas.
            </p>
          </details>

          {/* La última caja cambia según si está logueado o no */}
          {!user ? (
            <details open>
              <summary>¿Qué puedes hacer hoy?</summary>
              <ol>
                <li><a href="/login?redirect=/tft/master-plan" style={{ color: '#00d4ff', textDecoration: 'underline' }}>Pre-registrarte</a></li>
                <li>Al hacerlo:
                  <ol>
                    <li>Recibirás acceso prioritario</li>
                    <li>Conocerás las novedades antes que nadie</li>
                    <li>Podrás acceder a descuentos exclusivos de lanzamiento</li>
                  </ol>
                </li>
              </ol>
            </details>
          ) : (
            <details open>
              <summary>¿Qué puedes hacer hoy?</summary>
              <p style={{ padding: '10px 0', opacity: 0.9 }}>
                Ya estás registrado con la cuenta <strong>{user.email}</strong>. 
                Obtén el Master Plan arriba para desbloquear todas las herramientas y subir de ELO.
              </p>
            </details>
          )}
        </>
      )}
    </div>
  );
};

export default MasterPlanContent;
