import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';
import * as _ from 'lodash';

@Component({
  templateUrl: './payment.html'
})
export class PaymentComponent implements OnInit {

  public paymentInfo: any = {
    service: 'order',
    gateway: 'paypal',
    redirectSuccessUrl: 'https://genstore.iospot.top/cart/checkout/success',
    itemId: this.route.snapshot.params.orderId
  };

  constructor(private router: Router, private route: ActivatedRoute, private paymentService: PaymentService) {

  }

  ngOnInit() {
  }

  selectGateway(type: string) {
    this.paymentInfo.gateway = type;
  }

  submit() {
    this.paymentService.create(this.paymentInfo).then((resp) => {
      window.location.href = resp.data.redirectUrl;
    })
  }

}
