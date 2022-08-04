import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, switchAll } from "rxjs";
import { TodoList } from "../../core/models/todoList";
import { StateService } from "../../core/services/state.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Color } from "../../core/models/color";
import { ColorsService } from "../../core/services/colors.service";
import { ValidatorsService } from "../../core/services/validators.service";
import {IconsService} from "../../core/services/icons.service";

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  listId!: number;
  list$!: Observable<TodoList>;
  lists$!: Observable<TodoList[]>;
  colors!: Color[];
  selectedColor!: Color;
  icons!: string[];
  selectedIcon!: string;

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
              private iconService: IconsService,
              private validatorsService: ValidatorsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.colors = this.colorsService.getColors();
    this.selectedColor = this.colorsService.getColors()[0];
    this.icons = this.iconService.getIcons();
    this.selectedIcon = "";
    this.listId = -1;
  }

  ngOnInit(): void {
    const index$ = this.route.params.pipe(
      map(prm => Number(prm['id'])));

    this.list$ = index$.pipe(
      map(index => this.stateService.getListById(index)),
      switchAll());

    this.list$.subscribe(
      next => {
        if (next !== undefined) {
          this.listId = next.id;
          this.control("caption").setValue(next.caption);
          this.control("description").setValue(next.description);
          let color = this.colorsService.getColorByName(next.color);
          this.control("color").setValue(color.code);
          this.changeColor(color.code);
          this.control("icon").setValue(next.imageURL);
          this.changeIcon(next.imageURL);
        }
      }
    );

    this.lists$ = this.stateService.getAllLists();
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
      imageURL: this.control("icon").value
    }
    if(this.listId === -1) {
      this.stateService.addList( list.caption, list.description, list.color, list.imageURL).then();
    } else {
      this.stateService.modifyList(list).then();
    }
    this.router.navigate(['lists']).then();
  }

  changeColor(code: string) {
    this.selectedColor = this.colorsService.getColorByCode(code);
  }

  changeIcon(value: string) {
    this.selectedIcon = value;
  }

}
