import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NewsletterService {

  constructor(private restangular: Restangular) { }

  register(params: any): Promise<any> {
    return this.restangular.one('newsletter', 'contact').customPOST(params).toPromise();
  }
}
