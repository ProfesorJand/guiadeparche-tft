import { useEffect, lazy, Suspense, useState } from 'react';
import { $user, $admin, $superAdmin, logOut, $activeTab, setActiveTab, setUser } from "@stores/auth";
import { useStore } from "@nanostores/react";
import styles from './PerfilUsuario.module.css';
import { fetchAndSortComps, composMetaPBEJSON, composMetaPBETestJSON, addRestCompsFetch } from "@stores/dataTFT";
import { countryCodes } from '../../utils/countries';

const AdminPanel = lazy(() => import("@components/main/Admin/Admin.jsx"));

const PerfilUsuario = () => {
  const user = useStore($user);
  const admin = useStore($admin);
  const superAdmin = useStore($superAdmin);
  const activeTab = useStore($activeTab);
  
  const [phoneCode, setPhoneCode] = useState('+54');
  const [phone, setPhone] = useState('');
  const [isSavingPhone, setIsSavingPhone] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const [newsletter, setNewsletter] = useState(user.newsletter !== 0 && user.newsletter !== "0");
  const [isSavingNewsletter, setIsSavingNewsletter] = useState(false);
  const [activePlanFeatures, setActivePlanFeatures] = useState([]);

  useEffect(() => {
    const isMasterPlanActive = user?.master_plan == 1 || user?.master_plan === true || user?.master_plan === '1';
    
    if (isMasterPlanActive) {
      fetch("https://api.guiadeparche.com/tft/mercado_pago_mp/planes.php?action=list")
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.planes)) {
            let userPlan = data.planes.find(p => p.id == user?.plan_id || p.id == user?.master_plan_id || p.mp_plan_id == user?.mp_plan_id);
            if (!userPlan && data.planes.length > 0) {
              userPlan = data.planes[0]; // Fallback
            }
            
            if (userPlan && userPlan.features) {
              try {
                const parsed = JSON.parse(userPlan.features);
                const featuresList = [];
                if (Array.isArray(parsed)) {
                  parsed.forEach(f => {
                    if (typeof f === 'string') featuresList.push(f);
                    else if (f?.text && f?.enabled !== false) featuresList.push(f.text);
                  });
                }
                setActivePlanFeatures(featuresList);
              } catch(e) {}
            }
          }
        })
        .catch(err => console.error("Error cargando plan features en perfil:", err));
    }
  }, [user]);

  const handleSavePhone = async () => {
    if (!phone) {
      setPhoneError('Por favor ingresa un número');
      return;
    }
    setIsSavingPhone(true);
    setPhoneError('');
    const fullPhone = `${phoneCode} ${phone}`.trim();

    try {
      const response = await fetch('https://api.guiadeparche.com/update-user-info.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, cel: fullPhone })
      });
      const result = await response.json();
      if (result.status === 'success') {
        setUser({ ...user, cel: fullPhone });
      } else {
        setPhoneError(result.message || 'Error al guardar el teléfono');
      }
    } catch (err) {
      setPhoneError('Error de conexión');
    } finally {
      setIsSavingPhone(false);
    }
  };

  const handleToggleNewsletter = async (e) => {
    const newValue = e.target.checked;
    setNewsletter(newValue);
    setIsSavingNewsletter(true);

    try {
      const response = await fetch('https://api.guiadeparche.com/update-user-info.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, newsletter: newValue ? 1 : 0 })
      });
      const result = await response.json();
      if (result.status === 'success') {
        setUser({ ...user, newsletter: newValue ? 1 : 0 });
      } else {
        alert(result.message || 'Error al guardar la preferencia');
        setNewsletter(!newValue);
      }
    } catch (err) {
      alert('Error de conexión');
      setNewsletter(!newValue);
    } finally {
      setIsSavingNewsletter(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (admin || superAdmin) {
        await fetchAndSortComps(composMetaPBETestJSON);
        await addRestCompsFetch(composMetaPBEJSON);
      }
    };
    loadData();

    // Leer el tab desde la URL si existe
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'logout') {
      logOut();
      window.location.href = `/login?redirect=${window.location.pathname}`; // O redirigir a donde prefieras
    }
  }, [activeTab]);

  if (!user) {
    window.location.href = `/login?redirect=${window.location.pathname}`;
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
          <div className={styles.infoValue}>{user.pais || 'No especificado'}</div>
        </div>
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Teléfono Celular</span>
          {user.cel ? (
            <div className={styles.infoValue}>{user.cel}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  style={{ width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  {[...countryCodes]
                    .filter((item, index, self) => index === self.findIndex((t) => t.code === item.code))
                    .sort((a, b) => parseInt(a.code.replace(/\D/g, '')) - parseInt(b.code.replace(/\D/g, '')))
                    .map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Número sin 0 ni 15"
                  style={{ flex: 1, padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              {phoneError && <span style={{ color: 'red', fontSize: '0.9em' }}>{phoneError}</span>}
              <button 
                onClick={handleSavePhone}
                disabled={isSavingPhone}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isSavingPhone ? 'not-allowed' : 'pointer',
                  width: 'fit-content'
                }}
              >
                {isSavingPhone ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          )}
        </div>
        
        <div className={styles.infoCard}>
          <span className={styles.infoLabel}>Suscripción a Correos (Newsletter)</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
              <input 
                type="checkbox" 
                checked={newsletter} 
                onChange={handleToggleNewsletter} 
                disabled={isSavingNewsletter}
                style={{ width: '20px', height: '20px', cursor: isSavingNewsletter ? 'wait' : 'pointer' }}
              />
              <span style={{ color: newsletter ? '#4CAF50' : '#888', fontWeight: 'bold' }}>
                {newsletter ? 'Activado (Recibirás novedades)' : 'Desactivado (No recibirás correos)'}
              </span>
            </label>
            {isSavingNewsletter && <span style={{fontSize: '0.85rem', color: '#a0a6b8'}}>Guardando...</span>}
          </div>
        </div>


        {/* Sección Streamers */}
        {(user?.is_streamer == 1 || user?.is_streamer === true || user?.is_streamer === '1' || admin || superAdmin) && (
          <div className={styles.infoCard} style={{ border: '1px solid #7b61ff' }}>
            <span className={styles.infoLabel} style={{ color: '#7b61ff' }}>Panel de Streamer (Publicidad GP)</span>
            <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '10px 0' }}>
              Vincula tu cuenta de Twitch para permitir que el mensaje de publicidad se envíe a tu chat en tu nombre cuando se muestre el anuncio en tu OBS.
            </p>
            <button 
              onClick={() => {
                const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                window.location.href = `https://api.guiadeparche.com/publicidad/twitch_streamer_oauth.php?login=1&user_email=${user.email}${isLocal ? '&local=1' : ''}`;
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#9146FF',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: 'fit-content'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
              </svg>
              Vincular con Twitch
            </button>
            {window.location.search.includes('twitch_linked=success') && (
              <span style={{ color: '#4CAF50', fontSize: '0.9rem', display: 'block', marginTop: '8px', fontWeight: 'bold' }}>
                ¡Cuenta de Twitch vinculada correctamente!
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );

  const renderMasterPlan = () => {
    const isMasterPlanActive = user?.master_plan == 1 || user?.master_plan === true || user?.master_plan === '1';
    
    return (
      <div className={styles.tabContent}>
        <div className={styles.contentHeader}>
          <h2>TFT Master Plan</h2>
          <p>Estado: {isMasterPlanActive ? '✅ Activo' : '✅ Pre-registrado'}</p>
        </div>
        <p>Beneficios {isMasterPlanActive ? 'activos' : 'exclusivos'}:</p>
        <ul>
          {isMasterPlanActive ? (
            activePlanFeatures.length > 0 ? (
              activePlanFeatures.map((feat, idx) => (
                <li key={idx} style={{marginBottom: "0px"}}>{feat}</li>
              ))
            ) : (
              <>
                <li>Acceso completo a composiciones premium</li>
                <li>Filtros avanzados en la Tier List</li>
                <li>Prioridad en actualizaciones del Meta</li>
                <li>Rol exclusivo en nuestro servidor de Discord VIP</li>
              </>
            )
          ) : (
            <>
              <li>Acceso anticipado a herramientas de TFT</li>
              <li>Notificación prioritaria de lanzamiento</li>
              <li>Ofertas exclusivas de lanzamiento para miembros</li>
              <li>Actualizaciones y noticias del proyecto</li>
            </>
          )}
        </ul>

        {/* Sección Discord */}
        <div className={styles.infoCard} style={{ border: '1px solid #5865F2', marginTop: '30px' }}>
          <span className={styles.infoLabel} style={{ color: '#5865F2' }}>Comunidad de Discord</span>
          <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '10px 0' }}>
            Vincula tu cuenta de Discord. Si tienes una suscripción activa a Master Plan, recibirás automáticamente un rol exclusivo en nuestro servidor.
          </p>
          <button 
            onClick={() => {
              const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
              window.location.href = `https://api.guiadeparche.com/discord/discord_oauth.php?login=1&user_email=${user.email}${isLocal ? '&local=1' : ''}`;
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#5865F2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: 'fit-content'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
            </svg>
            Vincular con Discord
          </button>
          {window.location.search.includes('discord_linked=success') && (
            <span style={{ color: '#4CAF50', fontSize: '0.9rem', display: 'block', marginTop: '8px', fontWeight: 'bold' }}>
              ¡Cuenta de Discord vinculada correctamente!
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderRiotAccount = () => (
    <div className={styles.tabContent}>
      <div className={styles.contentHeader}>
        <h2>Conexión con Riot Games</h2>
        <p>Sincroniza tus estadísticas de juego, ELO y perfil de invocador.</p>
      </div>
      <div className={styles.riotConnect}>
        {/* Ejemplo de cuando NO está conectada */}
        <svg className={styles.riotLogo} viewBox="0 0 24 24" fill="#d13639"><path d="M12.44 5c.44.17.65.65.48 1.09l-1.4 3.65h3.65c.44 0 .8.36.8.8 0 .44-.36.8-.8.8H11.5l3.22 8.35c.17.44-.04.92-.48 1.09-.44.17-.92-.04-1.09-.48L10 12.43 6.78 20.3c-.17.44-.65.65-1.09.48-.44-.17-.65-.65-.48-1.09L8.5 11.34H4.85c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8h3.65l-3.22-8.35c-.17-.44.04-.92.48-1.09.44-.17.92.04 1.09.48L10 7.57l3.22-7.87c.17-.44.65-.65 1.09-.48z" /></svg>
        <h3>Vincula tu cuenta para ver tu ELO</h3>
        <p>Al conectar tu cuenta de Riot Games, podremos mostrar tu rango actual, campeones más jugados y estadísticas en tiempo real.</p>
        <button className={styles.connectBtn}>CONECTAR CON RIOT GAMES</button>

        <div className={styles.infoCard} style={{ marginTop: '40px', width: '100%', opacity: 0.6 }}>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Próximamente: Visualización de perfil Pro (Nivel, Emblemas, Historial).</p>
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
            <AdminPanel />
          </Suspense>
        )}
        {activeTab === 'logout' && <p>Cerrando sesión...</p>}
      </main>
    </div>
  );
};

export default PerfilUsuario;