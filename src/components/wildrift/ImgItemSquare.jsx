const ImgItemSquare = ({ indexItem, item}) => {
  return (
    <img key={`item ${indexItem}`} src={item.image} alt={item.name} style={{width:"100%"}} />
  )
}

export default ImgItemSquare;