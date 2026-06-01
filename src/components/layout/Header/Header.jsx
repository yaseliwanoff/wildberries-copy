import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { MapPin, User, ShoppingCart, X, Search } from "lucide-react";

import styles from "./Header.module.scss";
import logo from "../../../../public/asstes/icons/wb-full-white.svg";
import Camera from "../../icons/Camera";
import Top from "./Top";
import DefaultModal from "../../ui/Modal/DefaultModal";
import SearchModal from "../../ui/Modal/SearchModal";
import PhoneAuthInput from "../../../features/auth/login/components/PhoneAuthInput";
import { phoneNumberSchema } from "../../../features/auth/login/schemas/LoginSchema";

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [inputValues, setInputValues] = useState("");
  const headerRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const toggleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleSearchModalVisible = () => {
    setIsSearchModalVisible(true);
  };

  const clearInputField = () => {
    setInputValues("");
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

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
                <PhoneAuthInput
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.phoneNumber?.message}
                />
              )}
            />
          </div>
          <button type="submit" className={styles.modal_code_btn}>
            Получить код
          </button>
          <div className={styles.modal_description}>
            <p>
              Нажимая на кнопку, я соглашаюсь{" "}
              <Link to="/">с правилами пользования торговой площадкой</Link>.{" "}
              <Link to="/">Политика конфиденциальности</Link>
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
  );
};

export default Header;
