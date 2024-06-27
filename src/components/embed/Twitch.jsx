import { useEffect, useRef } from "react";
import useExternalScripts from "./externalScript"
export default function Twitch({channel}){
    const divTwitch = useRef(null);
    useExternalScripts("https://embed.twitch.tv/embed/v1.js");
    useEffect(()=>{

        console.log(divTwitch.current.classList)
        console.log(channel)
        var options = {
          width: '100%',
          channel: channel,
          layout: 'video',
          autoplay: true,
          allowfullscreen: true,
          parent: ['tft.guiadeparche.com'],
        };
        var embed = new Twitch.Embed('twitch-embed', options);
        embed.addEventListener(Twitch.Embed.READY, initiate);
    
        function initiate() {
          embed.addEventListener(Twitch.Embed.ONLINE, handleOnline);
          embed.addEventListener(Twitch.Embed.OFFLINE, handleOffline);
          embed.removeEventListener(Twitch.Embed.READY, initiate);
        }
    
        function handleOnline() {
            divTwitch.current.classList.remove('hide');
            divTwitch.current.classList.add('show');
          embed.removeEventListener(Twitch.Embed.ONLINE, handleOnline);
          embed.addEventListener(Twitch.Embed.OFFLINE, handleOffline);
          embed.setMuted(false);
        }
    
        function handleOffline() {
            divTwitch.current.classList.add('hide');
            divTwitch.current.classList.remove('show');
          embed.removeEventListener(Twitch.Embed.OFFLINE, handleOffline);
          embed.addEventListener(Twitch.Embed.ONLINE, handleOnline);
          embed.setMuted(true);
        }
    },[])

    return(<>
    <div>hola</div>
    <div id="twitch-embed" data-channel={channel} ref={divTwitch} ></div> 
    </>)
        
    
}