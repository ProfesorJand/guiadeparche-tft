import React, { useEffect, useState } from 'react';
import spinner180v2 from '../../assets/loading-180-v2.svg';
// import spinner180 from '../../assets/loading-180.svg';

const fetchPlaylist = async (playlistId) => {
  const jsonUrl = await fetch(`https://youtube.com/oembed?url=https%3A//www.youtube.com/playlist%3Flist%3D${playlistId}&format=json`);
  const { thumbnail_url, html, title } = await jsonUrl.json();
  const srcMatch = html.match(/src="([^"]+)"/);
  return { thumbnail: thumbnail_url.replace("hqdefault.jpg", "maxresdefault.jpg"), url: srcMatch ? srcMatch[1] : null, title };
};

const getId = async (url, titulo) => {
  const videoRegExp = /(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const playlistRegExp = /(?:youtube\.com\/(?:playlist|embed\/videoseries)\?list=)([^"&?/ ]+)/;

  const videoMatch = url.match(videoRegExp);
  const playlistMatch = url.match(playlistRegExp);
  if (playlistMatch) {
    const { thumbnail, title } = await fetchPlaylist(playlistMatch[1]);
    const newurl = new URL(url);
    const playlistId = newurl.searchParams.get('list');
    const siParam = newurl.searchParams.get('si') || '';
    return { type: "playlist", url: `https://www.youtube.com/embed/videoseries?list=${playlistId}&si=${siParam}}`, thumbnail, title };
  } else if (videoMatch) {
    return { type: 'video', id: videoMatch[1], thumbnail: `https://i.ytimg.com/vi/${videoMatch[1]}/maxresdefault.jpg`, url: `https://www.youtube.com/embed/${videoMatch[1]}`, title: titulo };
  } else {
    return null;
  }
};

const VideoComponent = ({ src, loading = "lazy", titulo="video de Jupeson" }) => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const videoData = await getId(src, titulo);
      setVideo(videoData);
    };
    fetchData();
  }, [src, titulo]);

  useEffect(() => {
    const handlePageLoad = () => {
      const youtubeThumbnail = document.querySelectorAll(".divIframe");
      youtubeThumbnail.forEach(container => {
        container.addEventListener('click', () => {
          const videoId = container.getAttribute('data-url');
          const iframe = document.createElement('iframe');
          iframe.setAttribute("src", videoId + "&autoplay=1&enablejsapi=1");
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
          iframe.setAttribute('allowfullscreen', 'true');
          iframe.setAttribute("width", "100%");
          iframe.setAttribute("height", "100%");
          iframe.classList.add("iframeYoutube");
          container.innerHTML = '';
          container.appendChild(iframe);
        });
      });
    };

    document.addEventListener('astro:page-load', handlePageLoad);

    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  if (!video) {
    return <div className="divIframe"></div>;
    // return <img src={spinner180v2.src} alt="loading"></img>;
  }

  return (
    <div className="divIframe" data-url={video.url} data-loading={loading}>
      <img
        src={video.thumbnail}
        width={25 * 16}
        height={25 * 9}
        alt={video.title}
        loading="lazy"
        className="youtube-thumbnail"
      />
      <div className="youtube-play-button"></div>
      <style>
        {`
          .divIframe{
            display: flex;
            width: 100%;
            position:relative;
            flex-direction:row;
            align-items: center;
            justify-content: center;
            aspect-ratio: 16/9;
          }
          .youtube-thumbnail{
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          .youtube-play-button {
            width: 68px;
            height: 68px;
            background-image: url('https://img.icons8.com/ios-glyphs/90/F00000/play-button-circled.png');
            background-size: cover;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: .3s;
            cursor: pointer;
          }
          .youtube-container:hover img {
            filter: brightness(0.7);
          }
          .iframeYoutube{
            display: flex;
            width: 100%;
            height: 100%;
          }
          .spinner{
            display: flex;
            position: absolute;
          }
          .hideIframe{
            visibility: hidden;
          }
          .hide{
            display: none;
          }
          .divIframe:hover .youtube-play-button {
            transform: translate(-50%, -50%) scale(1.3);
          }
        `}
      </style>
    </div>
  );
};

export default VideoComponent;