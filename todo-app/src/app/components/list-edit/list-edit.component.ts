import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable, switchAll} from "rxjs";
import {TodoList} from "../../core/models/todoList";
import {StateService} from "../../core/services/state.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  isNew: boolean = true;
  listId: number = -1;
  list$!: Observable<TodoList>;

  colors = [
    {code: "#000000", name: "black"},
    {code: "#0000ff", name: "blue"},
    {code: "#ff0000", name: "red"},
    {code: "#f49d0b", name: "orange"},
    {code: "#22c45e", name: "green"},
    {code: "#ff00a6", name: "pink"}];

  group = new FormGroup({
    caption: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required,
      Validators.minLength(30), this.containsWords(10)]),
    color: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
  });

  constructor(private stateService: StateService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const index$ = this.route.params.pipe(
      map(prm => Number(prm['id'])));

    this.list$ = index$.pipe(
      map(index => this.stateService.getListById(index)),
      switchAll());

    this.list$.subscribe(
      next => {
        if (next !== undefined) {
          this.isNew = false;
          this.listId = next.id;
          this.control("caption").setValue(next.caption);
          this.control("description").setValue(next.description);
          this.control("color").setValue(next.color);
          this.control("icon").setValue(next.imageURL);
        }
      }
    );
  }

  control(name: string): FormControl<any> {
    return this.group.get(name)! as FormControl<any>;
  }

  saveList(): void {
    const list: TodoList = {
      id: this.listId,
      caption: this.control("caption").value,
      description: this.control("description").value,
      color: this.control("color").value,
      imageURL: this.control("caption").value
    }
    if(this.isNew) {
      this.stateService.addList( list.caption, list.description, list.color, list.imageURL).then();
    } else {
      this.stateService.modifyList(list).then();
    }
  }

  containsWords(number: number): (ctrl: AbstractControl) => null | ValidationErrors {
    return ctrl => {
      const val = ctrl.value;
      if (typeof(val) !== 'string') return null;

      const letters = val.split(' ');
      if (letters.length > number) return null;

      return {
        'words': {
          required: number,
          actual: letters.length
        }
      }
    }
  }

}
