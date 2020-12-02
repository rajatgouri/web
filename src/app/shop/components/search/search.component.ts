import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UtilService } from '../../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

@Component({
  selector: 'search-shops',
  templateUrl: './search.html'
})
export class SearchComponent implements OnInit {
  public shops: any = [];
  public page: Number = 1;
  public itemsPerPage: Number = 12;
  public searchFields: any = {
    q: '',
    featured: ''
  };
  public total: any = 0;
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public distance: any = '';
  public map: any = {
    distance: '',
    latitude: '',
    longitude: ''
  };
  public isLoading = false;

  constructor(private route: ActivatedRoute, private translate: TranslateService,
     private toasty: ToastyService, private shopService: ShopService,
    private utilService: UtilService) {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.searchFields = Object.assign(this.searchFields, params.params);
      this.query();
    });
  }

  ngOnInit() {
    // this.location.countries().then(resp => this.countries = resp.data);
  }

  query() {
    this.utilService.setLoading(true);
    this.isLoading = true;
    const params = Object.assign({
      page: this.page,
      take: this.itemsPerPage
    }, this.searchFields);

    if (this.map.distance && this.map.distance <= 0 && this.map.latitude && this.map.longitude) {
      return this.toasty.error('Wrong distance number please try again.');
    } else if (this.map.distance && this.map.latitude && this.map.longitude) {
      params.latitude = this.map.latitude;
      params.longitude = this.map.longitude;
      params.distance = this.map.distance;
    }

    this.shopService.search(params).then((res) => {
      this.shops = res.data.items;
      this.total = res.data.count;
      this.utilService.setLoading(false);
      this.isLoading = false;
    })
      .catch(() => {
        this.toasty.error(this.translate.instant('Something went wrong, please try again!'));
        this.utilService.setLoading(false);
        this.isLoading = false;
      });
  }

  trackLocation() {
    const that = this;
    const res = function success(pos) {
      if (pos && pos.coords && pos.coords.latitude && pos.coords.longitude) {
        that.map.latitude = pos.coords.latitude;
        that.map.longitude = pos.coords.longitude;
        that.query();
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res);
    } else {
      this.toasty.error('Geolocation is not supported by this browser.');
    }

  }

  keyPress(event: any) {
    if (event.charCode === 13) {
      this.query();
    }
  }

}
