import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {Tariff} from "../app/models/tariff.model";

@Injectable({
  providedIn: 'root'
})
export class TariffsService {

  private commonUrl: string = `api/tariffs`;

  constructor(
    private restService: RestService
  ) { }

  getAll(): Observable<Tariff[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

  save(tariff: Tariff): Observable<any> {
    return this.restService.put(`${this.commonUrl}/save`, tariff);
  }

  deleteById(id: number): Observable<any> {
    return this.restService.delete(`${this.commonUrl}/delete/${id}`);
  }

}
