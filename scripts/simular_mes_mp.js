import https from 'https';
import http from 'http';

// ============================================================================
// SIMULADOR DE PASO DE TIEMPO PARA SUSCRIPCIONES MERCADO PAGO
// ============================================================================
// Este script envía un Webhook simulado a tu servidor PHP.
// Cada vez que lo ejecutes, tu script PHP (webhook_mp.php) creerá que se cobró
// un nuevo mes, incrementará 'cuotas_cobradas' y, si llega a los meses de promo,
// intentará actualizar el precio en Mercado Pago.

// 1. REEMPLAZA ESTO CON LA URL REAL DE TU WEBHOOK EN GODADDY
// Ej: "https://api.guiadeparche.com/tft/mercado_pago_mp/webhook_mp.php"
const WEBHOOK_URL = "https://api.guiadeparche.com/tft/mercado_pago_mp/webhook.php"; // <--- ACTUALIZA ESTO

// 2. OBTÉN ESTE ID DESDE TU BASE DE DATOS O PANEL DE MERCADO PAGO
// Es el ID de una suscripción de prueba real que hayas creado (mp_preapproval_id)
const PREAPPROVAL_ID = process.argv[2];

if (!PREAPPROVAL_ID) {
  console.error("❌ Error: Debes proporcionar el ID de la suscripción (preapproval_id).");
  console.log("Uso: node simular_mes_mp.js <ID_DE_SUSCRIPCION>");
  console.log("Ejemplo: node simular_mes_mp.js 2c9380848f2b1234018f3d5a6b7c0123");
  process.exit(1);
}

const payload = JSON.stringify({
  action: "created",
  application_id: 123456789,
  data: {
    id: PREAPPROVAL_ID
  },
  date_created: new Date().toISOString(),
  id: Math.floor(Math.random() * 1000000000), // ID aleatorio para el evento
  live_mode: false,
  type: "subscription_preapproval",
  user_id: "test_user"
});

const url = new URL(WEBHOOK_URL);
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const reqModule = url.protocol === 'https:' ? https : http;

console.log(`🚀 Enviando Webhook simulado a: ${WEBHOOK_URL}`);
console.log(`📦 ID de Suscripción: ${PREAPPROVAL_ID}`);
console.log(`⏳ Simulando el cobro de un nuevo mes...`);

const req = reqModule.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`\n✅ Respuesta del Servidor (Status: ${res.statusCode}):`);
    try {
      // Intentar parsear como JSON para verlo bonito
      const jsonResponse = JSON.parse(data);
      console.log(JSON.stringify(jsonResponse, null, 2));
    } catch (e) {
      // Si no es JSON, mostrar texto plano
      console.log(data);
    }
    
    if (res.statusCode === 200) {
      console.log("\n🎉 Webhook enviado con éxito. Revisa tu base de datos para ver si 'cuotas_cobradas' aumentó.");
    } else {
      console.log("\n⚠️ El servidor respondió con un error o advertencia.");
    }
  });
});

req.on('error', (e) => {
  console.error(`\n❌ Error al conectar con el servidor: ${e.message}`);
});

req.write(payload);
req.end();
