import {Order} from "./order.model";
import {TicketStatus} from "./ticket-status.model";

export class Ticket {
  order: Order;
  status: TicketStatus;
}
