import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UtilService } from '../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import { ToastyService } from 'ng2-toasty';

import * as $ from 'jquery';

@Component({
  selector: 'auth-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  private Auth: AuthService;

  @ViewChild('loginModal') loginModal: ElementRef;  
  @ViewChild('ngxIntlTelInput') ngxIntlTelInput: ElementRef;
  
  public backdrop: boolean = false;
  public showLogin:boolean = true;
 

  @Output() showRegisterModal: EventEmitter<any> = new EventEmitter<any>();

  public credentials = {
    email: '',
    phoneNumber: '',
    password: ''
  };

  public otp: boolean= true;
  public submitted: boolean = true;
  public loginType: boolean = true;
  public usePassword:boolean = false;
  public showUseOtp: boolean = true;

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private translate: TranslateService, 
    private toasty: ToastyService,
    private utilService: UtilService
    ) {
    this.Auth = auth;
  }

  ngOnInit() {
    this.utilService.showLogin.subscribe(res => {
      if(res) {
        this.showModal();
      }
    })
  }

  login(frm: any) {
    this.submitted = true;
    if (frm.invalid) {
      return;
    }

    if(this.otp) {
      console.log('login with otp')
      if (this.loginType) {
        this.sendOtp('email',this.credentials.email);
      } else {
        this.sendOtp('phone',this.credentials.phoneNumber['e164Number']);
      }


    } else if (!this.otp && !this.usePassword) {
      let data;
      if(this.loginType) {
        console.log('login with otp now with email');
        data = {
          via: 'email',
          email: this.credentials.email,
          password: this.credentials.password
        }
      } else {
        console.log('login with otp now with phone');
        data = {
          via:'phone',
          phoneNumber: this.credentials.phoneNumber['e164Number'],
          password: this.credentials.password
        }
      }


      this.auth.loginWithOtp(data).then((res: any) => {
        this.hideModal();
          const redirectUrl = sessionStorage.getItem('redirectUrl');
          if (redirectUrl) {
            sessionStorage.removeItem('redirectUrl');
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/']);
          }
      }).catch(error => {

        this.toasty.error(this.translate.instant(error.data.message || 'Your account is not activated or register. Please recheck again or contact to our admin to resolve it.'))
      })

      
    } else if (!this.otp && this.usePassword) {

      if(this.loginType) {
        delete this.credentials['phoneNumber'];
      } else {
        this.credentials.email = this.credentials.phoneNumber['e164Number'];
        delete this.credentials['phoneNumber'];
      }

      
      this.Auth.login(this.credentials).then((data) => {
        //tradenshare-web-dev.serverdatahost.com/
        this.hideModal();
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

    } else {
      console.log('something went wrong!')
    }
    
  }

  resetOptions() {
    this.otp= true;
    this.loginType = true;
    this.usePassword= false;
  }

  sendOtp(via: string, value: string) {
      this.auth.getOtp({via, value})
        .then((res: any) => {
              
          this.usePassword = false;
          this.otp = false;
          this.showUseOtp = false;
        }).catch(error => {
          console.log(error)
          this.resetCredentials();
          this.toasty.error(this.translate.instant('This Account is not Registered'))
        })
  }


  changeLoginType(type: string) {
    this.resetCredentials();
    if(type === 'email') {
      this.loginType = true;
    } else {
      this.loginType = false;
    }
  }

  useLoginPassword(value) {
    if(value) {
      this.usePassword = true;
      this.otp = false;
      this.showUseOtp = true;
    } else {
      this.usePassword = false;
      this.otp = true;
    }
  }

  resetCredentials() {
    this.credentials = {
      email: '',
      phoneNumber: '',
      password: ''
    }
  }

  resendOTP() {
    if(this.loginType) {
      this.sendOtp('email',this.credentials.email);
    } else {
      this.sendOtp('phone',this.credentials.phoneNumber['e164Number']);
    }
  }

  resetPasswordCredentials() {
    this.credentials['password'] = ''
  } 

  showModal() {
    this.loginModal.nativeElement.classList.add('show');
    this.loginModal.nativeElement.style.display = 'block';
    this.backdrop = true;
  }

  public onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  hideModal() {
    this.loginModal.nativeElement.classList.remove('show');
    this.loginModal.nativeElement.style.display = 'none';
    this.backdrop = false;
    this.showLogin = true;
  }
  
  forgetPassword() {
    this.showLogin = false;
  }
 
  onShowLogin() {
    this.showLogin = true;
  }

  showRegister() {
    this.hideModal();
    this.utilService.showRegister.next(true);
  }

  
}
