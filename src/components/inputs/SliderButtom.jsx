import style from "./css/SliderButtom.module.css"
const SliderButtom= ({setLogoMovilnet, logoMovilnet})=>{
return (
  <>
    <span>Logo Movilnet ({logoMovilnet ? "activado": "desactivado"})</span>
    <label className={style.switch}>
      <input type="checkbox" id={"logoMovilnet"} onChange={(e)=>{setLogoMovilnet(e.target.checked)}} value={logoMovilnet} className={style.inputText} checked={logoMovilnet}/>
      <span className={style.slider}></span>
    </label>
  </>
)
}
export default SliderButtom;