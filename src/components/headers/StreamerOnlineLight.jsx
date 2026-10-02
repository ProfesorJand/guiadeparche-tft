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
        backgroundColor: '#110b29',
        border: '1px solid rgba(255, 0, 0, 0.4)',
        padding: '6px 12px',
        borderRadius: '6px',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1a1140';
        e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#110b29';
        e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.4)';
      }}
      className="streamer-online-light"
    >
      <div 
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: '#ff0000',
          borderRadius: '50%',
          boxShadow: '0 0 8px #ff0000',
          animation: 'pulse-red 1.5s infinite',
          marginRight: '8px'
        }}
      />
      <span style={{ 
        color: '#ff0000', 
        fontWeight: 'bold', 
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        textShadow: '0 0 5px rgba(255, 0, 0, 0.5)',
        whiteSpace: 'nowrap'
      }}>
        ¡En vivo!
      </span>
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
