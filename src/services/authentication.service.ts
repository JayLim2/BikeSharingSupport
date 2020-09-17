import {Injectable} from '@angular/core';
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

  private sessionFields: Array<string> = ["login", "role"];

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

  public getCurrentSession(): Session {
    let session = null;
    for (const sessionParam of this.sessionFields) {
      const item = sessionStorage.getItem(sessionParam);
      if (!session && item) {
        session = {};
      }
      session[sessionParam] = item;
    }
    return session ? session : null;
  }

  public resetSession(): void {
    for (const sessionParam of this.sessionFields) {
      sessionStorage.removeItem(sessionParam);
    }
  }
}
