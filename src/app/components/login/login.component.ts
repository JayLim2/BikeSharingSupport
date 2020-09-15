import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl(""),
      password: new FormControl("")
    });
  }

  onLogin(): void {

  }

}
