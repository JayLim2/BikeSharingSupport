import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService, Session} from "../../../services/authentication.service";
import {Router} from "@angular/router";

interface AuthenticationResult {
  status: string,
  message: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public authenticationResult: AuthenticationResult;
  public loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(""),
      password: new FormControl("")
    });
  }

  onLogin(): void {
    const credentials = this.loginForm.value;
    const response = this.authenticationService.authenticate(credentials.login, credentials.password);
    response.subscribe((data: {message: string, authenticated: boolean, session: Session}) => {
      switch (data.message) {
        case "OK":
          this.authenticationResult = {
            message: "Вы вошли.",
            status: "success"
          };
          break;
        case "NOT_FOUND":
          this.authenticationResult = {
            message: "Проверьте логин и пароль.",
            status: "error"
          };
          break;
      }
      if(data.authenticated) {
        this.authenticationService.session = data.session;
        this.router.navigateByUrl("/");
      }
    }, (error) => {
      console.error("Error: ", error);
    })
  }

}
