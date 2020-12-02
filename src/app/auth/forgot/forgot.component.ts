import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'auth-forget-password',
  templateUrl: 'forgot.html'
})
export class ForgotComponent {
  @ViewChild('forgetModal') forgetModal: ElementRef;
  email: string = '';
  submitted: boolean = false;
  Auth: AuthService;
  backdrop:boolean = false;

  @Output() hide: EventEmitter<any> = new EventEmitter<any>();
  @Output() showLogin: EventEmitter<any> = new EventEmitter<any>();
  @Output() showRegister: EventEmitter<any> = new EventEmitter<any>();

  constructor(private translate: TranslateService, auth: AuthService, public router: Router, private toasty: ToastyService) {
    this.Auth = auth;
  }

  forgot(frm: any) {
    this.submitted = true;
    this.Auth.forgot(this.email).then((resp) => {
      this.hideModal();

      this.toasty.success(this.translate.instant('New password has been sent, please check your email inbox.'));
    })
      .catch((err) => this.toasty.error(this.translate.instant(err.data.data.message)));
  }
  

  login() {
    this.showLogin.emit(true);
  }

  register() {
    this.showRegister.emit(true);
  }

  hideModal() {
    this.onHide();
  }


  onHide() {
    this.hide.emit(true)
  }

}
