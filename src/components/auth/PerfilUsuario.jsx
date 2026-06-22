import { useEffect, lazy, Suspense } from 'react';
import { $user, $admin, logOut, $activeTab, setActiveTab } from "@stores/auth";
import { useStore } from "@nanostores/react";
import styles from './PerfilUsuario.module.css';
import {fetchAndSortComps, composMetaPBEJSON, composMetaPBETestJSON, addRestCompsFetch} from "@stores/dataTFT";

const AdminPanel = lazy(() => import("@components/main/Admin/Admin.jsx"));

const PerfilUsuario = () => {
  const user = useStore($user);
  const admin = useStore($admin)
  const activeTab = useStore($activeTab);
  useEffect(() => {
    const loadData = async () => {
      if(admin){
        await fetchAndSortComps(composMetaPBETestJSON);
        await addRestCompsFetch(composMetaPBEJSON);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (activeTab === 'logout') {
      logOut();
      window.location.href = '/login'; // O redirigir a donde prefieras
    }
  }, [activeTab]);

  if (!user) {
    window.location.href = '/login';
  }

  const renderUserData = () => (
    <div className={styles.tabContent}>
      <div className={styles.contentHeader}>
        <h2>Mis Datos</h2>
        <p>Gestiona tu información personal y de tu cuenta.</p>
      </div>
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Nombre Completo</span>
          <div className={styles.infoValue}>{user.name} {user.surname}</div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Correo Electrónico</span>
          <div className={styles.infoValue}>{user.email}</div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Fecha de Nacimiento</span>
          <div className={styles.infoValue}>{user.dob || 'No especificada'}</div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>País</span>
          <div className={styles.infoValue}>{user.country || 'No especificado'}</div>
        </div>
      </div>
    </div>
  );

  const renderMasterPlan = () => (
    <div className={styles.tabContent}>
      <div className={styles.contentHeader}>
        <h2>TFT Master Plan</h2>
        <p>Estado: ✅ Pre-registrado</p> 
      </div>
      <p>Beneficios:</p>
        <ul>
          <li>Acceso anticipado</li>
          <li>Notificación de lanzamiento</li>
          <li>Ofertas exclusivas de lanzamiento</li>
          <li>Actualizaciones del proyecto</li>
        </ul>
    </div>
  );

  const renderRiotAccount = () => (
    <div className={styles.tabContent}>
      <div className={styles.contentHeader}>
        <h2>Conexión con Riot Games</h2>
        <p>Sincroniza tus estadísticas de juego, ELO y perfil de invocador.</p>
      </div>
      <div className={styles.riotConnect}>
        {/* Ejemplo de cuando NO está conectada */}
        <svg className={styles.riotLogo} viewBox="0 0 24 24" fill="#d13639"><path d="M12.44 5c.44.17.65.65.48 1.09l-1.4 3.65h3.65c.44 0 .8.36.8.8 0 .44-.36.8-.8.8H11.5l3.22 8.35c.17.44-.04.92-.48 1.09-.44.17-.92-.04-1.09-.48L10 12.43 6.78 20.3c-.17.44-.65.65-1.09.48-.44-.17-.65-.65-.48-1.09L8.5 11.34H4.85c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8h3.65l-3.22-8.35c-.17-.44.04-.92.48-1.09.44-.17.92.04 1.09.48L10 7.57l3.22-7.87c.17-.44.65-.65 1.09-.48z"/></svg>
        <h3>Vincula tu cuenta para ver tu ELO</h3>
        <p>Al conectar tu cuenta de Riot Games, podremos mostrar tu rango actual, campeones más jugados y estadísticas en tiempo real.</p>
        <button className={styles.connectBtn}>CONECTAR CON RIOT GAMES</button>
          
        <div className={styles.infoCard} style={{marginTop: '40px', width: '100%', opacity: 0.6}}>
          <p style={{fontSize: '0.8rem', color: '#94a3b8'}}>Próximamente: Visualización de perfil Pro (Nivel, Emblemas, Historial).</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.profileContainer}>
      <main className={styles.contentArea}>
        {activeTab === 'data' && renderUserData()}
        {activeTab === 'master-plan' && renderMasterPlan()}
        {activeTab === 'riot' && renderRiotAccount()}
        {activeTab === 'admin' && (
          <Suspense fallback={<div className={styles.loadingSpinner}>Cargando panel de administración...</div>}>
            <AdminPanel/>
          </Suspense>
        )}
        {activeTab === 'logout' && <p>Cerrando sesión...</p>}
      </main>
    </div>
  );
};

export default PerfilUsuario;