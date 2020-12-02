import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopRoutingModule } from './shop.routing';
import { ProductModule } from '../product/product.module';
import { UtilsModule } from '../utils/utils.module';
import { MessageModule } from '../message/message.module';

import { ShopDetailComponent } from './components/detail/detail.component';
import { ReportComponent } from './components/report/report.component';
import { SearchComponent } from './components/search/search.component';
import { ShopCardComponent } from './components/shop-card/shop-card.component';

import { ShopResolver } from './resolvers/shop.resolver';
import { SearchResolver } from './resolvers/search.resolver';

import { ShopService, ReportService } from './services';
import { LocationService, GoogleAnalyticsService } from '../shared/services';

import { ShopBannerPipe, ShopLogoPipe } from '../shared/pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //our custom module
    ShopRoutingModule,
    NgbModule,
    ProductModule,
    UtilsModule,
    MessageModule
  ],
  declarations: [
    ShopDetailComponent, ReportComponent, SearchComponent, ShopCardComponent,
    ShopBannerPipe, ShopLogoPipe
  ],
  providers: [
    ShopService,
    ShopResolver,
    SearchResolver,
    ReportService,
    LocationService,
    GoogleAnalyticsService
  ],
  exports: [
    ShopCardComponent,
    SearchComponent
  ],
  entryComponents: [ReportComponent]
})
export class ShopModule { }
