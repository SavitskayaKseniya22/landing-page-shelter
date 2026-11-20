import { animals } from "@/entities/animal";
import { InfoBox } from "@/shared/ui/info-box";
import AnimalPagination from "./AnimalPagination";

export default function PetCatalog() {
  return animals.length > 0 ? <AnimalPagination animals={animals} /> : <InfoBox>No pets found</InfoBox>;
}
