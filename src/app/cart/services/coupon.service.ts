import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CouponService {

  constructor(private restangular: Restangular) { }

  check(params: any): Promise<any> {
    return this.restangular.one('coupons/check').customPOST(params).toPromise();
  }
}
