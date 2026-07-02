import React from "react";
import { urlDragon } from "@stores/dataTFT";
import Tooltip from "@components/tooltips";
import style from "./css/ImgItem.module.css";

const ImgItem = ({ item, className = "", type="item" }) => {
	if (!item) return null;
	return (
		<Tooltip item={item} type={type}>
			<div className={`${style.itemContainer} ${className}`.trim()}>
				{item.icon && (
					<img 
						src={urlDragon() + item.icon.toLowerCase().replace(".tex", ".png")} 
						alt={`${item.name}`} 
						crossOrigin="anonymous" 
						className={style.itemIcon}
					/>
				)}
			</div>
		</Tooltip>
	);
};

export default ImgItem;
