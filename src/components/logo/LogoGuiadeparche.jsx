import style from "./css/LogoGuiadeparche.module.css"
const LogoGuiadeparche = ({mostrarTexto, alignTexto = "left"})=>{
  return(
      <img
       className={style.textoGuiadeparche}
       src="/web/logoGPSinFondo2026.webp"
      ></img>
  )
}

export default LogoGuiadeparche;