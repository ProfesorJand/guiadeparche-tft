const ImagenClase = ({clase})=>{
  const url = "https://api.guiadeparche.com/illuvium/assets/clases/"
  return (
    <img
      style={{
        width:"50px",
        height:"50px"
      }}
      src={url+clase}
    >
    </img>
  )
}


export default ImagenClase