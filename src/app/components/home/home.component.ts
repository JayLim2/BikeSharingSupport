import { Component, OnInit } from '@angular/core';
import {AuthenticationService, Session} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  userMessage: string

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const login = sessionStorage.getItem("login");
    const role = sessionStorage.getItem("role");

    this.userMessage = login && role ? `${login}` : null;
  }

}
