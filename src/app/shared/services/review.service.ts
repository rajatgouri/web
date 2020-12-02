import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class ReviewService {
  constructor(private restangular: Restangular) { }

  create(data: any): Promise<any> {
    return this.restangular.all('reviews').post(data).toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('reviews').get(params).toPromise();
  }

  checkReview(type, id): Promise<any> {
    return this.restangular.one('reviews').one(type).one(id).one('current').get().toPromise();
  }

  canReview(data: any): Promise<any> {
    return this.restangular.all('reviews/canReview').post(data).toPromise();
  }

  update(id, data): Promise<any> {
    return this.restangular.one('reviews', id).customPUT(data).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('reviews', id).get().toPromise();
  }
}
