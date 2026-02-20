const ImgSlotRune = ({indexSlotRune, slotRune}) => {
  return (
    <img key={`rune ${indexSlotRune}`} src={slotRune.icon} alt={slotRune.name} />
  )
}

export default ImgSlotRune;