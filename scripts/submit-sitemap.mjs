import { google } from 'googleapis';

const credentialsJson = process.env.GCP_SERVICE_ACCOUNT_KEY;

if (!credentialsJson) {
  console.error("❌ Faltan las credenciales. Configura GCP_SERVICE_ACCOUNT_KEY en GitHub Secrets.");
  process.exit(1);
}

let credentials;
try {
  credentials = JSON.parse(credentialsJson);
} catch (e) {
  console.error("❌ El secreto GCP_SERVICE_ACCOUNT_KEY no tiene formato JSON válido.");
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/webmasters'],
});

const searchconsole = google.webmasters({
  version: 'v3',
  auth,
});

async function submitSitemap() {
  // Asegúrate de que siteUrl coincida exactamente con cómo tienes la propiedad en GSC
  // Como me dijiste que es https://guiadeparche.com, se requiere la barra al final (trailing slash) para propiedades de prefijo de URL.
  const siteUrl = 'https://guiadeparche.com/'; 
  const feedpath = 'https://guiadeparche.com/sitemap-index.xml';

  try {
    console.log(`Enviando notificación de sitemap a Google Search Console...`);
    console.log(`Sitio: ${siteUrl}`);
    console.log(`Sitemap: ${feedpath}`);
    
    await searchconsole.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: feedpath
    });

    console.log("✅ ¡Sitemap notificado y enviado con éxito a Google Search Console!");
  } catch (error) {
    console.error("❌ Error al notificar el sitemap a Google:");
    if (error.response && error.response.data && error.response.data.error) {
      console.error(error.response.data.error.message);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

submitSitemap();
