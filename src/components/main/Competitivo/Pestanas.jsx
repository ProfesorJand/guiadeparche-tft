import React, {useState} from "react";
import style from "../../meta-comp/css/ComposicionPestana.module.css";
import stylePestana from "./css/Pestanas.module.css";
import ModalImage from "../../modal/ModalImagen.jsx";


const Pestana = () =>{
	const [selectedTab, setSelectedTab] = useState(0);
	const handleTabClick = (tabIndex) => {
		if(selectedTab !== tabIndex)
    setSelectedTab(tabIndex);
  };
	return (
		<>
			<div className={style.containerPestanas}>
				<button onClick={() => handleTabClick(0)} className={[selectedTab === 0 ? style.selected : '',style.pestanas].join(" ")}>Open</button>
				<button onClick={() => handleTabClick(1)} className={[selectedTab === 1 ? style.selected : '',style.pestanas].join(" ")}>Tactician's Trials & Cup</button>
				<button onClick={() => handleTabClick(2)} className={[selectedTab === 2 ? style.selected : '',style.pestanas].join(" ")}>Golden Spatula Americas</button>
				<button onClick={() => handleTabClick(3)} className={[selectedTab === 3 ? style.selected : '',style.pestanas].join(" ")}>Tactician's Crown</button>
			</div>
			<div className={stylePestana.contenido}>
				{selectedTab === 0 && 
				<div className={stylePestana.contenidoInfo}>
					<ModalImage client:only="react">
						<img className={stylePestana.image} src="/competitivo/open-image-TFT-set12.webp" alt="Open Latam TFT"/>
					</ModalImage>
				<p>Hosteado por ESL / Faceit Full detalles en: <a href="https://play.eslgaming.com/latin-america/news/284275/" target="_blank" rel="noreferrer noopener">ELSGAMING</a></p>
				<p>Premios:</p>
				<ul>
					<li>15.000USD (son 3 de 5.000USD c/u)</li>
					<li>Top 4 avanza a Tactician’s Trials</li>
					<li>Top 5-8 avanza a Tactician’s Cup</li>
				</ul>
				<ModalImage client:only="react">
					<img src="/competitivo/premios-open-TFT-Set-12.webp" alt="premios open TFT Set 12"/>
				</ModalImage>
				
				<p>Open 1 - <strike>REGISTRO CERRADO</strike></p>
				<ul>
					<li>Cierre de Pre-Registro: Lunes 05/08/2024 a las 19:00 MX, 20:00 CO, 22:00 AR</li>
					<li>Fecha de competencia: Viernes 09/08/2024 - Domingo 11/08/2024</li>
				</ul>
				
				<p>Open 2 - <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrL8VkvsR8hgiLQ2tkSCysKxlcAKlV9WAhtkgw2LtSqGMjug/viewform" target="_blank" rel="noopener noreferrer">REGISTRO ABIERTO</a></p>
			
				<ul>
					<li>Cierre de Pre-Registro: Lunes 02/09/2024 a las 17:00 MX, 18:00 CO, 20:00 AR</li>
					<li>Fecha de competencia: Viernes 06/09/2024 - Domingo 08/09/2024</li>

				</ul>
				<p>Open 3 - <a href="https://docs.google.com/forms/d/e/1FAIpQLSdY4ojLNNQ_DmaYPKdLnXiV9CT89bILO41TURoDfgD8rLZFdQ/viewform" target="_blank" rel="noopener noreferrer">REGISTRO ABIERTO</a></p>
				<ul>	
					<li>Cierre de Pre-Registro: Lunes 30/09/2024 a las 17:00 MX, 18:00 CO, 20:00 AR</li>
					<li>Fecha de competencia: Viernes 04/10/2024 - Domingo 06/10/2024</li>
				</ul>
				<p>ESL TFT Latam - <a href="https://discord.com/invite/TGxS5Rxbd3" target="_blank" rel="noopener noreferrer">Discord</a></p>
				</div>
				}
				{selectedTab === 1 && <div className={stylePestana.contenidoInfo}>
					<ModalImage client:only="react">
						<img className={stylePestana.image} src="/competitivo/america-esports.webp" alt="America ESPORTS TFT"/>
					</ModalImage>
					<p>Hosteado por GGtech full detalles en: <a href="https://americastftesports.teamfighttactics.leagueoflegends.com/landing/mnm-tacticians-cup-i" target="_blank" rel="noreferrer noopener">AMERICAS TFT ESPORTS</a></p>
				 	<p>Premios:</p>
					<ul>
						<li>12.000USD (entre todas las Cups)</li>
						<li>Top 58 de Tactician’s Trials #1 pasa a la Tactician’s Cup #1</li>
						<li>Top 56 de Tactician’s Trial #2 y #3 pasan a la Tactican’s Cup #2 y #3</li>
						<li>Los Mejores de las Cups pasan a la Golden Spatula Americas</li>
					</ul>
					<p>REGISTRO para Trials y Cups según cada servidor en: <a href="https://americastftesports.teamfighttactics.leagueoflegends.com/landing/mnm-tacticians-cup-i" target="_blank" rel="noopener noreferrer">AMERICA TFT ESPORTS</a></p>
					<p><a href="https://discord.com/invite/xqV5K4gw5s" target="_blank" rel="noreferrer noopener"></a>Discord Americas TFT Esports: te lo mandan al inscribirte.</p>
				</div>}
				{selectedTab === 2 && <div className={stylePestana.contenidoInfo}>
					<p>La Americas Golden Spatula se erige como la cúspide de los esports de TFT Americas.</p>
					<p>Premios:</p>
					<ul>
						<li>Clasificación a Tacticians Crown</li>
					</ul>
					<p>Transmisión oficial en: <a href="https://www.twitch.tv/teamfighttactics" target="_blank" rel="noopener noreferrer">twitch.tv/teamfighttactics</a></p>
				</div>

				}
				{selectedTab === 3 && <div className={stylePestana.contenidoInfo}>
				<ModalImage client:only="react">
					<img className={stylePestana.image} src="/competitivo/ecosystem-update.webp" alt="Open Latam TFT"/>
				</ModalImage>
					<h2>TFT Official Channels</h2>
					<p>Stay up-to-date on the latest TFT announcements and updates by following our channels:</p>
					<ul>
						<li>Twitter: <a href="https://twitter.com/tft" target="_blank" rel="noreferrer noopener">@TFT</a></li>
						<li>Facebook: <a href="https://www.facebook.com/@playtft" target="_blank" rel="noreferrer noopener">@playtft</a></li>
						<li>Instagram: <a href="https://www.instagram.com/teamfighttactics" target="_blank" rel="noreferrer noopener">@teamfighttactics</a></li>
						<li>YouTube: <a href="https://www.youtube.com/@playtft" target="_blank" rel="noreferrer noopener">@playtft</a></li>
						<li>Website: <a href="https://teamfighttactics.leagueoflegends.com/en-us/news/" target="_blank" rel="noreferrer noopener">TFT Official News</a></li>
						<li>Twitch: <a href="https://www.twitch.tv/teamfighttactics" target="_blank" rel="noreferrer noopener">twitch.tv/teamfighttactics</a></li>

					</ul>
				</div>}
			</div>
		</>
	)
}

export default Pestana;