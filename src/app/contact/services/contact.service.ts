import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {
  constructor(private restangular: Restangular) { }

  create(params: any): Promise<any> {
    return this.restangular.one('contact').customPOST(params).toPromise();
  }
}