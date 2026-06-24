import { useState, useEffect } from "react";

const ProfileSummary = ({user, styles}) =>{
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.profileSummary}>
        <div className={styles.avatar}>
            {mounted ? user?.name?.charAt(0) : ""}
        </div>
        <div className={styles.userName}>{mounted ? user?.name : ""}</div>
        <div className={styles.userEmail}>{mounted ? user?.email : ""}</div>
    </div>
  )
}

export default ProfileSummary;