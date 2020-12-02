import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { ReviewService, AuthService, UtilService } from '../../../shared/services';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ReviewEditComponent } from '../review-modal/review-edit.component';

@Component({
  selector: 'review-list',
  templateUrl: './list.html'
})
export class ReviewListComponent implements OnInit {
  @Input() options: any;
  public page: any = 1;
  public pageSize: any = 10;
  public reviews: any = [];
  public total: any = 0;
  public userId: any = '';

  constructor(private reviewService: ReviewService, private authService: AuthService,
    private modalService: NgbModal, private utilService: UtilService) {
    if (this.authService.isLoggedin()) {
      this.authService.getCurrentUser().then(res => this.userId = res._id);
    }
  }

  ngOnInit() {
    this.query();
  }

  query() {
    this.utilService.setLoading(true);
    this.reviewService.search(Object.assign({
      page: this.page,
      take: this.pageSize
    }, this.options)).then((res) => {
      this.utilService.setLoading(false);
      this.reviews = res.data.items;
      this.total = res.data.count;
    });
  }

  onRating(event: any) {
    this.reviews.unshift(event);
    this.total += 1;
  }

  update(item: any, i: any) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(ReviewEditComponent, ngbModalOptions);
    modalRef.componentInstance.reviewId = item._id;
    modalRef.result.then((result) => {
      if(result._id) {
        this.reviews[i] = result;
      }
    }, () => { });
  }
}
