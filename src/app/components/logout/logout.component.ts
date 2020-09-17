import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService, Session} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less']
})
export class LogoutComponent {

  @Output()
  private onUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    const session: Session = this.authenticationService.getCurrentSession();
    if (session) {
      this.authenticationService.resetSession();
    }
    this.router.navigateByUrl("/");
  }

}
