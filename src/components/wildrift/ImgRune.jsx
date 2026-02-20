const ImgRune = ({indexRune, rune}) => {
  return (
    <img key={`rune ${indexRune}`} src={rune.icon} alt={rune.name} />
  )
}

export default ImgRune;