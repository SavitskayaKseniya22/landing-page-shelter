import type { ComponentPropsWithoutRef } from "react";
import styles from "./button.module.scss";

import type { ButtonColorType, ButtonContentType } from "./types";

function Button({
  children,
  colorType,
  contentType,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  colorType: ButtonColorType;
  contentType: ButtonContentType;
}) {
  return (
    <button
      {...props}
      disabled={disabled}
      type={type}
      className={`${styles.button} ${styles[`button--${colorType}`]} ${styles[`button--${contentType}`]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
