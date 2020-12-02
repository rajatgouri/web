import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'price-currency',
  template: `{{priceFormat}}`
})
export class PriceCurrencyComponent implements OnInit {
  @Input() public price;
  @Input() public currency;
  public priceFormat = '';

  constructor(private service: CurrencyService) { }

  ngOnInit() {
    const symbol = this.service.getSymbol(this.currency);
    const p = (parseFloat(this.price) || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    this.priceFormat = `${symbol} ${p}`;
  }
}
