import type { AnimalType } from "../model/types";
import styles from "./animal-card.module.scss";

export default function AnimalDetails({ animal }: { animal: AnimalType }) {
  const { name, img, breed, description, age, inoculations, diseases, parasites } = animal;
  return (
    <div className={`${styles["animal-card"]} ${styles["animal-card--detailed"]}`}>
      <img
        className={styles["animal-card__image"]}
        src={img}
        alt={`${name}, ${breed}`}
        width={270}
        height={270}
        loading="lazy"
      />
      <div className={styles["animal-card__content"]}>
        <div className={styles["animal-card__heading"]}>
          <h2>{name}</h2>
          <p className={styles["animal-card__breed"]}>{breed}</p>
        </div>
        <p className={styles["animal-card__description"]}>{description}</p>
        <dl className={styles["animal-card__details"]}>
          <div className={styles["animal-card__detail"]}>
            <dt>Age: </dt>
            <dd>{age}</dd>
          </div>
          <div className={styles["animal-card__detail"]}>
            <dt>Inoculations: </dt>
            <dd>{inoculations.join(", ")}</dd>
          </div>
          <div className={styles["animal-card__detail"]}>
            <dt>Diseases: </dt>
            <dd>{diseases.join(", ")}</dd>
          </div>
          <div className={styles["animal-card__detail"]}>
            <dt>Parasites: </dt>
            <dd>{parasites.join(", ")}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
