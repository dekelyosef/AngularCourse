import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TodoItem } from "../../core/models/todoItem";
import { StateService } from "../../core/services/state.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items$!: Observable<TodoItem[]>;

  constructor(private stateService: StateService) {
    this.items$ = this.stateService.getAllNotCompletedItems();
  }

  ngOnInit(): void { }

  complete(item: TodoItem): void {
    this.stateService.markAsCompleted(item.id).then();
  }

}
