import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private alias: any = null;
  private product: any = null;
  private getProduct: any;
  public searchFields: any = {
    q: '',
    transactiontypeId:'',
    categoryId: '',
    shopId: '',
    featured: '',
    hot: '',
    bestSell: '',
    dailyDeal: '',
    soldOut: '',
    discounted: '',
    startDate:'',
    endDate:''
  };

  private allowFields = [
    'name', 
    'alias', 
    'description', 
    'shortDescription', 
    'categoryId', 
    'transactiontypeId',  
    'brandId', 
    'specifications',
    'chemicalIdentifiers', 
    'safetyHandling', 
    'isActive', 
    'metaSeo', 
    'ordering', 
    'freeShip',
    'images', 
    'mainImage', 
    'type', 
    'price', 
    'pricePerWeek',
    'pricePerMonth',
    'startDate',
    'endDate',
    'salePrice', 
    'depositAmont',
    'distance',
    'stockQuantity', 
    'sku', 
    'upc', 
    'mpn', 
    'ean', 
    'digitalFileId',
    'jan', 
    'isbn', 
    'taxClass', 
    'taxPercentage', 
    'restrictCODAreas', 
    'restrictFreeShipAreas', 
    'dailyDeal', 
    'dealTo',
    'shopId',
    'userId',
    'token'
  ];

  constructor(private restangular: Restangular) { }

  search(params: any): Promise<any> {
    return this.restangular.one('products', 'search').get(params).toPromise();
  }


  create(data: any): Promise<any> {
    return this.restangular.all('create-products').post(_.pick(data, this.allowFields)).toPromise();
  }

  createToken(data: any): Promise<any> {
    return this.restangular.all('product-token').post(data).toPromise();
  }

  find(alias: string): Promise<any> {
    if (alias !== this.alias) {
      this.getProduct = this.restangular.one('products', alias).get().toPromise()
        .then((resp) => {
          this.product = resp.data;
          this.alias = resp.data.alias;
          return this.product;
        });
      return this.getProduct;
    } else {
      return Promise.resolve(this.product);
    }
  }

  areaAvailibility(zipcode, coordinates, distance): Promise<any> {
    return this.restangular.one(`products/areaAvailability`).customPOST({zipcode, coordinates, distance }).toPromise();

  }

  catalogs(productId: string): Promise<any> {
    return this.restangular.one(`products/${productId}`, 'catalogs').get().toPromise();
  }

  related(productId: string, params: any): Promise<any> {
    return this.restangular.one(`products/${productId}`, 'related').get(params).toPromise();
  }

  checkProductAvailability(data: any): Promise<any> {
      return this.restangular.one(`products/availability`).customPOST(data).toPromise();
  }

  getProductOrders(data: any): Promise<any> {
    return this.restangular.one(`products/orders`).customPOST(data).toPromise();
  }
}
