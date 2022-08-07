import { Component, OnInit } from '@angular/core';
import {map, Observable, switchAll} from "rxjs";
import { AppState } from "../../models/appState";
import { StateService } from "../../services/state.service";
import { TodoItem } from "../../models/todoItem";
import { Router } from "@angular/router";
import {TodoList} from "../../models/todoList";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today!: Date;
  state$!: Observable<AppState>;
  listsLength$!: Observable<number>;
  itemsLength$!: Observable<number>;
  uncompletedItemsLength$!: Observable<number>;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.today = new Date();
    this.state$ = this.stateService.getState();

    this.listsLength$ = this.stateService.getAllLists().pipe(
      map(lists => lists.length));

    this.itemsLength$ = this.stateService.getAllItems().pipe(
      map(items => items.length));

    this.uncompletedItemsLength$ = this.stateService.getAllNotCompletedItems().pipe(
      map(items => items.length));
  }

  async createNewList(): Promise<void> {
    await this.router.navigate(['lists', -1, 'edit']);
  }

}
