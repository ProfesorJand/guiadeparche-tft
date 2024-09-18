import logo from "src/assets/GP_logo.png";
import { JSDOM } from 'jsdom'; // Importamos jsdom para manipular el DOM en el servidor

async function obtenerImagenDinamica(urlImagePost) {
    try {
        // Recuperamos la página HTML
        const respuesta = await fetch(urlImagePost);
        const textoHTML = await respuesta.text();

        // Usamos jsdom para parsear el HTML
        const dom = new JSDOM(textoHTML);
        const document = dom.window.document;

        // Busca la primera imagen que esté visible en la página
        const firstImgElement = document.querySelector('img');

        // Si existe una imagen, retornamos su URL
        if (firstImgElement) {
            return firstImgElement.src;
        }

        // Si no se encuentra ninguna imagen visible, retornamos un valor por defecto
        return logo.src;
    } catch (error) {
        return logo.src; // Si hay un error, devolvemos una imagen por defecto
    }
}

export async  function crearJSONSchema({title, thumbnail = logo.src, urlImagePost}){
    const imgPost = await obtenerImagenDinamica(urlImagePost); // Esperamos a obtener la imagen
    return JSON.stringify({
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "datePublished": "2024-07-26T12:00-00Z",
        "dateModified": new Date().toISOString(),
        "image":imgPost,
        "thumbnailUrl":thumbnail,
        "author": [
            {
                "@type": "Person",
                "name": "Juan Pedro",
                "familyName":"Andrade",
                "alternateName":"Jupeson"

            },
            {
                "@type": "Person",
                "name": "Jorge Luis",
                "familyName":"Andrade",
                "alternateName":"Profesorjand"
            }
        ]
      });
}