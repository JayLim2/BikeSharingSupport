import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Validators} from "../utils/Validators";
import {RestService} from "./rest.service";

export class Session {
  login: string;
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _session: Session;

  constructor(
    private restService: RestService
  ) { }

  public authenticate(login: string, password: string): Observable<any> {
    const validationResult = Validators.validateCredentials(login, password);
    if (validationResult) {
      throw new Error(validationResult);
    }

    return this.restService.post(
      "login",
      {
        username: login,
        password: password
      }
    )
  }


  get session(): Session {
    return this._session;
  }

  set session(value: Session) {
    this._session = value;
  }
}
