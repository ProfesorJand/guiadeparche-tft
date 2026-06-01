import { useState } from "react";
import style from "./Youtube.module.css";

export default function VideoComponent({ video }) {
  const [playing, setPlaying] = useState(false);

  if (!video) return null;

  return (
    <div
      className={style.divIframe}
      onClick={() => setPlaying(true)}
    >
      {!playing ? (
        <>
          <img
            src={video.thumbnail}
            width={400}
            height={225}
            alt={video.title}
            loading="lazy"
            className={style.youtube_thumbnail}
          />

          <p className={style.tituloYoutube}>
            {video.title}
          </p>

          <div className={style.youtube_play_button}></div>
        </>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}