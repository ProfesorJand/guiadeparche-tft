import { useEffect, useRef } from "react";

const Twitch = ({ name = "jupeson" }) => {
  const divTwitchRef = useRef(null);

  useEffect(() => {
    if (!window.Twitch || !window.Twitch.Embed) return;

    const embed = new window.Twitch.Embed("twitch-embed", {
      width: "100%",
      channel: name,
      layout: "video",
      autoplay: true,
      muted: false,
      theme: "dark",
      parent: ["tft.guiadeparche.com"],
    });

    return () => {
      // Limpiar Twitch embed si es necesario
      const container = document.getElementById("twitch-embed");
      if (container) container.innerHTML = "";
    };
  }, [name]);

  return (
    <div id="twitch-embed" ref={divTwitchRef}>
      <style>{`
        #twitch-embed {
          display: flex;
          position: relative;
          box-sizing: border-box;
          width: 100%;
          aspect-ratio: 16/9;
          padding: calc(9rem / 16) 1rem;
        }
        .hide {
          display: none;
        }
        .show {
          display: flex;
        }
        @media only screen and (min-width: 900px) {
          #twitch-embed {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Twitch;

