import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminData'
})
export class AdminDataPipe implements PipeTransform {

  transform(value: any): any {
    return Object.keys(value);
  }

}
