import { NavLink } from "react-router-dom"

import { ChevronDown } from "lucide-react"
import Map from "../../icons/Map"
import Fruits from "../../icons/Fruits"

import styles from "./Header.module.scss"
import { NavMenuItems } from "../../../mocks/header/nav"

const Top = () => {
  return (
    <div className={styles.top_wrapper}>
      <div className={styles.city_wrapper}>
        <Map />
        <span>Москва</span>
      </div>
      <nav className={styles.top_menu}>
        <ul className={styles.top_menu_wrapper}>
          {NavMenuItems.map(nav => (
            <li className={styles.top_menu_link} key={nav.id}>
              <NavLink to={nav.link}>
                <span>{nav.name}</span>
                <span className={styles.nav_icon}>
                  {nav.hasIcon && nav.icon && <nav.icon />}
                </span>
                {nav.openMenu && <ChevronDown size={15} color="#fff" />}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.wallet_wrapper}>
        <div className={styles.cashback}>
          <span>КЕШБЕК</span>
          <Fruits />
        </div>
        <div className={styles.wallet}>
          <span>RUB</span>
        </div>
      </div>
    </div>
  )
}

export default Top
