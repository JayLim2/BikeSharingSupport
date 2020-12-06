import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {DateTimeService} from "../../../services/date-time.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {Order} from "../../models/order.model";
import {OrdersService} from "../../../services/orders.service";
import {TicketsService} from "../../../services/tickets.service";
import {Ticket} from "../../models/ticket.model";
import {Constants} from "../../common/constants.utils";

@Component({
  selector: 'app-create-ticket-form',
  templateUrl: './create-ticket-form.component.html',
  styleUrls: ['./create-ticket-form.component.less']
})
export class CreateTicketFormComponent implements OnInit {

  private _orders: Order[] = [];
  private _form: FormGroup;
  public loading: boolean = true;

  public selectedOrderId: number = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private overlayService: NgxSpinnerService,
    private dateTimeService: DateTimeService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ns: NotificationService,
    private ordersService: OrdersService,
    private ticketsService: TicketsService
  ) {
  }

  get orders(): Order[] {
    return this._orders;
  }

  get form(): FormGroup {
    return this._form;
  }

  ngOnInit(): void {
    this.overlayService.show();

    this.activatedRoute.queryParams
      .subscribe(params => {
        let orderParam = Number.parseInt(params["order"]);
        if (!Number.isNaN(orderParam)) {
          this.selectedOrderId = orderParam;
        }
      })

    this._form = new FormGroup({
      order: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })

    this.ordersService.getByUserIfTicketNotExists().subscribe((list: Order[] = []) => {
      if (list && list.length > 0) {
        this._orders = list;
        this.setSelectedOrder(this.selectedOrderId ? this.selectedOrderId : this._orders[0].id);
      }
    }, (error) => {
      console.error(error);
    }).add(() => {
      this.overlayService.hide();
    });
  }

  onSelectOrder(event) {
    this.overlayService.show();

    let selectedOrder = event.target.value;
    this.setSelectedOrder(selectedOrder);

    this.overlayService.hide();
  }

  private setSelectedOrder(selectedOrder: any): void {
    this.form.get("order").setValue(
      selectedOrder,
      {onlySelf: true}
    );
  }

  onCreateTicket() {
    if (this.form.invalid) {
      this.ns.error("Что-то введено не так. Если проблема повторяется - обратитесь к нам по телефону 8-800-300-40-50.");
      return;
    }

    const value = this.form.value;
    let ticket = {
      order: {
        id: +value.order
      },
      messages: [{
        text: value.description,
        dateTime: this.dateTimeService.dateToString(new Date(), Constants.PRETTY_DATE_TIME),
        user: {
          username: this.authenticationService.currentUserValue.username
        }
      }],
      status: {
        name: "Поиск оператора"
      }
    }
    this.ticketsService.save(ticket)
      .subscribe(() => {
        this.ns.clear();
        this.router.navigateByUrl('profile');
      }, () => {
        this.ns.error("Ошибка при создании обращения в службу поддержки. Проверьте введенные данные.");
      })
  }

  onCreateOrder() {
    alert("К сожалению, бюджета хватило только на сайт службы поддержки.");
  }

}
