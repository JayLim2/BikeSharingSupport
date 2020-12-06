import {AuthenticationService} from "../../services/authentication.service";

export class GrantsUtils {

  constructor(
    public authenticationService: AuthenticationService
  ) {
  }

  isClient() {
    return this.isAnyRole(["CLIENT"]);
  }

  isSupport() {
    return this.isAnyRole(["SUPPORT"]);
  }

  isAdmin() {
    return this.isAnyRole(["ADMIN"]);
  }

  isClientOrSupport() {
    return this.isAnyRole(["CLIENT", "SUPPORT"]);
  }

  isAdminOrClient() {
    return this.isAnyRole(["ADMIN", "CLIENT"]);
  }

  isAdminOrSupport() {
    return this.isAnyRole(["ADMIN", "SUPPORT"]);
  }

  private isAnyRole(roles: string[] = []) {
    return roles.includes(this.authenticationService.currentUserValue.role);
  }
}
