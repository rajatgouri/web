import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { AutoLoginComponent } from './autologin/autologin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { GoogleLoginButtonComponent } from './socials-login/google-login-button.component';
import { FacebookLoginButtonComponent } from './socials-login/facebook-login-button.component';
import {environment} from '../../environments/environment';

// social login, check document here https://github.com/abacritt/angularx-social-login#readme
import { SocialAuthService, SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { UtilsModule } from '../utils/utils.module';
import { PhoneverifyComponent } from '../shared/phoneverify/phoneverify.component';
import { PhoneverifyModule } from '../shared/phoneverify.module';
import { MediaModule } from '../media/media.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

const routes: Routes = [{
  path: 'autologin/:token',
  component: AutoLoginComponent
}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    NgbModule,
    UtilsModule,
    PhoneverifyModule,
    MediaModule,
    NgxIntlTelInputModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent,
  ],
  exports: [
    GoogleLoginButtonComponent,
    FacebookLoginButtonComponent,
    LoginComponent,
    SignupComponent,
    ForgotComponent,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.googleClientId,
            {
              scope: 'profile email'
            } as any
          ),
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(
            environment.facebookAppId,
            {
              scope: 'email',
              return_scopes: true,
              enable_profile_selector: true,
              version: 'v2.7'
            } as any
          ),
        }
      ],
    } as SocialAuthServiceConfig,
  }]
})

export class AuthModule { }
