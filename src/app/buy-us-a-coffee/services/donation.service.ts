import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DonationService {

  constructor(private restangular: Restangular) { }

  

  donate(params: any): Promise<any> {
    return this.restangular.one('payment/donations/donate').customPOST(Object.assign(params, {
      redirectSuccessUrl: window.appConfig.paymentRedirectSuccessUrl,
      redirectCancelUrl: window.appConfig.paymentRedirectCancelUrl
    })).toPromise();
  }

  getDonations(params: any): Promise<any> {
    return this.restangular.one('payment/donations/get-donations').customPOST(Object.assign(params, {})).toPromise();
  }
  
}
