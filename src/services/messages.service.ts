import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {Message} from "../app/models/message.model";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private commonUrl: string = `api/messages`;

  constructor(
    private restService: RestService
  ) { }

  public getByUser(userId: string): Observable<Message[]> {
    return this.restService.get(`${this.commonUrl}/get/user/${userId}`);
  }

  public save(message: Message): Observable<any> {
    return this.restService.put(`${this.commonUrl}/save`, message);
  }

}
