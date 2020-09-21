import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Validators} from '../utils/Validators';
import {RestService} from './rest.service';

export class Session {
  login: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private session: Session;

  constructor(
    private restService: RestService
  ) {
  }

  public authenticate(login: string, password: string): Observable<any> {
    const validationResult = Validators.validateCredentials(login, password);
    if (validationResult) {
      throw new Error(validationResult);
    }

    return this.restService.post(
      'login',
      {
        username: login,
        password
      }
    );
  }

  public setSession(session: Session): void {
    if (session) {
      for (const sessionParam of Object.keys(session)) {
        sessionStorage.setItem(sessionParam, session[sessionParam]);
      }
    }
    this.session = session;
  }

  public resetSession(): void {
    sessionStorage.clear();
    this.session = null;
  }

  public isAuthenticated(): boolean {
    return this.session !== undefined && this.session !== null;
  }
}
