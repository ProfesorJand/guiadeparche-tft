import React from 'react';
import { useStore } from '@nanostores/react';
import { currentStreamer, isStreamerOnline } from 'src/stores/streamers';

const StreamerOnlineLight = () => {
  const isOnline = useStore(isStreamerOnline);
  const streamer = useStore(currentStreamer);

  if (!isOnline) return null;

  const getStreamUrl = () => {
    if (streamer.platform === 'kick') return `https://kick.com/${streamer.name}`;
    return `https://twitch.tv/${streamer.name}`;
  };

  return (
    <a 
      href={getStreamUrl()} 
      target="_blank" 
      rel="noopener noreferrer"
      title={`${streamer.name} está online!`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        marginLeft: '10px'
      }}
      className="streamer-online-light"
    >
      <div 
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: '#ff0000',
          borderRadius: '50%',
          boxShadow: '0 0 8px #ff0000',
          animation: 'pulse-red 1.5s infinite'
        }}
      />
      <style>{`
        @keyframes pulse-red {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(255, 0, 0, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
        }
      `}</style>
    </a>
  );
};

export default StreamerOnlineLight;
