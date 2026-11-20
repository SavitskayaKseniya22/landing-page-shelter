import styles from "./help.module.scss";

const data = [
  { title: "Pet food", id: "icon-pet-food" },
  {
    title: "Transportation",
    id: "icon-transportation",
  },
  { title: "Toys", id: "icon-toys" },
  {
    title: "Bowls and cups",
    id: "icon-bowls-and-cups",
  },
  { title: "Shampoos", id: "icon-shampoos" },
  { title: "Vitamins", id: "icon-vitamins" },
  {
    title: "Medicines",
    id: "icon-medicines",
  },
  {
    title: "Collars / leashes",
    id: "icon-collars-leashes",
  },
  {
    title: "Sleeping areas",
    id: "icon-sleeping-area",
  },
];

function HelpItem({ title, id }: { title: string; id: string }) {
  return (
    <li className={styles.help__item}>
      <svg className={styles["help__icon"]} aria-hidden="true">
        <use href={`/icons/icon-help-sprite.svg#${id}`} />
      </svg>
      <p className={styles["help__item-label"]}>{title}</p>
    </li>
  );
}

function Help() {
  return (
    <section className={styles.help} id="help">
      <div className={`${styles["help__container"]} layout-container`}>
        <h2 className={styles["help__heading"]}>
          How you can help <br />
          our shelter
        </h2>
        <ul className={styles.help__list}>
          {data.map((item) => (
            <HelpItem id={item.id} title={item.title} key={item.title} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Help;
