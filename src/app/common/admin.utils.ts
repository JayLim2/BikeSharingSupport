import {Injectable} from "@angular/core";

@Injectable()
export class AdminUtils {
  readonly excludedProperties: string[] = [
    "authorities", "enabled", "accountNonLocked",
    "accountNonExpired", "accountNonExpired",
    "credentialsNonExpired"
  ];

  readonly hiddenProperties: string[] = [
    "password"
  ];

  isExcluded(property: string): boolean {
    return this.excludedProperties.includes(property);
  }

  isHidden(property: string): boolean {
    return this.hiddenProperties.includes(property);
  }

  replaceIfHidden(property: string): string {
    return this.isHidden(property) ? "[hidden]" : "";
  }
}
