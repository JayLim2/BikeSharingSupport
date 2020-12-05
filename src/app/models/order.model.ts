import {User} from "./user.model";
import {Bike} from "./bike.model";
import {Tariff} from "./tariff.model";

export class Order {
  id: number;
  user?: User;
  bike?: Bike;
  tariff?: Tariff;
  startTime?: string;
  endTime?: string;
}
