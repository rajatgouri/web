import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { reject } from 'lodash';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../services';

@Component({
  selector: 'app-phoneverify',
  templateUrl: './phoneverify.component.html',
})
export class PhoneverifyComponent implements OnInit, OnChanges {

  public isSubmitted: boolean = false;
  private modalRef: NgbModalRef;
  public verificationCode: string;
  @Input() phoneNumber: any;
  @Input() isVerified: any;
  @Input() dialCode: any;
  @Input() isInValid: any;
  @Output() approve : EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('phoneverificationmodal') verificationmodal: ElementRef;

  constructor(
    private translate: TranslateService,
    private modalService: NgbModal,
    private authService: AuthService,
    private toasty: ToastyService) {
    }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
  }

  verifyPhone() {
    if(this.isInValid == true) {
      this.toasty.warning("Please Enter valid PhoneNumber")
      return false
    }

    if(!this.phoneNumber || !this.phoneNumber.e164Number) {
      this.toasty.warning("Please Enter PhoneNumber to verify")
      return false
    }

    this.openVerifymodal()

    this.sendCode().then((res) => {
      if(res.data.success && res.data.status == "pending") {
        this.toasty.success("Verification code sent to your phone")
      }
    }).catch((err) => {
      this.toastError()
    })
  }

  sendCode(): Promise<any> {
    return new Promise((resolve, reject)=> {
      const param = {
        phoneNumber: this.phoneNumber.e164Number
      }
      this.authService.verifyPhone(param).then(res => {
        resolve(res)

      }).catch((err) => {
        this.toasty.error(this.translate.instant(err.data.message))
      })
    });

  }

  verifyCode(frm: any) {
    this.isSubmitted = true;
    if (!frm.valid) {
      return this.toastError()
    }
    const param = {
      phoneNumber: this.phoneNumber.e164Number,
      code: this.verificationCode
    }
    this.authService.verificationChecks(param).then(res => {
      if(res.data.success) {
        if(res.data.status == "approved") {
          this.isVerified = true;
          this.approve.emit(true)
        } else if(res.data.status == "pending") {
          this.toastError()
          this.approve.emit(false)
        }
        this.closemodal()
      }
    }).catch((err) => {
      this.toasty.error(this.translate.instant(err.message))
    })
  }

  reSendVerifyNumber() {
    this.clearForm()
    this.sendCode().then((res) => {
      this.toasty.success("Verification code sent to your phone")
    }).catch((err) => {
      this.toastError()
    })
  }

  openVerifymodal() {
    this.clearForm()
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    };
    this.modalRef = this.modalService.open(this.verificationmodal, ngbModalOptions);
  }

  closemodal() {
    if (this.modalRef != undefined) {
      this.modalRef.close()
    }
  }

  toastError() {
    this.toasty.error(this.translate.instant('Something went wrong, please check and try again!'))
  }

  clearForm() {
    this.verificationCode = ""
  }
}
