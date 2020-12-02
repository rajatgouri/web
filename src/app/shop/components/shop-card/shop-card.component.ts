import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shop-card',
  templateUrl: './shop-card.html'
})
export class ShopCardComponent implements OnInit {
  @Input() shop: any;
  constructor(){ }

  ngOnInit() {}
}
