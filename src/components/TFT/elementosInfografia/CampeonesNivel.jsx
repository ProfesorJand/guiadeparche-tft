import React from "react";
import style from "./css/CampeonesNivel.module.css";
import {dataTFTChampions, dataTFTAllItems, urlDragon} from "@stores/dataTFT";
import { useStore } from "@nanostores/react";
import Tooltip from "@components/tooltips";
import { isNonNullExpression } from "typescript";
import ImgCampeon from "../ImgCampeon";
import styleImgCampeon from "../css/ImgCampeon.module.css";

const CampeonesNivel = ({comp, isMP = false, isEarly = false}) => {
	const [isMounted, setIsMounted] = React.useState(false);
	React.useEffect(() => { setIsMounted(true); }, []);
	console.log({comp})
	const championsTFT = useStore(dataTFTChampions) || [];
	const allItemsTFT = useStore(dataTFTAllItems) || [];

	const safeChampionsTFT = isMounted ? championsTFT : [];
	const safeAllItemsTFT = isMounted ? allItemsTFT : [];

	if(!isMP && isEarly){
		const niveles = comp?.niveles || [];
		const nivelEarly = niveles[0] || {};
		const level = nivelEarly.lv;
		
		const ChampionsEarly = nivelEarly.campeones?.map((champ) => {
			const championData = safeChampionsTFT.find((c) => c.apiName === champ.apiNameCampeon);
			// Retornamos el championData completo o un objeto con nombre genérico si no se encuentra (para evitar errores en render)
			return championData || { ...champ, name: champ.apiNameCampeon };
		}) || [];
		
		const itemsPerChamp = nivelEarly.campeones?.map((champ) => {
			const items = [];
			(champ.apiNameItemsDelCampeon || []).forEach((itemApiName) => {
				const itemData = safeAllItemsTFT.find((i) => i.apiName === itemApiName);
				if (itemData) items.push(itemData);
			});
			return items;
		}) || [];

		return (
			<div className={style.cardChampEarly}>
				{safeChampionsTFT.length > 0 && ChampionsEarly.length > 0 ? (
					ChampionsEarly.map((champ, index) => (
						<div className={`${style.cChampEarly}`} key={`skeleton-${index}`}>
							<ImgCampeon 
								key={champ.apiName || champ.apiNameCampeon || index} 
								championData={champ}
								items={itemsPerChamp[index] || []}
								className={style.cChampEarly}
							/>
						</div>
					))
				) : (
					Array.from({ length: 5 }).map((_, index) => (
						<div className={`${style.cChampEarly} ${style.cChampEarlySkeleton}`} key={`skeleton-${index}`}>
							{/* Placeholder vacío simulando carga */}
						</div>
					))
				)}
			</div>
		)
	}
	else if(isMP && isEarly){
		const CampeonesEarly = comp.campeonesEarly.map((champ)=>{

			const championData = safeChampionsTFT.find((c) => c.apiName === champ.apiNameCampeon);
			const champData = championData || { ...champ, name: champ.apiNameCampeon };

			const itemsChamp = [];
			(champ.apiNameItemsDelCampeon || []).forEach((itemApiName) => {
				const itemData = safeAllItemsTFT.find((i) => i.apiName === itemApiName);
				if (itemData) itemsChamp.push(itemData);
			});

			return {
				champData,
				itemsChamp,
			};

		}) || [];

		return (
			<div className={style.cardChampEarly}>
				{safeChampionsTFT.length > 0 && CampeonesEarly.length > 0 ? (
					CampeonesEarly.map((champ, indexChamp) => (
						<div className={`${style.cChampEarly}`} key={`${indexChamp}`}>
						<ImgCampeon
							championData={champ.champData}
							items={champ.itemsChamp}
							className={style.cChampEarly}
						/>
						</div>
					))
				) : (
					Array.from({ length: 3 }).map((_, skeletonIndex) => (
						<div className={`${style.cChampEarly} ${style.cChampEarlySkeleton}`} key={`skeleton-early-${skeletonIndex}`}>
							{/* Placeholder vacío simulando carga */}
						</div>
					))
				)}
			</div>
		)
	}

	else if(isMP && !isEarly){
		const CampeonesPorNivel = comp?.niveles?.map((nivel) => {
		const dataChamp = nivel.campeones?.map((champ) => {
			const championData = safeChampionsTFT.find((c) => c.apiName === champ.apiNameCampeon);
			const champData = championData || { ...champ, name: champ.apiNameCampeon };

			const itemsChamp = [];
			(champ.apiNameItemsDelCampeon || []).forEach((itemApiName) => {
				const itemData = safeAllItemsTFT.find((i) => i.apiName === itemApiName);
				if (itemData) itemsChamp.push(itemData);
			});

			return {
				champData,
				itemsChamp,
			};
		}) || [];

		return {
			level: nivel.lv,
			etapa:nivel.etapa,
			ronda: nivel.ronda,
			data: dataChamp,
			roll:nivel.roll,
		};
	}) || [];

	const maxCampeones = comp?.niveles?.[comp?.niveles?.length - 1]?.campeones?.length || 5;
	const cols = Math.min(maxCampeones, 9);
  
	return (
		<div className={style.cardChampNivelesMP}>
			{CampeonesPorNivel.length > 0 ? (
				CampeonesPorNivel.map((nivel, index) => (
					<div className={style.cardChampNivelesindividual} key={`nivel-${nivel.level}-${index}`}>
						<h4 style={{ margin: "10px 0 15px 0", display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", color: "var(--text-color)" }}>
							Lv {nivel.level} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg> ronda {nivel.etapa}-{nivel.ronda}
							{nivel.roll && 
								<span>(Roll)</span>
							}
						</h4>
						<div 
							className={`${style.cardChampEarly} ${style.cChampLevelMP}`} 
							style={{ 
								"--cantidadMaxChamp": cols, 
								flexWrap: "nowrap", 
								overflowX: "auto",
								paddingBottom: "8px" 
							}}
						>
							{safeChampionsTFT.length > 0 && nivel.data.length > 0 ? (
								nivel.data.map((champ, indexChamp) => (
									<div className={`${style.cChampEarly}`} key={champ.champData?.apiName || champ.champData?.name || indexChamp}>
										<ImgCampeon
											key={champ.champData?.apiName || champ.champData?.name || indexChamp}
											championData={champ.champData}
											items={champ.itemsChamp}
											showName={false}
											className={style.cChampEarly}
										/>
									</div>
								))
							) : (
								Array.from({ length: cols }).map((_, skeletonIndex) => (
									<div className={`${style.cChampEarly} ${style.cChampEarlySkeleton} ${style.cChampLevelMP}`} key={`skeleton-${nivel.level}-${skeletonIndex}`}>
										{/* Placeholder vacío simulando carga */}
									</div>
								))
							)}
						</div>
					</div>
				))
			) : null}
		</div>
	)}
}

export default CampeonesNivel;