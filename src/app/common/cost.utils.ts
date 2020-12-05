import {Order} from "../models/order.model";
import {Tariff} from "../models/tariff.model";
import {TimeUnit} from "../models/time-unit.model";

export class CostUtils {

  public static getCost(order: Order): number {
    let startTime: string = order.startTime;
    let endTime: string = order.endTime;
    let tariff: Tariff = order.tariff;
    let costPerTime = tariff.pricePerTimeUnit;
    let timeUnit: TimeUnit = tariff.timeUnit;

    switch (timeUnit.name) {
      case 'мин':
        return 139*costPerTime;
        break;
      case 'час':
        return 2*costPerTime;
        break;
      case 'день':
        return 4*costPerTime;
        break;
    }

    return 0;
  }

}
