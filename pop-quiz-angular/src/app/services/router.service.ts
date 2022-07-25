import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private isQuizOver = false;
  private isQuizOver$ = new BehaviorSubject<boolean>(this.isQuizOver);

  constructor(private router: Router) {}

  getIsQuizOver(): Observable<boolean> {
    return this.isQuizOver$.asObservable();
  }

  setIsQuizOver(quizOver: boolean): void {
    this.isQuizOver = quizOver;
    this.isQuizOver$.next(this.isQuizOver);
    if (this.isQuizOver) {
      this.router.navigate(['quiz-over']).then(r => {});
    }
  }

}
