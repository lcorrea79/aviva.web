/**************************************************************************************
 * Main Imports
 *************************************************************************************/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToValues'
})
export class EnumToValuesPipe implements PipeTransform {

  transform(enumToExtract: Record<string, any>): any[] {
    return Object.keys(enumToExtract)
      .filter(key => isNaN(parseInt(key, 10)))
      .map(k => enumToExtract[k]);
  }

}

