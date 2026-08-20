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
      {superAdmin && user.country === "Argentina" && <SuscripcionesMP />}
      {/* Si TIENE el plan activo */}
      {hasMasterPlan ? (
        <div className={styles.activePlanContainer}>
          <div className={styles.successBadge}>
            <h3>¡Master Plan Activo!</h3>
            <p>Disfruta de todos tus beneficios exclusivos.</p>
          </div>
          
          <div className={styles.benefitsList}>
            <h4>Tus Beneficios:</h4>
            <ul>
              <li>✅ Acceso ilimitado a las herramientas del Master Plan TFT</li>
              <li>✅ Filtros Soft/Hard aditivos avanzados para composiciones</li>
              <li>✅ Actualizaciones en tiempo real del meta actual</li>
            </ul>
          </div>
          
          <a href="/tft/meta-comps-tier-list-teamfight-tactics/master-plan" className={styles.button} style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
            Accede al Master Plan
          </a>
        </div>
      ) : (
        /* Si NO tiene el plan activo (logueado o no) */
        <>
          {/* !hasMasterPlan &&  <SuscripcionesMP /> /* mostrar esto cuando ya dejemos las pruebas de MP en Mercado pago */}

          {/* Botón de login para los no logueados */}
          {!user && (
            <a href="/login?redirect=/tft/master-plan" className={styles.button} style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
              Reservar mi acceso
            </a>
          )}
        </>
      )}

      {/* Detalles desplegables */}
      {!hasMasterPlan && (
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
                Suscríbete arriba para desbloquear todas las herramientas del Master Plan.
              </p>
            </details>
          )}
        </>
      )}
    </div>
  );
};

export default MasterPlanContent;
