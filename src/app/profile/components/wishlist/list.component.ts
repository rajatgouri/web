import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { WishlistService } from '../../services';
import { UtilService } from '../../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'wishlist-listing',
  templateUrl: './list.html'
})
export class WishListComponent implements OnInit, OnDestroy {

  public isLoading = false;
  private loadingSubscription: Subscription
  public items: any = [];
  public total: any = 0;
  public page: number = 1;
  public itemsPerPage: number = 12;
  public searchFields: any = {};

  constructor(
    private toasty: ToastyService,
    private wishlistService: WishlistService,
    private translate: TranslateService,
    private utilService: UtilService
  ) {
    this.loadingSubscription = utilService.appLoading$.subscribe(loading => this.isLoading = loading);
  }

  ngOnInit() {
    this.query();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  query() {
    this.utilService.setLoading(true);
    const params = Object.assign({
      page: this.page,
      take: this.itemsPerPage
    }, this.searchFields);

    this.wishlistService.list(params).then((res) => {
      this.items = [];
      this.items = res.data.items;
      this.total = res.data.count;
      this.utilService.setLoading(false);
    }).catch(err => {
      this.toasty.error(this.translate.instant('Something went wrong, please try again!'));
      this.utilService.setLoading(false);
    });
  }

  remove(itemId: any, index: number) {
    if (window.confirm(this.translate.instant('Are you sure want to remove this item?'))) {
      this.wishlistService.remove(itemId)
        .then(() => {
          this.toasty.success(this.translate.instant('Item has been removed!'));
          this.items.splice(index, 1);
        })
        .catch((err) => this.toasty.error(this.translate.instant(err.data.message || 'Something went wrong, please try again!')));
    }
  }

}
