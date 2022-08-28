import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import { StateService } from "../../services/state.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today!: Date;
  listsLength$!: Observable<number>;
  itemsLength$!: Observable<number>;
  uncompletedItemsLength$!: Observable<number>;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.today = new Date();

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
