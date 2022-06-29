import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @ViewChild("inputVal")
  public input: ElementRef = new ElementRef<any>("");

  @Input()
  disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getValue(): string {
    return this.input.nativeElement.value;
  }

  setValue(): void {
    this.input.nativeElement.value = "";
  }

}
