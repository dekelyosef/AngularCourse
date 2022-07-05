import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOverComponent } from './quiz-over.component';

describe('QuizOverComponent', () => {
  let component: QuizOverComponent;
  let fixture: ComponentFixture<QuizOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizOverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
