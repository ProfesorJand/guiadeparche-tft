import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $user, setUser, $hasMasterPlan } from '../../stores/auth';
import styles from './UserMenu.module.css';
import btnStyles from '../TFT/RegistrarseBTN.module.css';

const UserMenu = () => {
  const user = useStore($user);
  const hasMasterPlan = useStore($hasMasterPlan);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getMasterPlanBtn = () => {
    let text = "";
    let link = "";

    if (user && !hasMasterPlan) {
      text = "Accede al Master Plan";
      link = "/tft/master-plan";
    } else if (user && hasMasterPlan) {
      text = "Accede al Master Plan";
      link = "/tft/meta-comps-tier-list-teamfight-tactics/master-plan";
    } else {
      return null;
    }

    return (
      <a 
        href={link} 
        className={btnStyles.button} 
        style={{ textDecoration: 'none', padding: '0.4rem 0.8rem', fontSize: '0.75rem', textAlign: 'center' }}
      >
        {text}
      </a>
    );
  };

  if (!user) {
    return (
      <a href="/login" className={styles.login_link}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Ingresar</span>
      </a>
    );
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      {getMasterPlanBtn()}
      <div 
        className={styles.user_profile} 
        ref={menuRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
      <div className={styles.avatar} onClick={toggleMenu}>
        {user.picture ? (
          <img src={user.picture} alt={user.name} />
        ) : (
          <div className={styles.initials}>{user.name?.charAt(0) || user.email?.charAt(0)}</div>
        )}
      </div>
      <div className={`${styles.dropdown} ${isOpen ? styles.show : ''}`}>
        <div className={styles.user_info}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.email}>{user.email}</div>
        </div>
        <div className={styles.hr} />
        
        <button onClick={() => window.location.href = "/perfil"} className={styles.btn}>Mi Perfil</button>
        <button onClick={() => setUser(null)} className={styles.btn + " " + styles.logout_btn}>Cerrar Sesión</button>
      </div>
    </div>
    </div>
  );
};

export default UserMenu;
