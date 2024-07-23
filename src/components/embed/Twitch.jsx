import { useEffect, useRef } from "react";

const Twitch = () =>{
    const divTwitchRef = useRef(null);
    useEffect(()=>{
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://embed.twitch.tv/embed/v1.js';
        script.id = "scriptTwitch"
        script.async = true;
        script.defer = true;
        script.setAttribute("type","text/javascript")
        document.getElementsByTagName('head')[0].appendChild(script);

        script.onload = function() {
            //const divTwitch = document.getElementById('twitch-embed');
            
            //var channel = divTwitch.dataset.channel;
            var embed;
            const divTwitch = divTwitchRef.current;
            var options = {
            width: '100%',
            channel: "teamfighttactics", // cambiar el string a la variable -> channel
            layout: 'video',
            autoplay: true,
            allowfullscreen: true,
            parent: ['tft.guiadeparche.com'],
            };
            if(!embed){
                embed = new Twitch.Embed('twitch-embed', options);
                embed.addEventListener(Twitch.Embed.READY, initiate);
            }
            function initiate() {
            embed.addEventListener(Twitch.Embed.ONLINE, handleOnline);
            embed.addEventListener(Twitch.Embed.OFFLINE, handleOffline);
            embed.removeEventListener(Twitch.Embed.READY, initiate);
            }
            function handleOnline() {
            embed.removeEventListener(Twitch.Embed.ONLINE, handleOnline);
            embed.addEventListener(Twitch.Embed.OFFLINE, handleOffline);
            divTwitch.classList.remove('hide');
            divTwitch.classList.add('show');
            embed.setMuted(false);
            }
            function handleOffline() {
            checkAnotherStreamer();
            }
            function checkAnotherStreamer(){
            embed.setChannel("relic_lol");
            embed.addEventListener(Twitch.Embed.OFFLINE, volverJupeson);
            }
            function volverJupeson(){
            embed.setChannel("jupeson");
            embed.removeEventListener(Twitch.Embed.OFFLINE, handleOffline);
            embed.addEventListener(Twitch.Embed.ONLINE, handleOnline);
            embed.setMuted(true);
            }
        }
    },[]);


    return (
        <div id="twitch-embed" ref={divTwitchRef} ></div>
    )
}

export default Twitch;