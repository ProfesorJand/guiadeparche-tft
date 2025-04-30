import { useStore } from '@nanostores/react';
import { currentStreamer } from 'src/stores/streamers';
import Twitch from '@components/embed/Twitch';
import Kick from '@components/embed/Kick';
import { useEffect } from 'react';

const PlatformStreamer = () => {
  const streamer = useStore(currentStreamer);
  useEffect(()=>{
    console.log({streamer})
  },[streamer])

  if (streamer?.platform === "twitch") {
    return <Twitch/>;
  }
  if (streamer?.platform === "kick") {
    return <Kick/>;
  }

  return (
    <Twitch/>
  );
};

export default PlatformStreamer;
