import { ReactNode } from "react";
import { BackButton } from "@/shared/ui/back-button";
import styles from "./info-box.module.scss";

export default function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div className={styles["info-box"]}>
      <p className={styles["info-box__message"]}>{children}</p>
      <BackButton />
    </div>
  );
}
