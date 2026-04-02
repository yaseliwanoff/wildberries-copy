import Top from "./Top"

import styles from "./Header.module.scss"
import logo from "../../../../public/asstes/icons/wb-full-white.svg"

const Header = () => {
  return (
    <header id="header" className={styles.header}>
      <div className="top_header">
        <Top />
      </div>
      <div className="bottom_header">
        <img className={styles.bottom_header_logo} src={logo} alt="logo" />
      </div>
    </header>
  )
}

export default Header
