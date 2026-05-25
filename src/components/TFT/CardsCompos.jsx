import style from "./css/CardsCompos.module.css";

const CardsCompos = () =>{

  return(
    <div className={style.container}>
      <div className={style.header}>
        <img className={style.imgBackground} src=""></img>
        <div>
            <h3>{"Nombre Compo"}</h3>
            {
                categorias.map( (categoria, index) =>(
                    <span className={style.categoria} key={index}>{categoria}</span>
                ))
            }
        </div>
        <div>
            {
                condiciones.map( (condicion, index) =>(
                    <img className={style[condicion]} src={`/img/tft/condicion/${condicion}.png`} key={index} title={condicion}></img>
                ))
            }
        </div>
      </div>
      <div className={style.footer}>

      </div>

    </div>
  )
}

export default CardsCompos;