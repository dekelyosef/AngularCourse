import { Component, OnInit } from '@angular/core';
import { TodoList } from "../../core/models/todoList";
import { StateService } from "../../core/services/state.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Color } from "../../core/models/color";
import { ColorsService } from "../../core/services/colors.service";

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

  onListSelect(index: number) {
    this.router.navigate(['lists', index]).then();
  }

  addNewList(): void {
    this.router.navigate(['lists', -1, 'edit']).then();
  }

}
