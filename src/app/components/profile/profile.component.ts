import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IDatePickerConfig} from "ng2-date-picker";
import {Moment} from "moment";
import {NotificationService} from "../../../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Ticket} from "../../models/ticket.model";
import {TicketsService} from "../../../services/tickets.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  /* TODO Сделать не ручные флаги! */

  public currentUser: any;
  private _ticketsList: Ticket[];
  public selectedTab: string = 'main';

  constructor(
    public authenticationService: AuthenticationService,
    private ns: NotificationService,
    private overlayService: NgxSpinnerService,
    private ticketsService: TicketsService
  ) {
  }

  get ticketsList(): Ticket[] {
    return this._ticketsList;
  }

  ngOnInit(): void {
    this.overlayService.show();

    let savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      this.selectedTab = savedTab;
    }

    this.authenticationService.currentUserObservable
      .subscribe((currentUser: any) => {
        if (currentUser) {
          this.currentUser = currentUser;
          this.ticketsService.getAll()
            .subscribe((tickets) => {
              this._ticketsList = tickets;
            }, (error) => {
              console.error(error);
            })
            .add(() => {
              this.overlayService.hide();
            });
        }
      })
  }

  onTabClick(tab: string): void {
    switch (tab) {
      case 'main':
      case 'tickets':
        this.selectedTab = tab;
        localStorage.setItem("selectedTab", tab);
    }
  }

  getCurrentUserName(): string {
    return `${this.currentUser.lastName} ${this.currentUser.firstName} ${this.currentUser.middleName ? this.currentUser.middleName : ''}`;
  }

  onCancelTicket(ticket: Ticket) {
    let localIndex = this.ticketsList.indexOf(ticket);
    if (localIndex > -1) {
      this.ticketsList.splice(localIndex, 1);
      this.ticketsService.delete(ticket)
        .subscribe(() => {
          this.ns.info(`Обращение по заказу № ${ticket.order.id} успешно отменено.`);
        }, (error) => {
          this.ns.error("Ошибка отмены обращения по заказу. Если проблема не исчезает - обратитесь по телефону 8-800-300-40-50.");
          console.error(error);
        });
    }
  }

}
