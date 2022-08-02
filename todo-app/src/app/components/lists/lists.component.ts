import { Component, OnInit } from '@angular/core';
import {TodoList} from "../../core/models/todoList";
import {StateService} from "../../core/services/state.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists$!: Observable<TodoList[]>;

  constructor(private stateService: StateService,
              private router: Router) { }

  ngOnInit(): void {
    this.lists$ = this.stateService.getAllLists();
  }

  onListSelect(index: number) {
    this.router.navigate(['lists', index]).then();
  }

  addNewList(): void {
    this.router.navigate(['lists', -1, 'edit']).then();
  }
}
