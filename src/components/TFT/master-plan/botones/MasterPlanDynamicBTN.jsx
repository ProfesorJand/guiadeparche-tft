import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $user, $hasMasterPlan } from '../../../../stores/auth';
import styles from '../../RegistrarseBTN.module.css';

const MasterPlanDynamicBTN = ({ layout = 'row', className = '', isIndividual = false }) => {
  const user = useStore($user);
  const hasMasterPlan = useStore($hasMasterPlan);
  const [mounted, setMounted] = useState(false);

  // Evitar problemas de hidratación en Astro/React (que el servidor y cliente tengan distintos estados iniciales)
  useEffect(() => {
    setMounted(true);
  }, []);

  const layoutClass = layout === 'row' ? styles.layout_row : styles.layout_column;

  // Estado por defecto (cargando o SSR)
  let text = isIndividual ? "¿Quieres ver más composiciones de TFT?" : "¿Quieres probar el TFT Master Plan antes que nadie?";
  let buttonText = isIndividual ? "Meta Comps TFT →" : "Pre-Regístrate para acceder al master plan →";
  let link = isIndividual ? "/tft/meta-comps-tier-list-teamfight-tactics/" : (typeof window !== 'undefined' ? `/login?redirect=${window.location.pathname}` : "/login");

  // Si ya estamos en el cliente, evaluamos los estados
  if (mounted) {
    if (isIndividual) {
      text = "¿Quieres ver más composiciones de TFT?";
      buttonText = "Meta Comps TFT →";
      link = "/tft/meta-comps-tier-list-teamfight-tactics/";
    } else {
      if (!user) {
        // Caso 1: No logeado
        text = "¿Quieres probar el TFT Master Plan antes que nadie?";
        buttonText = "Pre-Regístrate para acceder al master plan →";
        link = typeof window !== 'undefined' ? `/login?redirect=${window.location.pathname}` : "/login";
      } else if (user && !hasMasterPlan) {
        // Caso 2: Logeado, sin master plan
        text = "Desbloquea todo el potencial de TFT";
        buttonText = "Activa Master Plan para Subir de ELO →";
        link = "/tft/master-plan";
      } else if (hasMasterPlan) {
        // Caso 3: Logeado, con master plan
        text = "¡Disfruta de tus beneficios exclusivos!";
        buttonText = "Accede al Master Plan →";
        link = "/tft/master-plan/app";
      }
    }
  }

  return (
    <a href={link} className={`${styles.info_register} ${layoutClass} ${className}`}>
      <p className={styles.text}>{text}</p>
      <span className={styles.button}>{buttonText}</span>
    </a>
  );
};

export default MasterPlanDynamicBTN;
