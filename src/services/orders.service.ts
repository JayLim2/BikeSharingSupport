import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {User} from "../app/models/user.model";
import {Observable} from "rxjs";
import {Order} from "../app/models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private commonUrl: string = `api/orders`;

  constructor(
    private restService: RestService
  ) {
  }

  public getByUser(user: User): Observable<Order[]> {
    return this.restService.get(`${this.commonUrl}/get/user`, {
      params: {
        userId: user.username
      }
    });
  }

}
