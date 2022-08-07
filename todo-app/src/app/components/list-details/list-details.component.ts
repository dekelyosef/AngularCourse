import { Component, OnInit } from '@angular/core';
import { map, Observable, switchAll } from "rxjs";
import { StateService } from "../../services/state.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoList } from "../../models/todoList";
import { TodoItem } from "../../models/todoItem";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidatorsService } from "../../services/validators.service";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {

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

  async createNewList(): Promise<void> {
    await this.router.navigate(['lists', -1, 'edit']);
  }

  async editList(id: number): Promise<void> {
    await this.router.navigate(['lists', id, 'edit']);
  }

  safeDelete(): void {
    this.isSafeDelete = !this.isSafeDelete;
  }

  async deleteList(id: number): Promise<void> {
    await this.stateService.deleteList(id);
    await this.router.navigate(['home']);
  }

  async returnToLists(): Promise<void> {
    await this.router.navigate(['lists']);
  }

  async addItem(listId: number): Promise<void> {
    await this.stateService.addTodoItem(listId, this.control("newItem").value);
    this.control("newItem").setValue("");
  }

  async complete(item: TodoItem): Promise<void> {
    await this.stateService.markAsCompleted(item.id);
  }

}
