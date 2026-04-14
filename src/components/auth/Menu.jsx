
const Menu = ({activeTab, setActiveTab, styles, admin}) =>{
  const menus = [
    {
      name: "Mis Datos",
      icon: "",
      tab: "data",
      admin: false
    },
    {
      name: "Guías PDF",
      icon: "",
      tab: "guides",
      admin: false
    },
    {
      name: "Cuenta de Riot",
      icon: "",
      tab: "riot",
      admin: false
    },
    {
      name: "Admin",
      icon: "",
      tab: "admin",
      admin: true
    },
    {
      name: "Cerrar Sesión",
      icon: "",
      tab: "logout",
      admin: false,
      color: "red"
    }
  ]
  return (
  <nav className={styles.menu}>
    {
      menus.map((menu, index) => (
        (!menu.admin || (menu.admin && admin)) &&
        <div 
          key={index}
          className={`${styles.menuItem} ${activeTab === menu.tab ? styles.menuItemActive : ''}`}
          onClick={() => setActiveTab(menu.tab)}
          style={{color: menu.color || ""}}
      >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          {menu.name}
      </div>
      ))
    }
</nav>
  )
}

export default Menu;