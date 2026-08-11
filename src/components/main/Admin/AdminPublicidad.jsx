import React, { useState, useEffect } from 'react';
import style from './css/AdminPublicidad.module.css';

const API_URL = 'https://api.guiadeparche.com/publicidad/publicidad_api.php'; // Cambiar por tu URL de API real o ruta relativa /scripts/api/publicidad_api.php si está en el mismo dominio

export default function AdminPublicidad() {
    const [tab, setTab] = useState('campaigns'); // campaigns, users, bot

    return (
        <div className={style.container}>
            <h2>Gestión de Publicidad (OBS)</h2>
            <div className={style.tabs}>
                <button className={tab === 'campaigns' ? style.active : ''} onClick={() => setTab('campaigns')}>Campañas</button>
                <button className={tab === 'users' ? style.active : ''} onClick={() => setTab('users')}>Usuarios (Streamers)</button>
                <button className={tab === 'stats' ? style.active : ''} onClick={() => setTab('stats')}>Estadísticas</button>
                <button className={tab === 'bot' ? style.active : ''} onClick={() => setTab('bot')}>Configuración Bot</button>
            </div>

            <div className={style.content}>
                {tab === 'campaigns' && <CampaignsManager />}
                {tab === 'users' && <UsersManager />}
                {tab === 'stats' && <StatsDashboard />}
                {tab === 'bot' && <BotConfig />}
            </div>
        </div>
    );
}

