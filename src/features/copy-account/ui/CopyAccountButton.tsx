import { useEffect, useRef, useState } from "react";
import { Button, ButtonColorType, ButtonContentType } from "@/shared/ui/button";

import styles from "./copy-account.module.scss";

export default function CopyAccountButton({ content }: { content: string }) {
  const [status, setStatus] = useState<"idle" | "pending" | "copied">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function copyAccount() {
    setStatus("pending");
    try {
      await navigator.clipboard.writeText(content.replace(/\s/g, ""));
      if (!mounted.current) return;
      setStatus("copied");
      timeoutRef.current = setTimeout(() => setStatus("idle"), 1000);
    } catch {
      if (mounted.current) setStatus("idle");
    }
  }

  return (
    <div className={styles["account-copy"]}>
      <Button
        colorType={ButtonColorType.COLORED}
        contentType={ButtonContentType.STRING}
        disabled={status === "pending" || status === "copied"}
        className={styles["account-copy__button"]}
        aria-label={`Copy bank account number ${content}`}
        onClick={copyAccount}
      >
        <img width={20} height={20} src="/icons/credit-card.svg" alt="" loading="lazy" />
        <span className={styles["account-copy__number"]}>{status === "copied" ? "Copied!" : content}</span>
      </Button>
    </div>
  );
}
