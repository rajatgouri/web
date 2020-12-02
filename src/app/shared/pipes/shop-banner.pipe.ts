import { Pipe, PipeTransform } from '@angular/core';

/*
 * show default cover photo if it is not provided
*/
@Pipe({
  name: 'shopBanner'
})
export class ShopBannerPipe implements PipeTransform {
  transform(value: string): any {
    if (value) {
      return value;
    }

    return '/assets/images/shop-banner1.png';
  }
}
