import { useEffect, useRef, useState } from "react";
import { STREAMERS as todosLosStreamers } from "src/stores/menuFiltradoAdmin";
import { useStore } from "@nanostores/react";
import { currentStreamer } from "src/stores/streamers";

const Twitch = () => {
  const divTwitchRef = useRef(null);
  const [pass, setPass] = useState(false);
  const [currentStreamerIndex, setCurrentStreamerIndex] = useState(0);
  const [checkedAll, setCheckedAll] = useState(false);
  const embedRef = useRef(null);
  const allStreamers = useStore(todosLosStreamers);

  // 🎯 Aquí filtramos sólo los de Twitch
  const twitchStreamers = allStreamers.filter(s => s.platform === "twitch");

  useEffect(() => {
    const handlePageLoad = () => {
      if (!pass && !ismMyScriptLoaded("https://embed.twitch.tv/embed/v1.js")) {
        setPass(true);
      }
    };

    window.addEventListener("astro:page-load", handlePageLoad);
    setTimeout(() => {
      window.dispatchEvent(new Event("astro:page-load"));
    }, 5000);

    return () => {
      window.removeEventListener("astro:page-load", handlePageLoad);
    };
  }, [pass]);

  useEffect(() => {
    if (!pass) return;
    if (ismMyScriptLoaded("https://embed.twitch.tv/embed/v1.js")) return;
    
    const script = document.createElement("script");
    script.src = "https://embed.twitch.tv/embed/v1.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const divTwitch = divTwitchRef.current;
      const options = {
        width: "100%",
        channel: twitchStreamers[currentStreamerIndex]?.name || "jupeson",
        layout: "video",
        autoplay: true,
        allowfullscreen: true,
        muted: true,
        theme: "dark",
        parent: ["tft.guiadeparche.com"],
      };

      const embed = new window.Twitch.Embed("twitch-embed", options);
      embedRef.current = embed;

      embed.addEventListener(window.Twitch.Embed.READY, () => {
        embed.addEventListener(window.Twitch.Embed.ONLINE, handleOnline);
        embed.addEventListener(window.Twitch.Embed.OFFLINE, handleOffline);
      });

      const handleOnline = () => {
        embed.setMuted(false);
        divTwitch.classList.remove("hide");
        divTwitch.classList.add("show");
      };

      const handleOffline = () => {
        checkNextStreamer();
      };
    };

    return () => {
      setPass(false);
    };
  }, [pass, currentStreamerIndex, twitchStreamers]);

  const checkNextStreamer = () => {
    setCurrentStreamerIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % twitchStreamers.length;
      if (newIndex === 0) {
        setCheckedAll(true);
      }
      return newIndex;
    });
  };

  useEffect(() => {
    if (!pass || !embedRef.current) return;

    if (checkedAll) {
      embedRef.current.setChannel("jupeson");
      currentStreamer.set({ name: "jupeson", platform: "twitch" });
      return;
    }

    const streamerName = allStreamers[currentStreamerIndex].name; //puede que aca haya un problema
    embedRef.current.setChannel(streamerName);
    currentStreamer.set({ name: streamerName, platform: "twitch" });
  }, [currentStreamerIndex, checkedAll]);

  function ismMyScriptLoaded(url) {
    if (!url) url = "https://embed.twitch.tv/embed/v1.js";
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length; i--; ) {
      if (scripts[i].src === url) {
        return true;
      }
    }
    return false;
  }

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
