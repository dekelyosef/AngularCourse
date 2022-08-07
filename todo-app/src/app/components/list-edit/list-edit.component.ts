import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, Subscription, switchAll } from "rxjs";
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

  listId!: number;
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
    icon: new FormControl('', [Validators.required]),
  });

  constructor(private stateService: StateService,
              private colorsService: ColorsService,
              private iconService: IconsService,
              private validatorsService: ValidatorsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.colors = this.colorsService.getColors();
    this.icons = this.iconService.getIcons();
    this.listId = -1;
  }

  ngOnInit(): void {
    const index$ = this.activatedRoute.params.pipe(
      map(prm => Number(prm['id'])));

    const list$ = index$.pipe(
      map(index => this.stateService.getListById(index)),
      switchAll());

    this.subscription = list$.pipe().subscribe(
      next => {
        if (next !== undefined) {
          this.listId = next.id;
          let color = this.colorsService.getColorByName(next.color);
          this.group.setValue({
            caption: next.caption,
            description: next.description,
            color: color.code,
            icon: next.imageURL
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
    const list: TodoList = {
      id: this.listId,
      caption: this.control("caption").value,
      description: this.control("description").value,
      color: color.name,
      imageURL: this.control("icon").value
    }
    if(this.listId === -1) {
      await this.stateService.addList( list.caption, list.description, list.color, list.imageURL);
    } else {
      await this.stateService.modifyList(list);
    }
    await this.router.navigate(['lists']);
  }

  async editAnotherList(selectedList: string): Promise<void> {
    await this.router.navigate(['lists',  Number(selectedList), 'edit']);
  }
}
