import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // flag to prevent load tree multiple times
  private loadingTree: any;

  constructor(private restangular: Restangular) { }

  tree(): Promise<any> {
    if (window.appData.categories) {
      return Promise.resolve(window.appData.categories);
    }

    if (this.loadingTree) {
      return this.loadingTree;
    }

    this.loadingTree = this.restangular.one('products/categories', 'tree')
      .get().toPromise()
      .then(resp => {
        window.appData.categories = resp.data;
        this.loadingTree = null;
        return resp.data;
      });

    return this.loadingTree;
  }

  getFlatTree(tree: any) {
    let result = [];
    tree.forEach(item => {
      result.push(item);

      if (item.children) {
        result = result.concat(this.getFlatTree(item.children));
      }
    });

    return result;
  }

  getBreadcrumbs(tree: any, id: string) {
    let parents = [];
    let array = this.getFlatTree(tree);

    let item = _.find(array, a => [a.alias, a._id].indexOf(id) > -1);
    if (!item) {
      return [];
    }

    let flag = item;
    for (let i = 0; i < array.length; i++) {
      let parent = _.find(array, x => x._id === flag.parentId);
      if (!parent) {
        continue;
      }

      parents.unshift(parent);
      flag = parent;
    }
    return {
      item,
      parents
    };
  }

  findInTree(tree: any, id: string) {
    let array = this.getFlatTree(tree);
    return _.find(array, a => [a.alias, a._id].indexOf(id) > -1);
  }
}
