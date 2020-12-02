import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComplainService } from '../services';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'complain',
  templateUrl: './complain.html'
})
export class ComplainComponent implements OnInit {

  public content: String = "";
  constructor(private translate: TranslateService, public activeModal: NgbActiveModal, private complainService: ComplainService, private toasty: ToastyService) { }

  ngOnInit() {
  }
  submit() {
    if (!this.content) {
      return this.toasty.error(this.translate.instant('Please enter the reason'));
    }
    this.complainService.complain({ content: this.content }).then((res) => {
      this.toasty.success(this.translate.instant('Complain has been sent!'));
    }).catch((err) => {
      this.toasty.error(this.translate.instant('Something went wrong, please check and try again!'));
    })
    this.activeModal.close();
  }
}
