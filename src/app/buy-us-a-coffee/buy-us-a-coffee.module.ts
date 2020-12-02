import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStripeModule } from 'ngx-stripe';
import { UtilsModule } from '../utils/utils.module';

import {
  BuyUsACoffeeComponent, BuyUsACoffeeDonationComponent,
} from './components';

import { DonationService } from './services/donation.service';


const routes: Routes = [{
  path: 'list',
  component: BuyUsACoffeeDonationComponent,
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
    UtilsModule,
    NgxStripeModule.forRoot(window.appConfig.stripeKey)
  ],
  exports: [
    BuyUsACoffeeComponent,
  ],
  declarations: [
    BuyUsACoffeeComponent,
    BuyUsACoffeeDonationComponent
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    DonationService,
  ]
})

export class BuyUsACoffeeModule { }
