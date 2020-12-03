import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class HealthCheckerService {

  private _loading: boolean = true;
  private _isServiceHealthy: boolean = false;

  constructor(
    private restService: RestService
  ) { }

  get isServiceHealthy() {
    return this._isServiceHealthy;
  }

  get loading(): boolean {
    return this._loading;
  }

  public checkHealth() {
    this._loading = true;
    this.restService.get("checkHealth")
      .subscribe(() => {
        this._isServiceHealthy = true;
        this._loading = false;
      }, (error => {
        this._isServiceHealthy = false;
        this._loading = false;
        console.error("Health check result: ", error);
      }));
  }

}
