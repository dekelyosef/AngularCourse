import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  containsWords(number: number): (ctrl: AbstractControl) => null | ValidationErrors {
    return ctrl => {
      const val = ctrl.value;
      if (typeof(val) !== 'string') return null;

      const letters = val.split(' ');
      if (letters.length >= number) return null;

      return {
        'words': {
          required: number,
          actual: letters.length
        }
      }
    }
  }
}
