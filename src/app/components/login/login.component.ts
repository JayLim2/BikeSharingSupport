import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private _returnUrl: string;

  constructor(
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    });
    this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(): void {
    const credentials = this.loginForm.value;
    this.authenticationService.login(
      credentials.login,
      credentials.password
    ).pipe(first())
      .subscribe(() => {
        this.router.navigateByUrl(this._returnUrl ? this._returnUrl : '');
      }, (error) => {
        console.error(error);
      });
  }

}
