import { useEffect, useState } from "react";
import MiniInfografia from "./MiniInfografia";
import Infografia from "./Infografia";
import { getMetaComps, metaComps } from "@stores/dataIlluvium";
import style from "./PreviewInfografias.module.css"
import { useStore } from "@nanostores/react";
import CrearCompoIlluvium from "./CrearCompoIlluvium";
const PreviewInfografias = ()=>{
  const ComposMeta = useStore(metaComps);
  const [openInfografia, setOpenInfografia] = useState(null);
  const [edit, setEdit] = useState(null);
  useEffect(()=>{
    const buscarCompos = async()=>{
      await getMetaComps()
    }
    buscarCompos()
  },[])
  return (
    <div className={style.container}>
    {
      ComposMeta.length > 0 && 
      ComposMeta.map((data,i)=>{
        return (
          <div key={`Infografia${i}`} className={style.containerInfografia} onClick={()=>{
            if(openInfografia === i){
              setOpenInfografia(null)
            }else{
              setOpenInfografia(i)
            }
          }}>
            <MiniInfografia data={data} isOpen={openInfografia === i} edit={edit} setEdit={setEdit}/>
            {
              edit === data?.id && 
              <CrearCompoIlluvium 
                data={data}
                edit={true}
              ></CrearCompoIlluvium>
            }
            {
              openInfografia === i &&
              <Infografia data={data}></Infografia>
            }
          </div>
          )
        })
      }
    </div>
  )
}

export default PreviewInfografias;