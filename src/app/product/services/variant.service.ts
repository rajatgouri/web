import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductVariantService {

  constructor(private restangular: Restangular) { }

  search(productId: string, params: any): Promise<any> {
    return this.restangular.one('products', productId).one('variants').get(params).toPromise();
  }
}
