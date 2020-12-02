import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BannerService {

  constructor(private restangular: Restangular) { }

  list(params: any): Promise<any> {
    return this.restangular.one('banners').get(params).toPromise();
  }

  random(params: any): Promise<any> {
    return this.restangular.one('banners', 'random').get(params).toPromise();
  }
}
