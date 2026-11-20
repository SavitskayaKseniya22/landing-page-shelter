import styles from "./donation.module.scss";
import { CopyAccountButton } from "@/features/copy-account";

function Donation() {
  return (
    <section className={styles.donation}>
      <div className={`${styles["donation__container"]} layout-container`}>
        <img
          src="/images/donation-dog.png"
          alt="Dog"
          className={styles["donation__pet-image"]}
          width={505}
          height={261}
          loading="lazy"
        />
        <div className={styles["donation__content"]}>
          <h2>
            You can also <br />
            make a donation
          </h2>
          <p className={styles["donation__account-caption"]}>Name of the bank / Type of bank account</p>

          <CopyAccountButton content="8380 2880 8028 8791 7435" />

          <p className={styles["donation__disclaimer"]}>
            Legal information and lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a ipsum at libero
            sagittis dignissim sed ac diam. Praesent ultrices maximus tortor et vulputate. Interdum et malesuada fames
            ac ante ipsum primis in faucibus.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Donation;
