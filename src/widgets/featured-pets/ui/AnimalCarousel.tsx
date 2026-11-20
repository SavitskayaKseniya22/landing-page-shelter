import { useEffect, useState } from "react";
import { AnimalPreview } from "@/features/view-animal";
import { Button, ButtonColorType, ButtonContentType } from "@/shared/ui/button";
import { type AnimalType } from "@/entities/animal";
import { InfoBox } from "@/shared/ui/info-box";
import CarouselData, { DirectionType } from "../model/CarouselData";
import styles from "./animal-carousel.module.scss";

export default function AnimalCarousel({ animals: initialAnimals }: { animals: AnimalType[] }) {
  const [animals, setAnimals] = useState(() => new CarouselData(initialAnimals));

  const [animation, setAnimation] = useState(false);

  const [direction, setDirection] = useState<DirectionType | null>(null);

  useEffect(() => {
    if (!animation) return;

    const timeout = setTimeout(() => {
      const nextAnimals = new CarouselData(animals.elements);
      nextAnimals.row = [...animals.row];
      if (direction === DirectionType.LEFT) nextAnimals.updateRowLeft();
      else if (direction === DirectionType.RIGHT) nextAnimals.updateRowRight();
      setAnimals(nextAnimals);
      setAnimation(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [animals, animation, direction]);
  return (
    <div className={styles["pet-carousel"]} role="region" aria-label="Featured pets" aria-busy={animation}>
      {!animals.getLength() && <InfoBox>No pets found</InfoBox>}
      {!!animals.getLength() && (
        <>
          <Button
            className={`${styles["pet-carousel__control"]} ${styles["pet-carousel__control--previous"]}`}
            aria-label="Previous pets"
            colorType={ButtonColorType.WHITE}
            contentType={ButtonContentType.SYMBOL}
            onClick={() => {
              setDirection(DirectionType.LEFT);
              setAnimation(true);
            }}
            disabled={animation || animals.getLength() < 2}
          >
            <svg height={15} aria-hidden="true">
              <use href="/icons/icon-arrows-sprite.svg#icon-arrow-left" />
            </svg>
          </Button>

          <div className={styles["pet-carousel__viewport"]}>
            <ul
              inert
              aria-hidden="true"
              className={`${styles["pet-carousel__slide"]} ${animation ? styles[`pet-carousel__slide--moving-${direction}`] : ""}`}
            >
              {animals.rowPrevPart.map((animal, index) => {
                const key = `${animal.name}-${index}`;
                return <AnimalPreview animal={animal} key={key} />;
              })}
            </ul>

            <ul
              className={`${styles["pet-carousel__slide"]} ${animation ? styles[`pet-carousel__slide--moving-${direction}`] : ""}`}
            >
              {animals.rowActivePart.map((animal, index) => {
                const key = `${animal.name}-${index}`;
                return <AnimalPreview animal={animal} key={key} />;
              })}
            </ul>

            <ul
              inert
              aria-hidden="true"
              className={`${styles["pet-carousel__slide"]} ${animation ? styles[`pet-carousel__slide--moving-${direction}`] : ""}`}
            >
              {animals.rowNextPart.map((animal, index) => {
                const key = `${animal.name}-${index}`;
                return <AnimalPreview animal={animal} key={key} />;
              })}
            </ul>
          </div>

          <Button
            aria-label="Next pets"
            className={`${styles["pet-carousel__control"]} ${styles["pet-carousel__control--next"]}`}
            colorType={ButtonColorType.WHITE}
            contentType={ButtonContentType.SYMBOL}
            onClick={() => {
              setDirection(DirectionType.RIGHT);
              setAnimation(true);
            }}
            disabled={animation || animals.getLength() < 2}
          >
            <svg height={15} aria-hidden="true">
              <use href="/icons/icon-arrows-sprite.svg#icon-arrow-right" />
            </svg>
          </Button>
        </>
      )}
    </div>
  );
}
