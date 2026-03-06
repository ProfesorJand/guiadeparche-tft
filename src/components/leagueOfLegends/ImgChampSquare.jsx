const ImgChampSquare = ({src, alt}) => {
  return (
      <img 
        src={src}
        alt={alt} 
        style={{
          width: "100%",
          display: "flex",
          position: "relative", 
        }}
      />
  )
}
export default ImgChampSquare;