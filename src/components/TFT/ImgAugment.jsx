import React from "react";
import { getLocalTftImage } from "@utils/images";
import Tooltip from "@components/tooltips";
import style from "./css/ImgItem.module.css";

const ImgAugment = ({ augment, className = "", type="augment" }) => {
	if (!augment) return null;
	return (
		<Tooltip type={type} augment={augment}>
			<div className={`${style.itemContainer} ${className}`.trim()}>
				{augment.icon && (
					<img 
						src={getLocalTftImage(augment.icon, 'augments/choiceui')} 
						alt={`${augment.name || augment.nombre}`} 
						crossOrigin="anonymous" 
						className={style.itemIcon}
					/>
				)}
			</div>
		</Tooltip>
	);
};

export default ImgAugment;
