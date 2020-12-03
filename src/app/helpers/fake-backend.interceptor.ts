import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {delay, dematerialize, materialize, mergeMap} from "rxjs/operators";
import {User} from "../models/user.model";
import {Role} from "../models/role.model";

let users: User[] = [];
let user = new User(
  '111-22-33',
  'root',
  Role.ROLE_PATIENT,
  'Sergei',
  'Komarov',
  "Gennadievich"
)
users.push(user);

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    //TODO refactor
    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const {phone, password} = body;
      const user = users.find(x => x.phone === phone && x.password === password);
      if (!user) {
        return error('Phone or password is incorrect');
      }
      return ok({
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName
      })
    }

    function getUsers() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(users);
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({status: 200, body}))
    }

    function error(message) {
      return throwError({error: {message}});
    }

    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorized'}});
    }

    function isLoggedIn() {
      return headers.get('Authorization') === `Basic ${btoa('test:test')}`;
    }
  }
}
