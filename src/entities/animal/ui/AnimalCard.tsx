import type { ReactNode } from "react";
import type { AnimalType } from "../model/types";
import styles from "./animal-card.module.scss";

export default function AnimalCard({ animal, action }: { animal: AnimalType; action: ReactNode }) {
  const { spriteIndex, name, breed } = animal;
  return (
    <li className={`${styles["animal-card"]} ${styles["animal-card--compact"]}`}>
      <div className={styles["animal-card__image"]}>
        <img
          src="/images/cards/jpg/pets-cards-sprite.jpg"
          alt={`${name}, ${breed}`}
          loading="lazy"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            objectFit: "cover",
            objectPosition: `0 -${spriteIndex * 270}px`,
          }}
        />
      </div>
      <div className={styles["animal-card__content"]}>
        <p className={styles["animal-card__name"]}>{name}</p>
        {action}
      </div>
    </li>
  );
}
