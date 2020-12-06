import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {TimeUnit} from "../app/models/time-unit.model";

@Injectable({
  providedIn: 'root'
})
export class TimeUnitsService {

  private commonUrl: string = `api/timeUnits`;

  constructor(
    private restService: RestService
  ) { }

  getAll(): Observable<TimeUnit[]> {
    return this.restService.get(`${this.commonUrl}/get/all`);
  }

}
