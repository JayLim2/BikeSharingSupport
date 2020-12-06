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
import {AdminUtils} from "../../common/admin.utils";

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
    private bikesService: BikesService,
    public adminUtils: AdminUtils
  ) {
  }

  ngOnInit(): void {
    for (const entity of this.entities) {
      const entityName = this.getEntityName(entity);
      let service = this.getService(entityName);
      let observable = service.getAll();
      if (observable) {
        (<Observable<any>>observable).subscribe((list) => {
          let first = list[0];
          if (first) {
            this.data[entityName] = list;
            this.fields[entityName] = Object.keys(first)
              .filter((field) => !this.adminUtils.isExcluded(field));
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
    let service = this.getService(entityName);
    if (service) {
      let observable = service.deleteById(id);
    }
  }

  getEntityName(entity): string {
    return new entity().constructor.name;
  }

  getId(item: any): any {
    const probablyFields = ["id", "name", "username"];
    let id = null;
    for (const idCandidate of probablyFields) {
      id = item[idCandidate];
      if (id) {
        return id;
      }
    }
  }

  private getService(entityName: string): any {
    let service = null;
    switch (entityName) {
      case 'User':
        service = this.usersService;
        break;
      case 'Tariff':
        service = this.tariffsService;
        break;
      case 'TicketStatus':
        service = this.ticketStatusesService;
        break;
      case 'TimeUnit':
        service = this.timeUnitsService;
        break;
      case 'Bike':
        service = this.bikesService;
        break;
    }
    return service;
  }

}
