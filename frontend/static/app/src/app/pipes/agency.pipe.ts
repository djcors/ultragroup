import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agency'
})
export class AgencyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return 'oeoeoeo';
  }

}
