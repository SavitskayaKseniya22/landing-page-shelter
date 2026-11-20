import styles from "./pets-page.module.scss";
import { PetCatalog } from "@/widgets/pet-catalog";
function Pets() {
  return (
    <main className={styles["pets-page"]}>
      <div className={`${styles["pets-page__container"]} layout-container`}>
        <h1>
          Our friends who <br />
          are looking for a house
        </h1>
        <PetCatalog />
      </div>
    </main>
  );
}

export default Pets;
