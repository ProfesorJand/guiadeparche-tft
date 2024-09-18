import logo from "src/assets/GP_logo.png";

export function crearJSONSchema({title, thumbnail = logo.src, imgPost = logo.src}){
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