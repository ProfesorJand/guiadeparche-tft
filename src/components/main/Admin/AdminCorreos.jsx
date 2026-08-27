import React, { useState } from 'react';
import style from './css/AdminCorreos.module.css';

export default function AdminCorreos() {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState("");
    const [testUser, setTestUser] = useState({ nombre: "", email: "", pais: "Argentina" });

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
        if (!confirm("⚠️ ADVERTENCIA: Esto enviará el correo a 50 usuarios reales de Argentina.\n¿Estás completamente seguro de continuar?")) return;
        setLoading(true);
        setLogs("Ejecutando script de envío (Lote de 50 correos)...\nEsto puede tardar unos segundos por las pausas antispam.\n\n");
        try {
            const res = await fetch('https://api.guiadeparche.com/tft/correos/enviar_correo_html.php');
            const text = await res.text();
            setLogs(prev => prev + text);
        } catch (e) {
            setLogs(prev => prev + "\nError de red al intentar enviar: " + e.message);
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
                    {loading ? "Ejecutando..." : "🚀 Enviar Siguiente Lote (50 usuarios Reales)"}
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
