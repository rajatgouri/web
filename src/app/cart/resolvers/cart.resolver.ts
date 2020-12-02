import { UtilService } from './../../shared/services/utils.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { CartService } from '../../shared/services';

@Injectable()
export class CartResolver implements Resolve<Observable<any>> {
  constructor(private service: CartService, private utilService: UtilService) {
    this.utilService.setLoading(true);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.calculate().then(resp => {
      this.utilService.setLoading(false);
      return resp.data;
    })
    .catch(() => this.utilService.setLoading(false));
  }
}
