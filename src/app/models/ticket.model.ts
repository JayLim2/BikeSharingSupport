import {Order} from "./order.model";
import {TicketStatus} from "./ticket-status.model";
import {Message} from "./message.model";

export class Ticket {
  id?: number;
  order?: Order;
  status?: TicketStatus;
  messages?: Message[];
}
