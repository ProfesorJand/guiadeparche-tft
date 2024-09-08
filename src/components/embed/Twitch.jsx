import { useEffect, useRef, useState } from "react";

const Twitch = () => {
  const divTwitchRef = useRef(null);
  const [pass, setPass] = useState(localStorage.getItem("twitchOpen"));
  useEffect(()=>{
    if(!pass && !ismMyScriptLoaded("https://embed.twitch.tv/embed/v1.js")){
      setTimeout(()=>{
        localStorage.setItem("twitchOpen",true)
        setPass(true)
      },5000)
    }
  },[])
  useEffect(() => {
    if(!pass) return;
    if(ismMyScriptLoaded("https://embed.twitch.tv/embed/v1.js"))return;
    let embed;
        const script = document.createElement('script');
        script.src = 'https://embed.twitch.tv/embed/v1.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            const divTwitch = divTwitchRef.current;
            const options = {
                width: '100%',
                channel: "jupeson", // cambiar el string a la variable -> channel
                layout: 'video',
                autoplay: true,
                allowfullscreen: true,
                parent: ['tft.guiadeparche.com'],
            };

            embed = new window.Twitch.Embed('twitch-embed', options);

            embed.addEventListener(window.Twitch.Embed.READY, () => {
                embed.addEventListener(window.Twitch.Embed.ONLINE, handleOnline);
                embed.addEventListener(window.Twitch.Embed.OFFLINE, handleOffline);
            });

            const handleOnline = () => {
                embed.removeEventListener(window.Twitch.Embed.ONLINE, handleOnline);
                embed.addEventListener(window.Twitch.Embed.OFFLINE, handleOffline);
                divTwitch.classList.remove('hide');
                divTwitch.classList.add('show');
                embed.setMuted(false);
            };

            const handleOffline = () => {
                checkAnotherStreamer();
            };

            const checkAnotherStreamer = () => {
                embed.setChannel("relic_lol");
                embed.addEventListener(window.Twitch.Embed.OFFLINE, volverJupeson);
            };

            const volverJupeson = () => {
                embed.setChannel("jupeson");
                embed.removeEventListener(window.Twitch.Embed.OFFLINE, handleOffline);
                embed.addEventListener(window.Twitch.Embed.ONLINE, handleOnline);
                embed.setMuted(true);
            };
        };
      return ()=>{
        localStorage.setItem("twitchOpen",false)
      }
  }, [pass]);

  function ismMyScriptLoaded(url){
    if (!url) url = "https://embed.twitch.tv/embed/v1.js";
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length; i--;) {
        if (scripts[i].src == url) {
          return true};
    }
    return false;
  }

  return (<div id="twitch-embed" ref={divTwitchRef}>
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
  </div>);
};

export default Twitch;
