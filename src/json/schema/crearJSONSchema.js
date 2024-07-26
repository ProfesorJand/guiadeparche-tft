import logo from "src/assets/GP_logo.png"

export function crearJSONSchema({title, imgPost}){
    //const dateModified = new Date().toISOString();
    return JSON.stringify({
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "datePublished": "2024-07-26T12:00-00Z",
        "dateModified": "2024-07-26T12:30-00Z",
        "image":imgPost ? imgPost : logo,
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