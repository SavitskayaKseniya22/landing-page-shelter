import type { AnimalType } from "@/entities/animal";
import type { RangeType } from "@/shared/lib/viewport";
import { shuffle } from "@/shared/lib/shuffle";

export default class PaginationData {
  elements: AnimalType[] = [];

  pageSet = {
    0: {
      itemOnPage: 8,
    },
    1: {
      itemOnPage: 6,
    },
    2: {
      itemOnPage: 3,
    },
  };

  ranges: { 0: AnimalType[][]; 1: AnimalType[][]; 2: AnimalType[][] };

  sortedRow: AnimalType[];

  constructor(elements: AnimalType[]) {
    this.elements = [...elements];
    this.sortedRow = this.createSortedRow();

    this.ranges = {
      0: this.setRangeData(0),
      1: this.setRangeData(1),
      2: this.setRangeData(2),
    };
  }

  createSortedRow() {
    // The 6/2/4/4/2/6 blocks keep every 8-, 6- and 3-card page unique for the eight-pet catalog.
    // A repeated permutation safely supports smaller or expanded catalogs too.
    if (this.elements.length !== 8) {
      const cycle = shuffle(this.elements);
      return Array.from({ length: 6 }, () => cycle).flat();
    }
    const getPart = (excArr: AnimalType[], length: number) =>
      shuffle(this.elements.filter((animal) => !excArr.includes(animal))).splice(0, length);

    const get24items = () => {
      const row = [];
      row.push(getPart([], 6));
      row.push(getPart(row[row.length - 1], 2));
      row.push(getPart(row[row.length - 1], 4));
      row.push(getPart(row[row.length - 1], 4));
      row.push(getPart(row[row.length - 1], 2));
      row.push(getPart(row[row.length - 1], 6));

      return row;
    };

    return get24items().concat(get24items()).flat();
  }

  public getLastPageNumber(widthRange: RangeType) {
    return this.ranges[widthRange].length;
  }

  private setRangeData(widthRange: RangeType) {
    const result = [];

    const arr = [...this.sortedRow];

    while (arr.length) {
      result.push(arr.splice(0, Math.min(this.elements.length, this.pageSet[widthRange].itemOnPage)));
    }

    return result;
  }

  public getRangeData(widthRange: RangeType, pageNumber: number) {
    const pages = this.ranges[widthRange];
    if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > pages.length) return [];
    return pages[pageNumber - 1];
  }

  getLength() {
    return this.elements.length;
  }
}
