import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import { useBodyScrollLock } from "@/shared/lib/dom";
import styles from "./header.module.scss";
import NavLink from "./NavLink";
import Logo from "./Logo";
import { ScreenSize } from "@/shared/lib/viewport";

const mobileQuery = `(max-width: ${ScreenSize.TABLET}px)`;

function subscribeToMobileViewport(onChange: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getMobileViewport() {
  return window.matchMedia(mobileQuery).matches;
}

function getServerMobileViewport() {
  return false;
}

function HeaderContent({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useSyncExternalStore(subscribeToMobileViewport, getMobileViewport, getServerMobileViewport);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    navRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const onResize = () => {
      if (window.innerWidth > ScreenSize.TABLET) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const controls = navRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header
      className={`${styles["site-header"]} ${pathname === "/" ? styles["site-header--transparent"] : styles["site-header--solid"]}`}
    >
      <div className={`${styles["site-header__container"]} layout-container`}>
        <Logo />
        <button
          ref={toggleRef}
          type="button"
          className={`${styles["menu-toggle"]} ${isOpen ? styles["menu-toggle--expanded"] : ""}`}
          aria-label="Open navigation"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((open) => !open)}
        />
        {isOpen && (
          <button
            type="button"
            className={styles["site-header__backdrop"]}
            aria-label="Close navigation"
            tabIndex={-1}
            onClick={() => setIsOpen(false)}
          />
        )}
        <nav
          ref={navRef}
          inert={isMobile && !isOpen}
          id="main-navigation"
          aria-label="Main navigation"
          className={`${styles["main-nav"]} ${isOpen ? styles["main-nav--open"] : ""}`}
        >
          <button
            type="button"
            className={`${styles["menu-toggle"]} ${styles["menu-toggle--close"]}`}
            aria-label="Close navigation"
            onClick={() => {
              setIsOpen(false);
              toggleRef.current?.focus();
            }}
          />
          <ul className={styles["main-nav__list"]}>
            <li>
              <NavLink href="/" onClick={() => setIsOpen(false)}>
                About the shelter
              </NavLink>
            </li>
            <li>
              <NavLink href="/pets" onClick={() => setIsOpen(false)}>
                Our pets
              </NavLink>
            </li>
            <li>
              <NavLink href="/#help" onClick={() => setIsOpen(false)}>
                Help the shelter
              </NavLink>
            </li>
            <li>
              <NavLink href="/#contacts" onClick={() => setIsOpen(false)}>
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  return <HeaderContent key={pathname} pathname={pathname} />;
}
