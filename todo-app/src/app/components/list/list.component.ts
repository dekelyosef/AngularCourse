import { Component, OnInit } from '@angular/core';
import { map, Observable, switchAll } from "rxjs";
import { StateService } from "../../core/services/state.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoList } from "../../core/models/todoList";
import { TodoItem } from "../../core/models/todoItem";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidatorsService } from "../../core/services/validators.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list$!: Observable<TodoList>;
  items$!: Observable<TodoItem[]>;
  isSafeDelete: boolean = false;
  form!: {value: string, completed: boolean}[];
  newItems!: FormGroup;

  constructor(private stateService: StateService,
              private validatorsService: ValidatorsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = [];

    this.newItems = new FormGroup({
      newItem: new FormControl("", [
        Validators.minLength(10),
        this.validatorsService.containsWords(3)
      ])
    });

    const index$ = this.route.params.pipe(
      map(prm => Number(prm['id'])));

    this.list$ = index$.pipe(
      map(index => this.stateService.getListById(index)),
      switchAll());

    this.items$ = index$.pipe(
      map(index => this.stateService.getItemsOfList(index)),
      switchAll());

    this.items$.subscribe(
      next => {
        if (next !== undefined) {
          next.forEach((item: TodoItem) => this.form.push({value: item.caption, completed: item.isCompleted}));
        }
      }
    );
  }

  control(name: string): FormControl<any> {
    return this.newItems.get(name)! as FormControl<any>;
  }

  createNewList(): void {
    this.router.navigate(['lists', -1, 'edit']).then();
  }

  editList(id: number): void {
    this.router.navigate(['lists', id, 'edit']).then();
  }

  safeDelete(): void {
    this.isSafeDelete = !this.isSafeDelete;
  }

  deleteList(id: number): void {
    this.stateService.deleteList(id).then();
    this.router.navigate(['home']).then();
  }

  returnToLists(): void {
    this.router.navigate(['lists']).then();
  }

  addItem(listId: number): void {
    this.stateService.addTodoItem(listId, this.control("newItem").value).then();
    this.control("newItem").setValue("");
  }

  complete(item: TodoItem): void {
    this.stateService.markAsCompleted(item.id).then();
  }

}
