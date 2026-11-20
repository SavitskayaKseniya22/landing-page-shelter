import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./logo.module.scss";

function Logo() {
  const { pathname } = useLocation();

  return (
    <Link to="/" className={`${styles.logo} ${pathname !== "/" ? styles["logo--dark"] : styles["logo--light"]}`}>
      <span className={styles["logo__title"]}>Cozy House</span>
      <p className={styles["logo__tagline"]}>Shelter for pets in Boston</p>
    </Link>
  );
}

export default Logo;
