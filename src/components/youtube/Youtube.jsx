import React, { useEffect, useState } from 'react';
import spinner180 from '../../assets/loading-180-v2.svg';
import style from "./Youtube.module.css";
import styleLoading from "../meta-comp/css/StyleLoading.module.css"

const fetchPlaylist = async (url, playlist = true) => {
  let jsonUrl;
  if(playlist){
    jsonUrl = await fetch(`https://youtube.com/oembed?url=https%3A//www.youtube.com/playlist%3Flist%3D${url}&format=json`, {cache:"reload"});
  }else{
    jsonUrl = await fetch(`https://youtube.com/oembed?url=${url}&format=json`, {cache:"reload"})
  }
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
    const { title } = await fetchPlaylist(url, false);
    return { type: 'video', id: videoMatch[1], thumbnail: `https://i.ytimg.com/vi/${videoMatch[1]}/maxresdefault.jpg`, url: `https://www.youtube.com/embed/${videoMatch[1]}`, title};
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
    console.log("ha")
    const handlePageLoad = () => {
      const youtubeThumbnail = document.querySelectorAll(`.${style.divIframe}`);
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
    return <div className={[style.divIframe, styleLoading.skeleton].join(" ")}>
          <img
      src={spinner180.src}
      width={25 * 16}
      height={25 * 9}
      alt={"loading"}
      loading="eager"
      className={style.youtube_thumbnail}
    />
    </div>;
    // return <img src={spinner180v2.src} alt="loading"></img>;
  }


  return (
    <div className={style.divIframe} data-url={video.url}>
      <img
        src={video?.thumbnail}
        width={25 * 16}
        height={25 * 9}
        alt={video?.title}
        loading="lazy"
        className={style.youtube_thumbnail}
      />
      <h2 className={style.tituloYoutube}>{video?.title}</h2>
      <div className={style.youtube_play_button}></div>
    </div>
  );
};

export default VideoComponent;