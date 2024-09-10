import React, {useEffect, useState, Fragment} from "react"
import style from "./css/EditarCompoTFT.module.css"
import Composicion from "./Composicion.jsx";

const EditarCompoTFT = () =>{

  const [composMeta, setComposMeta] = useState({});
  const hierarchy = ["S","A","B","C","Meme"];
  useEffect(()=>{
    fetch("https://guiadeparche.com/tftdata/Set12/composMeta.json",{cache:"reload"})
    .then((response)=>response.json())
    .then((data)=>{
      const sortableArray =  Object.keys(data).map((tier,i)=>{
        const testing = data[tier].sort((a,b)=>{
          if(a.posicion < b.posicion){
            return -1
          }
          if(a.posicion > b.posicion){
            return 1
          }
          return 0
        })
        return testing
      }).sort((a,b)=>{
          if(hierarchy.indexOf(a[0].tier) > hierarchy.indexOf(b[0].tier)){
            return 1
          }
          if(hierarchy.indexOf(a[0].tier) < hierarchy.indexOf(b[0].tier)){
            return -1
          }
          return 0
      })
      setComposMeta(sortableArray)
    })
    .catch((err)=>{
      console.error(err)
    })
  },[])

    return (
    <div className={style.containerMeta}>
    {
      composMeta.length > 0 && composMeta.map((tier,index)=>{
        return(
          <Fragment key={index}>
          {tier.map((compo,i)=>{
            return (
              <div key={`containerMeta`+i} className={style.containerMetaTier}>
                <Composicion compo={compo}/>
              </div>
            )
          })}
          </Fragment>
        )
      })
    }
    </div>

    )
}

export default EditarCompoTFT