import { useEffect, useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { STREAMERS } from 'src/stores/menuFiltradoAdmin';
import { currentStreamer } from 'src/stores/streamers';
import Twitch from '@components/embed/Twitch2';
import Kick from '@components/embed/Kick2';
import loadingSpinner from 'src/assets/loading-180-v2.svg';

const loadTwitchScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Twitch?.Embed) return resolve();

    const existing = document.querySelector('script[src="https://embed.twitch.tv/embed/v1.js"]');
    if (existing) {
      existing.onload = resolve;
      existing.onerror = reject;
      return;
    }

    const script = document.createElement("script");
    script.src = "https://embed.twitch.tv/embed/v1.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const PlatformStreamer = () => {
  const allStreamers = useStore(STREAMERS);
  const streamer = useStore(currentStreamer);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const divTwitchRef = useRef(null); // noc si va
  const embedRef = useRef(null); // noc si va


  useEffect(() => {
    let index = 0;
  
    const checkNextStreamer = () => {
      if (index >= allStreamers.length) {
        const first = allStreamers[0];
        currentStreamer.set(first || { name: 'jupeson', platform: 'twitch' });
        setLoading(false);
        return;
      }
  
      const s = allStreamers[index++];
      if (s.platform === 'kick') {
        isKickOnline(s.name).then((online) => {
          if (online) {
            currentStreamer.set({ name: s.name, platform: 'kick' });
            setLoading(false);
          } else {
            checkNextStreamer();
          }
        });
      } else if (s.platform === 'twitch') {
        const div = document.createElement('div');
        div.id = 'temp-twitch-check';
        div.style.display = 'none';
        document.body.appendChild(div);
  
        const embed = new window.Twitch.Embed('temp-twitch-check', {
          width: '100%',
          height: '100%',
          channel: s.name,
          layout: 'video',
          autoplay: true,
          muted: true,
          parent: ['tft.guiadeparche.com'],
        });
  
        embed.addEventListener(window.Twitch.Embed.READY, () => {
          embed.addEventListener(window.Twitch.Embed.ONLINE, () => {
            currentStreamer.set({ name: s.name, platform: 'twitch' });
            setLoading(false);
            div.remove();
          });
  
          embed.addEventListener(window.Twitch.Embed.OFFLINE, () => {
            div.remove();
            checkNextStreamer();
          });
        });
      }
    };
  
    loadTwitchScript().then(() => {
      if (allStreamers.length) {
        checkNextStreamer();
      }
    });
  }, [allStreamers]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <img src={loadingSpinner.src} alt="Loading..." style={{ width: '60px', height: '60px' }} />
      </div>
    );
  }

  if (streamer?.platform === "twitch") {
    return <Twitch name={streamer.name} />;
  }

  if (streamer?.platform === "kick") {
    return <Kick name={streamer.name} />;
  }

  return <Twitch name="jupeson" />;
};

export default PlatformStreamer;

async function getClientIdToken() {
  const res = await fetch(`https://guiadeparche.com/twitch/get-twitch-token.php`);
  const data = await res.json();
  return data
}

// 🔍 Utilidades de comprobación
async function isTwitchOnline(username) {
  try {
    const {access_token, expires_in, token_type } = await getClientIdToken();
    console.log({access_token, expires_in, token_type})
    const clientId = "7vvu660o1l491sgwidg44o5uje3z4p"; // debes configurar esto
    const res = await fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data = await res.json();
    return data.data?.length > 0;
  } catch {
    return false;
  }
}

async function isKickOnline(username) {
  try {
    const res = await fetch(`https://kick.com/api/v2/channels/${username}`);
    const data = await res.json();
    console.log({kickData:data})
    return data?.livestream !== null;
  } catch {
    return false;
  }
}

