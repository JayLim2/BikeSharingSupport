import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {Tariff} from "../../models/tariff.model";
import {TimeUnit} from "../../models/time-unit.model";
import {TicketStatus} from "../../models/ticket-status.model";
import {Bike} from "../../models/bike.model";
import {UsersService} from "../../../services/users.service";
import {TariffsService} from "../../../services/tariffs.service";
import {TimeUnitsService} from "../../../services/time-units.service";
import {TicketStatusesService} from "../../../services/ticket-statuses.service";
import {BikesService} from "../../../services/bikes.service";
import {Observable} from "rxjs";

class Data {
  User: User[] = [];
  Tariff: Tariff[] = [];
  TimeUnit: TimeUnit[] = [];
  TicketStatus: TicketStatus[] = [];
  Bike: Bike[] = [];
}

class Fields {
  User: string[] = [];
  Tariff: string[] = [];
  TimeUnit: string[] = [];
  TicketStatus: string[] = [];
  Bike: string[] = [];
}

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.less']
})
export class AdminPanelComponent implements OnInit {

  public readonly entities = [
    User,
    Tariff,
    TimeUnit,
    TicketStatus,
    Bike
  ]

  public readonly data: Data = new Data();
  public readonly fields: Fields = new Fields();

  constructor(
    private usersService: UsersService,
    private tariffsService: TariffsService,
    private timeUnitsService: TimeUnitsService,
    private ticketStatusesService: TicketStatusesService,
    private bikesService: BikesService
  ) {
  }

  ngOnInit(): void {
    for (const entity of this.entities) {
      const entityName = this.getEntityName(entity);
      let observable;
      switch (entityName) {
        case 'User':
          observable = this.bikesService.getAll();
          break;
        case 'Tariff':
          observable = this.tariffsService.getAll();
          break;
        case 'TicketStatus':
          observable = this.ticketStatusesService.getAll();
          break;
        case 'TimeUnit':
          observable = this.timeUnitsService.getAll();
          break;
        case 'Bike':
          observable = this.bikesService.getAll();
          break;
      }
      if (observable) {
        (<Observable<any>>observable).subscribe((list) => {
          this.data[entityName] = list;
          let first = list[0];
          if (first) {
            this.fields[entityName] = Object.keys(first);
          }
        }, (error) => {
          console.error(`Error in entity '${entityName}': ${error}`);
        })
      }
    }
  }

  onEdit(entityName: string, id: any): void {
    console.log("Edit: ", entityName, " id = ", id);
  }

  onDelete(entityName: string, id: any): void {
    console.log("Delete: ", entityName, " id = ", id);
  }

  getEntityName(entity): string {
    return new entity().constructor.name;
  }

  getId(item: any): any {
    const probablyFields = ["id", "name"];
    let id = null;
    for (const idCandidate of probablyFields) {
      id = item[idCandidate];
      if (id) {
        return id;
      }
    }
  }

}
