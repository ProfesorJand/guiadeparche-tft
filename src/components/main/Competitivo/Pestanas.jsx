import React, {useState} from "react";
import style from "../../meta-comp/css/ComposicionPestana.module.css";

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
				<button onClick={() => handleTabClick(3)} className={[selectedTab === 3 ? style.selected : '',style.pestanas].join(" ")}>Tacticia's Crown</button>
			</div>
			<div className={style.contenido}>
				{selectedTab === 0 && "hola"}
				{selectedTab === 1 && "como"}
				{selectedTab === 2 && "estas"}
				{selectedTab === 3 && "tu"}
			</div>
		</>
	)
}

export default Pestana;