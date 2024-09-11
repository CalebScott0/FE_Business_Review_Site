import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  // set scroll effect on pathname change
  useEffect(() => {
    const canControlScrollRestoration = "scrollRestoration" in window.history;
    if (canControlScrollRestoration) {
      // if scroll restoration exists in window history set to manual
      window.history.scrollRestoration = "manual";
    }

    // set scroll to top
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default ScrollToTop;
