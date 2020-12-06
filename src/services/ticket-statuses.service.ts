import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {TicketStatus} from "../app/models/ticket-status.model";

@Injectable({
  providedIn: 'root'
})
export class TicketStatusesService {

  private commonUrl: string = `api/ticketStatuses`;

  constructor(
    private restService: RestService
  ) { }

  getAll(): Observable<TicketStatus[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

}
