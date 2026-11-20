import styles from "./spinner.module.scss";

function Spinner() {
  return <div className={styles.spinner} role="status" aria-label="Loading" />;
}

export default Spinner;
