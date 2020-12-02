import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'refund-modal',
  templateUrl: './form.html'
})
export class RefundModalComponent implements OnInit {
  @Input() orderDetailId: any;
  public reason: any = '';

  constructor(private translate: TranslateService, private orderService: OrderService,
     private toasty: ToastyService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  send() {
    if (!this.reason) {
      return this.toasty.error(this.translate.instant('Please enter reason for refund'));
    }
    this.orderService.sendRefund({ orderDetailId: this.orderDetailId, reason: this.reason }).then((resp) => {
      this.activeModal.close();
      this.toasty.success(this.translate.instant('Your refund request has been sent. Please check your email for more details.'));
    })
      .catch((err) => {
        this.activeModal.close();
        this.toasty.error(this.translate.instant('Something went wrong, please try again!'));
      });
  }


}
