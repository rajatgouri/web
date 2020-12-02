import { UtilService } from './../../shared/services/utils.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { ProductService } from '../services';

@Injectable()
export class SearchResolver implements Resolve<Observable<any>> {
  constructor(private service: ProductService, private util: UtilService) {
    this.util.setLoading(true);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    // TODO - parse query string here
    return this.service.search({}).then(res => {
      this.util.setLoading(false);
      return res;
    })
    .catch(() => this.util.setLoading(false));
  }
}
