import { errorPageStyles as styled } from "@/shared/ui/error-view";
import { BackButton } from "@/shared/ui/back-button";

export default function NotFound() {
  return (
    <main className={styled["error-page"]}>
      <h1>Not Found</h1>
      <BackButton />
    </main>
  );
}
