import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'isSameDay'
})
export class IsSameDayPipe implements PipeTransform {
  transform(date: Date | string, compareTo: Date | string): boolean {
    return moment(date).isSame(moment(compareTo), 'd');
  }
}
