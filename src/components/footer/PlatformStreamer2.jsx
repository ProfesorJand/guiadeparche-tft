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
  
    const checkNextStreamer = async () => {
      if (index >= allStreamers.length) {
        const first = allStreamers[0];
        currentStreamer.set(first || { name: 'jupeson', platform: 'twitch' });
        setLoading(false);
        return;
      }
  
      const s = allStreamers[index];
      index++;

      if (s.platform === 'kick') {
        const online = await isKickOnline(s.name);
        if (online) {
          currentStreamer.set({ name: s.name, platform: 'kick' });
          setLoading(false);
        } else {
          checkNextStreamer();
        }
      } else if (s.platform === 'twitch') {
        const online = await isTwitchOnline(s.name);
        if (online) {
          currentStreamer.set({ name: s.name, platform: 'twitch' });
          setLoading(false);
        } else {
          checkNextStreamer();
        }
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
  const res = await fetch(`https://api.guiadeparche.com/twitch/get-twitch-token.php`);
  const data = await res.json();
  return data
}

// 🔍 Utilidades de comprobación

async function isKickOnline(username) {
  try {
    const res = await fetch(`https://kick.com/api/v2/channels/${username}`);
    const data = await res.json();
    return data?.livestream !== null;
  } catch {
    return false;
  }
}

async function isTwitchOnline(username) {
  try {
    const body = [
      {
        operationName: 'StreamMetadata',
        variables: { channelLogin: username },
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash: "1c719a40e481453e5c48d9bb585d971b8b372f8ebb105b17076722264dfa5b3e"
            }
        }
      }
    ];

    const res = await fetch("https://gql.twitch.tv/gql", {
      method: "POST",
      headers: {
        "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko" // Client ID global web público
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    // Si la data user.stream no es null, está online
    return data[0]?.data?.user?.stream !== null;
  } catch (error) {
    return false;
  }
}

