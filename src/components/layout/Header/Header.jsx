import { useState } from "react"

import styles from "./Header.module.scss"
import logo from "../../../../public/asstes/icons/wb-full-white.svg"
import Camera from "../../icons/Camera"
import { MapPin, User, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

import Top from "./Top"
import DefaultModal from "../../ui/Modal/DefaultModal"


const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <header id="header" className={styles.header}>
      <DefaultModal onClose={() => setIsModalVisible(false)} isVisible={isModalVisible}>
        <h1 className={styles.modal_title}>Войти или создать профиль</h1>
        <button className={styles.modal_code_btn}>Получить код</button>
        <div className={styles.modal_description}>
          <p>
            Нажимая на кнопку, я соглашаюсь <Link to={"/"}>с правилами пользования торговой площадкой</Link>. <Link to={"/"}>Политика конфиденциальности</Link>
          </p>
        </div>
      </DefaultModal>
      <div className="container">
        <Top />
        <div className={styles.bottom_header}>
          <img className={styles.bottom_header_logo} src={logo} alt="logo" />
          <button className={styles.bottom_header_menu}>
            <span className={styles["nav-element__burger-line"]}></span>
          </button>
          <div className={styles.header_bottom_search_wrapper}>
            <input 
              className={styles.header_bottom_search} 
              type="text" 
              placeholder="Найти на Wildberries" 
            />
            <button className={styles.header_bottom_btn}>
              <Camera />
            </button>
          </div>
          <div className={styles.header_bottom_buttons}>
            <button className={styles.adress_btn}>
              <MapPin color="#fff" />
              <span>Адреса</span>
            </button>
            <button onClick={toggleModalVisible} className={styles.adress_btn}>
              <User color="#fff" />
              <span>Войти</span>
            </button>
            <button className={styles.adress_btn}>
              <ShoppingCart color="#fff" />
              <span>Корзина</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
