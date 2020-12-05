import {Ticket} from "./ticket.model";

export class Message {
  id?: number;
  dateTime: string;
  text: string;
  ticket?: Ticket;
}
