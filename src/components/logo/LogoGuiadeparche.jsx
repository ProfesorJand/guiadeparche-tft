import style from "./css/LogoGuiadeparche.module.css"
const LogoGuiadeparche = ({mostrarTexto, alignTexto = "left", styles})=>{
  return(
    <>
      <img
       className={style.logoGuiadeparche}
       src="/web/logoGPSinFondo2026.webp"
       style={styles}
       ></img>
      {mostrarTexto && <span className={style.textoGuiadeparche}>GUIADEPARCHE.COM</span>}
    </>

  )
}

export default LogoGuiadeparche;