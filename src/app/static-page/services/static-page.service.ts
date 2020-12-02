import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StaticPageService {
  constructor(private restangular: Restangular) { }

  find(alias): Promise<any> {
    return this.restangular.one('posts', alias).get().toPromise();
  }
}