import React from 'react';
import { useStore } from '@nanostores/react';
import { $user, $superAdmin, $hasMasterPlan } from '../../../stores/auth';
import SuscripcionesMP from '../suscripciones/SuscripcionesMP';
import styles from './MasterPlanContent.module.css';

const MasterPlanContent = () => {
  const user = useStore($user);
  const hasMasterPlan = useStore($hasMasterPlan);
  const superAdmin = useStore($superAdmin);
  return (
    <div className="bodyContainerMid">
      <video controls preload="auto" playsInline style={{ width: '100%', height: 'auto', maxWidth: '640px', margin: '0 auto', display: 'block', alignSelf: 'center' }}>
        <source src="https://api.guiadeparche.com/tft/videos/VSL_Master_Plan_2026.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

            {/* Si TIENE el plan activo */}
      {hasMasterPlan ? (
        <div className={styles.activePlanContainer}>
          <div className={styles.successBadge}>
            <h2>¡Master Plan Activo!</h2>
            <p>Disfruta de todos tus beneficios exclusivos.</p>
          </div>
          
          <div className={styles.benefitsList}>
            <h3>Tus Beneficios:</h3>
            <ul>
              <li>✅ Acceso ilimitado a las herramientas del Master Plan TFT</li>
              <li>✅ Filtros Soft/Hard aditivos avanzados para composiciones</li>
              <li>✅ Actualizaciones en tiempo real del meta actual</li>
            </ul>
          </div>
          
          <a href="/tft/master-plan/app" className={styles.button} style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
            Accede al Master Plan
          </a>
        </div>
      ) : (
        /* Si NO tiene el plan activo (logueado o no) */
        <>
          {/* !hasMasterPlan &&  <SuscripcionesMP /> /* mostrar esto cuando ya dejemos las pruebas de MP en Mercado pago */}

          {/* Botón de login para los no logueados */}
          {!user && (
            <a href="/login?redirect=/tft/master-plan" className={styles.button} style={{ display: 'block', textAlign: 'center', marginTop: '20px', alignSelf: "anchor-center" }}>
              Reservar mi acceso
            </a>
          )}
        </>
      )}

      {!hasMasterPlan && user && <SuscripcionesMP />}
      
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

      <h2>Nosotros hacemos el trabajo de análisis. Tú decides cómo utilizarlo.</h2>
      <p>
        Master Plan no pretende enseñarte una única forma de jugar TFT ni sustituir el proceso de aprendizaje.
        Te da un punto de partida mucho más rápido.
        La herramienta reúne y organiza información sobre las composiciones del meta para que puedas entender rápidamente qué necesitas para jugarlas y cómo adaptarte cuando la partida no sale según lo planeado.
      </p>
      <p style={{fontStyle: "italic", fontWeight: "bold", marginTop: "10px", marginBottom: "10px"}}>
        Menos tiempo buscando información. Más tiempo aplicándola en tus partidas.
      </p>

      <h2>Todo el análisis que necesitas, organizado para usarlo durante tus partidas</h2>
      <h3>Encuentra qué jugar</h3>
      <p>
        Explora las mejores líneas disponibles para cada composición y filtra según tus preferencias y el spot de partida.
      </p>
      <h3>Entiende cuándo una composición es realmente buena</h3>
      <p>
        Identifica las condiciones que hacen que una composición sea especialmente poderosa: aumentos, artefactos, emblemas, objetos y otras condiciones.
      </p>
      <h3>Aprende cuándo subir y cuándo rolear</h3>
      <p>
        Ten una referencia clara de los momentos importantes de cada composición para saber cuándo invertir tus recursos.
      </p>
      <h3>Ten alternativas cuando el plan falla</h3>
      <p>
        Si estás contestado, no encuentras tus unidades o tus objetos no encajan, descubre qué alternativas tienes.
      </p>
      <h3>Optimiza tu tablero</h3>
      <p>
        Builds, objetos, posicionamiento y variaciones para adaptar la composición a tu partida.
      </p>




      {/* Detalles desplegables */}
      {hasMasterPlan && (
        <>
          <details open style={{ marginTop: '30px' }}>
            <summary>¿Para quién es?</summary>
            <ol>
              <li>Jugadores que quieren subir de rango</li>
              <li>No importa si eres Bronce o Challenger.</li>
              <li>El objetivo es ayudarte a tomar mejores decisiones durante la partida.</li>
            </ol>
          </details>
          
          <details open>
            <summary>¿Por qué lo estamos creando?</summary>
            <ol>
              <li>Porque las composiciones son solo una parte de TFT.</li>
              <li>La mayoría de jugadores pierde partidas por:
                <ul>
                  <li>Elegir mal su composición</li>
                  <li>No adaptar su plan</li>
                  <li>Jugar una composición en el spot equivocado</li>
                  <li>No entender cuándo pivotar</li>
                </ul>
              </li>
            </ol>
          </details>

          <details>
            <summary>¿Qué es exactamente el TFT Master Plan?</summary>
            <p style={{ margin: '10px 0', lineHeight: '1.5' }}>
              Es una herramienta avanzada de filtrado en tiempo real diseñada para usarse <em>durante</em> tus partidas. A diferencia de las Tier Lists estáticas tradicionales, el Master Plan adapta el meta actual a lo que el juego te da en tus primeras rondas, guiándote paso a paso hacia la composición correcta.
            </p>
          </details>

          <details>
            <summary>¿Cómo funciona el Filtro de Salidas Early y Aumentos?</summary>
            <p style={{ margin: '10px 0', lineHeight: '1.5' }}>
              ¿Te salió un aumento Prismático en la etapa 2-1 y no sabes qué jugar? Con nuestro algoritmo de filtros, solo tienes que seleccionar el aumento que tomaste o las fichas que te salieron en early. Instantáneamente, la herramienta filtrará y te mostrará las composiciones meta que tienen la mayor probabilidad de hacer Top 4 con ese arranque específico.
            </p>
          </details>

          <details>
            <summary>¿Realmente me ayudará a subir de ELO?</summary>
            <p style={{ margin: '10px 0', lineHeight: '1.5' }}>
              Absolutamente. El mayor error de los jugadores es forzar composiciones o dudar demasiado al hacer la transición. El Master Plan elimina la "parálisis por análisis". Al saber matemáticamente hacia dónde pivotar desde el minuto uno, jugarás de forma más óptima, salvarás más vida en las etapas 3 y 4, y asegurarás más victorias.
            </p>
          </details>

          <details>
            <summary>¿Las composiciones están siempre actualizadas?</summary>
            <p style={{ margin: '10px 0', lineHeight: '1.5' }}>
              Sí. Nuestro equipo analiza el meta en cada parche para asegurar que las composiciones sugeridas por los filtros sean siempre las más fuertes y precisas. No importa si Riot cambia los números, el Master Plan siempre sabrá qué es lo mejor.
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
