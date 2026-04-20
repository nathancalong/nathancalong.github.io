import { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks";
import cn from "classnames";
import styles from "./Navigation.module.scss";

const navBarItems = ["skills", "projects", "contact"];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = useMemo(() => ["home", ...navBarItems], []);
  const activeSection = useActiveSection(sectionIds);

  function topFunction() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function scrollToElement(item: string) {
    document
      .getElementById(item)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  function handleNav(item: string) {
    item === "home" ? topFunction() : scrollToElement(item);
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <button
          className={cn(
            styles.logo,
            activeSection === "home" && styles.logoActive,
          )}
          onClick={topFunction}
        >
          NATHAN LONG
        </button>

        <div className={styles.navLinks}>
          {navBarItems.map((item) => (
            <button
              key={item}
              className={cn(
                styles.navLink,
                activeSection === item && styles.active,
              )}
              onClick={() => handleNav(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {navBarItems.map((item) => (
            <button
              key={item}
              className={cn(
                styles.mobileLink,
                activeSection === item && styles.active,
              )}
              onClick={() => handleNav(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div className={styles.navBorder} />
    </nav>
  );
}
