import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input()
  title? = '';

  @Input()
  disabled? = false;

  @Input()
  onClick: () => void = () => {};

  constructor() {}

  ngOnInit(): void {}
}

