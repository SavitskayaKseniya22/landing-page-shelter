import type { AnimalType } from "@/entities/animal";
import { shuffle } from "@/shared/lib/shuffle";

export enum DirectionType {
  RIGHT = "right",
  LEFT = "left",
}

export default class CarouselData {
  elements: AnimalType[] = [];

  row: AnimalType[];

  constructor(elements: AnimalType[]) {
    this.elements = [...elements];
    this.row = elements.length ? Array.from({ length: 9 }, (_, index) => elements[index % elements.length]) : [];
  }

  getThreeCards(usedCards: AnimalType[]) {
    if (!this.elements.length) return [];
    const candidates = shuffle(this.elements.filter((card) => !usedCards.includes(card)));
    const remaining = shuffle(this.elements.filter((card) => usedCards.includes(card)));
    const pool = [...candidates, ...remaining];
    return Array.from({ length: 3 }, (_, index) => pool[index % pool.length]);
  }

  get rowActivePart() {
    return this.row.slice(3, 6);
  }

  get rowPrevPart() {
    return this.row.slice(0, 3);
  }

  get rowNextPart() {
    return this.row.slice(6, 9);
  }

  updateRowLeft() {
    this.row = [...this.getThreeCards(this.row.slice(0, 3)), ...this.row.slice(0, 6)];
  }

  updateRowRight() {
    this.row = [...this.row.slice(3, 9), ...this.getThreeCards(this.row.slice(6, 9))];
  }

  getLength() {
    return this.elements.length;
  }
}
