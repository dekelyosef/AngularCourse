import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from "rxjs";
import { AppState } from "../models/appState";
import { TodoList } from "../models/todoList";
import { TodoItem } from "../models/todoItem";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private state: AppState = { todoLists: [], todoItems: [] };
  private state$ = new BehaviorSubject<AppState>(this.state);

  constructor() {
    const list1: TodoList =
      {id: 1, caption: "Home", description: "this is the home list-details", imageURL: "home", color:"blue"};
    const list2: TodoList =
      {id: 2, caption: "Work", description: "this is the work list-details", imageURL: "work", color:"orange"};
    const list3: TodoList =
      {id: 3, caption: "Shopping", description: "this is the shopping list-details", imageURL: "shopping", color:"pink"};
    const list4: TodoList =
      {id: 4, caption: "Event", description: "this is the event list-details", imageURL: "event", color:"red"};
    const item1: TodoItem = {id: 1, caption: "item1", listId: 1, isCompleted: true};
    const item2: TodoItem = {id: 2, caption: "item2", listId: 1, isCompleted: false};
    this.state = {...this.state, todoLists: [list1, list2, list3, list4], todoItems: [item1, item2]};
    this.state$.next(this.state);
  }

  getState(): Observable<AppState> {
    return this.state$.asObservable();
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
    this.state = {...this.state, todoLists: [...this.state.todoLists, newList]};
    this.state$.next(this.state);
    return newList.id;
  }

  async modifyList(list: TodoList): Promise<void> {
    this.state = {...this.state, todoLists: this.state.todoLists.map(
      todoList => (todoList.id !== list.id) ? todoList : list)
    };
    this.state$.next(this.state);
  }

  async addTodoItem(listId: number, caption: string): Promise<number> {
    const newItem: TodoItem = {
      id: Math.floor(Math.random() * 100000000),
      caption: caption,
      listId: listId,
      isCompleted: false
    };
    this.state = {...this.state, todoItems: [...this.state.todoItems, newItem]};
    this.state$.next(this.state);
    return newItem.id;
  }

  async markAsCompleted(itemId: number): Promise<void> {
    this.state = {...this.state, todoItems: this.state.todoItems.map(
      todoItem => (todoItem.id !== itemId) ? todoItem : { ...todoItem, isCompleted: true})};
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
