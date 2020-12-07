import {Injectable} from "@angular/core";

@Injectable()
export class AdminUtils {
  readonly excludedProperties: string[] = [
    "authorities", "enabled", "accountNonLocked",
    "accountNonExpired", "accountNonExpired",
    "credentialsNonExpired", "phone"
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

  isDisabledField(field: string): boolean {
    return ["id"].includes(field);
  }

  tryDisableColumn(field: string): string {
    return ["id"].includes(field) ? 'display: none;' : '';
  }
}
