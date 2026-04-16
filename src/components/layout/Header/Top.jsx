import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { ChevronDown } from "lucide-react";
import Map from "../../icons/Map";
import Fruits from "../../icons/Fruits";

import styles from "./Header.module.scss";
import {
  NavMenuItems,
  MainNavItems,
  MoreNavItems,
  BuisnessMenuItems,
} from "../../../mocks/header/nav";

const Top = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isBusinessMenuOpen, setIsBusinessMenuOpen] = useState(false);

  const moreMenuRef = useRef(null);
  const businessMenuRef = useRef(null);

  const [showMoreButton, setShowMoreButton] = useState(window.innerWidth <= 1000);

  // Закрытие "Еще" при клике вне меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreMenuOpen(false);
      }

      if (
        businessMenuRef.current &&
        !businessMenuRef.current.contains(event.target)
      ) {
        setIsBusinessMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Отслеживание resize
  useEffect(() => {
    const handleResize = () => {
      const shouldShowMore = window.innerWidth <= 1000;
      setShowMoreButton(shouldShowMore);

      if (!shouldShowMore) {
        setIsMoreMenuOpen(false);
      }

      setIsBusinessMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedNavItems = showMoreButton ? MainNavItems : NavMenuItems;

  const toggleBusinessMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsBusinessMenuOpen((prev) => {
      const next = !prev;

      if (next) {
        setIsMoreMenuOpen(false);
      }

      return next;
    });
  };

  const toggleMoreMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsMoreMenuOpen((prev) => {
      const next = !prev;

      if (next) {
        setIsBusinessMenuOpen(false);
      }

      return next;
    });
  };

  const renderNavItem = (nav) => {
    // Пункт с выпадающим меню
    if (nav.openMenu) {
      return (
        <li
          className={styles.top_menu_link}
          key={nav.id}
          ref={businessMenuRef}
        >
          <button
            type="button"
            className={styles.more_button}
            onClick={toggleBusinessMenu}
          >
            <span>{nav.name}</span>
            <ChevronDown
              size={15}
              color="#fff"
              className={isBusinessMenuOpen ? styles.chevron_rotated : ""}
            />
          </button>

          {isBusinessMenuOpen && (
            <div className={styles.dropdown_menu}>
              {BuisnessMenuItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={styles.dropdown_item}
                  onClick={() => setIsBusinessMenuOpen(false)}
                >
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </li>
      );
    }

    // Обычный пункт меню
    return (
      <li className={styles.top_menu_link} key={nav.id}>
        <NavLink to={nav.link}>
          <span>{nav.name}</span>

          <span className={styles.nav_icon}>
            {nav.hasIcon && nav.icon && <nav.icon />}
          </span>

          {nav.openMenu && <ChevronDown size={15} color="#fff" />}
        </NavLink>
      </li>
    );
  };

  return (
    <div className={styles.top_header}>
      <div className={styles.top_wrapper}>
        <div className={styles.city_wrapper}>
          <Map />
          <span>Москва</span>
        </div>

        <nav className={styles.top_menu}>
          <div className={styles.top_menu_scroll}>
            <ul className={styles.top_menu_wrapper}>
              {displayedNavItems.map((nav) => renderNavItem(nav))}

              {showMoreButton && (
                <li
                  className={`${styles.top_menu_link} ${styles.more_menu_item}`}
                  ref={moreMenuRef}
                >
                  <button
                    type="button"
                    className={styles.more_button}
                    onClick={toggleMoreMenu}
                  >
                    <span>Еще</span>
                    <ChevronDown
                      size={15}
                      color="#fff"
                      className={isMoreMenuOpen ? styles.chevron_rotated : ""}
                    />
                  </button>

                  {isMoreMenuOpen && (
                    <div className={styles.dropdown_menu}>
                      {MoreNavItems.map((item) => (
                        <NavLink
                          key={item.id}
                          to={item.link}
                          className={styles.dropdown_item}
                          onClick={() => setIsMoreMenuOpen(false)}
                        >
                          <span>{item.name}</span>
                          {item.hasIcon && item.icon && <item.icon />}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
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
    </div>
  );
};

export default Top;
