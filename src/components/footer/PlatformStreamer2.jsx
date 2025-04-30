import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { STREAMERS } from 'src/stores/menuFiltradoAdmin';
import { currentStreamer } from 'src/stores/streamers';
import Twitch from '@components/embed/Twitch2';
import Kick from '@components/embed/Kick2';
import loadingSpinner from 'src/assets/loading-180-v2.svg';

const PlatformStreamer = () => {
  const allStreamers = useStore(STREAMERS);
  const streamer = useStore(currentStreamer);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStreamerOnline = async () => {
      for (const s of allStreamers) {
        if (s.platform === "twitch") {
          const isOnline = await isTwitchOnline(s.name);
          if (isOnline) {
            currentStreamer.set({ name: s.name, platform: "twitch" });
            setLoading(false);
            return;
          }
        } else if (s.platform === "kick") {
          const isOnline = await isKickOnline(s.name);
          if (isOnline) {
            currentStreamer.set({ name: s.name, platform: "kick" });
            setLoading(false);
            return;
          }
        }
      }

      // Ninguno online → usar primero del array
      const first = allStreamers[0];
      if (first) {
        currentStreamer.set({ name: first.name, platform: first.platform });
      } else {
        currentStreamer.set({ name: "jupeson", platform: "twitch" });
      }
      setLoading(false);
    };

    if (!initialized && allStreamers.length) {
      checkStreamerOnline();
      setInitialized(true);
    }
  }, [allStreamers, initialized]);

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
  const data = res.json();
  return data
}

// 🔍 Utilidades de comprobación
async function isTwitchOnline(username) {
  try {
    const {access_token, expires_in, token_type } = await getClientIdToken()
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

