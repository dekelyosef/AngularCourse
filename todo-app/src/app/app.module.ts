import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { ListComponent } from './components/list/list.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ItemsComponent } from './components/items/items.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ErrorsPresenterComponent } from './components/errors-presenter/errors-presenter.component';
import {MatIconModule} from "@angular/material/icon";
import { TodoItemPresenterComponent } from './components/todo-item-presenter/todo-item-presenter.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListsComponent,
    ListComponent,
    ListEditComponent,
    ItemsComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    ErrorsPresenterComponent,
    TodoItemPresenterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
