import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, firstValueFrom, map, Observable} from "rxjs";
import {AppState} from "../models/appState";
import {TodoList} from "../models/todoList";
import {TodoItem} from "../models/todoItem";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private state!: AppState;
  private state$ = new BehaviorSubject<AppState>(this.state);

  constructor() { }

  getAllLists(): Observable<TodoList[]> {
    return this.state$.asObservable()
      .pipe(map(appState => appState.todoLists));
  }

  getListById(id: number): Observable<TodoList> {
    return this.state$.asObservable()
      .pipe(map(appState => appState.todoLists
        .find(list => list.id === id)!));
  }

  getAllItems(): Observable<TodoItem[]> {
    return this.state$.asObservable()
      .pipe(map(appState => appState.todoItems));
  }

  getItem(id: number): Observable<TodoItem> {
    return this.state$.asObservable()
      .pipe(map(appState => appState.todoItems
        .find(item => item.id === id)!));
  }

  getItemsOfList(listId: number): Observable<TodoItem[]> {
    return this.state$.asObservable()
      .pipe(map(appState => appState.todoItems
        .filter(item => item.listId === listId)));
  }

  getAllNotCompletedItems(): Observable<TodoItem[]> {
    return this.state$.asObservable()
      .pipe(map(appState => appState.todoItems
        .filter(item => item.isCompleted)));
  }

  async AddList(caption: string, description: string, color: string, icon: string): Promise<number> {
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

  async ModifyList(list: TodoList): Promise<void> {
    const index = this.state.todoLists.findIndex(l => list);
    this.state.todoLists[index] = { ...this.state.todoLists[index],
      caption: list.caption, description: list.description, color: list.color, imageURL: list.imageURL
    }
    this.state$.next(this.state);
  }

  async AddTodoItem(listId: number, caption: string): Promise<number> {
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

  async MarkAsCompleted(itemId: number): Promise<void> {
    const index = this.state.todoItems.findIndex(i => i.id === itemId);
    this.state.todoItems[index] = { ...this.state.todoItems[index], isCompleted: true};
    this.state$.next(this.state);
  }

  async DeleteList(listId: number): Promise<void> {
    this.state = { ...this.state,
      todoLists: this.state.todoLists.filter(list => list.id !== listId),
      todoItems: this.state.todoItems.filter(item => item.listId !== listId)
    };
  }

}
