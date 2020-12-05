import {Component, Input, OnInit} from '@angular/core';
import {TicketStatus} from "../../models/ticket-status.model";

@Component({
  selector: 'status-field',
  templateUrl: './status-field.component.html',
  styleUrls: ['./status-field.component.less']
})
export class StatusFieldComponent implements OnInit {

  @Input()
  public status: TicketStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
