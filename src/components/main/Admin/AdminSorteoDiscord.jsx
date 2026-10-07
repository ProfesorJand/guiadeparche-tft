import React, { useState } from "react";

const AdminSorteoDiscord = () => {
    const [message, setMessage] = useState("¡Felicidades [GANADOR]! Has ganado el sorteo del Master Plan.");
    const [loading, setLoading] = useState(false);
    const [resultMsg, setResultMsg] = useState("");

    const handleSorteo = async () => {
        if (!confirm("¿Estás seguro de realizar el sorteo ahora mismo?")) return;
        
        setLoading(true);
        setResultMsg("Realizando sorteo...");
        try {
            const response = await fetch('https://api.guiadeparche.com/discord/sorteo_discord.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: message,
                    // Si tienes roles que quieres excluir, pon sus IDs aquí. Por ejemplo, roles de admin o bot.
                    excludeRoles: ["1544111486526562356", "1544112562994679838", "1544113558445367296", "1544937851106496542"] 
                })
            });
            const result = await response.json();
            
            if (result.status === 'success') {
                setResultMsg(`¡Sorteo finalizado! El ganador fue: ${result.winner_username}. El mensaje fue enviado a Discord.`);
            } else {
                setResultMsg(`Error: ${result.message}`);
                console.error(result.discord_error);
            }
        } catch (e) {
            setResultMsg("Error de red al intentar realizar el sorteo.");
        }
        setLoading(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', marginTop:"20px" }}>
            <h2 style={{ color: '#fff' }}>Sorteo de Discord</h2>
            <p style={{ color: '#aaa', margin: 0 }}>
                Este botón obtendrá a todos los miembros de tu servidor de Discord, elegirá a uno al azar y enviará este mensaje mencionándolo.
                Asegúrate de dejar la palabra <strong>[GANADOR]</strong> en el texto para que el sistema la reemplace por la mención del usuario ganador.
            </p>
            
            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #444',
                    background: '#1e1f22',
                    color: '#fff',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                }}
            />
            
            <button 
                onClick={handleSorteo}
                disabled={loading}
                style={{
                    backgroundColor: '#5865F2',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    marginTop: '10px',
                    opacity: loading ? 0.7 : 1
                }}
            >
                {loading ? "Sorteando..." : "Realizar Sorteo"}
            </button>

            {resultMsg && (
                <div style={{
                    marginTop: '15px',
                    padding: '15px',
                    backgroundColor: resultMsg.includes('Error') ? 'rgba(255,0,0,0.2)' : 'rgba(0,255,0,0.2)',
                    borderLeft: `4px solid ${resultMsg.includes('Error') ? '#ff4444' : '#00C851'}`,
                    color: '#fff',
                    borderRadius: '4px'
                }}>
                    {resultMsg}
                </div>
            )}
        </div>
    );
};

export default AdminSorteoDiscord;
