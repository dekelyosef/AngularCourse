import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class IconsService {

  private readonly icons!: string[];

  constructor() {
    this.icons = [ "home", "work", "shopping", "event", "alarm", "bookmark" ];
  }

  getIcons(): string[] {
    return this.icons;
  }

}
