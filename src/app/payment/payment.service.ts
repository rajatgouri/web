import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class PaymentService {

  constructor(private restangular: Restangular) { }

  create(data: any): Promise<any> {
    return this.restangular.all( 'payment/transactions/request' ).customPOST(data).toPromise();
  }

  paypalCallback(): Promise<any> {
    return this.restangular.all( 'payment', 'paypal', 'callback' ).get().toPromise();
  }

  paypalWebHook(): Promise<any> {
    return this.restangular.all( 'payment', 'paypal', 'hook' ).get().toPromise();
  }
}
