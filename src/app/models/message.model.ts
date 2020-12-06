import {Ticket} from "./ticket.model";
import {User} from "./user.model";

export class Message {
  id?: number;
  dateTime: string;
  text: string;
  ticket?: Ticket;
  user?: User;
}
