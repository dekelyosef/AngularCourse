import { Injectable } from '@angular/core';
import { Color } from "../models/color";

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private readonly colors!: Color[];

  constructor() {
    this.colors = [
      {code: "#000000", name: "black"},
      {code: "#0000ff", name: "blue"},
      {code: "#ff0000", name: "red"},
      {code: "#f49d0b", name: "orange"},
      {code: "#22c45e", name: "green"},
      {code: "#ff00a6", name: "pink"}
    ];
  }

  getColors(): Color[] {
    return this.colors;
  }

  getColorByCode(code: string): Color {
    return this.colors.find(color => color.code === code)!;
  }

  getColorByName(name: string): Color {
    return this.colors.find(color => color.name === name)!;
  }

}
