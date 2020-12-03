import {Role} from "./role.model";

export class User {
  id: number;
  phone: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
  middleName?: string;

  constructor(phone: string, password: string,
              role: Role,
              firstName: string, lastName: string, middleName: string) {

    this.phone = phone;
    this.password = password;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
  }

}
