import logo from "src/assets/GP_logo.png";

function obtenerImagenDinamica() {
    // Busca la primera imagen que esté visible en la página
    const imgElement = document.querySelector('img');

    // Si existe una imagen, retornamos su URL
    if (imgElement) {
        return imgElement.src;
    }

    // Si no se encuentra ninguna imagen visible, retornamos un valor por defecto
    return  logo.src;
}

export function crearJSONSchema({title, imgPost = obtenerImagenDinamica(), thumbnail = logo.src}){
    //const dateModified = new Date().toISOString();
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