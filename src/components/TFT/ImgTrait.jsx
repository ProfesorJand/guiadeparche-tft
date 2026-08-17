import React from "react";
import { getLocalTftImage } from "@utils/images";
import Tooltip from "@components/tooltips";
import { getTraitDisplayName } from "@components/main/Admin/TraitsList";
import style from "./css/ImgTrait.module.css";

const ImgTrait = ({
  trait,
  showName = true,
  className = ""
}) => {
  if (!trait) {
    return (
      <div className={`${style.traitContainer}`}>
        {/* Skeleton vacío */}
      </div>
    );
  }

  const name = getTraitDisplayName(trait);
  
  // Las imágenes de sinergias a veces vienen como .tex en el icono original, aquí nos aseguramos de que sea .png
  let imageSrc = trait.icon || "";
  if (imageSrc.includes("http")) {
    imageSrc = imageSrc.replace(".tex", ".png").toLowerCase();
  } else if (imageSrc) {
    imageSrc = getLocalTftImage(imageSrc, 'traits');
  }

  return (
    <Tooltip type="default" text={name}>
      <div className={`${style.traitContainer} ${!showName ? style.noName : ""} ${className}`.trim()}>
        {imageSrc && (
          <img 
            className={style.imgTrait} 
            src={imageSrc} 
            alt={name} 
            crossOrigin="anonymous" 
          />
        )}

        {showName && name && (
          <span className={style.nameTrait}>{name}</span>
        )}
      </div>
    </Tooltip>
  );
};

export default ImgTrait;
