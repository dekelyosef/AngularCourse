import {Cell} from "./cell";

export interface Board {
  readonly cells: Cell[][];
  readonly filledRows: number;
  readonly word: string;
  readonly isGameOver: boolean;
  readonly hasWon: boolean;
}
