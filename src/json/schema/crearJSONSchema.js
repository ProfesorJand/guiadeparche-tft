export function crearJSONSchema({title}){
    //const dateModified = new Date().toISOString();
    return {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "datePublished": "2024-07-26T12:00-00Z",
        "dateModified": "2024-07-26T12:30-00Z",
        "author": {
          "@type": "Person",
          "name": "Jupeson, Profesorjand"
        }
      };
}