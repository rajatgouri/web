import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services';
import { UtilService } from '../../../shared/services';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'search-products',
  templateUrl: './search.html'
})
export class SearchComponent implements OnInit {
  public items: any = [];
  public page: any = 1;
  public itemsPerPage: any = 15;
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
  public sort: any = '';
  public sortType: any = '';
  public total: any = 0;
  public isLoading = false;

  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 0;
  direction = '';
  modalOpen = false;
  deviceInfo = null;
  isMobile = false;
  isTablet = false;
  isDesktopDevice = false;
  geo = false;
  geoData = {
    lat: null,
    lng: null,
    dist: null
  }

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private utilService: UtilService,
    private deviceService: DeviceDetectorService,
    private toasty: ToastrService) {

    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();

    this.route.queryParamMap.subscribe((params: Params) => {
      if (params && (params.params.shopId ||  params.params.categoryId
         ||  params.params.transactiontypeId
         || params.params.q || params.params.featured || params.params.hot ||
         params.params.bestSell || params.params.dailyDeal || params.params.soldOut ||
         params.params.discounted)) {
          this.productService.searchFields = {
            q: '',
            transactiontypeId:'',
            featured: '',
            hot: '',
            bestSell: '',
            dailyDeal: '',
            soldOut: '',
            discounted: ''
          };
          this.productService.searchFields = Object.assign(this.productService.searchFields, params.params);
          this.items = [];
          this.query();
      }else {
        this.productService.searchFields = {
          q: '',
          categoryId: '',
          transactiontypeId:'',
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

  ngOnInit() {
    this.utilService.data$.subscribe((res) => {
      if(res.q == '') {
        this.productService.searchFields['q'] = '';
      }
      this.updateFields(res)

    })
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

    this.query();
    }, error => {
      this.geo = false;      
      this.toasty.error('Please allow Browser to Share location')
    })
  
  }


  query() {
    this.utilService.setLoading(true);
    this.isLoading = true;
    const params = Object.assign({
      page: this.page,
      take: this.itemsPerPage,
      sort: this.sort,
      sortType: this.sortType
    }, this.productService.searchFields);


    if(this.geo) {
      params['geo'] = this.geo,
      params['lat'] = this.geoData['lat'];
      params['lng'] = this.geoData['lng'];
      params['maxDistance'] = this.geoData['dist']  === 'Infinity' ? Infinity : parseInt(this.geoData['dist'])  
    }

    this.productService.search(params).then((res) => {
      //this.items = res.data.items;
      this.items = this.items.concat(res.data.items);
      this.total = res.data.count;
      this.utilService.setLoading(false);
      this.isLoading = false;
    })
      .catch(() => {
        this.utilService.setLoading(false);
        this.isLoading = false;
      });
  }

  changeSort(sort: string, $event: any) {
    this.sort = sort;
    this.sortType = $event.target.value;
    this.page = 1;
    this.items = [];
    this.query();
  }

  updateFields(event: any) {
    for (const key in event) {
      if (event.hasOwnProperty(key) && event[key]) {
        this.productService.searchFields[key] = event[key];
      } else {
        //this.productService.searchFields[key] = '';
      }
    }
    this.page = 1;
    this.items = [];
    this.query();
  }

  onScrollDown (ev) {
    console.log('scrolled down!!', ev);
    
    if(this.total > this.items.length)
    {
      this.page += 1;
      this.query();
    }
    
  }

  openFilter(){
    $('#sidebar').addClass('active');
    $('.sidebar-overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }

  closeFilter(){
    $('#sidebar').removeClass('active');
    $('.sidebar-overlay').removeClass('active');
  }
}
