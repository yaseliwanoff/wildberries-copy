import { useEffect } from "react";
import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import styles from "./RouteErrorPage.module.scss";

function RouteErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.error("[RouteError]", error);
  }, [error]);

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const title = isNotFound ? "Страница не найдена" : "Что-то пошло не так";
  const description = isNotFound
    ? "Запрашиваемая страница не существует или была перемещена."
    : "Произошла ошибка при загрузке страницы. Попробуйте обновить или вернуться на главную.";

  return (
    <section className={styles.page}>
      <p className={styles.code}>{isNotFound ? "404" : "500"}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <Link to={ROUTES.HOME} className={styles.link}>
        На главную
      </Link>
    </section>
  );
}

export default RouteErrorPage;
