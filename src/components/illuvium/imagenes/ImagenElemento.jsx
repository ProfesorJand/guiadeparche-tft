const ImagenElemento = ({elemento})=>{
  const url = "https://api.guiadeparche.com/illuvium/assets/elementos/"
  return (
    <img
      style={{
        width:"50px",
        height:"50px"
      }}
      src={url+elemento}
    >
    </img>
  )
}


export default ImagenElemento