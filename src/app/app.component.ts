import {ChangeDetectorRef, Component, EventEmitter, OnChanges, OnInit} from '@angular/core';
import {AuthenticationService, Session} from "../services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnChanges {

  public session: Session;


  constructor(
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.session = this.authenticationService.getCurrentSession();
  }

  ngOnChanges(): void {
    this.session = this.authenticationService.getCurrentSession();
  }

}
