import { useState } from "react"
import CrearCompoIlluvium from "./CrearCompoIlluvium";
import PreviewInfografias from "./PreviewInfografias";
import { $admin } from "@stores/auth";
import { useStore } from "@nanostores/react";
const MetaCompsIlluvium = ()=>{
  const pestanas = ["crear", "meta"]
  const [selectedPestana, setSelectedPestana] = useState(pestanas[1]);
  const admin = useStore($admin);
  return (
    <div>
      {
        admin && 
        <div>
          {
            pestanas.map((pestana, i)=>{
              return (
                <input 
                key={`${pestana}-${i}`} 
                type="button" 
                value={pestana}
                onClick={()=>{setSelectedPestana(pestana)}}></input>
              )
            })
          }
        </div>
      }
      
      {/* Formulario  */}
      {
        selectedPestana === pestanas[0] &&
        <CrearCompoIlluvium/>
       }
       {
        selectedPestana === pestanas[1] &&
          <PreviewInfografias/>
       }
       
    </div>
  )
}

export default MetaCompsIlluvium;