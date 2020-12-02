import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BannerComponent } from './banner.component';
import { Routes, RouterModule } from '@angular/router';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { BannerService } from './service';

import { AuthModule } from '../auth/auth.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AuthModule,
    SlickCarouselModule,
    AutocompleteLibModule
  ],
  declarations: [
    BannerComponent
  ],
  providers: [
    BannerService
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
