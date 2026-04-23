import { useState, useRef, useEffect, useCallback } from "react";
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
import { createPortal } from "react-dom";

const useDropdownPosition = (triggerRef, isOpen) => {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const recalculate = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + 8,
      left: rect.left,
    });
  }, [triggerRef]);

  useEffect(() => {
    if (isOpen) {
      recalculate();
      window.addEventListener("scroll", recalculate, true);
      window.addEventListener("resize", recalculate);
      return () => {
        window.removeEventListener("scroll", recalculate, true);
        window.removeEventListener("resize", recalculate);
      };
    }
  }, [isOpen, recalculate]);

  return pos;
};

const FixedDropdown = ({ pos, children, onClose }) => {
  return createPortal(
    <div
      className={styles.dropdown_menu_fixed}
      style={{ top: pos.top, left: pos.left }}
    >
      {children}
    </div>,
    document.body
  );
};

const Top = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isBusinessMenuOpen, setIsBusinessMenuOpen] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(window.innerWidth <= 1000);

  const moreButtonRef = useRef(null);
  const businessButtonRef = useRef(null);

  const moreMenuPos = useDropdownPosition(moreButtonRef, isMoreMenuOpen);
  const businessMenuPos = useDropdownPosition(businessButtonRef, isBusinessMenuOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        moreButtonRef.current &&
        !moreButtonRef.current.contains(e.target)
      ) {
        setIsMoreMenuOpen(false);
      }
      if (
        businessButtonRef.current &&
        !businessButtonRef.current.contains(e.target)
      ) {
        setIsBusinessMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const shouldShowMore = window.innerWidth <= 1000;
      setShowMoreButton(shouldShowMore);
      if (!shouldShowMore) setIsMoreMenuOpen(false);
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
      if (!prev) setIsMoreMenuOpen(false);
      return !prev;
    });
  };

  const toggleMoreMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMoreMenuOpen((prev) => {
      if (!prev) setIsBusinessMenuOpen(false);
      return !prev;
    });
  };

  const renderNavItem = (nav) => {
    if (nav.openMenu) {
      return (
        <li className={styles.top_menu_link} key={nav.id}>
          <button
            ref={businessButtonRef}
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
            <FixedDropdown pos={businessMenuPos} onClose={() => setIsBusinessMenuOpen(false)}>
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
            </FixedDropdown>
          )}
        </li>
      );
    }

    return (
      <li className={styles.top_menu_link} key={nav.id}>
        <NavLink to={nav.link}>
          <span>{nav.name}</span>
          <span className={styles.nav_icon}>
            {nav.hasIcon && nav.icon && <nav.icon />}
          </span>
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
                <li className={`${styles.top_menu_link} ${styles.more_menu_item}`}>
                  <button
                    ref={moreButtonRef}
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
                    <FixedDropdown pos={moreMenuPos} onClose={() => setIsMoreMenuOpen(false)}>
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
                    </FixedDropdown>
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
