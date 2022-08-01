import {TodoItem} from "./todoItem";
import {TodoList} from "./todoList";

export interface AppState {
  readonly todoLists: TodoList[];
  readonly todoItems: TodoItem[];
}
