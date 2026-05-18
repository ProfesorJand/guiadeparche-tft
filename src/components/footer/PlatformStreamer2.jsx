import { useEffect, useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { STREAMERS } from 'src/stores/menuFiltradoAdmin';
import { currentStreamer } from 'src/stores/streamers';
import Twitch from '@components/embed/Twitch2';
import Kick from '@components/embed/Kick2';
import loadingSpinner from 'src/assets/loading-180-v2.svg';
import gpLogo from 'src/assets/GP_logo.png';

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
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeoutId;
    let isMounted = true;
  
    const checkNextStreamer = async () => {
      if (!isMounted) return;

      if (!allStreamers || allStreamers.length === 0) {
        timeoutId = setTimeout(() => {
           if (isMounted) checkNextStreamer();
        }, 5000);
        return;
      }

      if (index >= allStreamers.length) {
        const first = allStreamers[0];
        currentStreamer.set(first || { name: 'jupeson', platform: 'twitch' });
        setIsOnline(false);
        setLoading(false);

        // Volver a revisar en 3 minutos por si alguien prendió stream
        timeoutId = setTimeout(() => {
          index = 0;
          if (isMounted) checkNextStreamer();
        }, 180000);
        return;
      }
  
      const s = allStreamers[index];
      index++;

      if (s.platform === 'kick') {
        const online = await isKickOnline(s.name);
        if (online) {
          currentStreamer.set({ name: s.name, platform: 'kick' });
          setIsOnline(true);
          setLoading(false);
          // Revisar de nuevo en 5 minutos en caso de que se apague el stream
          timeoutId = setTimeout(() => {
             index = 0;
             if (isMounted) checkNextStreamer();
          }, 300000);
        } else {
          checkNextStreamer();
        }
      } else if (s.platform === 'twitch') {
        const online = await isTwitchOnline(s.name);
        if (online) {
          currentStreamer.set({ name: s.name, platform: 'twitch' });
          setIsOnline(true);
          setLoading(false);
          timeoutId = setTimeout(() => {
             index = 0;
             if (isMounted) checkNextStreamer();
          }, 300000);
        } else {
          checkNextStreamer();
        }
      } else {
         checkNextStreamer();
      }
    };
  
    loadTwitchScript().then(() => {
      checkNextStreamer();
    });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [allStreamers]);

  if (!isOnline) {

    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', background: '#111', padding: '1rem', textAlign: 'center' }}>
        <img src={gpLogo.src} alt="Offline" style={{ maxWidth: '100px', opacity: 0.8, marginBottom: '1rem' }} />
        <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>¡Streamers Offline!</h3>
        <p style={{ color: '#aaa', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>Visita el canal de Jupeson</p>
        <a 
          href="https://twitch.tv/jupeson" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor:  '#9146FF',
            color:'#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            transition: 'opacity 0.2s'
          }}
        >
          Ver en Twitch
        </a>
      </div>
    );
  }
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

