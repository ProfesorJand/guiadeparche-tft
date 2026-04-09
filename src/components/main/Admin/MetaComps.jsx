import React, { useEffect, useState, useRef } from "react";
import { useStore } from "@nanostores/react";
import Composicion from "./Composicion.jsx";
import style from "./css/EditarCompoTFT.module.css";
import { MetaComps as compos, loadCompsMeta, isLoadingDataTFTFromApi } from "src/stores/menuFiltradoAdmin.js";
import FantasmaComposiciones from "./FantasmaComposiciones.jsx";
import { scrollToComposicion, setOpenCompo, openCompoId } from "src/stores/openCompoById.js";
import { versionTFT } from "src/stores/dataTFT.js";


const MetaComps = ({ showHide, admin }) => {
  const composMeta = useStore(compos);
  const currentVersion = useStore(versionTFT);
  const [isLoading, setIsLoading] = useState(true)
  const openCompId = useStore(openCompoId);
  const refs = useRef({});

  const toggleCompo = (id) => {
    setOpenCompo(id);
  };

  useEffect(() => {
    let isMounted = true;
    (async function () {
      if (versionTFT.get()) {
        isLoadingDataTFTFromApi.set(true);
        setIsLoading(true);

        await loadCompsMeta();

        if (isMounted) {
          isLoadingDataTFTFromApi.set(false);
          setIsLoading(false);
        }
      }
    })();
    return () => { isMounted = false; };
  }, [currentVersion]);

  useEffect(() => {
    scrollToComposicion();
  }, [openCompoId]);

  // Mostrar los componentes "fantasma" si está cargando
  if (isLoading) {
    return (
      <div className={style.containerMeta}>
        {Array.from({ length: 10 }).map((_, i) => (
          <FantasmaComposiciones key={`fantasma-${i}`} />
        ))}
      </div>
    );
  }

  // Mostrar composiciones si ya cargaron
  return (
    <div className={style.containerMeta}>

      {
        composMeta.length > 0 && composMeta.map((tier, iTier) =>
          tier.map((compo, i) => (
            <div
              ref={(el) => (refs.current[compo.id] = el)}
              key={`augments-${i}`}
              className={[
                style.containerMetaTier,
                compo?.isHide === "true" && admin ? "" : compo?.isHide === "true" ? style.isHide : ""
              ].join(" ")}

            >
              <Composicion
                compo={compo}
                showHide={showHide}
                admin={admin}
                onToggle={() => toggleCompo(compo.id)}
                isOpen={openCompId === compo.id}
                id={compo.id}
              />
            </div>
          ))
        )
      }
      {composMeta.length === 0 && <div>Please wait we are updating</div>}
    </div>
  );
};

export default MetaComps;
