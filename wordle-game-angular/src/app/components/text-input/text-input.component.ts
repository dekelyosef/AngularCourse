import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @ViewChild("inputVal")
  input: ElementRef = new ElementRef<any>("");

  @Input()
  disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getValue(): string {
    let value = this.input.nativeElement.value;
    this.setValue();
    return value;
  }

  setValue(): void {
    this.input.nativeElement.value = "";
  }

}
