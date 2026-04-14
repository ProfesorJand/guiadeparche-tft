const ProfileSummary = ({user, styles}) =>{
  return (
    <div className={styles.profileSummary}>
        <div className={styles.avatar}>
            {user.name?.charAt(0)}
        </div>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.userEmail}>{user.email}</div>
    </div>
  )
}

export default ProfileSummary;