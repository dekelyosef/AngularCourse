import { Component, OnInit } from '@angular/core';
import {map, Observable, switchAll} from "rxjs";
import {StateService} from "../../core/services/state.service";
import {ActivatedRoute} from "@angular/router";
import {TodoList} from "../../core/models/todoList";
import {TodoItem} from "../../core/models/todoItem";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list$!: Observable<TodoList>;
  items$!: Observable<TodoItem[]>;

  constructor(private stateService: StateService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const index$ = this.route.params.pipe(
      map(prm => Number(prm['id'])));

    this.list$ = index$.pipe(
      map(index => this.stateService.getListById(index)),
      switchAll());

    this.items$ = index$.pipe(
      map(index => this.stateService.getItemsOfList(index)),
      switchAll());
  }

}
