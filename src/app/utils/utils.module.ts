import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PriceConvert } from './components/price-convert.component';
import { StarRating } from './components/star-rating/star-rating.component';
import { ReviewComponent } from './components/review-card/review.component';
import { ReviewEditComponent } from './components/review-modal/review-edit.component';
import { NewsleterComponent } from './components/newsletter/newsletter.component';
import { StatusDisplayComponent } from './components/status-display/status-display.component';
import { PriceCurrencyComponent } from './components/currency/display-currency.component';
import { DialCodeComponent } from './components/dial-number/dial.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ProfileSliderBarComponent } from './components/profile-sliderbar/sliderbar.component';

import { PriceCurrencyPipe } from './pipes/price-currency.pipe';
import { NoImagePipe } from './pipes/no-image.pipe';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';

import { NewsletterService } from './services/newsletter.service';
import { CurrencyService } from './services/currency.service';

import { LocationHrefDirective } from './directives/location-href/location-href.directive';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    NgbModule,
    TranslateModule.forChild(),
    NgxIntlTelInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PriceConvert, StarRating, NewsleterComponent, ReviewEditComponent,
    StatusDisplayComponent, PriceCurrencyComponent, PriceCurrencyPipe, NoImagePipe,
    DialCodeComponent, ReviewComponent, ReviewListComponent, LocationHrefDirective,
    ProfileSliderBarComponent, SafeHtmlPipe
  ],
  exports: [
    TranslateModule,
    PriceConvert,
    StarRating,
    NewsleterComponent,
    StatusDisplayComponent,
    PriceCurrencyComponent,
    PriceCurrencyPipe,
    NoImagePipe, SafeHtmlPipe,
    DialCodeComponent,
    ReviewComponent,
    ReviewListComponent,
    LocationHrefDirective,
    ReviewEditComponent,
    ProfileSliderBarComponent
  ],
  providers: [
    NewsletterService,
    CurrencyService
  ],
  entryComponents: [ReviewEditComponent]
})
export class UtilsModule { }
