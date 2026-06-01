import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import styles from "./Page404.module.scss";

function Page404() {
  return (
    <section className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.description}>
        Такой страницы нет. Проверьте адрес или вернитесь на главную.
      </p>
      <Link to={ROUTES.HOME} className={styles.link}>
        На главную
      </Link>
    </section>
  );
}

export default Page404;
