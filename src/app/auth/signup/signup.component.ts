import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UtilService } from '../../shared/services';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService, ProductService } from '../../product/services';
import { ProducttransactiontypeService } from '../../product/services/producttransactiontype.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'auth-signup',
  templateUrl: 'signup.component.html'
})
export class SignupComponent {
  Auth: AuthService;
  @ViewChild('signupModal') signupModal: ElementRef;
  
  @ViewChild('ngxIntlTelInput') ngxIntlTelInput: ElementRef;

  @Input() show;
  public backdrop: boolean = false;
  public isVerified: boolean = false;

  public dialCode: any = '';

  public account: any = {
    email: '',
    password: '',
    phoneNumber: '',
    isShop: false,
    name: ''
  };
  public name: any = {
    firstName: '',
    lastName: ''
  };
  public input: any = {
    rePassword: ''
  };


  public submitted: boolean = false;


  constructor(
    auth: AuthService,
    public router: Router,
    private toasty: ToastyService,
    private translate: TranslateService,
    private utilService: UtilService,
    private formatter: NgbDateParserFormatter,
    private producttransactiontypeService: ProducttransactiontypeService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.Auth = auth;
  }


  ngOnInit() {
    this.utilService.showRegister.subscribe(res => {
      if (res) {
        this.showModal();
      }
    })
  }


  login() {
    this.hideModal();
    this.utilService.showLogin.next(true);
  }

  public onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  selectDial(event) {
    this.dialCode = event;
  }

  // Step 1
  public submit(frm: any) {
    this.submitted = true;

    if (frm.invalid) {
      return;
    }

    if (this.account.password !== this.input.rePassword) {
      return this.toasty.error(this.translate.instant('Confirm password doest not match'));
    }

    this.account.phoneVerified = this.isVerified
    if(!this.account.phoneVerified) {
      return this.toasty.error(this.translate.instant('Phone verification is pending!'));
    }

    this.account.name = this.name.firstName + " " + this.name.lastName;
    this.account.phoneNumber = this.account.phoneNumber.e164Number

      this.Auth.register(this.account)
        .then(resp => {
          this.hideModal();
          this.toasty.success(this.translate.instant('Your account has been created, please verify your email then login'));
          this.signupModal.nativeElement.style.display = 'none';
          frm.reset();
        })
        .catch(err => {
          if (err.data.message === 'ERR_EMAIL_ALREADY_TAKEN') {
            frm.controls.email.setErrors({ exists: true });
          }
          this.setPhoneNumber()
          this.toasty.error(this.translate.instant(err.data.data.message));
        });

  }

  setPhoneNumber() {
      let dialcode = '+'+ this.ngxIntlTelInput['selectedCountry']['dialCode']
      let number = this.ngxIntlTelInput['value'].replace(dialcode, '')
      this.account.phoneNumber = number;
  }


  showModal() {
    this.signupModal.nativeElement.classList.add('show');
    this.signupModal.nativeElement.style.display = 'block';
    this.backdrop = true;
  }

  hideModal() {
    this.signupModal.nativeElement.classList.remove('show');
    this.signupModal.nativeElement.style.display = 'none';
    this.backdrop = false;
  }

  changePhoneNumber(ev) {
    this.isVerified = false
  }



  onVerifyApprove(ev) {
    if(ev == true) {
      this.isVerified = true
    } else this.isVerified = false
  }
}
