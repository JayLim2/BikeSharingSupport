import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ticket} from "../../models/ticket.model";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";
import {TicketsService} from "../../../services/tickets.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {Message} from "../../models/message.model";
import {DateTimeService} from "../../../services/date-time.service";
import {Constants} from "../../common/constants.utils";
import {MessagesService} from "../../../services/messages.service";
import {User} from "../../models/user.model";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.less']
})
export class TicketPageComponent implements OnInit {

  private _messageForm: FormGroup;
  private _reassignForm: FormGroup;

  private chatNode: ElementRef;

  public ticket: Ticket;
  public operators: User[];

  constructor(
    private overlayService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private ticketsService: TicketsService,
    private ns: NotificationService,
    public authenticationService: AuthenticationService,
    private dateTimeService: DateTimeService,
    private messagesService: MessagesService,
    private usersService: UsersService
  ) {
    this._messageForm = new FormGroup({
      message: new FormControl(null, Validators.required)
    });
    this._reassignForm = new FormGroup({
      operator: new FormControl(null, Validators.required)
    });
  }

  get messageForm(): FormGroup {
    return this._messageForm;
  }

  get reassignForm(): FormGroup {
    return this._reassignForm;
  }

  @ViewChild('chat', {static: false})
  set content(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.chatNode = content;
    }
  }

  ngOnInit(): void {
    let ticketId = this.activatedRoute.snapshot.params['ticketId'];
    if (!Number.isNaN(ticketId)) {
      this.overlayService.show();
      this.ticketsService.getById(ticketId)
        .subscribe((ticket: Ticket) => {
          this.ticket = ticket;
        }, (error) => {
          console.error(error);
        })
        .add(() => {
          this.overlayService.hide();
          this.autoScroll();
        });

      this.usersService.getSupport()
        .subscribe((supportUsers: User[]) => {
          this.operators = [null, ...supportUsers];
          this.reassignForm.get("operator").setValue(
            this.buildSelectOperatorValue(this.operators[0])
          )
        }, (error) => {
          console.error(error);
        })
        .add(() => {
          this.overlayService.hide();
        })
    }
  }

  autoScroll() {
    setTimeout(() => {
      if (this.chatNode) {
        this.chatNode.nativeElement.scrollTo(
          0, this.chatNode.nativeElement.scrollHeight
        );
      }
    }, 0);
  }

  onSendMessage() {
    if (this.messageForm.valid) {
      const text = this.messageForm.value.message;
      const currentUser = this.authenticationService.currentUserValue;

      const message: Message = {
        text: text,
        dateTime: this.dateTimeService.dateToString(new Date(), Constants.PRETTY_DATE_TIME),
        user: {
          username: currentUser.username,
          firstName: currentUser.firstName
        },
        ticket: {
          id: this.ticket.id
        }
      };
      this.messagesService.save(message)
        .subscribe(() => {
          this.ticket.messages.push(message);
          this.autoScroll();
          this.messageForm.reset();
        }, (error) => {
          console.error(error);
          this.ns.error("Ошибка отправки сообщения.");
        })
    } else {
      this.ns.error("Введите сообщение.");
    }
  }

  assignMe() {
    const currentUser = this.authenticationService.currentUserValue;
    this.assignToUser(currentUser);
  }

  assignOther() {
    const selectedUser = this.reassignForm.value.operator;
    if (selectedUser) {
      const selectedUserSplit = this.reassignForm.value.operator.split('&');
      this.assignToUser({
        username: selectedUserSplit[0],
        firstName: selectedUserSplit[1],
        lastName: selectedUserSplit[2]
      });
    } else {
      this.assignToUser(null);
    }
  }

  private assignToUser(user) {
    let truncatedMessages = this.ticket.messages.map(msg => {
      return {
        id: msg.id,
        text: msg.text,
        dateTime: msg.dateTime,
        user: {
          username: msg.user.username
        }
      }
    });
    let ticket = {
      id: this.ticket.id,
      order: {
        id: this.ticket.order.id
      },
      status: this.ticket.status,
      messages: truncatedMessages,
      assignee: user ? {username: user.username} : null
    }
    this.overlayService.show();
    this.ticketsService.save(ticket)
      .subscribe(() => {
        this.ticket.assignee = user;
      }, (error) => {
        this.ns.error("Ошибка назначения оператора.");
        console.error(error);
      })
      .add(() => {
        this.overlayService.hide();
      })
  }

  buildSelectOperatorValue(operator: User) {
    return operator ? `${operator.username}&${operator.firstName}&${operator.lastName}` : null;
  }

  buildSelectOperatorName(operator: User) {
    return operator ? `${operator.firstName} ${operator.lastName}` : 'не назначен';
  }

}
