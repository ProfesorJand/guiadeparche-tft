import { useStore } from '@nanostores/react';
import { currentStreamer } from 'src/stores/streamers';
import Twitch from '@components/embed/Twitch';
import Kick from '@components/embed/Kick';

const PlatformStreamer = () => {
  const streamer = useStore(currentStreamer);
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
