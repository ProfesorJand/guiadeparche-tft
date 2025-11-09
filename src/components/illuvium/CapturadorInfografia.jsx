import React, { useEffect, useState } from "react";

const CapturadorInfografia = ({ miniRef, positionRef, carriesInfoRef }) => {
  const [miniHTML, setMiniHTML] = useState("");
  const [positionHTML, setPositionHTML] = useState("");
  const [carriesHTML, setCarriesHTML] = useState("");

  useEffect(() => {
    // Tomamos el HTML de los elementos referenciados si existen
    if (miniRef?.current) {
      setMiniHTML(miniRef.current.outerHTML);
    } 
    if (positionRef?.current) {
      setPositionHTML(positionRef.current.outerHTML);
    }
    if (carriesInfoRef?.current) {
      setCarriesHTML(carriesInfoRef.current.outerHTML);
    }
  }, [positionRef, carriesInfoRef]);

  return (
    <div>
      <div>
        <div>
          {miniHTML ? (
            <div dangerouslySetInnerHTML={{ __html: miniHTML }} />
          ) : (
            <p>❌ No se encontró miniRef</p>
          )}
        </div>

        <div>
          {positionHTML ? (
            <div dangerouslySetInnerHTML={{ __html: positionHTML }} />
          ) : (
            <p>❌ No se encontró positionRef</p>
          )}
        </div>
        <div>
          <img src={"/tft/assets/Jupeson_LOGO_Sin_Publicidad.png"} alt="logoJupeson"></img>
          <img src={"/illuvium/Illuvium_Arena_Logo.png"} alt="logoIlluvium redondo"></img>
          <img src={"/illuvium/illuvium-logo.png"} alt="logoIlluvium Arena"></img>
        </div>
      </div>

      <div>
        {carriesHTML ? (
          <div dangerouslySetInnerHTML={{ __html: carriesHTML }} />
        ) : (
          <p>❌ No se encontró carriesInfoRef</p>
        )}
      </div>
    </div>
  );
};

export default CapturadorInfografia;
