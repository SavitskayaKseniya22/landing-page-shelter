import type { ReactNode, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./nav-link.module.scss";

function NavLink({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const { pathname } = useLocation();

  return (
    <Link
      to={href}
      onClick={onClick}
      aria-current={pathname === href ? "page" : undefined}
      className={`${styles["nav-link"]} ${
        pathname !== "/" ? styles["nav-link--dark"] : styles["nav-link--light"]
      } ${pathname === href ? styles["nav-link--active"] : ""}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
