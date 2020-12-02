import { Pipe, PipeTransform } from '@angular/core';

/*
 * show default photo if it is not provided
*/
@Pipe({
  name: 'checkImage'
})
export class NoImagePipe implements PipeTransform {
  transform(value: string): any {
    if (value) {
      return value;
    }

    return '/assets/images/noImage.jpg';
  }
}
