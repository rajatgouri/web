import { Component, Input, OnInit } from '@angular/core';
import { SystemService } from '../../shared/services';

@Component({
  selector: 'price-convert',
  template: `{{priceFormat}}`
})
export class PriceConvert implements OnInit {
  @Input() public price;
  public priceFormat = '';

  constructor(private systemService: SystemService) { }

  ngOnInit() {
    if (!this.price && this.price !== 0) {
      return this.priceFormat = 'N/A';
    }

    this.systemService.configs().then(resp => {
      const value = Number(this.price) || 0;
      // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
      this.priceFormat = resp.customerCurrencySymbol + ' ' + (value * resp.customerRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    });
  }
}
