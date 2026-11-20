import { Link } from "react-router-dom";
import styles from "./first-screen.module.scss";
import { buttonStyles as linkStyles } from "@/shared/ui/button";

function FirstScreen() {
  return (
    <section className={styles["hero"]}>
      <img
        src="/images/start-screen-gradient-background-768.png"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          inset: 0,
          ...{
            objectFit: "cover",
            objectPosition: "bottom left",
            right: "unset",
            top: "unset",
          },
        }}
        alt=""
        className={styles["hero__background"]}
        loading="eager"
        fetchPriority="high"
      />

      <div className={`layout-container ${styles["hero__container"]}`}>
        <img
          src="/images/start-screen-puppy-700.png"
          alt="Puppy"
          className={styles["hero__pet-image"]}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            ...{
              top: "unset",
              left: "unset",
              bottom: 0,
            },
          }}
          loading="eager"
          fetchPriority="high"
        />

        <h1 className={styles["hero__heading"]}>
          Not only people
          <br />
          need a house
        </h1>
        <p className={styles["hero__description"]}>
          We offer to give a chance to a little and nice puppy with an extremely wide and open heart. He or she will
          love you more than anybody else in the world, you will see!
        </p>

        <Link
          to="/#friends"
          className={`${linkStyles.button} ${linkStyles["button--filled"]} ${linkStyles["button--text"]}`}
        >
          Make a friend
        </Link>
      </div>
    </section>
  );
}

export default FirstScreen;
