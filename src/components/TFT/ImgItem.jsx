import React from "react";
import Tooltip from "@components/tooltips";
import { getLocalTftImage } from "@utils/images";
import style from "./css/ImgItem.module.css";

const ImgItem = ({ item, className = "", type="item" }) => {
	if (!item) return null;
	return (
		<Tooltip item={item} type={type}>
			<div className={`${style.itemContainer} ${className}`.trim()}>
				{item.icon && (
					<img 
						src={getLocalTftImage(item.icon, item.apiName?.includes('Augment') ? 'augments/hexcore' : 'items')} 
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