function CampaignsManager() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', media_url: '', chat_message: '', interval_minutes: 15, is_active: 1 });
    const [mediaFile, setMediaFile] = useState(null);

    useEffect(() => { loadCampaigns(); }, []);

    const loadCampaigns = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}?action=campaigns`);
            const data = await res.json();
            if (data.status === 'success') setCampaigns(data.data);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('chat_message', form.chat_message);
            formData.append('interval_minutes', form.interval_minutes);
            formData.append('is_active', form.is_active);
            if (form.id) formData.append('id', form.id);
            
            if (mediaFile) {
                formData.append('media_file', mediaFile);
            } else {
                formData.append('media_url', form.media_url);
            }

            await fetch(`${API_URL}?action=campaigns`, {
                method: 'POST',
                body: formData // No seteamos Content-Type, fetch lo hace automático con FormData
            });
            setForm({ name: '', media_url: '', chat_message: '', interval_minutes: 15, is_active: 1 });
            setMediaFile(null);
            loadCampaigns();
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar campaña?')) return;
        try {
            await fetch(`${API_URL}?action=campaigns`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            loadCampaigns();
        } catch (e) { console.error(e); }
    };

    return (
        <div>
            <h3>Crear/Editar Campaña</h3>
            <form onSubmit={handleSubmit} className={style.form}>
                <input type="text" placeholder="Nombre (ej. RedBull)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                
                <div style={{border: '1px solid #555', padding: '10px', borderRadius: '4px'}}>
                    <label style={{display: 'block', marginBottom: '5px'}}><strong>Opción 1: Subir Archivo (Video o Imagen)</strong></label>
                    <input type="file" accept="image/*,video/*" onChange={e => setMediaFile(e.target.files[0])} />
                    
                    <label style={{display: 'block', margin: '10px 0 5px'}}><strong>Opción 2: Pegar URL externa (Si no subes archivo)</strong></label>
                    <input type="text" placeholder="URL de Imagen o Video (https://...)" value={form.media_url} onChange={e => setForm({...form, media_url: e.target.value})} style={{width: '95%'}} />
                </div>

                <textarea placeholder="Mensaje para el chat (Opcional)" value={form.chat_message} onChange={e => setForm({...form, chat_message: e.target.value})} />
                <label>
                    Intervalo en minutos (cada cuánto se muestra en el stream):
                    <input type="number" min="1" value={form.interval_minutes} onChange={e => setForm({...form, interval_minutes: e.target.value})} required />
                </label>
                <button type="submit">Guardar Campaña</button>
            </form>

            <h3>Lista de Campañas</h3>
            {loading ? <p>Cargando...</p> : (
                <table className={style.table}>
                    <thead>
                        <tr><th>ID</th><th>Nombre</th><th>Intervalo</th><th>Mensaje</th><th>Acciones</th></tr>
                    </thead>
                    <tbody>
                        {campaigns.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.interval_minutes} min</td>
                                <td>{c.chat_message}</td>
                                <td>
                                    <button onClick={() => setForm(c)}>Editar</button>
                                    <button onClick={() => handleDelete(c.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

function UsersManager() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ alias: '', twitch_channel: '', youtube_channel_id: '', kick_channel: '' });

    useEffect(() => { loadUsers(); }, []);

    const loadUsers = async () => {
        try {
            const res = await fetch(`${API_URL}?action=users`);
            const data = await res.json();
            if (data.status === 'success') setUsers(data.data);
        } catch (e) { console.error(e); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}?action=users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            setForm({ alias: '', twitch_channel: '', youtube_channel_id: '', kick_channel: '' });
            loadUsers();
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar usuario?')) return;
        try {
            await fetch(`${API_URL}?action=users`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            loadUsers();
        } catch (e) { console.error(e); }
    };

    const generateURL = (alias) => {
        // Asumiendo que el overlay estará en guiadeparche.com/publicidad/overlay
        const url = `https://guiadeparche.com/publicidad/overlay?alias=${alias}&camp=ID_CAMPAÑA`;
        navigator.clipboard.writeText(url);
        alert(`URL copiada al portapapeles. Recuerda cambiar ID_CAMPAÑA por el ID real de la campaña que le asignes.\n\n${url}`);
    };

    return (
        <div>
            <h3>Registrar Streamer (PublicityUser)</h3>
            <form onSubmit={handleSubmit} className={style.form}>
                <input type="text" placeholder="Alias (Único, ej. relic)" value={form.alias} onChange={e => setForm({...form, alias: e.target.value.toLowerCase().replace(/\s+/g, '')})} required />
                <input type="text" placeholder="Canal de Twitch (ej. relic_lol)" value={form.twitch_channel} onChange={e => setForm({...form, twitch_channel: e.target.value})} />
                <input type="text" placeholder="Canal/ID de YouTube" value={form.youtube_channel_id} onChange={e => setForm({...form, youtube_channel_id: e.target.value})} />
                <input type="text" placeholder="Canal de Kick" value={form.kick_channel} onChange={e => setForm({...form, kick_channel: e.target.value})} />
                <button type="submit">Guardar Streamer</button>
            </form>

            <h3>Streamers Registrados</h3>
            <table className={style.table}>
                <thead>
                    <tr><th>ID</th><th>Alias</th><th>Plataformas</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.alias}</td>
                            <td>
                                {u.twitch_channel && `Twitch `}
                                {u.youtube_channel_id && `YouTube `}
                                {u.kick_channel && `Kick`}
                            </td>
                            <td>
                                <button onClick={() => setForm(u)}>Editar</button>
                                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                                <button onClick={() => generateURL(u.alias)}>Copiar Link OBS</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StatsDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}?action=stats`).then(r => r.json()).then(data => {
            if(data.status === 'success') setStats(data.data);
        });
    }, []);

    if (!stats) return <p>Cargando métricas...</p>;

    return (
        <div>
            <h3>Resumen Global</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ background: '#333', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                    <h2 style={{margin: '0', color: '#007bff'}}>{stats.general.total_impressions || 0}</h2>
                    <p>Total de Publicidades mostradas</p>
                </div>
                <div style={{ background: '#333', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                    <h2 style={{margin: '0', color: '#28a745'}}>{stats.general.total_sessions || 0}</h2>
                    <p>Sesiones de Streaming registradas</p>
                </div>
                <div style={{ background: '#333', padding: '15px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
                    <h2 style={{margin: '0', color: '#ffc107'}}>{stats.general.peak_viewers || 0}</h2>
                    <p>Pico máximo histórico de Viewers (Twitch)</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h3>Métricas por Campaña</h3>
                    <table className={style.table}>
                        <thead><tr><th>Campaña</th><th>Impresiones Totales</th><th>Pico de Viewers</th></tr></thead>
                        <tbody>
                            {stats.campaigns.map((c, i) => (
                                <tr key={i}><td>{c.name}</td><td>{c.impressions}</td><td>{c.peak_viewers || 0}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ flex: 1 }}>
                    <h3>Métricas por Streamer</h3>
                    <table className={style.table}>
                        <thead><tr><th>Streamer (Alias)</th><th>Impresiones Totales</th><th>Pico de Viewers</th></tr></thead>
                        <tbody>
                            {stats.streamers.map((s, i) => (
                                <tr key={i}><td>{s.alias}</td><td>{s.impressions}</td><td>{s.peak_viewers || 0}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <h3>Últimas 15 Impresiones (Tiempo real)</h3>
            <table className={style.table}>
                <thead><tr><th>Fecha/Hora</th><th>Streamer</th><th>Campaña</th><th>Viewers Simultáneos</th></tr></thead>
                <tbody>
                    {stats.recent.map((r, i) => (
                        <tr key={i}>
                            <td>{new Date(r.timestamp).toLocaleString()}</td>
                            <td>{r.streamer}</td>
                            <td>{r.campaign}</td>
                            <td>{r.twitch_viewers} <span style={{fontSize:'0.8em', color:'#aaa'}}>{r.twitch_viewers == 999 ? '(Prueba)' : ''}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function BotConfig() {
    const [form, setForm] = useState({ bot_type: 'twitch_admin', client_id: '', client_secret: '', access_token: '' });

    useEffect(() => {
        fetch(`${API_URL}?action=bot_config`).then(r => r.json()).then(data => {
            if (data.status === 'success' && data.data) {
                setForm(data.data);
            }
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}?action=bot_config`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.status === 'success') {
                alert('Configuración de Bot guardada exitosamente. ¡Asegúrate de Autorizar a Twitch ahora!');
            } else {
                alert('Error al guardar: ' + data.message);
            }
        } catch (e) { 
            console.error(e);
            alert('Error de red al intentar guardar la configuración.');
        }
    };

    const handleAuthTwitch = () => {
        if (!form.client_id || !form.client_secret) {
            alert('Primero guarda tu Client ID y Client Secret.');
            return;
        }
        // Redirigir a nuestro script de auth
        window.open('https://api.guiadeparche.com/publicidad/twitch_oauth.php', '_blank');
    };

    return (
        <div>
            <h3>Configuración del Bot de Chat</h3>
            <div className={style.warnings}>
                <p><strong>⚠️ Autorización Twitch:</strong> Crea tu App en <code>dev.twitch.tv</code> (Confidencial). Coloca la URL <code>https://api.guiadeparche.com/publicidad/twitch_oauth.php</code> en los Redirect URIs de Twitch. Pega aquí el Client ID y Client Secret, dale a Guardar, y luego presiona "Autorizar Bot en Twitch".</p>
                <p><strong>⚠️ Estado Actual:</strong> {form.access_token ? "✅ Bot Autorizado (Token guardado)" : "❌ Faltan Tokens"}</p>
            </div>
            
            <form onSubmit={handleSubmit} className={style.form}>
                <label>Tipo de Bot:
                    <select value={form.bot_type} onChange={e => setForm({...form, bot_type: e.target.value})}>
                        <option value="twitch_admin">Bot Global Propio (Recomendado)</option>
                    </select>
                </label>
                <input type="text" placeholder="Client ID (Obtenido en dev.twitch.tv)" value={form.client_id || ''} onChange={e => setForm({...form, client_id: e.target.value})} required />
                <input type="password" placeholder="Client Secret" value={form.client_secret || ''} onChange={e => setForm({...form, client_secret: e.target.value})} required />
                <button type="submit">1. Guardar Configuración</button>
            </form>

            <button onClick={handleAuthTwitch} style={{background: '#6441a5', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px'}}>
                2. Autorizar Bot en Twitch
            </button>
        </div>
    );
}
