import { Component } from '@angular/core';
import { AuthService } from '../../shared/services';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
  selector: 'google-login',
  template: '<button class="btn btn-warning btn-block" (click)="signInWithGoogle()"><i class="fa fa-google"></i> google</button>'
})
export class GoogleLoginButtonComponent {
  private Auth: AuthService;

  constructor(private translate: TranslateService, private router: Router, auth: AuthService, private socialAuthService: SocialAuthService, private toasty: ToastyService) {
    this.Auth = auth;
  }

  signInWithGoogle(): void {
    $('.modal-backdrop').css('display','none');

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((resp) => {
        console.log(resp)
        this.Auth.socialLogin('google', resp.authToken);
        this.router.navigate(['/']);
      }).catch(err => {
        console.log(err)
        this.toasty.error(this.translate.instant('Something went wrong, please try again.'))
      });
  }
}
