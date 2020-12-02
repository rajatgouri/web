import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RefundModalComponent } from '../refundModal/refund-modal.component';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/services';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'order-view',
  templateUrl: './view.html'
})
export class ViewComponent implements OnInit {
  public isSubmitted: any = false;
  public order: any = {};
  public details: any = [];
  public accessToken: any;

  constructor(private route: ActivatedRoute, private toasty: ToastyService, private orderService: OrderService,
    private modalService: NgbModal, private translate: TranslateService, private authService: AuthService) {
    this.order = this.route.snapshot.data.order;
    this.details = this.route.snapshot.data.order.details;
    this.accessToken = this.authService.getAccessToken();
  }

  ngOnInit() { }

  openRefund(item) {
    if (item.status === 'refunded') {
      return this.toasty.error(this.translate.instant('This order has been refunded.'));
    }
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(RefundModalComponent, ngbModalOptions);
    modalRef.componentInstance.orderDetailId = item._id;
  }

  exportPDF(item) {
    this.orderService.export(item._id, { access_token: this.accessToken }).then()
      .catch((err) => {
        const link = document.createElement('a');
        link.target = '_blank';
        link.download = 'file';
        link.href = err.url;
        link.click();
      });
  }
}
