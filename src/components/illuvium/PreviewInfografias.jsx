import { useEffect, useRef, useState, createRef } from "react";
import MiniInfografia from "./MiniInfografia";
import Infografia from "./Infografia";
import { getMetaComps, metaComps } from "@stores/dataIlluvium";
import style from "./PreviewInfografias.module.css"
import { useStore } from "@nanostores/react";
import CrearCompoIlluvium from "./CrearCompoIlluvium";
import Youtube from "@components/youtube/Youtube.jsx";
import PositionInfografia from "./PositionInfografia.jsx";
import PreviewInfografiasRedes from "./PreviewInfografiaRedes.jsx";
const PreviewInfografias = ()=>{
  const ComposMeta = useStore(metaComps);
  const [openInfografia, setOpenInfografia] = useState(null);
  const [edit, setEdit] = useState(null);
  const [capturandoImagen, setCapturandoImagen] = useState(false)
  const refs = useRef([]);
  const miniRefs = useRef([]);
  const positionRefs = useRef([]);
  const carriesInfoRefs = useRef([]);
  const admin = localStorage.getItem("user")||false;
  const [previewInfografiaRedes, setPreviewInfografiaRedes] = useState(null);
  useEffect(()=>{
    const buscarCompos = async()=>{
      await getMetaComps()
    }
    buscarCompos()
  },[])
    useEffect(() => {
    refs.current = ComposMeta.map((_, i) => refs.current[i] || createRef());
    miniRefs.current = ComposMeta.map((_, i) => miniRefs.current[i] || createRef());
    positionRefs.current = ComposMeta.map((_, i) => positionRefs.current[i] || createRef());
    carriesInfoRefs.current = ComposMeta.map((_, i) => carriesInfoRefs.current[i] || createRef());
  }, [ComposMeta]);
  return (
    <div className={style.container}>
      <Youtube src={"https://youtu.be/J6Qto2bOMNA?si=RIrnUVGd4kBA_BBB"}></Youtube>
    {
      ComposMeta.length > 0 && 
      ComposMeta.map((data,i)=>{
        if(data.ocultar === "true" && !admin){
          return null;
        }
        return (
          <div key={`Infografia${i}`} ref={refs.current[i]} className={style.containerInfografia} onClick={()=>{
            if(openInfografia === i){
              setOpenInfografia(null)
            }else{
              setOpenInfografia(i)
            }
          }}>
            <input 
              type="button"
              onClick={()=>{previewInfografiaRedes !== i ? setPreviewInfografiaRedes(i): setPreviewInfografiaRedes(null); console.log("click en preview")}}
              value={"Preview"}>

            </input>
            
            <MiniInfografia
              data={data} 
              isOpen={openInfografia === i}
              edit={edit} 
              setEdit={setEdit} 
              capturandoImagen={capturandoImagen} 
              setCapturandoImagen={setCapturandoImagen} 
              backgroundRef={refs.current[i]} 
              miniRef={miniRefs.current[i]}   //* ✅ agregado */}
              positionRef={positionRefs.current[i]}   //* ✅ agregado */}
              carriesInfoRef={carriesInfoRefs.current[i]}   //* ✅ agregado */}
              index={i} 
              setOpenInfografia={setOpenInfografia} 
              admin={admin}
              />
            {
              edit === data?.id && 
              <CrearCompoIlluvium 
                data={data}
                edit={true}
              ></CrearCompoIlluvium>
            }
            {
              openInfografia === i &&
              <>
              <PositionInfografia positionRef={positionRefs.current[i]} data={data} />
              <Infografia data={data} carriesInfoRef={carriesInfoRefs.current[i]}></Infografia>
              </>
            }
          </div>
          )
        })
      }
    {
      previewInfografiaRedes !== null && (
        <PreviewInfografiasRedes
          data={ComposMeta[previewInfografiaRedes]}
          isOpen={true}
          edit={false}
          setEdit={setEdit}
          capturandoImagen={capturandoImagen}
          setCapturandoImagen={setCapturandoImagen}
          backgroundRef={refs.current[previewInfografiaRedes]}
          miniRef={miniRefs.current[previewInfografiaRedes]}
          positionRef={positionRefs.current[previewInfografiaRedes]}
          carriesInfoRef={carriesInfoRefs.current[previewInfografiaRedes]}
          index={previewInfografiaRedes}
          setOpenInfografia={setOpenInfografia}
          admin={false}
          setPreviewInfografiaRedes={setPreviewInfografiaRedes}
          
        />
      )
    }
    </div>
  )
}

export default PreviewInfografias;