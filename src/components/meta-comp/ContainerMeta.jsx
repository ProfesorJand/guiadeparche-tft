import React, { useEffect, useState } from 'react';
import ImgTier from './ImgTier';
import ContainerChampionTierList from './ContainerChampionTierList';
import CampeonesBordeTFTMeta from "./CampeonesBordeTFTMeta";
import InfoComp from './InfoComp';
import { fetchingMetaTFTPBE } from 'src/json/updates/constantesPBE.js';
import gifSpinning from "@assets/gif-spining.gif"
import Adsense from '@components/adsense/Adsense.jsx';
import styles from "./css/ContainerMeta.module.css";

const ContainerMeta = ({ version, set }) => {
  const [loaded, setLoaded] = useState(false);
  const [metaPBE, setMetaPBE] = useState({});
  const [selected, setSelected] = useState({});
  const [selectedAlternativa, setSelectedAlternativa] = useState({})

  useEffect(() => {
    if(!loaded){
      const fetchMeta = async () => {
        const data = await fetchingMetaTFTPBE();
        setMetaPBE(data);
        setSelected({titulo:data["S"][0]["Titulo"], open:true})
        setSelectedAlternativa({titulo:data["Alternativa-S"][0]["Titulo"], open:true})
      };
      fetchMeta();
     
    }
  },[]);

  useEffect(()=>{
    setLoaded(true);
  },[metaPBE])

  const handleSelect = ({titulo, alternativa = false, open = false}) => {
    if(alternativa){
      setSelectedAlternativa({titulo, open})
    }else{
      setSelected({titulo, open})
    }
  };

  // if(!loaded){
  //   return (
  //     <img src={gifSpinning.src} alt="loading" width={64} height={64}/>
  //   )

  // }

  return (
    <div id="meta" className={styles.containerMeta}>
      <h1 className={[styles.titulo, styles.paddingTop].join(" ")}>
        Mejores Composiciones Meta Parche {version}<br />TFT Set {set} | Teamfight Tactics
      </h1>
      {Object.keys(metaPBE).map((key, index) => {
        if (!key.includes("Alternativa")) {
          return (
            <div key={key}>
              <div className={styles.containerTier} key={index}>
                <ImgTier llave={key} index={index} />
                <div className={styles.containerChampionTierList}>
                  {metaPBE[key].map((champTier, i) => (
                    <CampeonesBordeTFTMeta
                      key={i}
                      meta={champTier}
                      nombreCampeon={champTier.Campeon}
                      imgCampeon={champTier.ImgCampeon}
                      tresEstrellas={champTier.imgEstrellas}
                      titulo={champTier.Titulo}
                      IconoSuperior={champTier.imgRecuadro}
                      coste={champTier.CosteCampeon}
                      index={index}
                      i={i}
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
      {/* <Adsense dimension={"cuadrado"}></Adsense> */}
      <h2 className={[styles.titulo, styles.paddingTop].join(" ")}>Aumentos de Heroes Meta TFT</h2>
      {Object.keys(metaPBE).map((key, index) => {
        if (key.includes("Alternativa")) {
          return (
            <div key={key}>
              <div className={styles.containerTier}>
                <ImgTier llave={key} index={index} />
                <div className={styles.containerChampionTierList}>
                  {metaPBE[key].map((champTier, i) => (
                    <CampeonesBordeTFTMeta
                      key={i}
                      meta={champTier}
                      nombreCampeon={champTier.Campeon}
                      imgCampeon={champTier.ImgCampeon}
                      tresEstrellas={champTier.imgEstrellas}
                      titulo={champTier.Titulo}
                      IconoSuperior={champTier.imgRecuadro}
                      coste={champTier.CosteCampeon}
                      index={index}
                      i={i}
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