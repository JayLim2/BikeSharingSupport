import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Message} from "../../models/message.model";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit, OnChanges {

  @Input()
  public message: Message;

  private _type: 'current' | 'other';

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  get type(): string {
    return this._type;
  }

  ngOnInit(): void {
    this.updateMessageType();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateMessageType();
  }

  updateMessageType() {
    const currentUser = this.authenticationService.currentUserValue;
    const isCurrentUser = currentUser.username === this.message.user.username;
    this._type = isCurrentUser ? 'current' : 'other';
    console.log(currentUser);
    console.log(this.message);
    console.log("\n")
  }

}
