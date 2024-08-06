import React, { useEffect, useState } from 'react';
import ImgTier from './ImgTier';
import ContainerChampionTierList from './ContainerChampionTierList';
import InfoComp from './InfoComp';
import { fetchingMetaTFTPBE } from 'src/json/updates/constantesPBE.js';
import gifSpinning from "@assets/gif-spining.gif"
import Adsense from '@components/adsense/Adsense.jsx';

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
    <div id="meta" className="containerMeta">
      <h1 className="titulo paddingTop">
        Mejores Composiciones Meta Parche {version}<br />TFT Set {set} | Teamfight Tactics
      </h1>
      {Object.keys(metaPBE).map((key, index) => {
        if (!key.includes("Alternativa")) {
          return (
            <div key={key}>
              <div className="containerTier" key={index}>
                <ImgTier llave={key} index={index} />
                <ContainerChampionTierList
                  championsTier={metaPBE[key]}
                  index={index}
                  alternativa={false}
                  handleSelect={handleSelect}
                  selected={selected}
                />
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
      {/* <Adsense dimension={"horizontal"} ></Adsense> */}
      <h2 className="titulo paddingTop">Aumentos de Heroes Meta TFT</h2>
      {Object.keys(metaPBE).map((key, index) => {
        if (key.includes("Alternativa")) {
          return (
            <div key={key}>
              <div className="containerTier">
                <ImgTier llave={key} index={index} />
                <ContainerChampionTierList
                  championsTier={metaPBE[key]}
                  index={index}
                  pbe={true}
                  alternativa={true}
                  handleSelect={handleSelect}
                  selectedAlternativa={selectedAlternativa}
                />
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
      <style>{`
            .containerTier{
                display: flex;
                flex-direction: row;
            }
            .paddingTop{
                margin-top:1.5rem;
                border-top: 2px solid var(--border-color);
            }
            .titulo{
                font-size: smaller;
            }
            @media only screen and (min-width:900px){
                .titulo{
                    font-size: larger;
                }
            }
        `}</style>
    </div>
  );
};

export default ContainerMeta;