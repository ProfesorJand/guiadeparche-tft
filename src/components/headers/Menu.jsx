import style from "./Menu.module.css";
import { useEffect, useState } from 'react';

const Menu = ({link, nombre, submenus = [], img = "", onlyAdmin=false }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [admin, setAdmin] = useState(false); // Estado para admin

  useEffect(() => {
    // Esto solo se ejecuta en navegador
    setCurrentPath(window.location.pathname);
    const user = localStorage.getItem("user") || "";
    setAdmin(!!user);
  }, []);

  // Solo renderiza si no es admin y el item requiere admin
  if(!admin && onlyAdmin){
    return null;
  }

  return (
    <div className="menuContainer">
      <a
        className={[style.menuItem, currentPath === link ? style.active : ''].join(" ")}
        href={currentPath === link ? null : link}
        target="_self"
      >
        {img
          ? <img src={img} alt={nombre} className={style.menuImg} />
          : nombre
        }
      </a>

      {submenus.length > 0 &&
        <ul className={style.submenu}>
          {submenus.map((item, index) => (
            <li key={index}>
              <a
                className={[style.submenuItem, currentPath === item.link ? style.active : ''].join(" ")}
                href={currentPath === item.link ? null : item.link}
              >
                {item.nombre}
              </a>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default Menu;