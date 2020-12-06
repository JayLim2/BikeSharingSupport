import { Pipe, PipeTransform } from '@angular/core';
import {AdminUtils} from "../common/admin.utils";

@Pipe({
  name: 'adminData'
})
export class AdminDataPipe implements PipeTransform {

  constructor(
    public adminUtils: AdminUtils
  ) {
  }

  transform(value: any): any {
    return Object.keys(value)
      .filter(field => !this.adminUtils.isExcluded(field));
  }

}
