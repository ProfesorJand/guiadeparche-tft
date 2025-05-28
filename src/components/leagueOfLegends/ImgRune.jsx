const ImgRune = ({indexRune, rune}) => {
  console.log({ImgRune:rune})
  return (
    <img key={`rune ${indexRune}`} src={rune.icon} alt={rune.name} />
  )
}

export default ImgRune;