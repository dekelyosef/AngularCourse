import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItem} from "../../core/models/todoItem";
import {StateService} from "../../core/services/state.service";

@Component({
  selector: 'app-todo-item-presenter',
  templateUrl: './todo-item-presenter.component.html',
  styleUrls: ['./todo-item-presenter.component.css']
})
export class TodoItemPresenterComponent implements OnInit {

  @Input()
  caption!: string;

  @Input()
  isCompleted!: boolean;

  @Output()
  completed: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  onChange() {
    this.completed.emit();
  }

}
