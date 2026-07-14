import React from "react";
import { getLocalTftImage } from "@utils/images";
import Tooltip from "@components/tooltips";
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

	let imageSrc = championData[imgType];
	let category = `champions/${imgType}`;
	
	if (!imageSrc && championData.tileIcon) {
		imageSrc = championData.tileIcon;
		category = 'champions/tileIcon';
	}
	if (!imageSrc && championData.squareIcon) {
		imageSrc = championData.squareIcon;
		category = 'champions/squareIcon';
	}
	if (!imageSrc && championData.icon) {
		imageSrc = championData.icon;
		category = 'champions/icon';
	}

	if (imageSrc) {
		imageSrc = getLocalTftImage(imageSrc, category);
	}

	return (
		<Tooltip type="default" text={name}>
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

				{(stars === 3 || stars === 4) && (
					<div className={style.starsContainer}>
						<img className={style.imgEstrella}src={stars === 3 ? "/tft/assets/3-estrellas.webp" : ""} alt={"3-estrellas-tft-gp"}/>
						{/* {Array.from({ length: stars }).map((_, i) => (
							<svg key={`star-${i}`} width="14" height="14" viewBox="0 0 24 24" fill="gold" stroke="black" strokeWidth="1.5">
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
							</svg>
						))} */}
					</div>
				)}
			</div>
		</Tooltip>
	);
};

export default ImgCampeon;
