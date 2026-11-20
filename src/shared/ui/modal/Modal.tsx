import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/shared/lib/dom";
import { Button, ButtonColorType, ButtonContentType } from "@/shared/ui/button";
import styles from "./modal.module.scss";

interface ModalProps {
  children: ReactNode;
  label: string;
  closeLabel: string;
  onClose: () => void;
}

export default function Modal({ children, label, closeLabel, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useBodyScrollLock(true);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const closeOnBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) onClose();
    };
    dialog?.addEventListener("click", closeOnBackdrop);
    return () => dialog?.removeEventListener("click", closeOnBackdrop);
  }, [onClose]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles["pet-modal"]}
      id="popup"
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className={styles["pet-modal__content"]}>
        <Button
          colorType={ButtonColorType.WHITE}
          contentType={ButtonContentType.SYMBOL}
          onClick={onClose}
          className={styles["pet-modal__close"]}
          aria-label={closeLabel}
        >
          <img src="/icons/icon-cross.svg" alt="" width={12} height={12} />
        </Button>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}
