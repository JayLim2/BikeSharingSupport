import {Component, OnInit} from '@angular/core';
import {Notification} from "../../models/notification.model";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {

  public model: Notification[];

  constructor(
    private notificationsService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.model = this.notificationsService.notifications;
  }

}
