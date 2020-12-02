import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  //templateUrl: 'login.component.html'
})
export class AutoLoginComponent {
  private Auth: AuthService;
  public credentials = {
    email: '',
    token: ''
  };
  public submitted: boolean = false;

  constructor(
    auth: AuthService, 
    public router: Router, 
    private translate: TranslateService, 
    private toasty: ToastyService,
    private route: ActivatedRoute
    ) {
    this.Auth = auth;
    
    let token = this.route.snapshot.paramMap.get('token');
    if(token && token != ''){
        this.Auth.getUserByToken(token).then((resp) => {
          if(resp.data){
            let user = resp.data;
            this.credentials.email = user.email;
            this.credentials.token = user.autoLoginToken;

            this.login();
          }
        }).catch((err) => {
          this.router.navigate(['/']);
        });
    }

  }

  login() {
    this.Auth.autologin(this.credentials).then((data) => {
      //tradenshare-web-dev.serverdatahost.com/
      
        const redirectUrl = sessionStorage.getItem('redirectUrl');
        if (redirectUrl) {
          sessionStorage.removeItem('redirectUrl');
          this.router.navigate([redirectUrl]);
        } else {
          this.router.navigate(['/']);
        }
    })
      .catch((err) => {
        console.log(err)
        this.toasty.error(this.translate.instant('Your account is not activated or register. Please recheck again or contact to our admin to resolve it.'));
      });
  }
}
