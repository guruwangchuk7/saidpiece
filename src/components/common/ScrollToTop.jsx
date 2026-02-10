import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on every navigation. 'auto' is widely supported.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Prefer manual scroll restoration so browser doesn't jump back automatically
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
        // ignore any errors setting this property
      }
    }
  }, [pathname]);

  return null;
}
