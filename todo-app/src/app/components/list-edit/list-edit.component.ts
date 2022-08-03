import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable, switchAll} from "rxjs";
import {TodoList} from "../../core/models/todoList";
import {StateService} from "../../core/services/state.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Color} from "../../core/models/color";
import {ColorsService} from "../../core/services/colors.service";
import {ValidatorsService} from "../../core/services/validators.service";

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  isNew: boolean = true;
  listId: number = -1;
  list$!: Observable<TodoList>;
  colors!: Color[];
  selectedColor!: string;

  group = new FormGroup({
    caption: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30), this.validatorsService.containsWords(10)
    ]),
    color: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
  });

  constructor(private stateService: StateService,
              private colorsService: ColorsService,
              private validatorsService: ValidatorsService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.colors = this.colorsService.getColors();
    this.selectedColor = this.colors[0].code;

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

  changeColor(color: string) {
    this.selectedColor = color;
  }

}
