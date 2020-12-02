import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';
import { ReviewService, AuthService } from '../../../shared/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'review-card',
  templateUrl: './review.html',
  styleUrls: ['../star-rating/star-rating.scss']
})
export class ReviewComponent implements OnInit {
  @Input() options: any;
  @Output() onRating = new EventEmitter();
  public hovered: number;
  public review: any = {
    comment: '',
    rating: 3
  };
  public params: any;
  public currentUser: any;
  public isLoggedin: Boolean = false;
  public submitted: boolean = false;
  public canReview: boolean = false;
  public checkReview: boolean = false;

  constructor(private translate: TranslateService, private toasty: ToastyService,
    private reviewService: ReviewService, private auth: AuthService) {
    if (auth.isLoggedin()) {
      this.isLoggedin = true;
    }
  }

  ngOnInit() {
    // check review allowable or not
    const query = _.pick(this.options, ['type', 'productId', 'shopId']);
    if (this.auth.isLoggedin()) {
      this.reviewService.canReview(query)
        .then(resp => this.canReview = resp.data.canReview);
      this.reviewService.checkReview(this.options.type, (this.options.shopId ? this.options.shopId : this.options.productId))
        .then(resp => {
          if (resp.data) {
            this.checkReview = true;
          }
        });
    }
  }

  submit(frm: any) {
    this.submitted = true;

    if (frm.invalid || !this.review.comment) {
      return this.toasty.error(this.translate.instant('Invalid form, please recheck again.'));
    }
    if (!this.auth.isLoggedin()) {
      return this.toasty.error(this.translate.instant('Please log in to review this product.'));
    }

    this.reviewService.create(Object.assign(this.review, this.options)).then((resp) => {
      this.review = {
        comment: '',
        rating: 3
      };
      this.onRating.emit(resp.data);
      this.submitted = false;
      this.checkReview = true;
    })
      .catch(err => {
        this.toasty.error(this.translate.instant('Something went wrong, please try again.'));
      });
  }
}
