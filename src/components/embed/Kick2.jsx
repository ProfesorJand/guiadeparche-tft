const Kick = ({ name = "jupeson" }) => {

  return (
    <div id="kick-embed">
      <iframe
        src={`https://player.kick.com/${name}?autoplay=true&muted=true`}
        allow="autoplay; fullscreen"
        frameBorder="0"
        scrolling="no"
        height="100%"
        width="100%"
        style={{ aspectRatio: "16/9", borderRadius: "8px" }}
        title="Kick Stream"
      />
      <style>{`
        #kick-embed {
          display: flex;
          position: relative;
          box-sizing: border-box;
          width: 100%;
          aspect-ratio: 16/9;
          padding: calc(9rem / 16) 1rem;
        }
        @media only screen and (min-width: 900px) {
          #kick-embed {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Kick;