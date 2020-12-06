import {Role} from "./role.model";

export class User {
  username: string;
  password?: string;
  role?: Role;
  firstName?: string;
  lastName?: string;
  middleName?: string;
}
