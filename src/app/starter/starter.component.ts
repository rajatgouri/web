import { UtilService } from './../shared/services/utils.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SeoService } from '../shared/services';
import { ShopService } from '../shop/services/shop.service';
import { SystemService } from '../shared/services';
import { ProductService } from '../product/services';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ProducttransactiontypeService } from '../product/services/producttransactiontype.service';

import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit {
  @Input() datafield:any;
  public shops: any = [];
  public siteName: String = '';
  public sellerUrl: String = '';
  public appConfig: any = {};
  public total: any = 0;
  public items: any = [];
  public page: any = 1;
  public itemsPerPage: any = 15;
  public isLoading = false;
  public sort: any = '';
  public sortType: any = '';
  public location: any = '';
  //public transactionType: any = [];
  /*public searchFields: any = {
    q: '',
    transactiontypeId:'',
    categoryId: '',
    shopId: '',
    featured: '',
    hot: '',
    bestSell: '',
    dailyDeal: '',
    soldOut: '',
    discounted: ''
  };*/

  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 0;
  direction = '';
  deviceInfo = null;
  isMobile = false;
  isTablet = false;
  isDesktopDevice = false;
  latitude = null;
  geo = false;
  geoData = {
    lat: null,
    lng: null,
    dist: null
  }
  
  public transactionTypeList: any = [];

  constructor(private seoService: SeoService, private util: UtilService,
    private shopService: ShopService, private systemService: SystemService,
    private productService: ProductService,
    private producttransactiontypeService: ProducttransactiontypeService,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private toasty: ToastrService,
    ) {

    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();


    this.sellerUrl = window.appConfig.sellerUrl;
    this.systemService.configs().then(resp => {
      if (resp) {
        this.appConfig = resp;
        this.siteName = resp.siteName;
        this.seoService.update(resp.siteName, resp.homeSEO, resp.siteLogo);
      }
    });

    this.route.queryParamMap.subscribe((params: Params) => {

      if (params && (params.params.shopId ||  params.params.categoryId
         || params.params.q || params.params.featured || params.params.hot ||
         params.params.bestSell || params.params.dailyDeal || params.params.soldOut ||
         params.params.discounted)) {
          this.productService.searchFields = {
            q: '',
            featured: '',
            hot: '',
            bestSell: '',
            dailyDeal: '',
            soldOut: '',
            discounted: ''
          };
          this.productService.searchFields = Object.assign(this.productService.searchFields, params.params);
          this.query();
      }else {
        this.productService.searchFields = {
          q: '',
          categoryId: '',
          transactiontypeId: '',
          shopId: '',
          featured: '',
          hot: '',
          bestSell: '',
          dailyDeal: '',
          soldOut: '',
          discounted: ''
        };
        this.query();
      }
    });
  }

  changeSort(sort: string, $event: any) {
    this.sort = sort;
    this.sortType = $event.target.value;
    this.page = 1;
    this.items = [];
    this.query();
  }

  changeTransactionType(transactiontypeId: any){
    this.productService.searchFields = {
      transactiontypeId: transactiontypeId
    }
    this.page = 1;
    this.items = [];
    this.query();
  }

  ngOnInit() {
    this.util.data$.subscribe(resp => {
        console.log("Response On Subscribe : ",resp);
        this.onUpdateFields(resp);
    });
    this.util.setLoading(true);
    this.shopService.search({
      take: 4,
      featured: 1
    })
      .then(resp => {
        this.util.setLoading(false);
        this.shops = resp.data.items;
      }).catch(() => this.util.setLoading(false));

      //this.query();


    
  }

 
  
   getLocation = Observable.create(function(observer) {
     
   
      navigator.geolocation.getCurrentPosition(location => {
        observer.next({
          "lat": location.coords.latitude,
          "lng": location.coords.longitude
        })
      }, error => {
        observer.error(error)
      })
    });
  

  changeDistance(e) {
    let maxDistance = e.target.value;

    this.getLocation.subscribe(location => {
      this.geo = true;
      this.geoData = {
        lat: location.lat,
        lng: location.lng,
        dist: maxDistance
      }
      this.items = [];
      this.query();
    }, error => {
      this.geo = false;     
      this.toasty.error('Please allow Browser To Share location');      
    })
  
  }

  query() {
    this.util.setLoading(true);
    const params = Object.assign({
      page: this.page,
      take: this.itemsPerPage,
      sort: this.sort,
      sortType: this.sortType,
    }, this.productService.searchFields); 
    
    
    if(this.geo) {
      params['geo'] = this.geo,
      params['lat'] = this.geoData['lat'];
      params['lng'] = this.geoData['lng'];
      params['maxDistance'] = this.geoData['dist']  === 'Infinity' ? Infinity : parseInt(this.geoData['dist'])  
    }

    this.productService.search(params).then((res) => {
      // this.items = [];
      this.items = this.items.concat(res.data.items);
      this.total = res.data.count;
      this.util.setLoading(false);
      this.isLoading = false;
    }).catch(() => {
        this.util.setLoading(false);
        this.isLoading = false;
    });
  }

  onUpdateFields(event: any) {
    console.log("Inside OnUpdate Field : ",event);
    for (const key in event) {
      if (event.hasOwnProperty(key) && event[key]) {
        this.productService.searchFields[key] = event[key];
      } else {
        this.productService.searchFields[key] = '';
      }
    }
    
    this.page = 1;
    this.items = [];
    this.query();
  }

  onScrollDown (ev) {
    console.log('scrolled down!!', ev);
    this.page += 1;
    this.query();
  }

  openFilter(){
    $('#sidebar').addClass('active');
    $('.sidebar-overlay').addClass('active');
  }

  closeFilter(){
    $('#sidebar').removeClass('active');
    $('.sidebar-overlay').removeClass('active');
  }
}
