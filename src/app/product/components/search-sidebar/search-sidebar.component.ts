import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService, ProductService } from '../../services';
import { ShopService } from '../../../shop/services/shop.service';
import { ProducttransactiontypeService } from '../../../product/services/producttransactiontype.service';
import {NgbDateStruct, NgbCalendar, NgbDateParserFormatter, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as _ from 'lodash';
import * as moment from 'moment';
import { UtilService } from '../../../shared/services';

@Component({
  selector: 'search-sidebar',
  templateUrl: './search-sidebar.html'
})
export class SearchSidebarComponent implements OnInit {

  @Output() updateFields = new EventEmitter();
  public tree: any = [];
  public shops: any = [];
  public items: any = [];
  public page: any = 1;
  public itemsPerPage: any = 12;
  /*public searchFields: any = {
    featured: false,
    hot: false,
    bestSell: false,
    dailyDeal: false,
    discounted: false,
    soldOut: false
  };*/
  public filterAll = false;
  public routeId: any = {
    categoryId: '',
    shopId: ''
  };

  deviceInfo = null;
  isMobile = false;
  isTablet = false;
  isDesktopDevice = false;
  public transactionDetails: any = [];
  public startDate:any;
  public endDate:any;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
    private shopService: ShopService,
    private deviceService: DeviceDetectorService,
    private productService: ProductService,
    private producttransactiontypeService: ProducttransactiontypeService,
    private formatter: NgbDateParserFormatter,
    private utilService: UtilService) {
    this.route.queryParams.subscribe(data => {
      this.routeId.categoryId = data && data.categoryId ? data.categoryId : '';
      this.routeId.shopId =  data && data.shopId ? data.shopId : '';
    });

    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }

  ngOnInit() {
    if(this.productService.searchFields.transactiontypeId)
    {
      this.producttransactiontypeService.find(this.productService.searchFields.transactiontypeId)
      .then((resp) => {
            this.transactionDetails = resp.data;
      }); 
    }
    

    this.categoryService.tree().then(resp => this.tree = resp);
    this.shopService.search({ take: 20, featured: 1 }).then(resp => this.shops = resp.data.items);
  }

  filter() {
    if (this.filterAll ||
      (!this.productService.searchFields.featured &&
        !this.productService.searchFields.hot &&
        !this.productService.searchFields.bestSell &&
        !this.productService.searchFields.discounted &&
        !this.productService.searchFields.dailyDeal && !this.productService.searchFields.soldOut)) {
        this.productService.searchFields['featured'] = '';
        this.productService.searchFields['hot'] = '';
        this.productService.searchFields['bestSell'] = '';
        this.productService.searchFields['dailyDeal'] = '';
        this.productService.searchFields['discounted'] = '';
        this.productService.searchFields['soldOut'] = '';

      /*this.productService.searchFields = {
        featured: false,
        hot: false,
        bestSell: false,
        dailyDeal: false,
        discounted: false,
        soldOut: false
      };*/
    }
    //console.log(this.productService.searchFields);
    this.updateFields.emit(this.productService.searchFields);
  }

  filterCategory(categoryId: any){
    if(categoryId != 'all'){
      this.productService.searchFields['q'] = '';
      this.productService.searchFields['categoryId'] = categoryId;
      /*this.productService.searchFields = {
        categoryId: categoryId
      }*/

    } else {
      this.productService.searchFields['q'] = ''
      this.productService.searchFields['categoryId'] = '';
      /*this.productService.searchFields = {
        categoryId: ''
      }*/

    }

    this.updateFields.emit(this.productService.searchFields);

    if(this.isMobile){
      this.closeFilter();
    }
  }

  filterShop(shopId: any)
  {
    if(shopId != 'all'){
      this.productService.searchFields['shopId'] = shopId;
      /*this.productService.searchFields = {
        shopId: shopId
      }*/
    } else {
      this.productService.searchFields['shopId'] = '';
      /*this.productService.searchFields = {
        shopId: ''
      }*/
    }
    this.updateFields.emit(this.productService.searchFields);
    if(this.isMobile){
      this.closeFilter();
    }
  }

  onAvailableChange(event){

    
    if(this.startDate){
      this.productService.searchFields['startDate'] = moment(this.startDate.year+'-'+(this.startDate.month)+'-'+this.startDate.day).format("YYYY-MM-DD");
    }
    if(this.endDate){
      this.productService.searchFields['endDate'] = moment(this.endDate.year+'-'+(this.endDate.month)+'-'+this.endDate.day).format("YYYY-MM-DD");
    }

    this.updateFields.emit(this.productService.searchFields);

    if(this.isMobile){
      this.closeFilter();
    }
    /*if(startDate!='' && endDate !='')
    {
      if(startDate > endDate){
        return this.toasty.error(this.translate.instant('To date is grater then from date'));
      }
      else {
        this.utilService.setLoading(true);
        let param = {'alias':this.product.alias, 'startDate': startDate, 'endDate': endDate}
        this.productService.checkProductAvailability(param).then((resp) => {
        if(!resp.data){
            this.isProductAvailableOnDateRange = false;
            return this.toasty.error(this.translate.instant('Product is not available for this dates.'));
          } else {

            //This is to get date different
            this.product.price = this.pricePerDay;
            this.setPrice(this.product);
            this.isProductAvailableOnDateRange = true;
          }
        });
        this.utilService.setLoading(false);
      }
    } else {
      return this.toasty.error(this.translate.instant('Please select from date and to date'));
    }*/
    
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
