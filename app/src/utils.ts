import { Address } from "wagmi";
import { BOARD_SIZE } from "./constants";

export function toBitsByColumn(bitboard: string) {
  return [...padTo(BOARD_SIZE, bitboard)]
    .reverse()
    .reduce<{ [col: number]: string[] }>((acc, char, i) => {
      const cols = Object.keys(acc).length;
      const isFirstRow = (i + 1) % 7 === 1;
      const isLastRow = (i + 1) % 7 === 0;
      if (isFirstRow) {
        return {
          ...acc,
          [cols]: [char],
        };
      }
      if (isLastRow) {
        return acc;
      }
      return {
        ...acc,
        [cols - 1]: [char, ...acc[cols - 1]],
      };
    }, {});
}

export function padTo(length: number, value: string) {
  const lengthToPad = length - value.length;
  return Array.from(Array(lengthToPad).keys()).fill(0).join("").concat(value);
}

export function toCompact(address: Address | string) {
  return `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}`
}
