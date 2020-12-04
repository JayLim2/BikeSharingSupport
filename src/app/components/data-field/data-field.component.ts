import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'data-field',
  templateUrl: './data-field.component.html',
  styleUrls: ['./data-field.component.less']
})
export class DataFieldComponent implements OnInit {

  @Input()
  public name: string;
  @Input()
  public value: string;
  @Output()
  public isRequired: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
