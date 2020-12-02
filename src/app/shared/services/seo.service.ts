import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

declare var ga: Function;

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private seoChanged = new Subject<any>();
  public seoChanged$ = this.seoChanged.asObservable();

  constructor() { }

  update(title: string, meta?: any, image?: string) {
    this.seoChanged.next({
      title,
      meta,
      image
    });
  }

  trackPageViewForShop(shopId: string, gaCode: string) {
    if (typeof ga === 'function') {
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/creating-trackers
      const clientTracker = `shop${shopId}Tracker`;
      ga('create', gaCode, 'auto', clientTracker);
      ga('set', 'page', window.location.href);
      ga(`${clientTracker}.send`, 'pageview');
    }
  }
}
