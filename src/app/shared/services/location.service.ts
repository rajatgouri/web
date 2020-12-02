import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable()
export class LocationService {
  constructor(private restangular: Restangular) { }
  countries(): Promise<any> {
    return this.restangular.one('countries').get().toPromise();
  }

  states(params: any): Promise<any> {
    return this.restangular.one('states').get(params).toPromise();
  }

  cities(params: any): Promise<any> {
    return this.restangular.one('cities').get(params).toPromise();
  }
}
