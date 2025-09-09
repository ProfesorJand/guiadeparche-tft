export const URL_CONSTANTES_VALORANT = "https://api.guiadeparche.com/val/constantes.php"
export const URL_CONSTANTES_DOTA2 = "https://api.guiadeparche.com/dota-2/constantes.php"
export const URL_CONSTANTES_LOL = "https://api.guiadeparche.com/lol/constantes.php"
export const URL_CONSTANTES_TFT = "https://api.guiadeparche.com/tft/constantes.php"
export const URL_CONSTANTES_Wild_RIFT = "https://api.guiadeparche.com/wildrift/constantes.php"

export const saveConstantes = async ({key,value, url})=>{
  console.log({key,value,url})
  try{
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.PUBLIC_TOKEN_META}`,
      },
      body: JSON.stringify({key,value}),
    });
    alert(`${key} se ha guardado`)
  }catch(err){
    console.error(`Error saving or updating constantes in ${url}:`, err)
    alert(`${key} NO se ha guardado`)
  }
}