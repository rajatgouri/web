import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { StarterComponent } from './starter.component';
import { HomeSearchSidebarComponent } from './components/home-search-sidebar/home-search-sidebar.component';

import { ProductModule } from '../product/product.module';
import { ShopModule } from '../shop/shop.module';
import { ProfileModule } from '../profile/profile.module';
import { BannerModule } from '../banner/banner.module';
import { OrderModule } from '../order/order.module';
import { UtilsModule } from '../utils/utils.module';
import { BuyUsACoffeeModule } from '../buy-us-a-coffee/buy-us-a-coffee.module';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Home'
  },
  component: StarterComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ProductModule,
    ShopModule,
    ProfileModule,
    BannerModule,
    OrderModule,
    UtilsModule,
    BuyUsACoffeeModule,
    NgbModule,
    AutocompleteLibModule,
    InfiniteScrollModule
  ],
  declarations: [StarterComponent, HomeSearchSidebarComponent],
  exports: [
    HomeSearchSidebarComponent
  ]
})
export class StarterModule { }
