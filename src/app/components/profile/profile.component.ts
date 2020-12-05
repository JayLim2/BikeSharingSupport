import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {NotificationService} from "../../../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Ticket} from "../../models/ticket.model";
import {TicketsService} from "../../../services/tickets.service";
import {Order} from "../../models/order.model";
import {OrdersService} from "../../../services/orders.service";
import {Router} from "@angular/router";
import {CostUtils} from "../../common/cost.utils";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  /* TODO Сделать не ручные флаги! */

  public currentUser: any;
  public selectedTab: string = 'main';

  private _ticketsList: Ticket[];
  private _ordersList: Order[];

  constructor(
    public authenticationService: AuthenticationService,
    private ns: NotificationService,
    private overlayService: NgxSpinnerService,
    private ticketsService: TicketsService,
    private ordersService: OrdersService,
    private router: Router
  ) {
  }

  get ticketsList(): Ticket[] {
    return this._ticketsList;
  }

  get ordersList(): Order[] {
    return this._ordersList;
  }

  ngOnInit(): void {
    let savedTab = localStorage.getItem("selectedTab");
    if (savedTab) {
      this.selectedTab = savedTab;
    }

    this.overlayService.show();
    this.authenticationService.currentUserObservable
      .subscribe((currentUser: any) => {
        if (currentUser) {
          this.currentUser = currentUser;

          this.overlayService.show();
          this.ordersService.getByUser(currentUser)
            .subscribe((orders) => {
              for (const order of orders) {
                order.cost = CostUtils.getCost(order);
              }
              this._ordersList = orders;
            }, (error) => {
              console.error(error);
            })
            .add(() => {
              this.overlayService.hide();
            });

          this.overlayService.show();
          this.ticketsService.getByUser(currentUser)
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
      .add(() => {
        this.overlayService.hide();
      })
  }

  onTabClick(tab: string): void {
    switch (tab) {
      case 'main':
      case 'orders':
      case 'tickets':
        this.selectedTab = tab;
        localStorage.setItem("selectedTab", this.selectedTab);
    }
  }

  getCurrentUserName(): string {
    return `${this.currentUser.lastName} ${this.currentUser.firstName} ${this.currentUser.middleName ? this.currentUser.middleName : ''}`;
  }

  onCancelTicket(ticket: Ticket) {
    let localIndex = this.ticketsList.indexOf(ticket);
    if (localIndex > -1) {
      this.ticketsService.delete(ticket)
        .subscribe(() => {
          this.ticketsList.splice(localIndex, 1);
          this.ns.info(`Обращение по заказу № ${ticket.order.id} успешно отменено.`);
        }, (error) => {
          this.ns.error("Ошибка отмены обращения по заказу. Если проблема не исчезает - обратитесь по телефону 8-800-300-40-50.");
          console.error(error);
        });
    }
  }

  onNeedSupport(orderId: number) {
    this.router.navigate(['tickets/create'], {
      queryParams: {
        order: orderId
      }
    });
  }

}
