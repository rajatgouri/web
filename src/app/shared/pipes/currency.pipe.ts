import { Pipe, PipeTransform } from '@angular/core';
import { SystemService } from '../services';

/*
 * format price with user currency
*/
@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  constructor(private systemService: SystemService) { }

  transform(value: number): any {
    if (!value && value !== 0) {
      return Promise.resolve('N/A');
    }

    return this.systemService.configs().then(resp => {
      value = Number(value) || 0;
      const formatNumber = resp.customerCurrencySymbol + '' + (value * resp.customerRate).toFixed(2);
      const result = formatNumber.replace(/\d(?=(\d{3})+\.)/g, '$&,');
      return result;
    });
  }
}
