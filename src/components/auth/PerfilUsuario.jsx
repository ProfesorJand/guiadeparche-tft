import React, { useState } from 'react';
import { $user } from "@stores/auth";
import { useStore } from "@nanostores/react";
import styles from './PerfilUsuario.module.css';

const PerfilUsuario = () => {
    const user = useStore($user);
    console.log({user})
    const [activeTab, setActiveTab] = useState('data');

    if (!user) {
        return (
            <div className={styles.profileContainer}>
                <div className={styles.contentArea}>
                    <h2>No has iniciado sesión</h2>
                    <p>Por favor, ingresa a tu cuenta para ver tu perfil.</p>
                    <button onClick={() => window.location.href = '/login'} className={styles.downloadBtn}>Ir al Login</button>
                </div>
            </div>
        );
    }

    const renderUserData = () => (
        <div className={styles.tabContent}>
            <div className={styles.contentHeader}>
                <h2>Mis Datos</h2>
                <p>Gestiona tu información personal y de cuenta.</p>
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

    const renderGuides = () => (
        <div className={styles.tabContent}>
            <div className={styles.contentHeader}>
                <h2>Guías Estratégicas</h2>
                <p>Descarga las mejores guías en formato PDF para mejorar tu juego.</p>
            </div>
            <div className={styles.guidesGrid}>
                {[
                    { 
                        id: 1,
                        title: 'Meta TFT Set 11',
                        desc: 'Composiciones Tier S y posicionamiento.',
                        size: '2.4 MB',
                        lastUpdate: '2026-04-05',
                        link: 'https://drive.google.com/file/d/1234567890/view?usp=sharing'
                    },
                    { 
                        id: 2, 
                        title: 'Guía de Economía', 
                        desc: 'Aprende a gestionar tu oro como un Pro.', 
                        size: '1.2 MB',
                        lastUpdate: '2026-04-05',
                        link: 'https://drive.google.com/file/d/1234567890/view?usp=sharing'
                    },
                    { 
                        id: 3, 
                        title: 'Objetos y Forja', 
                        desc: 'Combinaciones óptimas para cada campeón.', 
                        size: '3.1 MB',
                        lastUpdate: '2026-04-05',
                        link: 'https://drive.google.com/file/d/1234567890/view?usp=sharing'
                    }
                ].map(guide => (
                    <div key={guide.id} className={styles.guideItem}>
                        <div className={styles.guideInfo}>
                            <h3>{guide.title}</h3>
                            <p>{guide.desc} • {guide.size}</p>
                            <p>Última actualización: {new Date(guide.lastUpdate).toLocaleDateString('es-AR')}</p>
                        </div>
                        <button className={styles.downloadBtn} onClick={() => window.open(guide.link, '_blank')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            Descargar
                        </button>
                    </div>
                ))}
            </div>
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
            {/* Columna Izquierda: Menú */}
            <aside className={styles.sidebar}>
                <div className={styles.profileSummary}>
                    <div className={styles.avatar}>
                        {user.name?.charAt(0)}
                    </div>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userEmail}>{user.email}</div>
                </div>

                <nav className={styles.menu}>
                    <div 
                        className={`${styles.menuItem} ${activeTab === 'data' ? styles.menuItemActive : ''}`}
                        onClick={() => setActiveTab('data')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Mis Datos
                    </div>
                    <div 
                        className={`${styles.menuItem} ${activeTab === 'guides' ? styles.menuItemActive : ''}`}
                        onClick={() => setActiveTab('guides')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        Guías PDF
                    </div>
                    <div 
                        className={`${styles.menuItem} ${activeTab === 'riot' ? styles.menuItemActive : ''}`}
                        onClick={() => setActiveTab('riot')}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        Cuenta de Riot
                    </div>
                </nav>
            </aside>

            {/* Columna Derecha: Contenido */}
            <main className={styles.contentArea}>
                {activeTab === 'data' && renderUserData()}
                {activeTab === 'guides' && renderGuides()}
                {activeTab === 'riot' && renderRiotAccount()}
            </main>
        </div>
    );
};

export default PerfilUsuario;