import style from "./css/SliderButtom.module.css"
const SliderButtomLogoGuiadeparche= ({logoGuiadeparche, setLogoGuiadeparche})=>{
return (
  <>
    <span>Logo Guiadeparche</span>
    <label className={style.switch}>
      <input type="checkbox" id={"Guiadeparche"} onChange={(e)=>{setLogoGuiadeparche(e.target.checked)}} value={logoGuiadeparche} className={style.inputText} checked={logoGuiadeparche}/>
      <span className={style.slider}></span>
    </label>
    <span>({logoGuiadeparche ? "activado": "desactivado"})</span>
  </>
)
}
export default SliderButtomLogoGuiadeparche;