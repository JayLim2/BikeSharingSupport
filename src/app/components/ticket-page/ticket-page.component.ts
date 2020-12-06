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

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.less']
})
export class TicketPageComponent implements OnInit {

  private chatNode: ElementRef;

  @ViewChild('chat', {static: false}) set content(content: ElementRef) {
    if (content) { // initially setter gets called with undefined
      this.chatNode = content;
    }
  }

  public ticket: Ticket;

  private _messageForm: FormGroup;

  constructor(
    private overlayService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private ticketsService: TicketsService,
    private ns: NotificationService,
    private authenticationService: AuthenticationService,
    private dateTimeService: DateTimeService,
    private messagesService: MessagesService,
  ) {
    this._messageForm = new FormGroup({
      message: new FormControl(null, Validators.required)
    })
  }

  get messageForm(): FormGroup {
    return this._messageForm;
  }

  ngOnInit(): void {
    this.overlayService.show();

    let ticketId = this.activatedRoute.snapshot.params['ticketId'];
    if (!Number.isNaN(ticketId)) {
      this.ticketsService.getById(ticketId)
        .subscribe((ticket: Ticket) => {
          this.ticket = ticket;
        }, (error) => {
          console.error(error);
        })
        .add(() => {
          this.overlayService.hide();
          this.autoScroll();
        })
    }
  }

  autoScroll() {
    setTimeout(() => {
      if (this.chatNode) {
        this.chatNode.nativeElement.scrollTo(
          0,
          this.chatNode.nativeElement.scrollHeight
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

}
