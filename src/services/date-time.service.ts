import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  private pattern = "dd.MM.yyyy'T'HH:mm";

  private commonUrl: string = "api/patientTickets"

  constructor(
    private restService: RestService,
    private datePipe: DatePipe
  ) {
  }

  dateToString(date: Date, pattern?: string): string {
    if (!pattern) {
      return date ? date.toISOString().slice(0, 16) : null;
    }
    return this.datePipe.transform(date, pattern);
  }

  stringToDate(date: string, pattern?: string): Date {
    if (!pattern) {
      return new Date(date);
    }
    return new Date(date);
  }

}
