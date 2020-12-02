import { Component, OnInit, Input } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';
import { ReviewService } from '../../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'review-edit',
  templateUrl: './edit.html',
  styleUrls: ['../star-rating/star-rating.scss']
})
export class ReviewEditComponent implements OnInit {
  @Input() reviewId: any;
  public review: any = {};
  public submitted: boolean = false;
  public hovered: number;

  constructor(private translate: TranslateService, private toasty: ToastyService,
    private reviewService: ReviewService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    // check review allowable or not
    this.reviewService.findOne(this.reviewId).then(resp => {
      this.review = resp.data;
      // this.review.rating = resp.data.rating;
      // this.review.comment = resp.data.comment;
    })
      .catch(() => this.toasty.error('Something went wrong, please try again.'));
  }

  submit() {
    this.submitted = true;

    if (!this.review.comment) {
      return this.toasty.error(this.translate.instant('Invalid form, please recheck again.'));
    }

    const data = _.pick(this.review, ['comment', 'rating']);
    this.reviewService.update(this.review._id, data)
      .then(resp => {
        this.toasty.success('Updated successfully!');
        this.activeModal.close(resp.data);
      })
      .catch(() => this.toasty.error(this.translate.instant('Something went wrong, please try again.')));
  }
}
