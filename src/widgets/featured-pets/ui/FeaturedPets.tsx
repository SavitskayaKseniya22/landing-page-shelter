import { Link } from "react-router-dom";
import styles from "./featured-pets.module.scss";
import { buttonStyles as linkStyles } from "@/shared/ui/button";
import AnimalCarousel from "./AnimalCarousel";
import { animals } from "@/entities/animal";
import { InfoBox } from "@/shared/ui/info-box";

function FeaturedPets() {
  return (
    <section className={styles["featured-pets"]} id="friends">
      <div className={`${styles["featured-pets__container"]} layout-container`}>
        <h2>
          Our friends who <br />
          are looking for a house
        </h2>

        {animals.length > 0 ? <AnimalCarousel animals={animals} /> : <InfoBox>No pets found</InfoBox>}

        <Link
          to="/pets"
          className={`${linkStyles.button} ${linkStyles["button--filled"]} ${linkStyles["button--text"]}`}
        >
          Get to know the rest
        </Link>
      </div>
    </section>
  );
}

export default FeaturedPets;
