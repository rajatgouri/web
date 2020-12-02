import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from '../../../order/services/order.service';

@Component({
  templateUrl: './form.html'
})
export class CodVerifyModalComponent {
  @Input() phoneNumber: any;
  public verifyCode: string;

  constructor(private translate: TranslateService,
    private toasty: ToastyService, public activeModal: NgbActiveModal, private orderService: OrderService) {
  }

  confirm() {
    if (!this.verifyCode) {
      return this.toasty.error(this.translate.instant('Please enter verify code!'));
    }
    this.activeModal.close({
      verifyCode: this.verifyCode
    });
  }

  reSendVerifyNumber() {
    if (!this.phoneNumber || this.phoneNumber === 'undefined' || typeof (this.phoneNumber) === 'undefined') {
      return this.toasty.error(this.translate.instant('Invalid phone number, please recheck again.'));
    }
    this.orderService.checkPhone(this.phoneNumber)
      .then(resp => {
        this.toasty.success(this.translate.instant('A verify code was sent to your phone number, please check.'));
      })
      .catch((err) => this.toasty.error(this.translate.instant('An error occurred, please recheck your phone number!')));
  }
}
