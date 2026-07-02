import React from "react";
import { urlDragon } from "@stores/dataTFT";
import style from "./css/ImgCampeon.module.css";

const ImgCampeon = ({
	championData,
	imgType = "tileIcon",
	showName = true,
	stars = 0,
	className = ""
}) => {
	if (!championData) {
		return (
			<div className={`${style.campeonContainer}`}>
				{/* Skeleton vacío */}
			</div>
		);
	}

	const cost = championData.cost || 1;
	const name = championData.name || championData.apiName || "";

	// Se busca la imagen solicitada, con fallbacks a las otras opciones
	let imageSrc = championData[imgType] || championData.tileIcon || championData.squareIcon || championData.icon;
	if (imageSrc) {
		imageSrc = urlDragon() + imageSrc.toLowerCase().replace(".tex", ".png");
	}

	return (
		<div 
			className={`${style.campeonContainer} ${className}`.trim()} 
			style={{ borderColor: `var(--color-hex-cost-${cost})` }}
		>
			{imageSrc && (
				<img 
					className={style.imgChampion} 
					src={imageSrc} 
					alt={name} 
					crossOrigin="anonymous" 
				/>
			)}

			{showName && name && (
				<span className={style.nameChampEarly}>{name}</span>
			)}

			{stars > 0 && (
				<div style={{ position: "absolute", top: "2px", width: "100%", display: "flex", justifyContent: "center", zIndex: 2 }}>
					{Array.from({ length: stars }).map((_, i) => (
						<svg key={`star-${i}`} width="14" height="14" viewBox="0 0 24 24" fill="gold" stroke="black" strokeWidth="1.5">
							<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
						</svg>
					))}
				</div>
			)}
		</div>
	);
};

export default ImgCampeon;
