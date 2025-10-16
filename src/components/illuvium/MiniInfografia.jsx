import { CapturarImagen } from "src/functions/CapturarImagen";
import style from "./MiniInfografia.module.css"
const MiniInfografia = ({data, isOpen, show=true, edit, setEdit, capturandoImagen, setCapturandoImagen, backgroundRef, index, setOpenInfografia})=>{
  const admin = localStorage.getItem("user")||false;
  const colorDificulty= {Easy:"green",Medium:"orange",Hard:"red"}
  return(
    <div className={[style.container, isOpen && style.isOpen].join(" ")} >
      {!capturandoImagen  && admin && 
      <div className={style.miniMenu}>
        <input 
          type="button" 
          value={edit ? "Close":"Editar"}
          onClick={(e)=>{
            e.stopPropagation();
            setEdit(edit === data?.id ? null : data.id)
        }}></input>
      </div>}
      {!capturandoImagen  && admin && 
      <div className={style.miniMenu2}>
        <input 
          type="button" 
          value={"Capturar Image"}
          onClick={ async (e)=>{
            e.stopPropagation();
            setCapturandoImagen(true)
            setOpenInfografia(index)
            // Espera a que el DOM se actualice y renderice la infografía
            await new Promise(r => setTimeout(r, 300));

            await CapturarImagen({
              backgroundRef,
              nombre: `Illuvium_${data.nombreCompo}`,
            });

            setCapturandoImagen(false);
          CapturarImagen
        }}></input>
      </div>}

      <div className={style.containerTier}>
        <img 
          src={`/tiers/Tier-${data.selectedTier}.webp`}
          className={style.imgTier}
        ></img>
      </div>
      <div className={style.containerInfo1}>
        <div className={style.titulo}>
          {data.nombreCompo || "Sin Titulo"}
        </div>
        <div className={style.containerDificultadRoll}>
          <span
            className={style.dificultad}
            style={{
              borderColor: colorDificulty[data.selectedDificultad] 
            }}
          >{data.selectedDificultad}</span>
          <span className={style.category}>Roll Lv{data.rollInLv}</span>
        </div>
      </div>
      <div className={style.containerInfo2}>
            {/*Bond Partner IMG*/}
          <div className={style.contrainerInfo2Separador}>
            <div className={style.textoBond}>
              BOND
            </div>
            <div className={style.containerBondPartnerInfo}>
              <div className={style.containerIlluvialBondPartner}>
                <img 
                  className={style.bondPartnerImg}
                  src={"https://api.guiadeparche.com/" + data.bondPartnerImg}
                  ></img>
                <span
                  className={style.nombreBondPartner}
                  >{data.nombreBondPartner}</span>
              </div>
              {/*Elemento Bond Partner*/}
              <div className={style.containerElement}>
                <img 
                  className={style.elementoPartnerImg}
                  src={"https://api.guiadeparche.com/illuvium/assets/elementos/" + data.elementoPartner}></img>
                <span
                  className={style.textoElementoPartner}
                  >{data.elementoPartner?.replace(".webp","")}</span>
              </div>
              {/*Clase Bond Partner*/}
              <div className={style.containerWeapon}>
                <img 
                  className={style.classWeaponImg}
                  src={"https://api.guiadeparche.com/illuvium/assets/clases/" +  data.classPartner}>
                </img>
                <span
                  className={style.textoClassWeapon}
                  >{data.classPartner?.replace(".png","")}</span>
              </div>
              </div>
              <div className={style.containerBondPartnerInfo}>
              {/*Weapon IMG*/}
              <div className={style.containerElement} >
                <img 
                  className={style.elementoPartnerImg}
                  src={"https://api.guiadeparche.com/illuvium/assets/weapons/" + data.weapon}></img>
                <span
                  className={style.textoElementoPartner}
                  >{data.weapon?.replace(".webp","").slice(0, data.weapon.indexOf('_'))}</span>
              </div>
              {/*Elemento Weapon IMG*/}
              <div className={style.containerElement} >
                <img 
                  className={style.elementoPartnerImg}
                  src={"https://api.guiadeparche.com/illuvium/assets/elementos/" + data.elementWeapon}></img>
                <span
                  className={style.textoElementoPartner}
                  >{data.elementWeapon?.replace(".webp","")}</span>
              </div>
              {/*Clase Weapon IMG*/}
              <div className={style.containerWeapon}>
                <img 
                  className={style.classWeaponImg}
                  src={"https://api.guiadeparche.com/illuvium/assets/clases/" +  data.classWeapon}>
                </img>
                <span
                  className={style.textoClassWeapon}
                  >{data.classWeapon?.replace(".png","")}</span>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default MiniInfografia;