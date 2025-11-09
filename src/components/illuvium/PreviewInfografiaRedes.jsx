import MiniInfografia from "./MiniInfografia.jsx";
import PositionInfografia from "./PositionInfografia.jsx";
import Infografia from "./Infografia.jsx";
import style from "./PreviewInfografiaRedes.module.css";
import { useRef } from "react";
import { CapturarImagen } from "src/functions/CapturarImagen.js";

const PreviewInfografiasRedes = ({
  data,
  isOpen,
  edit,
  setEdit,
  capturandoImagen,
  setCapturandoImagen,
  backgroundRef,
  miniRef,
  positionRef,
  carriesInfoRef,
  index,
  setOpenInfografia,
  admin,
  setPreviewInfografiaRedes,
  // miniRefs,
  // positionRefs,
  // carriesInfoRefs,
  // refs
})=>{
  const refInfo1 = useRef(null);
  const refInfo2 = useRef(null);

  return (
    <div className={style.container}>
      <div className={style.containerBtns}>
        <input 
          type="button"
          value={"Capturar Img #1"}
          onClick={()=>CapturarImagen({backgroundRef: refInfo1, nombre: `Illuvium_MiniInfografia_${data.nombreCompo}`})}>
        </input>
        <input 
          type="button"
          value={"Cerrar Preview"}
          onClick={()=>setPreviewInfografiaRedes(null)}>
        </input>
      </div>
      <div className={style.containerPreview}>
        <div ref={refInfo1} className={style.preview}>
          <MiniInfografia 
            data={data} 
            isOpen={isOpen} //openInfografia === i
            edit={edit} //edit
            setEdit={setEdit}  
            capturandoImagen={capturandoImagen} 
            setCapturandoImagen={setCapturandoImagen} 
            backgroundRef={backgroundRef} 
            miniRef={miniRef}   //* ✅ agregado */}
            positionRef={positionRef}   //* ✅ agregado */}
            carriesInfoRef={carriesInfoRef}   //* ✅ agregado */}
            index={index} 
            setOpenInfografia={setOpenInfografia} 
            admin={admin}
            previewInfografiaRedes={true}
            />
          <PositionInfografia 
            positionRef={positionRef} 
            data={data}
            />
          <div className={style.containerLogos}>
            <div className={style.containerLogo}>
              <img src={"/tft/assets/Jupeson_LOGO_Sin_Publicidad.png"} alt={"Null"}/>
            </div>
            <div className={style.containerLogo}>
              <img src={"/illuvium/illuvium-logo.png"} style={{
                transform: "scale(0.7)"
                }} alt={"Null"}/>
            </div>
            <div className={style.containerLogo}>
              <img src={"/illuvium/Illuvium_Arena_Logo.png"} alt={"Null"}/>
            </div>
          </div>
      </div>
      <div className={style.containerBtns}>
        <input 
          type="button"
          value={"Capturar Img #2"}
          onClick={()=>CapturarImagen({backgroundRef: refInfo2, nombre: `Illuvium_CarriesInfo_${data.nombreCompo}`})}>
        </input>
         <input 
          type="button"
          value={"Cerrar Preview"}
          onClick={()=>setPreviewInfografiaRedes(null)}>
        </input>
      </div>
        <div ref={refInfo2} className={style.preview}>
          <Infografia 
            data={data} 
            carriesInfoRef={carriesInfoRef}
            previewInfografiaRedes={true}
            />
            <div className={style.containerLogos}>
            <div className={style.containerLogo}>
              <img src={"/tft/assets/Jupeson_LOGO_Sin_Publicidad.png"} alt={"Null"}/>
            </div>
            <div className={style.containerLogo}>
              <img src={"/illuvium/illuvium-logo.png"} style={{
                transform: "scale(0.7)"
                }} alt={"Null"}/>
            </div>
            <div className={style.containerLogo}>
              <img src={"/illuvium/Illuvium_Arena_Logo.png"} alt={"Null"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewInfografiasRedes;