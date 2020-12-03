import {Injectable} from '@angular/core';
import {Notification} from "../app/models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notifications: Notification[] = [];

  constructor() { }

  get notifications(): Notification[] {
    return this._notifications;
  }

  info(message: string, timeout?: number) {
    this.add(new Notification("info", message, timeout));
  }

  warning(message: string, timeout?: number) {
    this.add(new Notification("warning", message, timeout));
  }

  error(message: string, timeout?: number) {
    this.add(new Notification("error", message, timeout));
  }

  private add(item: Notification) {
    this._notifications.push(item);
    setTimeout(() => {
      this.remove(item);
    }, item.timeout * 1000);
  }

  private remove(item: Notification) {
    let index = this._notifications.indexOf(item, 0);
    if (index > -1) {
      this._notifications.splice(index, 1);
    }
  }

  public clear() {
    this._notifications.splice(0, this._notifications.length);
  }
}
