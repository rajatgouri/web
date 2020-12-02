import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';
import { ToastyService } from 'ng2-toasty';
import { SystemService } from './system.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartChanged = new Subject<any>();
  private cart: any = [];
  public cartChanged$ = this.cartChanged.asObservable();

  constructor(private restangular: Restangular, private toasty: ToastyService, private systemService: SystemService,
    private translate: TranslateService) {
    // TODO - load cart from local storage
    const cartData = localStorage.getItem('cart');
    this.cart = cartData ? JSON.parse(cartData) : [];
    this.cartChanged.next(this.cart);
  }

  get() {
    return this.cart;
  }

  add(data: any, quantity: number) {
    // TODO - not duplicate for existing product
    let checked = false;
    const existProduct = _.find(this.cart, function(c: any) {
      checked = true;
      return c.productId === data.productId;
    });
    if (checked && existProduct && data.productVariantId && data.productVariantId === existProduct.productVariantId
       || checked && existProduct && !data.productVariantId) {
      return this.toasty.error(this.translate.instant('This item has already been added to cart'));
    } else {
      this.toasty.success(this.translate.instant('This item has been added to cart.'));
    }

    // TODO - not duplicate for existing product
    this.cart.unshift({
      productId: data.productId,
      productVariantId: data.productVariantId,
      product: data.product,
      startDate:data.fromDate,
      endDate:data.toDate,
      quantity
    });
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartChanged.next(this.cart);
  }

  remove(product: any) {
    const index = _.findIndex(this.cart, (c: any) => c.productId === product.productId);
    if (index > -1) {
      this.cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartChanged.next(this.cart);
  }

  clean() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify([]));
    this.cartChanged.next([]);
  }

  checkout(params: any): Promise<any> {
    return this.restangular.one('orders').customPOST(params).toPromise();
  }

  verifyCOD(params: any): Promise<any> {
    return this.restangular.one('orders', 'phone', 'check').customPOST(params).toPromise();
  }

  calculate(): Promise<any> {
    return this.systemService.configs().then(systemConfig => {
      if (!this.cart || !this.cart.length) {
        return Promise.resolve({
          products: [],
          userCurrency: systemConfig.customerCurrency
        });
      }
      return this.restangular.one('cart', 'calculate').customPOST({
        products: this.cart.map(product => _.pick(product, ['productId', 'productVariantId', 'quantity', 'startDate', 'endDate'])),
        userCurrency: systemConfig.customerCurrency
      }).toPromise();
    });
  }
}
