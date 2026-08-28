import React from 'react';
import { useStore } from '@nanostores/react';
import { $user } from '../../stores/auth';
import styles from './RegistrarseBTN.module.css';

const RegistrarseBTN = ({ text, buttonText, layout = 'column', className = '', link = typeof window !== 'undefined' ? `/login?redirect=${window.location.pathname}` : "/login"}) => {
  const layoutClass = layout === 'row' ? styles.layout_row : styles.layout_column;
  
  const user = typeof window !== 'undefined' ? useStore($user) : null;

  let finalLink = link;
  let finalText = text;
  let finalButtonText = buttonText;

  if (user) {
    if (user.master_plan == 1) {
      finalText = "Accede al Master Plan";
      finalButtonText = "Ir a la App →";
      finalLink = "/tft/master-plan/app";
    } else {
      finalText = "Master Plan ya disponible";
      finalButtonText = "más información →";
      finalLink = "/tft/master-plan";
    }
  }

  return (
    <a href={finalLink} className={`${styles.info_register} ${layoutClass} ${className}`}>
      <p className={styles.text}>{finalText}</p>
      <span className={styles.button}>{finalButtonText}</span>
    </a>
  );
};

export default RegistrarseBTN;
