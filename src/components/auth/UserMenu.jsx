import { useStore } from "@nanostores/react";
import { $admin, $user, $activeTab, setActiveTab } from "@stores/auth";
import ProfileSummary from "@components/auth/ProfileSummary";
import Menu from "@components/auth/Menu";
import TierListMetaComps from "@components/TFT/TierListMetaComps";
import styles from "@components/auth/PerfilUsuario.module.css";
import { metaCompsTFT, fetchAndSortComps, composMetaPBEJSON } from "@stores/dataTFT";
import { useEffect } from "react";

const UserMenu=()=>{

  const user = useStore($user);
  const admin = useStore($admin)
  const activeTab= useStore($activeTab);
  const todasLasCompsPBE = useStore(metaCompsTFT);

  useEffect(()=>{
    const loadComps = async()=>{
      if(todasLasCompsPBE) return;
      await fetchAndSortComps(composMetaPBEJSON);
    }
    loadComps();
  },[]);

return (
  <aside className={styles.sidebar}>
    <ProfileSummary user={user} styles={styles}/>

    <Menu activeTab={activeTab} setActiveTab={setActiveTab} styles={styles} admin={admin} />
    {activeTab==="admin" &&
      <TierListMetaComps todasLasCompsPBE={todasLasCompsPBE} />
    }
  </aside>
 
  )
}

export default UserMenu;