import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private restangular: Restangular) { }

  search(params: any): Promise<any> {
    return this.restangular.one('brands').get(params).toPromise();
  }
}
