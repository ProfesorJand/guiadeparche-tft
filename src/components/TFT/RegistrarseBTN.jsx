import React from 'react';
import styles from './RegistrarseBTN.module.css';

const RegistrarseBTN = ({ text, buttonText, layout = 'column', className = '', link="/login"}) => {
  const layoutClass = layout === 'row' ? styles.layout_row : styles.layout_column;

  return (
    <a href={link} className={`${styles.info_register} ${layoutClass} ${className}`}>
      <p className={styles.text}>{text}</p>
      <span className={styles.button}>{buttonText}</span>
    </a>
  );
};

export default RegistrarseBTN;
