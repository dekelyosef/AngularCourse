import {NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {QuestionPresenterComponent} from "./components/question-presenter/question-presenter.component";
import {QuizOverComponent} from "./components/quiz-over/quiz-over.component";

const routes: Routes = [
  { path: '', redirectTo: 'question', pathMatch: 'full'},
  { path: 'question', component: QuestionPresenterComponent },
  { path: 'quiz-over', component: QuizOverComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
