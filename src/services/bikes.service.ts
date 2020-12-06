import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {Bike} from "../app/models/bike.model";

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  private commonUrl: string = `api/bikes`;

  constructor(
    private restService: RestService
  ) { }

  getAll(): Observable<Bike[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

  deleteById(id: number): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/delete/${id}`);
  }

}
