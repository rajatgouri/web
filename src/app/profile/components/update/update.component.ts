import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterContentInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService, UtilService } from '../../../shared/services';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'update-component',
  templateUrl: './update.html'
})
export class UpdateComponent implements OnInit, OnDestroy, AfterViewInit{
  public isSubmitted: boolean = false;
  private userLoadedSubscription: Subscription;
  public info: any = {};
  public verificationCode: number;
  public avatarOptions: any = {};
  public avatarUrl: any = '';
  private phoneNumber : any = '';
  public isVerified: boolean = false;
  @ViewChild('phoneverificationmodal') verificationmodal: ElementRef;
  @ViewChild('ngxIntlTelInput') ngxIntlTelInput: ElementRef;

  constructor(private translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private toasty: ToastyService,
    private utilService: UtilService) {
    if (this.authService.isLoggedin()) {
      this.authService.me().then((resp) => {
        this.info = resp.data;
        this.avatarUrl = resp.data.avatarUrl;
        this.phoneNumber = resp.data.phoneNumber;
        this.isVerified = resp.data.phoneVerified;
      });
    }
    this.userLoadedSubscription = authService.userLoaded$.subscribe(data => this.info = data);
  }

  ngOnInit() {
    this.avatarOptions = {
      url: window.appConfig.apiBaseUrl + '/users/avatar',
      fileFieldName: 'avatar',
      onFinish: (resp) => {
        this.avatarUrl = resp.data.url;
        this.info.avatarUrl = resp.data.url;
      }
    }
  }

  
  ngAfterViewInit() {
    setTimeout(() => {
      this.setPhoneNumber();
    }, 1000)
  }

  
  ngOnDestroy() {
    this.userLoadedSubscription.unsubscribe();
  }

  submit(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toastError()
    }
    this.info.phoneVerified = this.isVerified
    if(!this.info.phoneVerified) {
      return this.toasty.error(this.translate.instant('Phone verification is pending!'));
    }
    this.info.phoneNumber = this.info.phoneNumber.e164Number;
    this.authService.updateMe(this.info).then(resp => {
      this.toasty.success(this.translate.instant('Updated successfuly!'));
      this.phoneNumber = this.info.phoneNumber
      this.utilService.changesDetect.next(true);
      this.setPhoneNumber();
    }).catch((err) => {
      this.setPhoneNumber();
      this.toasty.error(err.data.data.message)
    });
  }

  setPhoneNumber() {    
    let dialcode = '+'+ this.ngxIntlTelInput['selectedCountry']['dialCode']
    let number = this.ngxIntlTelInput['value'].replace(dialcode, '')
    this.info.phoneNumber = number;
  }
  

  changePhoneNumber(ev) {
    if(ev && ev.e164Number) {
      let newph = ev.e164Number;
      if(newph != this.phoneNumber) {
        this.isVerified = false
      } else this.isVerified = true
    } else this.isVerified = false
  }

  onVerifyApprove(ev) {
    if(ev == true) {
      this.isVerified = true
    } else this.isVerified = false
  }

  toastError() {
    this.toasty.error(this.translate.instant('Something went wrong, please check and try again!'))
  }

}
