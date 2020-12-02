import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WishlistService {

  constructor(private restangular: Restangular) { }

  create(data): Promise<any> {
    return this.restangular.all('wishlist').post(data).toPromise();
  }

  list(params: any): Promise<any> {
    return this.restangular.one('wishlist').get(params).toPromise();
  }

  remove(id): Promise<any> {
    return this.restangular.one('wishlist', id).customDELETE().toPromise();
  }
}
