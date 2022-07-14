import {STATUS} from "./status";

export interface Cell {
  readonly content: string;
  readonly status: STATUS;
  readonly color: string;
}
