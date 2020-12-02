import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderRoutingModule } from './order.routing';

import { ViewComponent } from './components/view/view.component';
import { ListingComponent } from './components/listing/listing.component';
import { RefundModalComponent } from './components/refundModal/refund-modal.component';

import { OrderService } from './services/order.service';
import { ListingResolver } from './resolvers/listing.resolver';
import { ViewResolver } from './resolvers/view.resolver';

import { UtilsModule } from '../utils/utils.module';
import { BuyUsACoffeeModule } from '../buy-us-a-coffee/buy-us-a-coffee.module';
import { BuyUsACoffeeComponent } from '../buy-us-a-coffee/components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule,
    NgbModule,
    UtilsModule,
    BuyUsACoffeeModule
    
  ],
  declarations: [
    ViewComponent,
    ListingComponent,
    RefundModalComponent,
    
  ],
  providers: [
    OrderService,
    ListingResolver,
    ViewResolver
  ],
  exports: [
    ListingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [RefundModalComponent]
})
export class OrderModule { }
