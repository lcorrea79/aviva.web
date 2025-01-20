import { Pipe, PipeTransform } from '@angular/core';
import { Utilities } from 'src/app/core/services/utilities';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /********************************************************************************
   * Use this pipe to filter an array of objects by a list of filters.
   * Each filter corresponds to a field name.
   * You can optionally specify a returnField to return only that field from the
   * filtered results.
   *******************************************************************************/
  transform(value: any[], filters: any[], fieldNames: any[], returnField?: string): any {
    if (!value || !filters || !fieldNames) {
      return value;
    }

    // Ensure filters and fieldNames are arrays
    filters = Array.isArray(filters) ? filters : [filters];
    fieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];

    // Create a Set for unique results
    const resultSet = new Set();

    filters.forEach((filter, i) => {
      const fieldName = fieldNames[i];
      const aux = value.filter((item) => Utilities.searchArray(filter?.toString(), false, item[fieldName]?.toString()));

      aux.forEach((item) => resultSet.add(item));
    });

    // Convert Set to array
    let result = Array.from(resultSet);

    // If a returnField is specified, map the results to that field only
    if (returnField) {
      result = result.map((item) => item[returnField]);
    }

    return result;
  }
}
