import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  temp: string

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    const session = this.authenticationService.session;
    console.log(session);

    this.temp = `${session.login} (${session.role})`;
  }

}
