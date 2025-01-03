
    import React, {useState, useEffect} from "react"
    import Items from "./Items.jsx"
    import style from "./css/ItemsTierList.module.css";
    import ItemsTierList from "./ItemTierList.jsx";
    import styleAugments from "./css/CreateAugmentsTierList.module.css";
    import AugmentsTierList from "./AugmentsTierList.jsx"
    
    const CreateAugmentsTierList = ({admin=false})=>{
      const urlDataDragon="https://raw.communitydragon.org/latest/game/";
      const [listaDeAumentos, setListaDeAumentos] = useState([])
      const [aumentos, setAumentos] = useState([]) 
      const [tierList, setTierList] = useState({
        Prismatic:[],
        Gold:[],
        Silver:[],
      });
      const [pestana, setPestana] = useState(0)
      const category = ["Prismatic","Gold","Silver"]
    
      useEffect(()=>{
        (async function traerDatos(){
          const url="https://guiadeparche.com/tftdata/Set12/augmentsTierList.json";
          const datos = await fetch(url, {cache:"no-cache"});
          const resp = await datos.json();
          setAumentos(resp)
          setTierList(resp)
        })()
      },[])

      useEffect(()=>{
        const buscarAumentos = async() =>{
          const url= "https://raw.communitydragon.org/latest/cdragon/tft/en_us.json"
          const items = await fetch(url);
          const itemsDataIngles1 = await items.json();
          const dataAumentos = itemsDataIngles1.items.filter(({apiName})=>{
            //itemsDataIngles1.setData[12].augments son las listas de los aumentos del set 13
            return itemsDataIngles1.setData[14].augments.includes(apiName)
          })
          setListaDeAumentos(dataAumentos)
        }
        buscarAumentos()
      }, []);
    
      function handleDropOutside(e, elemento) {
        e.stopPropagation();
        const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
        var item = e.currentTarget;
        const tier = e.currentTarget.getAttribute("data-tier")
        const dataItem = JSON.parse(e.currentTarget.getAttribute("data-item"))
        var rectS = document.getElementById("S").getBoundingClientRect();
        var rectA = document.getElementById("A").getBoundingClientRect();
        var rectB = document.getElementById("B").getBoundingClientRect();
        var rectC = document.getElementById("C").getBoundingClientRect();
        var rectD = document.getElementById("D").getBoundingClientRect();
        if(e.clientX > rectS.right || e.clientY < rectS.left || e.clientY < rectS.top ||  e.clientY > rectD.bottom){
          setTierList((oldObject)=>{return {
            ...oldObject,
            [category[pestana]]: {
              ...oldObject[category[pestana]],
              [tier]: [...oldObject[category[pestana]][tier].filter(({apiName})=>apiName !== dataItem.apiName)]
            }
          }})
        }
      }
    
      function handleDragStart(e) {
        e.stopPropagation();
        if (e.currentTarget?.hasAttribute("data-item")) {
          e.dataTransfer.setData("item", e.currentTarget.getAttribute("data-item"));
        }
        e.dataTransfer.setData("from", e.currentTarget.getAttribute("data-from"));
        e.dataTransfer.setData("tier", e.currentTarget.getAttribute("data-tier"));
      }
    
      function crearItem(e) {
        const dataItem = JSON.parse(e.dataTransfer.getData("item"));
        var tier = e.currentTarget.id
        if(!tier){
          tier = e.currentTarget.parentNode.parentNode.id;
        }
        if(checkDuplicate(dataItem)){
          alert("hay un duplicado")
        }else{
          setTierList((oldObject)=>{
            return {
              ...oldObject,
              [category[pestana]]:{
                ...oldObject[category[pestana]] ,
                [tier] : [...oldObject[category[pestana]][tier],dataItem] 
                }
              }
            })
        }
      }
    
      function swapItem(e) {
        const fromTier = e.dataTransfer.getData("tier");
        var newTier = e.currentTarget.id;
        if(!newTier){
          newTier = e.currentTarget.parentNode.parentNode.id;
        }
        const dataItem = JSON.parse(e.dataTransfer.getData("item"));
        setTierList((oldObject)=>{
          return {
            ...oldObject,
            [category[pestana]]:{
              ...oldObject[category[pestana]],
              [fromTier]: [...oldObject[category[pestana]][fromTier]].filter(({apiName})=>apiName !== dataItem.apiName),
              [newTier]:[...oldObject[category[pestana]][newTier],dataItem] 
            },
          }
        })
      }
    
      function checkDuplicate(dataItem){
        return Object.values(tierList[category[pestana]]).flat(Infinity).some(({apiName})=>apiName === dataItem.apiName)
      }
    
      function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        // const hex = e.currentTarget;
        const dataFrom = e.dataTransfer.getData("from");
        const dataItem = e.dataTransfer.getData("item");
        const dataTier = e.dataTransfer.getData("tier");
        console.log({dataItem})
        if (dataFrom === "itemList" && dataItem) {
          crearItem(e);
        }
    
        if (dataFrom === "itemBoard" && dataItem) {
          swapItem(e);
        }
      }
    
      function handleDragOver(e) {
        e.preventDefault();
      }
    
      async function saveTierList(){
        const url = 'https://guiadeparche.com/tftdata/Set12/crearAugmentsTierList.php';  // Cambia esto por la URL de tu archivo PHP
        const token = import.meta.env.PUBLIC_TOKEN_META
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',  // Definir que el cuerpo es JSON
                  'Authorization': `Bearer ${token}`,  // Enviar el token en el encabezado
                },
                body: JSON.stringify(aumentos),  // Convertir los datos a formato JSON
            });
    
            const resultado = await response.json();  // Parsear la respuesta como JSON
            if (response.ok) {
               alert('Éxito:', resultado);
            } else {
               alert('Error en el servidor:', resultado);
            }
        } catch (error) {
            console.log('Error al hacer la solicitud:', error);
        }
      }
    
      function agregarAumento(e, pestana, index) {
        e.preventDefault();
        const selectedValue = e.target.value;
      
        // Verifica si el aumento ya está repetido
        const repetido = aumentos?.[category?.[pestana]]?.some(
          ({ apiName }) => apiName === selectedValue
        );
        if (repetido) {
          alert(`Aumento: ${selectedValue} está repetido, añade otro aumento`);
          return;
        }
      
        // Obtiene el valor del datalist seleccionado
        const dataList = document.getElementById("dataListAumentos");
        const dataValue = dataList.options.namedItem(`datalist-${selectedValue}`)?.dataset.value;
      
        if (dataValue) {
          const parsedValue = JSON.parse(dataValue);
      
          setAumentos((oldAumentos) => {
            const updatedAumentos = { ...oldAumentos };
            const currentCategory = updatedAumentos[category[pestana]] || [];
      
            // Asegúrate de que el array tenga el índice correspondiente y actualiza solo ese valor
            currentCategory.push(parsedValue);
            updatedAumentos[category[pestana]] = currentCategory;
      
            return updatedAumentos;
          });
        } else {
          //alert("este esta fuckiado llamar a profesorjand");
        }
      }

      function eliminarAumento(apiName, pestana){
        setAumentos((oldArray)=>{
          return {
            ...oldArray,
            [category[pestana]]: oldArray[category[pestana]].filter(data=>data.apiName !== apiName )}
        })
      }

      
      return (
        <>
          {admin && 
          <div className={style.container}>
            <div className={style.btn}>
              {category?.map((name, index)=>{
                return <button key={name+index} className={pestana === index ? style.btnActive : ""} onClick={()=>setPestana(index)}>{name}</button>
              })}
            </div>
            <div className={styleAugments.containerAumentos}>
              {aumentos?.[category?.[pestana]]?.map(({icon, apiName})=>{
                return (
                  <div key={"ImgAumentos"+apiName} className={styleAugments.horizontalWrapper}>
                    <button className={styleAugments.btnClose} onClick={()=>eliminarAumento(apiName, pestana)}>X</button>
                    <img src={urlDataDragon+icon.toLowerCase().replace(".tex",".png")} className={styleAugments.imgAumento} loading="lazy"></img>
                  </div>
              )
              })}
            </div>
            {Array(8)
            .fill(null)
            .map((_augment, i) => {
              return (
              <input
                key={`aumentos-input-${i}`}
                list="dataListAumentos"
                name={`aumentos${i + 1}`}
                id={`aumentos${i + 1}`}
                placeholder={
                  aumentos?.[category?.[pestana]]?.[i]?.apiName || "Select Augment"
                }
                value={aumentos?.[category?.[pestana]]?.[i]?.apiName || ""}
                onChange={(e) => agregarAumento(e, pestana, i)}
              />
            )})}
            <datalist id="dataListAumentos">
              {listaDeAumentos.map((aum, i )=>{
                return <option key={"ListaDeAumentos"+aum.name+i} id={`datalist-${aum.apiName}`} data-value={JSON.stringify(aum)} value={aum.apiName}>{aum.name}</option>
              })}
            </datalist>
            <button className={styleAugments.btnSave} onClick={()=>{saveTierList(pestana)}}>SAVE</button>
          </div>}
            {
              (tierList?.Prismatic?.length > 0 || tierList?.Gold?.length > 0 || tierList?.Silver?.length > 0) &&

              <AugmentsTierList tierList={tierList}/>
            }
        </>
      )
    }
    
    export default CreateAugmentsTierList