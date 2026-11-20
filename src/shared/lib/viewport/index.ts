export enum ScreenSize {
  LAPTOP = 1279,
  TABLET = 767,
}

export type RangeType = 0 | 1 | 2;

export function checkRange(): RangeType {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width > ScreenSize.LAPTOP) {
      return 0;
    }
    if (width > ScreenSize.TABLET) {
      return 1;
    }
    return 2;
  }

  return 0;
}
