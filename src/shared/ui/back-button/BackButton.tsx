import { Link } from "react-router-dom";
import { buttonStyles as styles } from "@/shared/ui/button";

export default function BackButton() {
  return (
    <Link to="/" className={`${styles.button} ${styles["button--filled"]} ${styles["button--text"]}`}>
      Back to main page
    </Link>
  );
}
