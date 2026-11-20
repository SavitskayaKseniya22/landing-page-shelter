import { buttonStyles as styledButton } from "@/shared/ui/button";
import { BackButton } from "@/shared/ui/back-button";

export default function ErrorView({ reset }: { reset: () => void }) {
  return (
    <>
      <h1>Something went wrong!</h1>
      <button
        type="button"
        onClick={() => reset()}
        className={`${styledButton.button} ${styledButton["button--outline"]} ${styledButton["button--text"]}`}
      >
        Try again
      </button>
      <BackButton />
    </>
  );
}
