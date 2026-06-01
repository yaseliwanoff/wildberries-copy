import { Suspense } from "react";
import PageLoader from "./PageLoader";

function PageSuspense({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export default PageSuspense;
