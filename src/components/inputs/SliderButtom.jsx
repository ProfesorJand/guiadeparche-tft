import style from "./css/SliderButtom.module.css"
const SliderButtom= ({setLogoMovilnet, logoMovilnet})=>{
return (
  <>
    <span>Logo Movilnet</span>
    <label className={style.switch}>
      <input type="checkbox" id={"logoMovilnet"} onChange={(e)=>{setLogoMovilnet(e.target.checked)}} value={logoMovilnet} className={style.inputText} checked={logoMovilnet}/>
      <span className={style.slider}></span>
    </label>
    <span>({logoMovilnet ? "activado": "desactivado"})</span>
  </>
)
}
export default SliderButtom;