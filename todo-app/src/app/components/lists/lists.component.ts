import { Component, OnInit } from '@angular/core';
import { TodoList } from "../../models/todoList";
import { StateService } from "../../services/state.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Color } from "../../models/color";
import { ColorsService } from "../../services/colors.service";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists$!: Observable<TodoList[]>;
  colors!: Color[];

  constructor(private stateService: StateService,
              private colorService: ColorsService,
              private router: Router) {
    this.colors = this.colorService.getColors();
    this.lists$ = this.stateService.getAllLists();
  }

  ngOnInit(): void { }

  async onListSelect(index: number): Promise<void> {
    await this.router.navigate(['lists', index]);
  }

  async addNewList(): Promise<void> {
    await this.router.navigate(['lists', -1, 'edit']);
  }

}
