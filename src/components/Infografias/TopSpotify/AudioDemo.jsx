const AudioDemo = ({src}) => {
  return (
    <audio
      controls
      preload="none"
      style={{ width: "100%" }}
      src={src}
    />
  );
}

export default AudioDemo