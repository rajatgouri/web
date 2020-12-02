import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProducttransactiontypeService {

  constructor(private restangular: Restangular) { }

  findForDropdown(): Promise<any> {
    return this.restangular.one('producttransactiontype', 'dropdown').get().toPromise();
  }

  find(productId: string): Promise<any> {
    return this.restangular.one(`producttransactiontype/${productId}`).get().toPromise();
  }
}
