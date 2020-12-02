import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private restangular: Restangular) { }

  findOne(alias: string): Promise<any> {
    return this.restangular.one('shops', alias).get().toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('shops', 'search').get(params).toPromise();
  }
}
