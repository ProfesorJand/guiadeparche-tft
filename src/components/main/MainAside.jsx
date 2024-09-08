import React from "react";
import Twitch from "@components/embed/Twitch";

const MainAside = ()=>{
  return (
    <aside class="bodyMainAside">
      <div class="bodyMainAsideSticky">
        <div class="bodyMainAsideMenu">
          menuFiltrado2
        </div>
        <div class="bodyMainAsideEmbed">
          {/* <Twitch transition:persist client:only="react"/> */}
          <ads class="bodyMainAsideAds">Publicidad</ads>
        </div>
      </div>
    </aside>
  )
}

export default MainAside;