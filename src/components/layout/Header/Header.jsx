import { useState, useRef, useEffect, forwardRef } from "react"
import { Controller, useForm } from "react-hook-form"

import styles from "./Header.module.scss"
import "react-phone-number-input/style.css"
import logo from "../../../../public/asstes/icons/wb-full-white.svg"
import Camera from "../../icons/Camera"
import { MapPin, User, ShoppingCart, X, Search } from "lucide-react"
import { Link } from "react-router-dom"

import Top from "./Top"
import DefaultModal from "../../ui/Modal/DefaultModal"
import SearchModal from "../../ui/Modal/SearchModal"

import { phoneNumberSchema } from "../../../features/auth/login/schemas/LoginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import PhoneInput from "react-phone-number-input"
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input"

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0);
  const [inputValues, setInputValues] = useState("")
  const [country, setCountry] = useState("RU")
  const [selectedCountry, setSelectedCountry] = useState("RU");
  const headerRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber: "",
    }
  })

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  }, [])

  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible)
  }

  const toggleSearchModalVisible = () => {
    setIsSearchModalVisible(true)
  }

  const clearInputField = () => {
    setInputValues("");
  }

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  }

  const getCountryFromValue = (value, defaultCountry) => {
    if (!value) return defaultCountry;
    try {
      const phoneNumber = parsePhoneNumber(value);
      return phoneNumber?.country || defaultCountry;
    } catch {
      return defaultCountry;
    }
  }

  return (
    <header ref={headerRef} id="header" className={styles.header}>
      <DefaultModal onClose={() => setIsModalVisible(false)} isVisible={isModalVisible}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.modal_title}>Войти или создать профиль</h1>
          <div className={styles.field_input_wrapper}>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  international
                  defaultCountry="RU"
                  country={selectedCountry}
                  value={field.value || undefined}
                  onChange={(value) => {
                    field.onChange(value);
                    if (value) {
                      const countryCode = getCountryFromValue(value, selectedCountry);
                      if (countryCode) setSelectedCountry(countryCode);
                    }
                  }}
                  onCountryChange={(country) => {
                    if (country) {
                      setSelectedCountry(country);
                    }
                  }}
                />
              )}
            />
            {errors.phoneNumber && <p style={{
              color: "red",
              fontSize: "14px"
            }}>{errors.phoneNumber.message}</p>}
          </div>
          <button type="submit" className={styles.modal_code_btn}>Получить код</button>
          <div className={styles.modal_description}>
            <p>
              Нажимая на кнопку, я соглашаюсь <Link to={"/"}>с правилами пользования торговой площадкой</Link>. <Link to={"/"}>Политика конфиденциальности</Link>
            </p>
          </div>
        </form>
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
              onClick={toggleSearchModalVisible}
              value={inputValues}
              onChange={(event) => setInputValues(event.target.value)}
            />
            {inputValues.length >= 1 ? (
              <div className={styles.header_btns_wrapper}>
                <button onClick={clearInputField} className={styles.clear_btn}>
                  <X size={23} color="#000000" />
                </button>
                <button className={styles.search_btn} type="submit">
                  <Search size={19} color="#a73afd" />
                </button>
              </div>
            ) : (
              <button className={styles.header_bottom_btn}>
                <Camera />
              </button>
            )}
            <SearchModal
              onClose={() => setIsSearchModalVisible(!isSearchModalVisible)}
              isVisible={isSearchModalVisible}
              searchingValue={inputValues}
              headerHeight={headerHeight}
            />
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
