import { Pipe, PipeTransform } from '@angular/core';

/*
 * show default photo if it is not provided
*/
@Pipe({
  name: 'checkPhoto'
})
export class NoPhotoPipe implements PipeTransform {
  transform(value: string): any {
    if (value) {
      return value;
    }

    return '/assets/images/noImage.jpg';
  }
}
