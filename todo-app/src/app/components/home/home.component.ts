import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AppState } from "../../core/models/appState";
import { StateService } from "../../core/services/state.service";
import { TodoItem } from "../../core/models/todoItem";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today!: string;
  state$!: Observable<AppState>;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.today = this.getTodayDate();
    this.state$ = this.stateService.getState();
  }

  getTodayDate(): string {
    let date = new Date();
    return date.getDate().toString().padStart(2, '0') + '/'
      + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear();
  }

  getAllNotCompletedItems(): Observable<TodoItem[]> {
    return this.stateService.getAllNotCompletedItems();
  }

  createNewList(): void {
    this.router.navigate(['lists', -1, 'edit']).then();
  }

}
