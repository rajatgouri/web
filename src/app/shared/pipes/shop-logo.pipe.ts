import { Pipe, PipeTransform } from '@angular/core';

/*
 * show default cover photo if it is not provided
*/
@Pipe({
  name: 'shopLogo'
})
export class ShopLogoPipe implements PipeTransform {
  transform(value: string): any {
    if (value) {
      return value;
    }

    return '/assets/images/shop-logo-default.png';
  }
}
