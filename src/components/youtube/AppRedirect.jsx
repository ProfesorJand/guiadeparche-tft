import { useEffect, useState } from "react";
import style from "./AppRedirect.module.css";

const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const AppRedirect = () => {
  const [youtube, setYoutube] = useState(null);
  const [youtubePerfil, setYoutubePerfil] = useState(null);
  const [twitch, setTwitch] = useState(null);
  const [appUrl, setAppUrl] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const TwitchLogo = "https://images.seeklogo.com/logo-png/27/2/twitch-logo-png_seeklogo-274042.png"
  const YoutubeLogo = "https://img.icons8.com/?size=100&id=19318&format=png&color=000000"
  const NavegadorLogo = "https://cdn.pixabay.com/photo/2015/05/19/07/44/browser-773215_640.png"
  useEffect(() => {
    // Si no llegaron por props, intenta obtenerlos desde la URL
    const params = new URLSearchParams(window.location.search);
    const yt = params.get("youtube");
    const ytPerfil = params.get("ytPerfil")
    const tw = params.get("twitch");
    
    if(!yt && !tw && !ytPerfil){
      return window.location.href = `https://tft.guiadeparche.com`
    }
    if(!isMobileDevice()){
      if(yt){
        return window.location.href = `https://www.youtube.com/watch?v=${yt}`
      }
      if(ytPerfil){
        return window.location.href = `https://www.youtube.com/@${ytPerfil}`
      }
      if(tw){
        return window.location.href = `https://www.twitch.tv/${tw}`
      }

    }
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const inInstagram = /Instagram/i.test(navigator.userAgent);

    if (isiOS && inInstagram) {
      alert("Para abrir la app de Twitch, toca el ícono de los 3 puntos arriba a la derecha y selecciona 'Abrir en Safari'.");
    }
    setYoutube(yt);
    setTwitch(tw);
    setYoutubePerfil(ytPerfil)
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    if(!youtube && !twitch && !youtubePerfil ){
      setWebUrl("https://tft.guiadeparche.com");
      console.error("Ruta no valida, parametros inválidos");
      return; 
    }
    
    if (youtube) {
      if(!isMobile){
        return window.location.href = `https://www.youtube.com/watch?v=${youtube}`
      }
      setAppUrl(`vnd.youtube://${youtube}`);
      setWebUrl(`https://www.youtube.com/watch?v=${youtube}`);
    }else if (youtubePerfil){
      if(!isMobile){
        return window.location.href = `https://www.youtube.com/@${youtubePerfil}`
      }
      setAppUrl(`vnd.youtube://user/${youtubePerfil}`);
      setWebUrl(`https://www.youtube.com/@${youtube}`);
    } else if (twitch) {
      if(!isMobile){
        return window.location.href = `https://www.twitch.tv/${twitch}`
      }
      //appUrl = `twitch://stream/${channel}`;
      setAppUrl(`twitch://stream/${twitch}`);
      setWebUrl(`https://www.twitch.tv/${twitch}`);
    }

    
  }, [youtube, twitch, isMobile]);

  function openApp(){
    return window.location.href = appUrl
  }
  function openWeb(){
    return window.location.href = webUrl
  }

  return (

    <div className={style.containerButtons}>
     {isMobile &&
     <button
      className={style.button}
      onClick={()=> openApp()}
      >
        <img
          src={youtube ? YoutubeLogo : TwitchLogo}
          className={style.logo}
          />
        APP
      </button>
      }
      {/* <button
        className={style.button}
        onClick={()=> openWeb()}
        >
        <img
          src={NavegadorLogo}
          className={style.logo}
          />
        WEB
      </button> */}
      <p>Selecciona donde abrir <span className={style.txtPlataforma}>{youtube ? "YouTube" : "Twitch"}</span></p>
    </div>
  );
};

export default AppRedirect;