import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {RestService} from "./rest.service";
import {User} from "../app/models/user.model";
import {Ticket} from "../app/models/ticket.model";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private commonUrl: string = `api/tickets`;

  constructor(
    private restService: RestService
  ) {
  }

  public getById(id: number): Observable<Ticket> {
    return this.restService.get(`${this.commonUrl}/get`, {
      params: {
        id: `${id}`
      }
    })
  }

  public getByUser(): Observable<Ticket[]> {
    return this.restService.get(`${this.commonUrl}/get/user`);
  }

  public getAll(): Observable<Ticket[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

  public save(ticket: any, getUpdatedTicket: boolean = false): Observable<any> {
    return this.restService.put(`${this.commonUrl}/${getUpdatedTicket ? 'saveAndGet' : 'save'}`, ticket);
  }

  public delete(ticket: Ticket): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/delete/${ticket.id}`);
  }

}
