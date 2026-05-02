import logo from "src/assets/GP_logo.png";

export function crearJSONSchema({title, thumbnail = logo.src, imgPost = logo.src, description}){
    return JSON.stringify({
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "datePublished": "2024-07-26T12:00-00Z",
        "dateModified": new Date().toISOString(),
        "image":imgPost,
        "thumbnailUrl":thumbnail,
        "description":description,
        "author": [
            {
                "@type": "Person",
                "name": "Juan Pedro",
                "familyName":"Andrade",
                "alternateName":"Jupeson",
                "sameAs":[
                    "https://youtube.com/@jupeson",
                    "https://twitch.tv/jupeson",
                    "https://tiktok.com/@jupeson",
                    "https://liquipedia.net/tft/Jupeson",
                    "https://instagram.com/jupeson/",
                    "https://x.com/jupeson",
                    "https://facebook.com/jupesongaming"
                ]

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