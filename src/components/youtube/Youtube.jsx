import React, { useEffect, useState } from 'react';
import spinner180 from '../../assets/loading-180-v2.svg';
import style from "./Youtube.module.css";
import styleLoading from "../meta-comp/css/StyleLoading.module.css"

const fetchPlaylist = async (url, playlist = true) => {
  try {
    const encoded = encodeURIComponent(url);
    const apiUrl = playlist
      ? `https://youtube.com/oembed?url=https%3A//www.youtube.com/playlist%3Flist%3D${url}&format=json`
      : `https://youtube.com/oembed?url=${encoded}&format=json`;
    const jsonUrl = await fetch(apiUrl, { cache: "reload" });
    if (!jsonUrl.ok) throw new Error("oembed error");
    const { thumbnail_url, html, title } = await jsonUrl.json();
    const srcMatch = html ? html.match(/src="([^"]+)"/) : null;
    return {
      thumbnail: thumbnail_url ? thumbnail_url.replace("hqdefault.jpg", "maxresdefault.jpg") : '',
      url: srcMatch ? srcMatch[1] : null,
      title: title || 'Video de YouTube'
    };
  } catch (err) {
    return { thumbnail: '', url: null, title: 'Video de YouTube' };
  }
};

const getId = async (url, titulo) => {
  const videoRegExp = /(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const playlistRegExp = /(?:youtube\.com\/(?:playlist|embed\/videoseries)\?list=)([^"&?/ ]+)/;

  const videoMatch = url.match(videoRegExp);
  const playlistMatch = url.match(playlistRegExp);
  if (playlistMatch) {
    const playlistData = await fetchPlaylist(playlistMatch[1]);
    const newurl = new URL(url);
    const playlistId = newurl.searchParams.get('list');
    const siParam = newurl.searchParams.get('si') || '';
    return {
      type: "playlist",
      url: `https://www.youtube.com/embed/videoseries?list=${playlistId}&si=${siParam}&autoplay=1&enablejsapi=1`,
      thumbnail: playlistData.thumbnail,
      title: playlistData.title || titulo
    };
  } else if (videoMatch) {
    const videoId = videoMatch[1];
    let title = titulo || 'video de Jupeson';
    let thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    try {
      const meta = await fetchPlaylist(url, false);
      if (meta?.title && meta.title !== 'Video de YouTube') title = meta.title;
      if (meta?.thumbnail) thumbnail = meta.thumbnail;
    } catch (_) {}

    return {
      type: 'video',
      id: videoId,
      thumbnail,
      url: `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`,
      title
    };
  } else {
    return null;
  }
};

const VideoComponent = ({
  src,
  loading = "lazy",
  titulo = "video de Jupeson",
  vertical = false,
  aspectRatio = "16:9"
}) => {
  const [video, setVideo] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Determina si el video se debe reproducir en formato vertical (9:16)
  const isVertical = Boolean(
    vertical ||
    aspectRatio === "9:16" ||
    aspectRatio === "vertical" ||
    (src && src.includes('/shorts/'))
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await getId(src, titulo);
        if (videoData) {
          setVideo(videoData);
        } else {
          setHasError(true);
        }
      } catch (e) {
        console.error("Error al cargar datos del video de YouTube:", e);
        setHasError(true);
      }
    };
    fetchData();
  }, [src, titulo]);

  if (hasError) {
    return (
      <div
        className={`${style.divIframe} ${isVertical ? style.verticalContainer : ''}`}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: '#1e1f22', border: '1px solid #444', borderRadius: '8px' }}
      >
        <a href={src} target="_blank" rel="noopener noreferrer" style={{ color: '#5865F2', textDecoration: 'underline', fontWeight: 'bold' }}>
          Video no disponible. Haz clic aquí para intentar verlo directo en YouTube.
        </a>
      </div>
    );
  }

  if (!video) {
    return (
      <div className={`${style.loadingContainer} ${isVertical ? style.verticalContainer : ''}`}>
        <img
          src={spinner180.src}
          alt={"loading"}
          loading="eager"
          className={style.loading}
          width="48"
          height="48"
        />
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className={`${style.divIframe} ${isVertical ? style.verticalContainer : ''}`}>
        <iframe
          src={video.url}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          width="100%"
          height="100%"
          className={style.iframeYoutube}
        />
      </div>
    );
  }

  return (
    <div
      className={`${style.divIframe} ${isVertical ? style.verticalContainer : ''}`}
      data-url={video.url}
      onClick={() => setIsPlaying(true)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={imgError ? video?.thumbnail.replace('maxresdefault.jpg', 'hqdefault.jpg') : video?.thumbnail}
        width={isVertical ? 360 : 25 * 16}
        height={isVertical ? 640 : 25 * 9}
        alt={video?.title}
        loading={loading}
        className={`${style.youtube_thumbnail} ${isVertical ? style.verticalThumbnail : ''}`}
        onError={() => setImgError(true)}
        onLoad={(e) => {
          if (e.target.naturalWidth === 120 && e.target.src.includes('maxresdefault.jpg')) {
            setImgError(true);
          }
        }}
      />
      <h2 className={style.tituloYoutube}>{video?.title}</h2>
      <div className={style.youtube_play_button}></div>
    </div>
  );
};

export default VideoComponent;