import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SummaryComponent } from './components/summary/summary.component';
import { QuizOverComponent } from './components/quiz-over/quiz-over.component';
import { QuestionPresenterComponent } from './components/question-presenter/question-presenter.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    QuizOverComponent,
    QuestionPresenterComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
