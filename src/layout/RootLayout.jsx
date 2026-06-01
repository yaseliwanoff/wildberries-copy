import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import PageSuspense from "../components/routing/PageSuspense";
import ScrollToTop from "../components/routing/ScrollToTop";
import { useRouteTitle } from "../hooks/useRouteTitle";
import styles from "./RootLayout.module.scss";

function RootLayout() {
  useRouteTitle();

  return (
    <div className={styles.root}>
      <ScrollRestoration />
      <ScrollToTop />
      <Header />
      <main className={styles.main}>
        <PageSuspense>
          <Outlet />
        </PageSuspense>
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.footerText}>© 2026 Wildberries</p>
        </div>
      </footer>
    </div>
  );
}

export default RootLayout;
