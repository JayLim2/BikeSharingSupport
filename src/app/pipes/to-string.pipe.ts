import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toString'
})
export class ToStringPipe implements PipeTransform {

  transform(value: any): any {
    const isObject = typeof value === 'object';
    if (isObject) {
      let keys = Object.keys(value);
      let str = "";
      if (keys.length === 1) {
        str = `${value[keys[0]]}`;
      } else if (keys.length > 1) {
        for (const key of keys) {
          str += `${key}: ${value[key]}\n`;
        }
      }
      return str;
    }
    return value;
  }

}
