import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { OrderService } from '../services/order.service';

@Injectable()
export class ListingResolver implements Resolve<Observable<any>> {
  constructor(private service: OrderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.find(route.params.alias);
  }
}
