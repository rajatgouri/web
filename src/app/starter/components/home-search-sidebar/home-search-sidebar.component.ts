import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService, ProductService } from '../../../product/services';
import { ShopService } from '../../../shop/services/shop.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as _ from 'lodash';
import * as $ from 'jquery';

@Component({
  selector: 'home-search-sidebar',
  templateUrl: './home-search-sidebar.component.html'
})
export class HomeSearchSidebarComponent implements OnInit {

  @Output() updateFields = new EventEmitter();
  public tree: any = [];
  public shops: any = [];
  public items: any = [];
  public page: any = 1;
  public itemsPerPage: any = 12;
  public searchFields: any = {
    categoryId: '',
    shopId: '',
    featured: false,
    hot: false,
    bestSell: false,
    dailyDeal: false,
    discounted: false,
    soldOut: false
  };
  public filterAll = false;
  public routeId: any = {
    categoryId: '',
    shopId: ''
  };
  deviceInfo = null;
  isMobile = false;
  isTablet = false;
  isDesktopDevice = false;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
    private shopService: ShopService,
    private deviceService: DeviceDetectorService) {

      this.route.queryParams.subscribe(data => {
        this.routeId.categoryId = data && data.categoryId ? data.categoryId : '';
        this.routeId.shopId =  data && data.shopId ? data.shopId : '';
      });

      this.deviceInfo = this.deviceService.getDeviceInfo();
      this.isMobile = this.deviceService.isMobile();
      this.isTablet = this.deviceService.isTablet();
      this.isDesktopDevice = this.deviceService.isDesktop();
     }

  ngOnInit(): void {
    this.categoryService.tree().then(resp => this.tree = resp);
    this.shopService.search({ take: 20, featured: 1 }).then(resp => this.shops = resp.data.items);
  }

  filterCategory(categoryId: any){
    if(categoryId != 'all'){
      this.searchFields = {
        categoryId: categoryId
      }
    } else {
      this.searchFields = {
        categoryId: ''
      }
    }
    this.updateFields.emit(this.searchFields);
    if(this.isMobile){
      this.closeFilter();
    }
  }

  filterShop(shopId: any)
  {
    if(shopId != 'all'){
      this.searchFields = {
        shopId: shopId
      }
    } else {
      this.searchFields = {
        shopId: ''
      }
    }
    this.updateFields.emit(this.searchFields);
    if(this.isMobile){
      this.closeFilter();
    }
  }

  filter() {
    if (this.filterAll ||
      (!this.searchFields.featured &&
        !this.searchFields.hot &&
        !this.searchFields.bestSell &&
        !this.searchFields.discounted &&
        !this.searchFields.dailyDeal && !this.searchFields.soldOut)) {
      this.searchFields = {
        featured: false,
        hot: false,
        bestSell: false,
        dailyDeal: false,
        discounted: false,
        soldOut: false
      };
    }
    this.updateFields.emit(this.searchFields);
    if(this.isMobile){
      this.closeFilter();
    }
  }

  expandCollapse(id) {
    if($("#"+id).css('display') == 'none') {
      $("#"+id).show("slow");
    } else {
      $("#"+id).hide("slow");
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
