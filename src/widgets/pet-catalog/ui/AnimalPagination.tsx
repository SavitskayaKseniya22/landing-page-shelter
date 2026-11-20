import { AnimalPreview } from "@/features/view-animal";
import { Button, ButtonColorType, ButtonContentType, buttonStyles } from "@/shared/ui/button";
import { type AnimalType } from "@/entities/animal";
import { useState, useSyncExternalStore } from "react";
import { checkRange, type RangeType } from "@/shared/lib/viewport";
import { InfoBox } from "@/shared/ui/info-box";
import { Spinner } from "@/shared/ui/spinner";
import PaginationData from "../model/PaginationData";
import styles from "./animal-pagination.module.scss";

function subscribeToResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

function getServerRange(): RangeType | null {
  return null;
}

function AnimalPagination({ animals: initialAnimals }: { animals: AnimalType[] }) {
  const [animals] = useState(() => new PaginationData(initialAnimals));

  const [requestedPage, setPageNumber] = useState(1);

  const widthRange = useSyncExternalStore(subscribeToResize, checkRange, getServerRange);
  const pageNumber = Math.max(1, Math.min(requestedPage, animals.getLastPageNumber(widthRange ?? 0)));
  return (
    <div className={styles["pet-pagination"]}>
      {widthRange === null && <Spinner />}
      {!animals.getLength() && <InfoBox>No pets found</InfoBox>}
      {!!animals.getLength() && widthRange !== null && (
        <>
          <ul className={styles["pet-pagination__list"]}>
            {animals.getRangeData(widthRange, pageNumber).map((animal) => {
              const key = animal.name;
              return <AnimalPreview animal={animal} key={key} />;
            })}
          </ul>
          <div className={styles["pet-pagination__controls"]}>
            <Button
              aria-label="First page"
              colorType={ButtonColorType.WHITE}
              contentType={ButtonContentType.SYMBOL}
              disabled={pageNumber === 1}
              onClick={() => {
                setPageNumber(1);
              }}
            >
              <svg style={{ transform: "rotate(0.5turn)" }} aria-hidden="true" focusable="false">
                <use href="/icons/icon-arrows-sprite.svg#arrow-right-end" />
              </svg>
            </Button>

            <Button
              aria-label="Previous page"
              colorType={ButtonColorType.WHITE}
              contentType={ButtonContentType.SYMBOL}
              disabled={pageNumber === 1}
              onClick={() => {
                setPageNumber(Math.max(1, pageNumber - 1));
              }}
            >
              <svg style={{ transform: "rotate(0.5turn)" }} aria-hidden="true" focusable="false">
                <use href="/icons/icon-arrows-sprite.svg#arrow-right-next" />
              </svg>
            </Button>

            <span
              className={`${buttonStyles.button} ${buttonStyles["button--filled"]} ${buttonStyles["button--icon"]} ${styles["pet-pagination__current-page"]}`}
              aria-current="page"
            >
              {pageNumber}
            </span>

            <Button
              aria-label="Next page"
              colorType={ButtonColorType.WHITE}
              contentType={ButtonContentType.SYMBOL}
              disabled={pageNumber === animals.getLastPageNumber(widthRange)}
              onClick={() => {
                setPageNumber(() => {
                  const lastPage = animals.getLastPageNumber(widthRange);
                  return Math.min(lastPage, pageNumber + 1);
                });
              }}
            >
              <svg aria-hidden="true" focusable="false">
                <use href="/icons/icon-arrows-sprite.svg#arrow-right-next" />
              </svg>
            </Button>
            <Button
              aria-label="Last page"
              colorType={ButtonColorType.WHITE}
              contentType={ButtonContentType.SYMBOL}
              disabled={pageNumber === animals.getLastPageNumber(widthRange)}
              onClick={() => {
                setPageNumber(animals.getLastPageNumber(widthRange));
              }}
            >
              <svg aria-hidden="true" focusable="false">
                <use href="/icons/icon-arrows-sprite.svg#arrow-right-end" />
              </svg>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default AnimalPagination;
