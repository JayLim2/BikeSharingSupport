import { Component, OnInit } from '@angular/core';
import {AuthenticationService, Session} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {GrantsUtils} from "../../common/grants.utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends GrantsUtils implements OnInit {

  userMessage: string

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {
    super(authenticationService);
  }

  ngOnInit(): void {
    const login = sessionStorage.getItem("login");
    const role = sessionStorage.getItem("role");

    this.userMessage = login && role ? `${login}` : null;
  }

}
