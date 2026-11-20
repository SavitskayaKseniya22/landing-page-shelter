import styles from "./footer.module.scss";

function Footer() {
  return (
    <footer className={styles["site-footer"]} id="contacts">
      <img
        src="/images/start-screen-gradient-background-768.png"
        alt=""
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          inset: 0,
          ...{
            objectFit: "cover",
            objectPosition: "bottom  left",
            right: "unset",
            top: "unset",
          },
        }}
        loading="lazy"
      />

      <div className={`${styles["site-footer__container"]} layout-container`}>
        <img
          src="/images/footer-puppy.png"
          alt="Puppy"
          width={300}
          height={310}
          style={{
            position: "absolute",
            bottom: "0",
            right: "40px",
          }}
          className={styles["site-footer__pet-image"]}
          loading="lazy"
        />
        <section className={styles["site-footer__contacts"]}>
          <h2 className={styles["site-footer__heading"]}>For questions and suggestions</h2>
          <a href="mailto:email@shelter.com" className={styles["site-footer__link"]}>
            <img src="/icons/icon-email.svg" width={40} height={32} alt="" loading="lazy" />
            email@shelter.com
          </a>

          <a href="tel:+136745677554" className={styles["site-footer__link"]}>
            <img src="/icons/icon-phone.svg" width={40} height={32} alt="" loading="lazy" />
            +13 674 567 75 54
          </a>
        </section>

        <section className={styles["site-footer__locations"]}>
          <h2 className={styles["site-footer__heading"]}>We are waiting for your visit</h2>

          <a
            href="https://goo.gl/maps/EDAPioWz4G93bjD1A"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["site-footer__link"]}
          >
            <img src="/icons/icon-marker.svg" width={22} height={32} alt="" loading="lazy" />1 Central Street, Boston
            (entrance from the store)
          </a>

          <a
            href="https://goo.gl/maps/JMV9z4e7cCeDLoC86"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["site-footer__link"]}
          >
            <img src="/icons/icon-marker.svg" width={22} height={32} alt="" loading="lazy" />
            18 South Park, London
          </a>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
