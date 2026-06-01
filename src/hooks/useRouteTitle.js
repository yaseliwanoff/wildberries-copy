import { useEffect } from "react";
import { useMatches } from "react-router-dom";

const APP_NAME = "Wildberries";

export function useRouteTitle() {
  const matches = useMatches();

  useEffect(() => {
    const title = [...matches]
      .reverse()
      .find((match) => match.handle?.title)?.handle?.title;

    document.title = title ? `${title} — ${APP_NAME}` : APP_NAME;
  }, [matches]);
}
