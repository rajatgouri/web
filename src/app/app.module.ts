import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { RestangularModule } from 'ngx-restangular';
import { ToastyModule } from 'ng2-toasty';
import { NgSelectModule } from '@ng-select/ng-select';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxStripeModule } from 'ngx-stripe';
import { ToastrModule } from 'ngx-toastr';

import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SearchbarComponent } from './shared/header/search-bar.component';
import { CategoriesComponent } from './shared/header/categories.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { ComplainComponent } from './shared/complain/complain.component';
import { AuthService, SystemService, ComplainService } from './shared/services';
import { AuthGuard } from './shared/guard/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { MediaModule } from './media/media.module';
import { UtilsModule } from './utils/utils.module';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { ConfigResolver } from './shared/resolver';
import { TransactionService } from './cart/services/transaction.service';
import { AuthModule } from './auth/auth.module';
import { SocialLoginModule } from 'angularx-social-login';
import { PhoneverifyComponent } from './shared/phoneverify/phoneverify.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
/*import { HomeSearchSidebarComponent } from './starter/components/home-search-sidebar/home-search-sidebar.component';*/

// Function for setting the default restangular configuration
export function RestangularConfigFactory(RestangularProvider) {
  // TODO - change default config
  RestangularProvider.setBaseUrl(window.appConfig.apiProxy || window.appConfig.apiBaseUrl);
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    // Auto add token to header
    headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    headers.platform = window.appConfig.platform;
    return {
      headers: headers
    };
  });

  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    // force logout and relogin
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLoggedin');
      window.location.href = '/';

      return false; // error handled
    }

    return true; // error not handled
  });
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${window.appConfig.apiBaseUrl}/i18n/`, '.json');
  // return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    BlankComponent,
    FullComponent,
    BreadcrumbComponent,
    SearchbarComponent,
    FooterComponent,
    HeaderComponent,
    CategoriesComponent,
    ComplainComponent,
    // PhoneverifyComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    // Importing RestangularModule and making default configs for restanglar
    RestangularModule.forRoot(RestangularConfigFactory),
    ToastyModule.forRoot(),
    NgSelectModule,
    SlickCarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxStripeModule.forRoot(),
    UtilsModule,
    MediaModule,
    ToastrModule.forRoot(),
    AutocompleteLibModule,
    SocialLoginModule,
    NgxIntlTelInputModule,
    AuthModule,
    SlickCarouselModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy // HashLocationStrategy
  },
    AuthService,
    SystemService,
    AuthGuard,
    ConfigResolver,
    ComplainService,
    TransactionService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ComplainComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
