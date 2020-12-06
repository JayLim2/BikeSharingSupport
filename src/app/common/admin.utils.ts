import {Injectable} from "@angular/core";

@Injectable()
export class AdminUtils {
  readonly excludedProperties: string[] = [
    "password", "enabled", "accountNonLocked",
    "accountNonExpired", "accountNonExpired",
    "credentialsNonExpired"
  ];

  isExcluded(property: string): boolean {
    return this.excludedProperties.includes(property);
  }
}
