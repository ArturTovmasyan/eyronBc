import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: "sortArray"})

export class SortArrayPipe implements PipeTransform {

  transform(array: Array<any>, args: string): Array<any> {

    array.sort((a: any, b: any) => {

      if (a['voters_count'] > b['voters_count']) {
        return -1;
      } else if (a['voters_count'] < b['voters_count']) {
        return 1;
      } else {
        return 0;
      }
    });

    return array;
  }
}
