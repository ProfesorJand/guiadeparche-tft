const logoUrl = "https://guiadeparche.com/web/logoGP2026.webp"

export function crearJSONSchema({title, thumbnail = logoUrl, imgPost = logoUrl, description}){
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "datePublished": "2024-07-26T12:00-00Z",
    "dateModified": new Date().toISOString(),
    "image":imgPost,
    "thumbnailUrl":thumbnail,
    "description":Array.isArray(description) ? description[0] : description,
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