import React, { useState } from 'react';
import style from './css/AdminCorreos.module.css';

export default function AdminCorreos() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState("");
    const [testUser, setTestUser] = useState({ nombre: "", email: "", pais: "Argentina" });
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [incluirMp, setIncluirMp] = useState(false);

    React.useEffect(() => {
        // Asumiendo que listar_templates.php está en /templates_html/ en GoDaddy
        fetch('https://api.guiadeparche.com/tft/templates_html/listar_templates.php')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTemplates(data);
                    if (data.length > 0) setSelectedTemplate(data[0]);
                }
            })
            .catch(e => console.error("Error cargando templates:", e));
    }, []);

    const sendTestEmail = async () => {
        if (!testUser.nombre || !testUser.email) {
            if (!confirm("No has ingresado nombre/correo. Se enviará a los usuarios por defecto (Juan y Jorge). ¿Continuar?")) return;
        }
        setLoading(true);
        setLogs("Enviando correo de prueba...\n");
        try {
            const res = await fetch('https://api.guiadeparche.com/tft/correos/prueba_correo_html.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testUser)
            });
            const text = await res.text();
            setLogs(prev => prev + text);
        } catch (e) {
            setLogs(prev => prev + "\nError de red al intentar enviar: " + e.message);
        }
        setLoading(false);
    };

    const sendBatchEmail = async () => {
        if (!selectedTemplate) {
            alert("Por favor selecciona una plantilla HTML primero.");
            return;
        }
        if (!confirm(`⚠️ ADVERTENCIA: Esto iniciará el envío automático de la plantilla '${selectedTemplate}' a TODOS los usuarios pendientes de Argentina.\nEl proceso se hará en lotes de 50 para proteger el servidor.\n¿Estás completamente seguro de continuar?`)) return;
        
        setLoading(true);
        setLogs(`Iniciando envío automático por lotes...\nPlantilla: ${selectedTemplate}\nIncluir usuarios con Master Plan: ${incluirMp ? 'Sí' : 'No'}\n\n`);
        
        let quedanUsuarios = true;
        let loteNum = 1;

        while (quedanUsuarios) {
            setLogs(prev => prev + `\n--- Iniciando Lote #${loteNum} ---\n`);
            
            try {
                const res = await fetch('https://api.guiadeparche.com/tft/correos/enviar_correo_html.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        template: selectedTemplate,
                        incluir_mp: incluirMp
                    })
                });
                const text = await res.text();
                setLogs(prev => prev + text);

                // Comprobar si el script devolvió que ya no hay usuarios o si hubo un error de PHP
                if (text.includes("No hay usuarios pendientes") || text.includes("Total procesados en este lote: 0") || text.includes("Error:")) {
                    quedanUsuarios = false;
                    if (text.includes("Error:")) {
                        setLogs(prev => prev + "\n\n❌ El proceso se detuvo porque ocurrió un error en el servidor PHP.");
                    } else {
                        setLogs(prev => prev + "\n\n✅ ¡Envío masivo completado! Todos los correos han sido enviados.");
                    }
                } else {
                    loteNum++;
                    setLogs(prev => prev + "\nEsperando 10 segundos antes de enviar el siguiente lote para proteger el servidor...\n");
                    // Esperar 10 segundos antes de enviar el siguiente lote de 50
                    await new Promise(resolve => setTimeout(resolve, 10000));
                }
            } catch (e) {
                setLogs(prev => prev + "\nError de red al intentar enviar: " + e.message);
                quedanUsuarios = false; // Detener en caso de error grave
            }
        }
        
        setLoading(false);
    };

    const clearLogs = () => {
        setLogs("");
    };

    return (
        <div className={style.container}>
            <h2>Gestión de Correos y Newsletters</h2>
            <p>Desde aquí puedes disparar los scripts de envío alojados en tu servidor.</p>
            
            <div className={style.testForm}>
                <h3>Enviar Prueba Personalizada</h3>
                <p>Déjalo vacío para enviar a Juan y Jorge por defecto.</p>
                <div className={style.formGroupRow}>
                    <input type="text" placeholder="Nombre" value={testUser.nombre} onChange={e => setTestUser({...testUser, nombre: e.target.value})} />
                    <input type="email" placeholder="Correo Electrónico" value={testUser.email} onChange={e => setTestUser({...testUser, email: e.target.value})} />
                    <input type="text" placeholder="País" value={testUser.pais} onChange={e => setTestUser({...testUser, pais: e.target.value})} />
                </div>
            </div>

            <div className={style.testForm} style={{ marginTop: '20px' }}>
                <h3>Opciones de Campaña Masiva</h3>
                <p>Configura a quién y qué enviar antes de disparar el lote de correos reales.</p>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Plantilla HTML:</label>
                        <select 
                            value={selectedTemplate} 
                            onChange={e => setSelectedTemplate(e.target.value)}
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)', color: 'white', minWidth: '280px', fontSize: '1rem' }}
                        >
                            {templates.length === 0 ? <option value="">Cargando plantillas...</option> : null}
                            {templates.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '25px' }}>
                        <input 
                            type="checkbox" 
                            id="incluir_mp"
                            checked={incluirMp} 
                            onChange={e => setIncluirMp(e.target.checked)} 
                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                        />
                        <label htmlFor="incluir_mp" style={{ cursor: 'pointer', fontSize: '1rem', color: '#ffb800', fontWeight: 'bold' }}>
                            Incluir usuarios que YA compraron el Master Plan
                        </label>
                    </div>
                </div>
            </div>

            <div className={style.buttonContainer}>
                <button 
                    className={style.btnTest} 
                    onClick={sendTestEmail} 
                    disabled={loading}
                >
                    {loading ? "Ejecutando..." : "📨 Enviar Correo de Prueba"}
                </button>
                
                <button 
                    className={style.btnReal} 
                    onClick={sendBatchEmail} 
                    disabled={loading}
                >
                    {loading ? "Enviando Lotes..." : "🚀 Iniciar Envío Masivo Automático"}
                </button>
            </div>

            <div className={style.consoleContainer}>
                <div className={style.consoleHeader}>
                    <span>Registro del Servidor (Output)</span>
                    <button className={style.btnClear} onClick={clearLogs}>Limpiar</button>
                </div>
                <div 
                    className={style.consoleOutput} 
                    dangerouslySetInnerHTML={{ __html: logs || "Esperando acción..." }} 
                />
            </div>
        </div>
    );
}
