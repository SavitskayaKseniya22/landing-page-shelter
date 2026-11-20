import { useState } from "react";
import { AnimalCard, AnimalDetails, type AnimalType } from "@/entities/animal";
import { Button, ButtonColorType, ButtonContentType } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";

export default function AnimalPreview({ animal }: { animal: AnimalType }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AnimalCard
        animal={animal}
        action={
          <Button
            colorType={ButtonColorType.WHITE}
            contentType={ButtonContentType.STRING}
            aria-label={`Learn more about ${animal.name}`}
            onClick={() => setIsOpen(true)}
          >
            Learn more
          </Button>
        }
      />
      {isOpen && (
        <Modal label="Pet details" closeLabel="Close pet details" onClose={() => setIsOpen(false)}>
          <AnimalDetails animal={animal} />
        </Modal>
      )}
    </>
  );
}
