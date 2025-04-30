import { useEffect, useRef, useState } from "react";
import { STREAMERS as todosLosStreamers } from "src/stores/menuFiltradoAdmin";
import { useStore } from "@nanostores/react";
import { currentStreamer } from "src/stores/streamers";

const Kick = () => {
  const divKickRef = useRef(null);
  const [currentStreamerIndex, setCurrentStreamerIndex] = useState(0);
  const [checkedAll, setCheckedAll] = useState(false);
  const iframeRef = useRef(null);
  const allStreamers = useStore(todosLosStreamers);

  // 🎯 Filtramos los streamers que son de Kick
  const kickStreamers = allStreamers.filter(s => s.platform === "kick");

  // Función para cambiar de streamer cuando uno esté offline
  const checkNextStreamer = () => {
    setCurrentStreamerIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % kickStreamers.length;
      if (newIndex === 0) {
        setCheckedAll(true);
      }
      return newIndex;
    });
  };

  useEffect(() => {
    if (kickStreamers.length === 0) return;
  
    const checkStreamerStatus = async () => {
      const current = kickStreamers[currentStreamerIndex]?.name;
      if (!current) return;
  
      try {
        const res = await fetch(`https://kick.com/api/v2/channels/${current}`);
        const data = await res.json();
  
        const isOnline = data?.livestream !== null;
  
        if (!isOnline) {
          checkNextStreamer();
        } else {
          setCheckedAll(false); // Reinicia si encontramos uno online
          currentStreamer.set({ name: current, platform: "kick" });
        }
      } catch (err) {
        console.error("Error verificando el estado del streamer:", err);
        checkNextStreamer(); // En caso de error, pasa al siguiente
      }
    };
  
    const interval = setInterval(() => {
      checkStreamerStatus();
    }, 2000);
  
    return () => clearInterval(interval);
  }, [kickStreamers, currentStreamerIndex]);
  

  useEffect(() => {
    if (!iframeRef.current) return;
  
    if (checkedAll || kickStreamers.length === 0) {
      iframeRef.current.src = `https://player.kick.com/jupeson?autoplay=true&muted=true`;
      // currentStreamer.set({ name: "jupeson", platform: "kick" });
      return;
    }
  
    const streamerName = kickStreamers[currentStreamerIndex]?.name || "jupeson";
    iframeRef.current.src = `https://player.kick.com/${streamerName}?autoplay=true&muted=true`;
    // currentStreamer.set({ name: streamerName, platform: "kick" });
  }, [currentStreamerIndex, checkedAll, kickStreamers]);

  return (
    <div id="kick-embed" ref={divKickRef}>
      <iframe
        ref={iframeRef}
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