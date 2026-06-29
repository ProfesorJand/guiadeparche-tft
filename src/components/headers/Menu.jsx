import style from "./Menu.module.css";
import { useEffect, useState } from 'react';

const SubmenuList = ({ items, currentPath, level = 2 }) => {
  if (!items || items.length === 0) return null;
  return (
    <ul className={[style.submenu, level > 1 ? style.scrollableSubmenu : ''].join(' ').trim()}>
      {items.map((item, index) => (
        <li key={index} className={style.submenuLi}>
          <a
            className={[style.submenuItem, currentPath === item.link ? style.active : ''].join(" ")}
            href={currentPath === item.link ? null : item.link}
          >
            {item.nombre}
            {item.submenus && item.submenus.length > 0 && <span className={style.arrow}>▶</span>}
          </a>
          <SubmenuList items={item.submenus} currentPath={currentPath} level={level + 1} />
        </li>
      ))}
    </ul>
  );
};

const Menu = ({link, linkPrincipal, nombre, submenus = [], img = "", onlyAdmin=false }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [admin, setAdmin] = useState(false); // Estado para admin

  useEffect(() => {
    // Esto solo se ejecuta en navegador
    setCurrentPath(window.location.pathname.split('/')[1]);
    const user = localStorage.getItem("user") || "";
    setAdmin(!!user);
  }, []);

  // Solo renderiza si no es admin y el item requiere admin
  if(!admin && onlyAdmin){
    return null;
  }

  return (
    <div className={style.menuContainer}>
      <a
        className={[style.menuItem, currentPath === linkPrincipal ? style.active : ''].join(" ")}
        href={currentPath === link ? null : link}
        target="_self"
      >
        {img
          ? <img src={img} alt={nombre} className={style.menuImg} />
          : nombre
        }
      </a>

      <SubmenuList items={submenus} currentPath={currentPath} />
    </div>
  )
}

export default Menu;