import style from "./css/Cards.module.css";
const Cards = ({currentPath}) => {
  const CardsComoJugar=[
  {
    title:"Cómo jugar desde cero",
    desc:"Aprende qué es TFT y cómo empezar a jugar",
    icon:"https://i.ytimg.com/vi/hsU_1u38dOY/maxresdefault.jpg",
    url:"/tft/como-jugar/desde-cero"
  },
  {
    title:"Fundamentos",
    desc:"Aprende sobre la interfaz, comprar y vender campeones, subir de nivel y de estrellas, sinergias, aumentos y el builder",
    icon:"https://i.ytimg.com/vi/EXZ6NdN9pVA/maxresdefault.jpg",
    url:"/tft/como-jugar/desde-cero/#interfaz-tft"
  },
  {
    title:"Economía",
    desc:"Aprende economía en TFT, interés, rachas, slow roll y cuándo subir de nivel para ganar más partidas.",
    icon:"https://i.ytimg.com/vi/PEuWSN1sD48/maxresdefault.jpg",
    url:"/tft/como-jugar/economia"
  },
  {
    title:"Objetos",
    desc:"Mejores ítems y combos AD, AP y tanque para hacer tus composiciones más fuertes en TFT",
    icon:"https://i.ytimg.com/vi/12ejp2WlnZw/maxresdefault.jpg",
    url:"/tft/como-jugar/objetos"
  },
  {
    title:"Posicionamiento",
    desc:"Aprende posicionamiento en TFT, consejos para proteger tu carry, colocar tanques y usar scouting para ganar más.",
    icon:"https://i.ytimg.com/vi/sEG8PLrgO20/maxresdefault.jpg",
    url:"/tft/como-jugar/posicionamiento"
  },
  {
    title:"Qué comp jugar",
    desc:"Aprende cómo elegir composición en TFT según tus objetos, rachas y el meta actual.",
    icon:"https://i.ytimg.com/vi/qoV9hH9s9RI/maxresdefault.jpg",
    url:"/tft/como-jugar/elegir-composicion"
  },
  {
    title:"Diccionario TFT",
    desc:"Aprende el vocabulario de TFT: BIS, tempo, fast 8, pivotar, contested y otros términos usados por pros.",
    icon:"https://i.ytimg.com/vi/nD-1exiSgnE/maxresdefault.jpg",
    url:"/tft/como-jugar/diccionario"
  },
  // {
  //   title:"Reroll",
  //   desc:"Aprender cuando y cómo jugar bien las composiciones de reroll o 3 estrellas.",
  //   icon:"",
  //   url:"/tft/como-jugar/reroll"
  // },
  // {
  //   title:"Fast 8",
  //   desc:"Aprender cuando y cómo jugar bien las composiciones de Fast 8 con carry de coste 4.",
  //   icon:"",
  //   url:"/tft/como-jugar/fast-8"
  // },
  // {
  //   title:"Fast 9",
  //   desc:"Aprender cuando y cómo jugar bien las composiciones de Fast 9 con carry de coste 5 (legendarias).",
  //   icon:"",
  //   url:"/tft/como-jugar/fast-9"
  // },
]
  return (
    <div className={style.cardsContainer}>
      {CardsComoJugar.map(({title, desc, icon, url})=>{
        //remplaza en currentPath de la claseName si tiene # y todo el texto despues de ello
        const urlWithoutHash = url.split("#")[0];
        return(
          <a className={`${style.card} ${style.url} ${currentPath === urlWithoutHash ? style.active : ""}`} href={url}>
            <div className={style.containerImage}>
              <img className={style.image} src={icon} alt="" />
            </div>
            <div className={style.containerInfo}>
              <h3 className={style.title}>{title}</h3>
              <p className={style.description}>{desc}</p>
            </div>
          </a>
      )
      })
    }
  </div>
)}

export default Cards