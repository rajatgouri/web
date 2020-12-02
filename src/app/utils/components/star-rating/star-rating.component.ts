import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.scss']
})
export class StarRating implements OnInit {

  @Input() rate: any;
  @Input() total: any;
  constructor() { }

  ngOnInit() {
  }
}
