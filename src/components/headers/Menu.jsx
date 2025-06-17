import style from "./Menu.module.css";
import { useEffect, useState } from 'react';

const Menu = ({link, nombre, submenus = [], img = "" })=>{
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
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
          {submenus.map(item => (
            <li>
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