import styles from "./PageLoader.module.scss";

function PageLoader() {
  return (
    <div className={styles.loader} role="status" aria-live="polite" aria-label="Загрузка страницы">
      <span className={styles.spinner} aria-hidden="true" />
    </div>
  );
}

export default PageLoader;
