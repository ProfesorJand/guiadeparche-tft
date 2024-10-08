import React, { useEffect, useState } from 'react';
import ImgTier from './ImgTier';
import CampeonesBordeTFTMeta from "./CampeonesBordeTFTMeta";
import InfoComp from './InfoComp';
import { fetchingMetaTFTPBE } from 'src/json/updates/constantesPBE.js';
import styles from "./css/ContainerMeta.module.css";
import LoadingMetaTFT from "./LoadingMetaTFT.jsx";

const ContainerMeta = ({ version, set }) => {
  const [loaded, setLoaded] = useState(false);
  const [metaPBE, setMetaPBE] = useState({});
  const [selected, setSelected] = useState({});
  const [selectedAlternativa, setSelectedAlternativa] = useState({});

  useEffect(() => {
    console.time("fetchingMetaTFTPBE")
    if(!loaded){
      const fetchMeta = async () => {
        const data = await fetchingMetaTFTPBE();
        setMetaPBE(data);
        setSelected({titulo:data["S"][0]["Titulo"], open:true});
        setSelectedAlternativa({titulo:data["Alternativa-S"][0]["Titulo"], open:true});
      };
      fetchMeta();
     
    }
    console.timeEnd("fetchingMetaTFTPBE")
  },[]);

  useEffect(()=>{
    setLoaded(true);
  },[metaPBE]);

  const handleSelect = ({titulo, alternativa = false, open = false}) => {
    if(alternativa){
      setSelectedAlternativa({titulo, open})
    }else{
      setSelected({titulo, open})
    }
  };


  return (
    <div id="meta" className={styles.containerMeta}>
      <h2 className={[styles.titulo, styles.paddingTop].join(" ")}>
        Meta Comps TFT
      </h2>
      {!Object.keys(metaPBE).length > 0 && <LoadingMetaTFT alternativa={false}/>}
      {Object.keys(metaPBE).map((key, index) => {
        if (!key.includes("Alternativa") && !key.includes("Oculto")) {
          return (
            <div key={key}>
              <div className={styles.containerTier} key={index}>
                <ImgTier llave={key} index={index} alternativa={false}/>
                <div className={styles.containerChampionTierList}>
                  {metaPBE[key].map((champTier, i) => (
                    <CampeonesBordeTFTMeta
                      key={i}
                      imgCampeon={champTier.ImgCampeon}
                      tresEstrellas={champTier.imgEstrellas}
                      titulo={champTier.Titulo}
                      IconoSuperior={champTier.imgRecuadro}
                      coste={champTier.CosteCampeon}
                      handleSelect={handleSelect}
                      selected={selected}
                      selectedAlternativa={selectedAlternativa}
                    />
                  ))}
                </div>
              </div>
              <InfoComp
                  championsTier={metaPBE[key]}
                  index={index}
                  alternativa={false}
                  handleSelect={handleSelect}
                  selected={selected}
                />
            </div>
          );
        }
        return null;
      })}
      <h2 className={[styles.titulo, styles.paddingTop].join(" ")}>Aumentos de Heroes Meta TFT</h2>
      {!Object.keys(metaPBE).length > 0 && <LoadingMetaTFT alternativa={true}/>}
      {Object.keys(metaPBE).map((key, index) => {
        if (key.includes("Alternativa")) {
          return (
            <div key={key}>
              <div className={styles.containerTier}>
                <ImgTier llave={key} index={index} alternativa={true}/>
                <div className={styles.containerChampionTierList}>
                  {metaPBE[key].map((champTier, i) => (
                    <CampeonesBordeTFTMeta
                      key={i}
                      imgCampeon={champTier.ImgCampeon}
                      tresEstrellas={champTier.imgEstrellas}
                      titulo={champTier.Titulo}
                      IconoSuperior={champTier.imgRecuadro}
                      coste={champTier.CosteCampeon}
                      alternativa={true}
                      handleSelect={handleSelect}
                      selected={selected}
                      selectedAlternativa={selectedAlternativa}
                    />
                  ))}
                </div>
              </div>
                <InfoComp
                  championsTier={metaPBE[key]}
                  index={index}
                  alternativa={true}
                  handleSelect={handleSelect}
                  selectedAlternativa={selectedAlternativa}
                />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ContainerMeta;