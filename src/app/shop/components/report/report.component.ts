import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from '../../services';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'shop-report',
  templateUrl: './report.html'
})
export class ReportComponent implements OnInit {

  @Input() shopId: String;
  public content: String = '';
  public type: String = 'contents';

  constructor(public activeModal: NgbActiveModal, private reportService: ReportService, private toasty: ToastyService, private translate: TranslateService) { }

  ngOnInit() {

  }

  submit() {
    const params = {
      shopId: this.shopId,
      type: this.type,
      content: this.content
    };

    if (this.content === '') {
      return this.toasty.error(this.translate.instant('Please enter reason'));
    }
    this.reportService.create(params).then((res) => {
      this.toasty.success(this.translate.instant('Report has been sent!'));
      this.activeModal.close();
    }).catch((err) => {
      this.toasty.error(this.translate.instant('Something went wrong, please check and try again!'));
    });
  }
}
