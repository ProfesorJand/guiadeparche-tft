import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $user, $hasMasterPlan } from '../../../stores/auth';
import styles from './BannerDescuentoMP.module.css';

const TimeBox = ({ value, label }) => (
  <div className={styles.timeBoxContainer}>
    <div className={styles.timeBoxValue}>
      {value.toString().padStart(2, '0')}
    </div>
    <span className={styles.timeBoxLabel}>{label}</span>
  </div>
);

const BannerDescuentoMP = () => {
  const user = useStore($user);
  const hasMasterPlan = useStore($hasMasterPlan);
  
  // ================= CONFIGURACIÓN DEL BANNER =================
  const COUPON_CODE = "TENGOFE50";
  const EXPIRATION_DATE = "2026-10-01T23:59:59-03:00"; // -03:00 establece explícitamente el horario de Argentina
  // ============================================================

  const [timeLeft, setTimeLeft] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date(EXPIRATION_DATE).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsExpired(true);
        setTimeLeft(null);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [EXPIRATION_DATE]);

  if (!mounted || isExpired || hasMasterPlan) return null;

  const handleBannerClick = () => {
    if (!user) {
      window.location.href = '/login?redirect=' + encodeURIComponent('/tft/master-plan?coupon=' + COUPON_CODE);
      return;
    }

    if (window.location.pathname.includes('/tft/master-plan')) {
      const event = new CustomEvent('apply-global-coupon', { detail: COUPON_CODE });
      window.dispatchEvent(event);
      
      const subElement = document.getElementById('suscripciones-section');
      if (subElement) {
        subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.location.href = '/tft/master-plan?coupon=' + COUPON_CODE;
    }
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerInner}>
        
        {/* Columna 1: Badge TFT Master Plan */}
        <div className={styles.col1}>
          <div className={styles.badge}>
            TFT Master Plan
          </div>
          <span className={styles.badgeText}>
            ¡Ya disponible!
          </span>
        </div>
        
        {/* Columna 2: Textos Principales */}
        <div className={styles.col2}>
          <span className={styles.promoTitle}>
            🔥 50% DE DESCUENTO DE LANZAMIENTO
          </span>
          <span className={styles.promoSubtitle}>
            Activa tu descuento y empieza a usar el TFT Master Plan
          </span>
        </div>

        {/* Columna 3: Botón */}
        <div className={styles.col3}>
          <button 
            onClick={handleBannerClick}
            className={styles.btnActivar}
          >
            [ ACTIVAR MI 50% ]
          </button>
        </div>

        {/* Columna 4: Countdown */}
        {timeLeft && (
          <div className={styles.col4}>
            <TimeBox value={timeLeft.days} label="DIAS" />
            <span className={styles.timeSeparator}>:</span>
            <TimeBox value={timeLeft.hours} label="HR" />
            <span className={styles.timeSeparator}>:</span>
            <TimeBox value={timeLeft.minutes} label="MIN" />
            <span className={styles.timeSeparator}>:</span>
            <TimeBox value={timeLeft.seconds} label="SEG" />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default BannerDescuentoMP;
