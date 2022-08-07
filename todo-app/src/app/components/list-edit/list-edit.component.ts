import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {map, Observable, Subscription, switchAll, take} from "rxjs";
import { TodoList } from "../../models/todoList";
import { StateService } from "../../services/state.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Color } from "../../models/color";
import { ColorsService } from "../../services/colors.service";
import { ValidatorsService } from "../../services/validators.service";
import { IconsService } from "../../services/icons.service";

@Component({
  selector: 'app-list-details-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit, OnDestroy {

  index$!: Observable<number>;
  lists$!: Observable<TodoList[]>;
  colors!: Color[];
  icons!: string[];
  subscription!: Subscription;

  group = new FormGroup({
    caption: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(30), this.validatorsService.containsWords(10)
    ]),
    color: new FormControl('', [Validators.required]),
    imageURL: new FormControl('', [Validators.required]),
  });

  constructor(private stateService: StateService,
              private colorsService: ColorsService,
              private iconService: IconsService,
              private validatorsService: ValidatorsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.colors = this.colorsService.getColors();
    this.icons = this.iconService.getIcons();
  }

  ngOnInit(): void {
    this.index$ = this.activatedRoute.params.pipe(
      map(prm => Number(prm['id'])));

    const list$ = this.index$.pipe(
      map(index => this.stateService.getListById(index)),
      switchAll());

    this.subscription = list$.pipe().subscribe(
      next => {
        if (next !== undefined) {
          let color = this.colorsService.getColorByName(next.color);
          this.group.reset({
            caption: next.caption,
            description: next.description,
            color: color.code,
            imageURL: next.imageURL
          });
        }
      }
    );

    this.lists$ = this.stateService.getAllLists();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  control(name: string): FormControl<any> {
    return this.group.get(name)! as FormControl<any>;
  }

  async saveList(): Promise<void> {
    let color = this.colorsService.getColorByCode(this.control("color").value);

    this.index$.pipe(take(1)).subscribe(index => {
      const list: TodoList = {
        id: index,
        caption: this.control("caption").value,
        description: this.control("description").value,
        color: color.name,
        imageURL: this.control("imageURL").value
      }
      if (list.id === -1) {
        this.stateService.addList( list.caption, list.description, list.color, list.imageURL);
      } else {
        this.stateService.modifyList(list);
      }
    });
    await this.router.navigate(['lists']);
  }

  async editAnotherList(selectedList: string): Promise<void> {
    await this.router.navigate(['lists',  Number(selectedList), 'edit']);
  }
}
