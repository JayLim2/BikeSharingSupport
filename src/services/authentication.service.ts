import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {map} from "rxjs/operators";
import {environment} from "../environments/environment";

export class Session {
  login: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUserObservable: Observable<any>;
  public currentUser: any;

  public errorMessage: string = null;

  constructor(
    private http: HttpClient,
    private ns: NotificationService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserObservable = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(login: string, password: string) {
    let token = window.btoa(login + ':' + password);
    localStorage.setItem('token', token);
    return this.http.get<any>(
      `${environment.routes.api}/users/get`,
      {
        params: {
          id: login
        }
      }
    ).pipe(map((user) => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.ns.clear();
      } else {
        localStorage.removeItem('token');
        this.ns.error("Неверно введен номер телефона или пароль.", 10);
      }
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.setItem('selectedTab', 'main');
    this.currentUserSubject.next(null);
  }

}
