import style from "./Infografia.module.css";
const PositionInfografia = ({positionRef, data})=>{
  return (
    <div ref={positionRef} className={style.containerImgPosicionamiento}>
        <img 
        className={style.imgPosicionamiento}
          src={`https://api.guiadeparche.com/`+ data.imgPosicionamiento}></img>
      </div>
  )
}

export default PositionInfografia;