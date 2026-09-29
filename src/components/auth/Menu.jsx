
const Menu = ({activeTab, setActiveTab, styles, admin, user}) =>{
  const menus = [
    {
      name: "Mis Datos",
      icon: "",
      tab: "data",
      admin: false,
      available:true
    },
    {
      name: "Master Plan",
      icon: "",
      tab: "master-plan",
      admin: false,
      available:true
    },
    {
      name: "Publicidad GP",
      icon: "",
      tab: "publicidad_gp",
      admin: false,
      available:true,
      condition: (user?.twitch_linked == 1 || user?.twitch_linked === true || user?.twitch_linked === '1') && (user?.is_streamer == 1 || user?.is_streamer === true || user?.is_streamer === '1' || admin)
    },
    {
      name: "Cuenta de Riot",
      icon: "",
      tab: "riot",
      admin: false,
      available:false
    },
    {
      name: "Admin",
      icon: "",
      tab: "admin",
      admin: true,
      available:true
    },
    {
      name: "Cerrar Sesión",
      icon: "",
      tab: "logout",
      admin: false,
      color: "red",
      available:true
    }
  ]
  return (
  <nav className={styles.menu}>
    {
      menus.map((menu, index) => {
        const meetsCondition = menu.condition !== undefined ? menu.condition : true;
        return meetsCondition && (!menu.admin || (menu.admin && admin)) && (
          <div 
            key={index}
            className={`${styles.menuItem} ${activeTab === menu.tab ? styles.menuItemActive : ''} ${!menu.available ? styles.menuItemDisabled : ''}`}
            onClick={() => (menu.available || admin) && setActiveTab(menu.tab)}
            style={menu.color ? { color: menu.color } : undefined}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {menu.name} {!menu.available && " (Proximamente)"}
          </div>
        );
      })
    }
</nav>
  )
}

export default Menu;