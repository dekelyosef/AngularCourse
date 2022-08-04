import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from "rxjs";
import { AppState } from "../models/appState";
import { TodoList } from "../models/todoList";
import { TodoItem } from "../models/todoItem";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private state!: AppState;
  private state$ = new BehaviorSubject<AppState>(this.state);

  constructor() {
    this.state = { todoLists: [], todoItems: [] };

    const list1: TodoList =
      {id: 1, caption: "Home", description: "this is the home list", imageURL: "home", color:"blue"};
    const list2: TodoList =
      {id: 2, caption: "Work", description: "this is the work list", imageURL: "work", color:"orange"};
    const list3: TodoList =
      {id: 3, caption: "Shopping", description: "this is the shopping list", imageURL: "shopping", color:"pink"};
    const list4: TodoList =
      {id: 4, caption: "Event", description: "this is the event list", imageURL: "event", color:"red"};
    const item1: TodoItem = {id: 1, caption: "item1", listId: 1, isCompleted: true};
    const item2: TodoItem = {id: 2, caption: "item2", listId: 1, isCompleted: false};
    this.state.todoLists.push(list1, list2, list3, list4);
    this.state.todoItems.push(item1, item2);
    this.state$.next(this.state);
  }

  getState(): Observable<AppState> {
    return this.state$;
  }

  getAllLists(): Observable<TodoList[]> {
    return this.state$.pipe(
      map(appState => appState.todoLists));
  }

  getListById(id: number): Observable<TodoList> {
    return this.state$.pipe(
      map(appState => appState.todoLists.find(list => list.id === id)!));
  }

  getAllItems(): Observable<TodoItem[]> {
    return this.state$.pipe(
      map(appState => appState.todoItems));
  }

  getItem(id: number): Observable<TodoItem> {
    return this.state$.pipe(
      map(appState => appState.todoItems.find(item => item.id === id)!));
  }

  getItemsOfList(listId: number): Observable<TodoItem[]> {
    return this.state$.pipe(
      map(appState => appState.todoItems.filter(item => item.listId === listId)));
  }

  getAllNotCompletedItems(): Observable<TodoItem[]> {
    return this.state$.pipe(
      map(appState => appState.todoItems.filter(item => !item.isCompleted)));
  }

  async addList(caption: string, description: string, color: string, icon: string): Promise<number> {
    const newList: TodoList = {
      id: Math.floor(Math.random() * 100000000),
      caption: caption,
      description: description,
      color: color,
      imageURL: icon
    };
    this.state.todoLists.push(newList);
    this.state$.next(this.state);
    // return firstValueFrom(this.state$.pipe(map(appState => appState.todoLists.findIndex(value => newList))));
    return newList.id;
  }

  async modifyList(list: TodoList): Promise<void> {
    const index = this.state.todoLists.findIndex(l => list);
    this.state.todoLists[index] = { ...this.state.todoLists[index],
      caption: list.caption, description: list.description, color: list.color, imageURL: list.imageURL
    }
    this.state$.next(this.state);
  }

  async addTodoItem(listId: number, caption: string): Promise<number> {
    const newItem: TodoItem = {
      id: Math.floor(Math.random() * 100000000),
      caption: caption,
      listId: listId,
      isCompleted: false
    };
    this.state.todoItems.push(newItem);
    this.state$.next(this.state);
    // return firstValueFrom(this.state$.pipe(map(appState => appState.todoItems.findIndex(value => newItem))));
    return newItem.id;
  }

  async markAsCompleted(itemId: number): Promise<void> {
    const index = this.state.todoItems.findIndex(i => i.id === itemId);
    this.state.todoItems[index] = { ...this.state.todoItems[index], isCompleted: true};
    this.state$.next(this.state);
  }

  async deleteList(listId: number): Promise<void> {
    this.state = { ...this.state,
      todoLists: this.state.todoLists.filter(list => list.id !== listId),
      todoItems: this.state.todoItems.filter(item => item.listId !== listId)
    };
    this.state$.next(this.state);
  }

}
