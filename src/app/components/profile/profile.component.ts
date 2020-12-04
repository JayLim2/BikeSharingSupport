import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IDatePickerConfig} from "ng2-date-picker";
import {Moment} from "moment";
import {NotificationService} from "../../../services/notification.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Ticket} from "../../models/ticket.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  /* TODO Сделать не ручные флаги! */

  private _prescriptionsForm: FormGroup;
  private _dateTimeForm: FormGroup;

  public currentUser: any;
  private _ticketsList: Ticket[];
  public selectedTab: string = 'main';

  public config: IDatePickerConfig = {
    format: "DD.MM.YYYY HH:mm",
    showTwentyFourHours: true,
    showSeconds: false,
    minutesInterval: 30,
    firstDayOfWeek: "mo"
  }
  public material: boolean = true;
  public placeholder: string = 'Выберите дату приема';
  public displayDate: Moment | string;

  constructor(
    public authenticationService: AuthenticationService,
    private ns: NotificationService,
    private overlayService: NgxSpinnerService
  ) {
    this._prescriptionsForm = new FormGroup({
      prescriptions: new FormControl(null, Validators.required)
    });
    this._dateTimeForm = new FormGroup({
      dateTime: new FormControl(null, Validators.required)
    })
  }

  get prescriptionsForm(): FormGroup {
    return this._prescriptionsForm;
  }

  get dateTimeForm(): FormGroup {
    return this._dateTimeForm;
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
          // this.patientTicketsService.getAll()
          //   .subscribe((tickets) => {
          //     this._patientTicketsList = tickets;
          //   }, (error) => {
          //     console.error(error);
          //   })
          //   .add(() => {
          //     this.overlayService.hide();
          //   });
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

  onSavePrescriptions(ticket/*: PatientTicket*/) {
    ticket.prescriptions = this.prescriptionsForm.value.prescriptions;
    if (ticket.prescriptions) {
      // this.patientTicketsService.save(ticket)
      //   .subscribe(() => {
      //     this.ns.info(`Назначения успешно сохранены для талона № ${ticket.id}`);
      //   }, (error) => {
      //     this.ns.error(`Ошибка добавления назначений. Проверьте введенные данные.`);
      //     console.error(error);
      //   })
    } else {
      this.ns.error("Поле не может быть пустым", 5);
    }
  }

  onSaveDateTime(ticket/*: PatientTicket*/) {
    let moment: Moment = this.dateTimeForm.value.dateTime;
    ticket.dateTime = moment.format("DD.MM.YYYY HH:mm");
    // this.patientTicketsService.save(ticket)
    //   .subscribe(() => {
    //     this.ns.info("Время приема успешно изменено.");
    //   }, (error) => {
    //     this.ns.error("Ошибка изменения времени приема. Проверьте введенные данные.");
    //     console.error(error);
    //   })
  }

  onCancelTicket(ticket/*: PatientTicket*/) {
    let localIndex = this.ticketsList.indexOf(ticket);
    if (localIndex > -1) {
      this.ticketsList.splice(localIndex, 1);
      // this.patientTicketsService.delete(ticket)
      //   .subscribe(() => {
      //     this.ns.info(`Талон № ${ticket.id} успешно отменен.`);
      //   }, (error) => {
      //     this.ns.error("Ошибка отмены записи на прием.");
      //     console.error(error);
      //   })
    }
  }

}
