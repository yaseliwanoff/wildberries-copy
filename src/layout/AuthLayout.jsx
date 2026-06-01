import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import PageSuspense from "../components/routing/PageSuspense";
import ScrollToTop from "../components/routing/ScrollToTop";
import { useRouteTitle } from "../hooks/useRouteTitle";
import { ROUTES } from "../routes/paths";
import logo from "../../public/asstes/icons/wb-icon-color.svg";
import styles from "./AuthLayout.module.scss";

function AuthLayout() {
  useRouteTitle();

  return (
    <div className={styles.root}>
      <ScrollRestoration />
      <ScrollToTop />
      <aside className={styles.promo} aria-hidden="true">
        <div className={styles.promoContent}>
          <img src={logo} alt="" className={styles.promoLogo} />
          <p className={styles.promoText}>
            Миллионы товаров, быстрая доставка и выгодные цены каждый день
          </p>
        </div>
      </aside>

      <section className={styles.panel}>
        <header className={styles.header}>
          <NavLink to={ROUTES.HOME} className={styles.homeLink}>
            На главную
          </NavLink>
        </header>

        <div className={styles.content}>
          <nav className={styles.tabs} aria-label="Раздел авторизации">
            <NavLink
              to={ROUTES.AUTH.LOGIN}
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
              }
              end
            >
              Вход
            </NavLink>
            <NavLink
              to={ROUTES.AUTH.REGISTER}
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
              }
            >
              Регистрация
            </NavLink>
          </nav>

          <PageSuspense>
            <Outlet />
          </PageSuspense>
        </div>
      </section>
    </div>
  );
}

export default AuthLayout;
