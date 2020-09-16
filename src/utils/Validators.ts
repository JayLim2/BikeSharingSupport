import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Validators {

  public static validateCredentials(login: string, password: string): string {
    let message = null;

    const isEmptyLogin = !login || login === "";
    const isEmptyPassword = !password || password === "";

    if (isEmptyLogin && isEmptyPassword) {
      message = "Введите логин и пароль.";
    } else if (isEmptyLogin) {
      message = "Введите логин.";
    } else if (isEmptyPassword) {
      message = "Введите пароль";
    }

    if(!isEmptyLogin && login.includes(" ")) {
      message = "Логин не должен содержать пробелы."
    }

    return message;
  }

}
